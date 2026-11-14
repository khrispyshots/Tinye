use near_sdk::collections::{LookupMap, UnorderedSet};
use near_sdk::json_types::U128;
use near_sdk::{
    env, near, require, AccountId, Gas, NearToken, PanicOnDefault, Promise,
    PromiseError,
};

pub mod errors;
pub mod goal;
pub mod operation;
pub mod group;

use errors::*;
use goal::{GoalStatus, GoalVault, GoalView};
use operation::{OperationKind, OperationRecord, OperationState, OperationView};

const GAS_FOR_RESOLVE_WITHDRAWAL: Gas = Gas::from_tgas(20);

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct TinyeVaultContract {
    pub owner_id: AccountId,
    pub treasury_id: AccountId,
    pub deposits_paused: bool,
    pub pause_reason: Option<String>,
    pub allowed_assets: UnorderedSet<AccountId>,
    pub goals: LookupMap<String, GoalVault>,
    pub operations: LookupMap<String, OperationRecord>,
    pub total_liabilities: u128,
    pub total_reserved: u128,
    pub owner_goals: LookupMap<AccountId, Vec<String>>,
    pub storage_credit: LookupMap<AccountId, u128>,
    pub withdrawn: LookupMap<AccountId, u128>,
}

#[near]
impl TinyeVaultContract {
    #[init]
    pub fn initialise(
        owner_id: AccountId,
        treasury_id: AccountId,
        allowed_assets: Vec<AccountId>,
    ) -> Self {
        require!(!env::state_exists(), "Already initialised");
        let mut asset_set = UnorderedSet::new(b"a");
        for asset in allowed_assets {
            asset_set.insert(&asset);
        }

        Self {
            owner_id,
            treasury_id,
            deposits_paused: false,
            pause_reason: None,
            allowed_assets: asset_set,
            goals: LookupMap::new(b"g"),
            operations: LookupMap::new(b"o"),
            total_liabilities: 0,
            total_reserved: 0,
            owner_goals: LookupMap::new(b"i"),
            storage_credit: LookupMap::new(b"s"),
            withdrawn: LookupMap::new(b"w"),
        }
    }

    /// Creates an earmarked savings goal vault for the caller
    #[payable]
    pub fn create_goal(
        &mut self,
        goal_id: String,
        asset_id: AccountId,
        rule_version: u32,
        target_amount: U128,
    ) -> GoalView {
        let before = env::storage_usage();
        let caller = env::predecessor_account_id();
        Self::bounded_id(&goal_id);
        require!(target_amount.0 > 0, E_AMOUNT);
        require!(rule_version == 1, "Unsupported rules");
        let mut ids = self.owner_goals.get(&caller).unwrap_or_default();
        require!(ids.len() < 100, "Maximum 100 goals per account");
        self.credit_storage(&caller, env::attached_deposit().as_yoctonear());
        require!(!self.goals.contains_key(&goal_id), E_REPLAY_PAYLOAD);
        require!(
            asset_id == env::current_account_id(),
            E_ASSET
        );

        let vault = GoalVault::new(
            caller.clone(),
            asset_id,
            rule_version,
            target_amount.0,
            env::block_timestamp(),
        );

        self.goals.insert(&goal_id, &vault);
        ids.push(goal_id.clone());
        self.owner_goals.insert(&caller, &ids);
        if self.withdrawn.get(&caller).is_none() { self.withdrawn.insert(&caller, &0); }
        self.charge_storage(&caller, before);
        Self::event("goal_created", &goal_id, "0");
        vault.to_view(goal_id)
    }

    /// Native NEAR Deposit earmarked into a goal
    #[payable]
    pub fn deposit_native(&mut self, goal_id: String, request_id: String, amount: U128) -> GoalView {
        let before = env::storage_usage();
        Self::bounded_id(&goal_id); Self::bounded_id(&request_id);
        require!(!self.deposits_paused, E_PAUSED);
        let attached_amount = amount.0;
        require!(attached_amount > 0, E_AMOUNT);
        let storage_payment = env::attached_deposit().as_yoctonear().checked_sub(attached_amount).expect("Deposit must cover principal plus storage");
        self.credit_storage(&env::predecessor_account_id(), storage_payment);

        let op_key = format!("{}:{}", env::predecessor_account_id(), request_id);
        require!(!self.operations.contains_key(&op_key), E_REPLAY_PAYLOAD);

        let mut vault = self.goals.get(&goal_id).expect(E_GOAL_STATE);
        require!(vault.owner == env::predecessor_account_id(), E_OWNER);
        require!(vault.status != GoalStatus::Closed, E_GOAL_STATE);
        require!(vault.asset_id == env::current_account_id(), E_ASSET);

        vault.confirmed_liability = vault
            .confirmed_liability
            .checked_add(attached_amount)
            .expect(E_LIMIT);

        if vault.confirmed_liability >= vault.target_amount {
            vault.status = GoalStatus::Completed;
        }

        self.total_liabilities = self
            .total_liabilities
            .checked_add(attached_amount)
            .expect(E_LIMIT);

        self.goals.insert(&goal_id, &vault);

        let op = OperationRecord {
            goal_id: goal_id.clone(),
            amount: attached_amount,
            kind: OperationKind::Deposit,
            state: OperationState::Settled,
            callback_nonce: 0,
            timestamp: env::block_timestamp(),
        };
        self.operations.insert(&op_key, &op);
        self.charge_storage(&env::predecessor_account_id(), before);
        Self::event("deposit_settled", &goal_id, &attached_amount.to_string());
        vault.to_view(goal_id)
    }

    /// Withdraws funds from goal and transfers back to owner account
    #[payable]
    pub fn withdraw(&mut self, goal_id: String, amount: U128, request_id: String) -> Promise {
        near_sdk::assert_one_yocto();
        let before = env::storage_usage();
        Self::bounded_id(&goal_id); Self::bounded_id(&request_id);
        let caller = env::predecessor_account_id();
        let withdraw_amount = amount.0;
        require!(withdraw_amount > 0, E_AMOUNT);

        let op_key = format!("{}:{}", caller, request_id);
        require!(!self.operations.contains_key(&op_key), E_REPLAY_PAYLOAD);

        let mut vault = self.goals.get(&goal_id).expect(E_GOAL_STATE);
        require!(vault.owner == caller, E_OWNER);

        let available = vault.confirmed_liability.saturating_sub(vault.reserved_amount);
        require!(available >= withdraw_amount, E_INSUFFICIENT);

        // Invariant CHAIN-I10: Reserve funds before attempting transfer
        vault.reserved_amount = vault
            .reserved_amount
            .checked_add(withdraw_amount)
            .expect(E_LIMIT);
        self.total_reserved = self
            .total_reserved
            .checked_add(withdraw_amount)
            .expect(E_LIMIT);
        self.goals.insert(&goal_id, &vault);

        let op = OperationRecord {
            goal_id: goal_id.clone(),
            amount: withdraw_amount,
            kind: OperationKind::Withdrawal,
            state: OperationState::PendingReservation,
            callback_nonce: env::block_height(),
            timestamp: env::block_timestamp(),
        };
        self.operations.insert(&op_key, &op);
        self.charge_storage(&caller, before);
        Self::event("withdrawal_requested", &goal_id, &withdraw_amount.to_string());

        // Asynchronous transfer to owner
        Promise::new(caller)
            .transfer(NearToken::from_yoctonear(withdraw_amount))
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_RESOLVE_WITHDRAWAL)
                    .settle_withdrawal(op_key, goal_id, amount),
            )
    }

    /// Internal private callback for withdrawal resolution
    #[private]
    pub fn settle_withdrawal(
        &mut self,
        op_key: String,
        goal_id: String,
        amount: U128,
        #[callback_result] result: Result<(), PromiseError>,
    ) -> bool {
        let mut vault = self.goals.get(&goal_id).expect(E_GOAL_STATE);
        let mut op = self.operations.get(&op_key).expect(E_REPLAY_PAYLOAD);

        require!(op.state == OperationState::PendingReservation && op.kind == OperationKind::Withdrawal && op.goal_id == goal_id && op.amount == amount.0, "Invalid settlement");
        match result {
            Ok(_) => {
                // Transfer succeeded: settle reservation
                vault.reserved_amount = vault.reserved_amount.checked_sub(amount.0).expect(E_LIMIT);
                vault.confirmed_liability = vault.confirmed_liability.checked_sub(amount.0).expect(E_LIMIT);
                self.total_reserved = self.total_reserved.checked_sub(amount.0).expect(E_LIMIT);
                self.total_liabilities = self.total_liabilities.checked_sub(amount.0).expect(E_LIMIT);

                let withdrawn = self.withdrawn.get(&vault.owner).unwrap_or(0).checked_add(amount.0).expect(E_LIMIT);
                self.withdrawn.insert(&vault.owner, &withdrawn);
                Self::event("withdrawal_settled", &goal_id, &amount.0.to_string());
                op.state = OperationState::Settled;
                self.goals.insert(&goal_id, &vault);
                self.operations.insert(&op_key, &op);
                true
            }
            Err(_) => {
                // Transfer failed: release reserved balance back to available
                vault.reserved_amount = vault.reserved_amount.checked_sub(amount.0).expect(E_LIMIT);
                self.total_reserved = self.total_reserved.checked_sub(amount.0).expect(E_LIMIT);

                Self::event("withdrawal_failed", &goal_id, &amount.0.to_string());
                op.state = OperationState::Released;
                self.goals.insert(&goal_id, &vault);
                self.operations.insert(&op_key, &op);
                false
            }
        }
    }

    /// Emergency pause for new deposits (exit remains preserved per CHAIN-I08)
    pub fn set_deposits_paused(&mut self, paused: bool, reason_ref: Option<String>) {
        require!(env::predecessor_account_id() == self.owner_id, E_OWNER);
        self.deposits_paused = paused;
        self.pause_reason = reason_ref;
    }

    pub fn list_goals(&self, owner: AccountId, from_index: u32, limit: u32) -> Vec<GoalView> {
        self.owner_goals.get(&owner).unwrap_or_default().iter().skip(from_index as usize).take(limit.min(100) as usize).filter_map(|id| self.get_goal(id.clone())).collect()
    }
    pub fn get_config(&self) -> (AccountId, AccountId, u32) { (self.owner_id.clone(), env::current_account_id(), 1) }
    pub fn get_total_withdrawn(&self, owner: AccountId) -> U128 { U128(self.withdrawn.get(&owner).unwrap_or(0)) }
    pub fn get_storage_credit(&self, owner: AccountId) -> U128 { U128(self.storage_credit.get(&owner).unwrap_or(0)) }
    #[payable]
    pub fn storage_deposit(&mut self) { let before=env::storage_usage(); let owner=env::predecessor_account_id(); self.credit_storage(&owner,env::attached_deposit().as_yoctonear()); self.charge_storage(&owner,before); }

    /// View goal
    pub fn get_goal(&self, goal_id: String) -> Option<GoalView> {
        self.goals.get(&goal_id).map(|g| g.to_view(goal_id))
    }

    /// View operation
    pub fn get_operation(&self, owner: AccountId, request_id: String) -> Option<OperationView> {
        let op_key = format!("{}:{}", owner, request_id);
        self.operations.get(&op_key).map(|op| OperationView {
            request_id,
            goal_id: op.goal_id,
            amount: U128(op.amount),
            kind: op.kind,
            state: op.state,
            timestamp: op.timestamp,
        })
    }

    /// View total vault liabilities and reservations
    pub fn get_vault_totals(&self) -> (U128, U128, bool) {
        (
            U128(self.total_liabilities),
            U128(self.total_reserved),
            self.deposits_paused,
        )
    }
}


impl TinyeVaultContract {
    fn bounded_id(id:&str) { require!(!id.is_empty() && id.len()<=64 && id.bytes().all(|b| b.is_ascii_alphanumeric() || b==b'-' || b==b'_'), "Invalid ID"); }
    fn credit_storage(&mut self, owner:&AccountId, amount:u128) { let credit=self.storage_credit.get(owner).unwrap_or(0).checked_add(amount).expect(E_LIMIT);self.storage_credit.insert(owner,&credit); }
    fn charge_storage(&mut self, owner:&AccountId, before:u64) { let bytes=env::storage_usage().saturating_sub(before);let cost=(bytes as u128).checked_mul(env::storage_byte_cost().as_yoctonear()).expect(E_LIMIT);let credit=self.storage_credit.get(owner).unwrap_or(0);require!(credit>=cost,"Insufficient prepaid storage; call storage_deposit");self.storage_credit.insert(owner,&(credit-cost)); }
    fn event(name:&str, goal:&str, amount:&str) { env::log_str(&format!("EVENT_JSON:{}",near_sdk::serde_json::json!({"standard":"tinye","version":"1.0.0","event":name,"data":[{"goal_id":goal,"amount":amount}]}))); }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;
    fn context(caller:usize, attached:u128) { let mut b=VMContextBuilder::new();b.current_account_id(accounts(0)).signer_account_id(accounts(caller)).predecessor_account_id(accounts(caller)).account_balance(NearToken::from_near(100)).attached_deposit(NearToken::from_yoctonear(attached)).prepaid_gas(Gas::from_tgas(300));testing_env!(b.build()); }
    fn setup()->TinyeVaultContract { context(1,0);TinyeVaultContract::initialise(accounts(1),accounts(1),vec![]) }
    fn goal(c:&mut TinyeVaultContract) { context(1,NearToken::from_near(1).as_yoctonear());c.create_goal("goal".into(),accounts(0),1,U128(NearToken::from_near(2).as_yoctonear())); }
    fn deposit(c:&mut TinyeVaultContract) { context(1,NearToken::from_millinear(1010).as_yoctonear());c.deposit_native("goal".into(),"dep1".into(),U128(NearToken::from_near(1).as_yoctonear())); }
    #[test] fn create_and_list_own_goal(){let mut c=setup();goal(&mut c);assert_eq!(c.list_goals(accounts(1),0,10).len(),1);assert_eq!(c.list_goals(accounts(2),0,10).len(),0);assert_eq!(c.get_goal("goal".into()).unwrap().owner,accounts(1));}
    #[test] fn deposit_credits_principal_not_storage(){let mut c=setup();goal(&mut c);deposit(&mut c);assert_eq!(c.total_liabilities,NearToken::from_near(1).as_yoctonear());assert_eq!(c.get_goal("goal".into()).unwrap().confirmed_liability.0,c.total_liabilities);}
    #[test] fn reserve_then_settle(){let mut c=setup();goal(&mut c);deposit(&mut c);context(1,1);let _ = c.withdraw("goal".into(),U128(100),"w1".into());assert_eq!(c.total_reserved,100);assert_eq!(c.get_goal("goal".into()).unwrap().available_amount.0,c.total_liabilities-100);context(0,0);assert!(c.settle_withdrawal(format!("{}:w1",accounts(1)),"goal".into(),U128(100),Ok(())));assert_eq!(c.total_reserved,0);assert_eq!(c.get_total_withdrawn(accounts(1)).0,100);assert_eq!(c.total_liabilities,NearToken::from_near(1).as_yoctonear()-100);}
    #[test] fn failed_transfer_restores_available(){let mut c=setup();goal(&mut c);deposit(&mut c);let before=c.total_liabilities;context(1,1);let _ = c.withdraw("goal".into(),U128(100),"w1".into());context(0,0);assert!(!c.settle_withdrawal(format!("{}:w1",accounts(1)),"goal".into(),U128(100),Err(PromiseError::Failed)));assert_eq!(c.total_reserved,0);assert_eq!(c.total_liabilities,before);assert_eq!(c.get_total_withdrawn(accounts(1)).0,0);}
    #[test] #[should_panic] fn nonowner_cannot_withdraw(){let mut c=setup();goal(&mut c);deposit(&mut c);context(2,1);let _ = c.withdraw("goal".into(),U128(1),"x".into());}
    #[test] #[should_panic] fn cannot_overdraw(){let mut c=setup();goal(&mut c);deposit(&mut c);context(1,1);let _ = c.withdraw("goal".into(),U128(NearToken::from_near(2).as_yoctonear()),"x".into());}
    #[test] #[should_panic] fn rejects_duplicate_deposit(){let mut c=setup();goal(&mut c);deposit(&mut c);deposit(&mut c);}
    #[test] #[should_panic] fn rejects_zero_target(){let mut c=setup();context(1,NearToken::from_near(1).as_yoctonear());c.create_goal("x".into(),accounts(0),1,U128(0));}
    #[test] #[should_panic] fn rejects_unsupported_asset(){let mut c=setup();context(1,NearToken::from_near(1).as_yoctonear());c.create_goal("x".into(),accounts(2),1,U128(1));}
    #[test] #[should_panic] fn requires_storage_payment(){let mut c=setup();context(1,0);c.create_goal("x".into(),accounts(0),1,U128(1));}
    #[test] #[should_panic] fn rejects_second_settlement(){let mut c=setup();goal(&mut c);deposit(&mut c);context(1,1);let _ = c.withdraw("goal".into(),U128(100),"w1".into());context(0,0);c.settle_withdrawal(format!("{}:w1",accounts(1)),"goal".into(),U128(100),Ok(()));c.settle_withdrawal(format!("{}:w1",accounts(1)),"goal".into(),U128(100),Ok(()));}
    #[test] fn paused_deposits_preserve_withdrawal(){let mut c=setup();goal(&mut c);deposit(&mut c);context(1,0);c.set_deposits_paused(true,None);context(1,1);let _ = c.withdraw("goal".into(),U128(100),"w1".into());assert_eq!(c.total_reserved,100);}
    #[test] fn concurrent_reservations_settle_once_out_of_order(){let mut c=setup();goal(&mut c);deposit(&mut c);let before=c.total_liabilities;context(1,1);let _ = c.withdraw("goal".into(),U128(100),"w1".into());context(1,1);let _ = c.withdraw("goal".into(),U128(200),"w2".into());assert_eq!(c.total_reserved,300);context(0,0);c.settle_withdrawal(format!("{}:w2",accounts(1)),"goal".into(),U128(200),Ok(()));c.settle_withdrawal(format!("{}:w1",accounts(1)),"goal".into(),U128(100),Ok(()));assert_eq!(c.total_reserved,0);assert_eq!(c.total_liabilities,before-300);assert_eq!(c.get_total_withdrawn(accounts(1)).0,300);}
    #[test] #[should_panic] fn pause_rejects_new_deposits(){let mut c=setup();goal(&mut c);context(1,0);c.set_deposits_paused(true,None);deposit(&mut c);}
    #[test] #[should_panic] fn withdrawal_requires_approval_deposit(){let mut c=setup();goal(&mut c);deposit(&mut c);context(1,0);let _ = c.withdraw("goal".into(),U128(1),"w1".into());}

}
