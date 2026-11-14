# Tinye: 100% NEAR Blockchain-Powered Savings Architecture Specification

**Status:** Approved Architectural Correction Spec | **Version:** 2.0 | **Network:** NEAR Testnet  
**Target Contract:** `tinye-vault.testnet` | **Reference Client:** `near-api-js` v7

---

## 1. Executive Summary & Purpose

This specification supersedes all simulated, demo-fiat, and Web2 mocked financial components in the repository. Tinye is engineered as a **100% NEAR blockchain-powered savings application**.

- **Authoritative Source of Truth:** NEAR Testnet smart contract state (`tinye-vault.testnet`).
- **Cryptographic Sovereignty:** Real user wallets sign all financial state changes (no local fake IDs, no simulated balance increments, no `Math.random()` transaction hashes).
- **Enforceable On-Chain Accounting:** All goal creation, earmarking, deposits, reservations, and withdrawals execute via on-chain smart contract transactions with verifiable NEAR Explorer receipts.
- **Visual Stability:** Complete preservation of the existing Lens Protocol visual identity, typography, design tokens, responsive cards, and animation system.

---

## 2. On-Chain vs. Off-Chain Separation of Concerns

| Domain | Layer | Source of Truth | Verification Method |
|---|---|---|---|
| User Wallet Address | On-Chain | Connected NEAR Wallet | Signed session / NEP-413 / Account state on NEAR RPC |
| Native NEAR Balance | On-Chain | NEAR Protocol State | `account.getBalance()` via `https://rpc.testnet.near.org` |
| Savings Goals Definition | On-Chain | `tinye-vault.testnet` | `get_goal(goal_id)` contract view method |
| Earmarked Goal Balance | On-Chain | `tinye-vault.testnet` | `vault.confirmed_liability` on contract |
| Goal Deposit Execution | On-Chain | `tinye-vault.testnet` | `deposit_native(goal_id, request_id)` payable method |
| Goal Withdrawal Execution | On-Chain | `tinye-vault.testnet` | `withdraw(goal_id, amount, request_id)` method |
| Financial Transaction Ledger | On-Chain | NEAR Blockchain Blocks | Transaction Hashes verified on NEAR Explorer / NearBlocks |
| Loyalty Discipline Points | Off-Chain (Clearly Labeled) | Application State | Client/Index-backed noncash points (ADR-007) |
| UI Preferences & Visual State | Client Cache | LocalStorage / Context | Ephemeral layout preferences only |

---

## 3. Required Application Flows & Blockchain State Machine

### A. 5-Stage Onboarding Flow
1. **Splash Screen:** Pure branding, minimalist welcome, responsive Lens layout.
2. **Save With Purpose:** Explanation of purpose-locked goal earmarking.
3. **Powered by NEAR:** Non-custodial security, sub-second finality, zero punitive locks.
4. **Earn Rewards:** Clear disclosure of noncash discipline points and milestones.
5. **Get Started:** Transition to Wallet Onboarding & Authentication.

### B. Wallet Onboarding & Authentication
1. **Option Selection:** Connect existing NEAR wallet (MyNearWallet, Meteor, Here, Ledger) OR Create a NEAR Testnet Account.
2. **Wallet Connection:** Official NEAR wallet integration via `@near-wallet-selector` / `near-api-js`.
3. **Approval & Session:** Authorize connection; retrieve authenticated `AccountId` (e.g. `user.testnet`).
4. **Network Verification:** Confirm network is `testnet`; fetch live on-chain NEAR balance.
5. **Dashboard Transition:** Onboarding state completed; load authoritative goals from `tinye-vault.testnet`.

### C. Dashboard & Goal Lifecycle
1. **Live On-Chain Balance Query:** Total savings derived strictly from `get_vault_totals()` and user's goal state on contract.
2. **Create Goal (`create_goal`):**
   - User inputs name, category, target amount, asset (`NEAR`).
   - Transaction constructed: calls `tinye-vault.testnet::create_goal`.
   - Signed by user's wallet.
   - On confirmation, goal is registered in on-chain storage.
3. **Deposit Flow (`deposit_native`):**
   - User enters deposit amount in NEAR.
   - Transaction constructed: payable call `tinye-vault.testnet::deposit_native` with attached deposit.
   - Wallet signs and broadcasts to NEAR RPC.
   - Real transaction hash returned, verified on `https://testnet.nearblocks.io/txns/{hash}`.
   - On-chain contract updates goal liabilities.
4. **Withdrawal Flow (`withdraw`):**
   - User selects goal and amount.
   - Pre-condition verified: `amount <= goal.confirmed_liability`.
   - Contract executes withdrawal: reserves liability, dispatches transfer promise to user, settles via internal callback.
   - Transaction hash verified on NEAR Explorer.

---

## 4. Smart Contract Interface (`tinye-vault.testnet`)

```rust
// Contract Methods on NEAR Testnet
pub fn initialise(owner_id: AccountId, treasury_id: AccountId, allowed_assets: Vec<AccountId>) -> Self;

pub fn create_goal(goal_id: String, asset_id: AccountId, rule_version: u32, target_amount: U128) -> GoalView;

pub fn deposit_native(goal_id: String, request_id: String) -> GoalView; // #[payable]

pub fn withdraw(goal_id: String, amount: U128, request_id: String) -> Promise;

pub fn settle_withdrawal(request_id: String, callback_nonce: u64) -> PromiseOrValue<bool>;

pub fn get_goal(goal_id: String) -> Option<GoalView>;

pub fn get_vault_totals() -> (U128, U128, bool);
```

---

## 5. Non-Negotiable Engineering Standards

1. **Zero Fake Transactions:** No pseudo-random hashes (`Math.random()`), no synthetic timeouts pretending to be RPC broadcasts.
2. **Zero Fabricated Balances:** Initial goals and user balances are NOT hardcoded `14.50 NEAR`. Initial state reads `0.00 NEAR` until loaded from the connected account's live contract state.
3. **No Unsafe Private Key Collection:** Users NEVER enter private keys or raw seed phrases into web forms. All signing delegates to official NEAR wallet providers.
4. **Clear Off-Chain Disclosures:** Discipline points, perk catalogues, and demo features are strictly labeled as off-chain loyalty mechanics and educational prototypes.

