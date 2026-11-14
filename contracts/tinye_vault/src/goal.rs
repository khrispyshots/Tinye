use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::AccountId;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum GoalStatus {
    Active,
    Completed,
    Closed,
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub struct GoalVault {
    pub owner: AccountId,
    pub asset_id: AccountId,
    pub rule_version: u32,
    pub target_amount: u128,
    pub confirmed_liability: u128,
    pub reserved_amount: u128,
    pub status: GoalStatus,
    pub created_at: u64,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct GoalView {
    pub goal_id: String,
    pub owner: AccountId,
    pub asset_id: AccountId,
    pub rule_version: u32,
    pub target_amount: U128,
    pub confirmed_liability: U128,
    pub reserved_amount: U128,
    pub available_amount: U128,
    pub status: GoalStatus,
    pub created_at: u64,
}

impl GoalVault {
    pub fn new(
        owner: AccountId,
        asset_id: AccountId,
        rule_version: u32,
        target_amount: u128,
        block_timestamp: u64,
    ) -> Self {
        Self {
            owner,
            asset_id,
            rule_version,
            target_amount,
            confirmed_liability: 0,
            reserved_amount: 0,
            status: GoalStatus::Active,
            created_at: block_timestamp,
        }
    }

    pub fn to_view(&self, goal_id: String) -> GoalView {
        let available = self.confirmed_liability.saturating_sub(self.reserved_amount);
        GoalView {
            goal_id,
            owner: self.owner.clone(),
            asset_id: self.asset_id.clone(),
            rule_version: self.rule_version,
            target_amount: U128(self.target_amount),
            confirmed_liability: U128(self.confirmed_liability),
            reserved_amount: U128(self.reserved_amount),
            available_amount: U128(available),
            status: self.status.clone(),
            created_at: self.created_at,
        }
    }
}

