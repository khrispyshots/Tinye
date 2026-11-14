//! Individually owned accountability groups. No group can move a member's funds.
//! Separate versioned keys preserve the deployed top-level Borsh state layout.
use crate::*;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Serialize;

#[derive(BorshDeserialize, BorshSerialize, Clone)]
struct GroupRecord {
    creator: AccountId,
    target: u128,
    closed: bool,
    members: Vec<(AccountId, String)>,
    invited: Vec<AccountId>,
}
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct GroupMemberView {
    pub account_id: AccountId,
    pub goal_id: String,
    pub confirmed_balance: U128,
    pub reserved_balance: U128,
}
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct GroupView {
    pub group_id: String,
    pub creator: AccountId,
    pub target_amount: U128,
    pub confirmed_balance: U128,
    pub available_balance: U128,
    pub closed: bool,
    pub members: Vec<GroupMemberView>,
    pub invited_accounts: Vec<AccountId>,
}
fn key(kind: &str, id: &str) -> Vec<u8> { format!("tinye:groups:v1:{}:{}", kind, id).into_bytes() }
fn read<T: BorshDeserialize>(kind: &str, id: &str) -> Option<T> {
    env::storage_read(&key(kind,id)).map(|bytes| T::try_from_slice(&bytes).expect("Invalid group data"))
}
fn write<T: BorshSerialize>(kind: &str, id: &str, value: &T) {
    env::storage_write(&key(kind,id), &borsh::to_vec(value).expect("Cannot encode group"));
}
#[near]
impl TinyeVaultContract {
    /// Link an existing personal goal. All member identities/balances are public on-chain.
    #[payable]
    pub fn create_group(&mut self, group_id: String, goal_id: String, target_amount: U128) -> GroupView {
        Self::bounded_id(&group_id); Self::bounded_id(&goal_id);
        require!(target_amount.0 > 0, E_AMOUNT);
        require!(read::<GroupRecord>("record",&group_id).is_none(),"Group already exists");
        let before=env::storage_usage(); let caller=env::predecessor_account_id();
        self.credit_storage(&caller,env::attached_deposit().as_yoctonear());
        let mut group=GroupRecord { creator:caller.clone(),target:target_amount.0,closed:false,members:vec![],invited:vec![] };
        self.link_group_member(&group_id,&mut group,&caller,&goal_id);
        write("record",&group_id,&group); self.charge_storage(&caller,before);
        Self::event("group_created",&group_id,"0"); self.get_group(group_id).unwrap()
    }
    /// The creator approves a specific account. Group IDs are public, never secret capabilities.
    #[payable]
    pub fn invite_group_member(&mut self, group_id: String, account_id: AccountId) {
        Self::bounded_id(&group_id);
        let mut group=read::<GroupRecord>("record",&group_id).expect("Group not found");
        let caller=env::predecessor_account_id();require!(group.creator==caller,E_OWNER);
        require!(!group.closed,"Group is closed");
        require!(group.members.len()+group.invited.len()<20,"Maximum 20 group members and invitations");
        require!(!group.members.iter().any(|(member,_)|member==&account_id)&&!group.invited.contains(&account_id),"Already invited or joined");
        let before=env::storage_usage();self.credit_storage(&caller,env::attached_deposit().as_yoctonear());
        group.invited.push(account_id);write("record",&group_id,&group);self.charge_storage(&caller,before);
        Self::event("group_invited",&group_id,"0");
    }
    #[payable]
    pub fn revoke_group_invitation(&mut self, group_id: String, account_id: AccountId) {
        near_sdk::assert_one_yocto();Self::bounded_id(&group_id);
        let mut group=read::<GroupRecord>("record",&group_id).expect("Group not found");
        require!(group.creator==env::predecessor_account_id(),E_OWNER);
        require!(group.invited.contains(&account_id),"Account not invited");
        group.invited.retain(|account|account!=&account_id);write("record",&group_id,&group);
        Self::event("group_invitation_revoked",&group_id,"0");
    }
    /// Only the invited account can accept, linking its own personal goal.
    #[payable]
    pub fn join_group(&mut self, group_id: String, goal_id: String) -> GroupView {
        Self::bounded_id(&group_id); Self::bounded_id(&goal_id);
        let mut group=read::<GroupRecord>("record",&group_id).expect("Group not found");
        require!(!group.closed,"Group is closed");
        let before=env::storage_usage();let caller=env::predecessor_account_id();
        require!(group.invited.contains(&caller),"Account not invited");
        self.credit_storage(&caller,env::attached_deposit().as_yoctonear());
        self.link_group_member(&group_id,&mut group,&caller,&goal_id);
        group.invited.retain(|account|account!=&caller);
        write("record",&group_id,&group);self.charge_storage(&caller,before);
        Self::event("group_joined",&group_id,"0");self.get_group(group_id).unwrap()
    }
    #[payable]
    pub fn leave_group(&mut self, group_id: String) {
        near_sdk::assert_one_yocto();Self::bounded_id(&group_id);
        let caller=env::predecessor_account_id();
        let mut group=read::<GroupRecord>("record",&group_id).expect("Group not found");
        require!(group.creator!=caller || group.closed,"Close invitations before leaving your group");
        let index=group.members.iter().position(|(member,_)|member==&caller).expect("Not a member");
        let (_,goal_id)=group.members.remove(index);env::storage_remove(&key("goal",&goal_id));
        let mut ids=read::<Vec<String>>("member",caller.as_str()).unwrap_or_default();ids.retain(|id|id!=&group_id);
        write("member",caller.as_str(),&ids);write("record",&group_id,&group);
        // Storage credit is not cash and no principal moves on social membership changes.
        Self::event("group_left",&group_id,"0");
    }
    /// Closure prevents new members. Personal-goal funds remain owner-controlled.
    #[payable]
    pub fn close_group(&mut self, group_id: String) {
        near_sdk::assert_one_yocto();Self::bounded_id(&group_id);
        let mut group=read::<GroupRecord>("record",&group_id).expect("Group not found");
        require!(group.creator==env::predecessor_account_id(),E_OWNER);
        group.closed=true;write("record",&group_id,&group);Self::event("group_closed",&group_id,"0");
    }
    pub fn get_group(&self, group_id: String) -> Option<GroupView> {
        let group=read::<GroupRecord>("record",&group_id)?;
        let mut confirmed=0u128;let mut available=0u128;
        let members=group.members.iter().map(|(member,id)|{
            let goal=self.goals.get(id).expect(E_GOAL_STATE);
            require!(&goal.owner==member,E_OWNER);
            confirmed=confirmed.checked_add(goal.confirmed_liability).expect(E_LIMIT);
            available=available.checked_add(goal.confirmed_liability.saturating_sub(goal.reserved_amount)).expect(E_LIMIT);
            GroupMemberView {account_id:member.clone(),goal_id:id.clone(),confirmed_balance:U128(goal.confirmed_liability),reserved_balance:U128(goal.reserved_amount)}
        }).collect();
        Some(GroupView{group_id,creator:group.creator,target_amount:U128(group.target),confirmed_balance:U128(confirmed),available_balance:U128(available),closed:group.closed,members,invited_accounts:group.invited})
    }
    pub fn list_groups(&self, owner: AccountId) -> Vec<GroupView> {
        read::<Vec<String>>("member",owner.as_str()).unwrap_or_default().iter().filter_map(|id|self.get_group(id.clone())).collect()
    }
}
impl TinyeVaultContract {
    fn link_group_member(&self,id:&str,group:&mut GroupRecord,caller:&AccountId,goal_id:&str) {
        require!(group.members.len()<20,"Maximum 20 group members");
        require!(!group.members.iter().any(|(member,_)|member==caller),"Already a member");
        let goal=self.goals.get(&goal_id.to_string()).expect(E_GOAL_STATE);
        require!(&goal.owner==caller,E_OWNER);require!(goal.status!=GoalStatus::Closed,E_GOAL_STATE);
        require!(read::<String>("goal",goal_id).is_none(),"Goal already linked to a group");
        let mut ids=read::<Vec<String>>("member",caller.as_str()).unwrap_or_default();
        require!(ids.len()<20,"Maximum 20 memberships per account");ids.push(id.to_string());
        write("member",caller.as_str(),&ids);write("goal",goal_id,&id.to_string());group.members.push((caller.clone(),goal_id.to_string()));
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{testing_env,test_utils::{accounts,VMContextBuilder}};
    fn context(who:usize,deposit:u128) {let mut b=VMContextBuilder::new();b.current_account_id(accounts(0)).signer_account_id(accounts(who)).predecessor_account_id(accounts(who)).attached_deposit(NearToken::from_yoctonear(deposit)).account_balance(NearToken::from_near(100));testing_env!(b.build());}
    fn setup()->TinyeVaultContract {context(1,0);let mut c=TinyeVaultContract::initialise(accounts(1),accounts(1),vec![]);for who in [1,2]{context(who,NearToken::from_near(1).as_yoctonear());c.create_goal(format!("goal{who}"),accounts(0),1,U128(1000));}c}
    fn create(c:&mut TinyeVaultContract){context(1,NearToken::from_near(1).as_yoctonear());c.create_group("team".into(),"goal1".into(),U128(2000));}
    #[test] fn groups_project_individual_funds_without_changing_liabilities(){let mut c=setup();create(&mut c);context(1,NearToken::from_near(1).as_yoctonear());c.invite_group_member("team".into(),accounts(2));context(2,NearToken::from_near(1).as_yoctonear());c.join_group("team".into(),"goal2".into());c.deposit_native("goal2".into(),"d1".into(),U128(100));let g=c.get_group("team".into()).unwrap();assert_eq!(g.members.len(),2);assert_eq!(g.confirmed_balance.0,100);assert_eq!(c.total_liabilities,100);context(2,1);c.leave_group("team".into());assert_eq!(c.total_liabilities,100);assert_eq!(c.get_goal("goal2".into()).unwrap().confirmed_liability.0,100);}
    #[test] #[should_panic(expected="ERR_ONLY_GOAL_OWNER")] fn cannot_link_another_members_goal(){let mut c=setup();context(2,NearToken::from_near(1).as_yoctonear());c.create_group("team".into(),"goal1".into(),U128(100));}
    #[test] #[should_panic(expected="Already invited or joined")] fn duplicate_member_rejected(){let mut c=setup();create(&mut c);context(1,NearToken::from_near(1).as_yoctonear());c.invite_group_member("team".into(),accounts(1));}
    #[test] #[should_panic(expected="Account not invited")] fn public_group_id_does_not_authorize_join(){let mut c=setup();create(&mut c);context(2,NearToken::from_near(1).as_yoctonear());c.join_group("team".into(),"goal2".into());}
    #[test] #[should_panic(expected="ERR_ONLY_GOAL_OWNER")] fn only_creator_can_invite(){let mut c=setup();create(&mut c);context(2,NearToken::from_near(1).as_yoctonear());c.invite_group_member("team".into(),accounts(3));}
    #[test] fn creator_can_revoke_pending_invitation_without_moving_funds(){let mut c=setup();create(&mut c);context(1,NearToken::from_near(1).as_yoctonear());c.invite_group_member("team".into(),accounts(2));assert_eq!(c.get_group("team".into()).unwrap().invited_accounts.len(),1);context(1,1);c.revoke_group_invitation("team".into(),accounts(2));assert!(c.get_group("team".into()).unwrap().invited_accounts.is_empty());assert_eq!(c.total_liabilities,0);}
    #[test] #[should_panic(expected="Close invitations before leaving your group")] fn creator_cannot_leave_open_group(){let mut c=setup();create(&mut c);context(1,1);c.leave_group("team".into());}
    #[test] fn creator_can_leave_closed_group_without_moving_funds(){let mut c=setup();create(&mut c);context(1,NearToken::from_near(1).as_yoctonear());c.deposit_native("goal1".into(),"own-deposit".into(),U128(100));context(1,1);c.close_group("team".into());context(1,1);c.leave_group("team".into());assert!(c.list_groups(accounts(1)).is_empty());assert!(c.get_group("team".into()).unwrap().members.is_empty());assert_eq!(c.total_liabilities,100);assert_eq!(c.get_goal("goal1".into()).unwrap().confirmed_liability.0,100);}
    #[test] #[should_panic(expected="Group is closed")] fn closed_group_rejects_join(){let mut c=setup();create(&mut c);context(1,1);c.close_group("team".into());context(2,NearToken::from_near(1).as_yoctonear());c.join_group("team".into(),"goal2".into());}
    #[test] fn top_level_state_roundtrip_unchanged(){let mut c=setup();let before=borsh::to_vec(&c).unwrap();create(&mut c);assert_eq!(before,borsh::to_vec(&c).unwrap());let restored=TinyeVaultContract::try_from_slice(&borsh::to_vec(&c).unwrap()).unwrap();assert_eq!(restored.get_group("team".into()).unwrap().members.len(),1);}
}
