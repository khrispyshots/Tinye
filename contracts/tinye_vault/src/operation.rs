use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum OperationKind {
    Deposit,
    Withdrawal,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum OperationState {
    PendingReservation,
    Settled,
    Released,
    Failed,
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub struct OperationRecord {
    pub goal_id: String,
    pub amount: u128,
    pub kind: OperationKind,
    pub state: OperationState,
    pub callback_nonce: u64,
    pub timestamp: u64,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct OperationView {
    pub request_id: String,
    pub goal_id: String,
    pub amount: U128,
    pub kind: OperationKind,
    pub state: OperationState,
    pub timestamp: u64,
}

