# Tinye — Purpose-Locked NEAR Savings Vaults

> **Built for the NEAR HACKATHON** · Track: Consumer Apps & Financial Infrastructure  
> 100% Non-Custodial · On-Chain State as Source of Truth · Minimalist Design System

Tinye is a non-custodial, purpose-locked savings application built directly on NEAR Protocol (Testnet). Users create dedicated smart contract vaults for specific personal goals, deposit native NEAR tokens into verifiable on-chain ledgers, and withdraw their funds according to strict contract rules without third-party custody, punitive lockups, or fabricated balances.

---

## The Problem
Most crypto wallets treat all liquid assets as a single fungible pool, encouraging impulsive spending, high churn, and speculative trading. In traditional Web2 banking, goal-oriented savings often introduces opaque custody, lock-in penalties, and hidden fees. 

**The Tinye Solution:** On-chain cryptographic earmarking. Tokens are deposited directly into a verified smart contract vault tied to a designated target (e.g. *Emergency Fund*, *Tech Workstation*, *Rent Reserve*). Balances are derived from authoritative on-chain contract state, and withdrawals settle directly back to the user's wallet with zero early-withdrawal fees.

---

## Current Implementation (Live on NEAR Testnet)

The current implementation is fully deployed and verified on NEAR Testnet:

### 1. Smart Contract Layer (`tinye_vault`)
- **Language / SDK:** Rust with `near-sdk` v5.30.2 (`contracts/tinye_vault/src/lib.rs`).
- **Contract Account:** [`savings.tinye.testnet`](https://testnet.nearblocks.io/address/savings.tinye.testnet)
- **Deployment Status:** Initialized with contract state via `initialise` with owner `tinye.testnet`.
- **Authoritative Accounting:** Exact 24-decimal integer math (yoctoNEAR). No floating-point representations or rounding drift in financial logic.
- **Prepaid Storage Credits:** Accounts deposit storage fees via `credit_storage` / `charge_storage` ensuring contract self-sustainability without unexpected out-of-storage panics.
- **Non-Punitive Withdrawals:** Withdrawals are unreserved and transferred asynchronously with a 2-step settlement callback pattern (`withdraw` -> `settle_withdrawal`).

### 2. Wallet & Cryptographic Authentication
- **Wallet Connection:** Native integration with NEAR Connect (`@hot-labs/near-connect`), supporting Meteor, HERE, NEAR Mobile, Nightly, and HOT Wallet on NEAR Testnet.
- **NEP-413 Ownership Verification:** Cryptographic sign-in using off-chain message signatures (`signMessage`) verifying account ownership against random anti-replay single-use server challenges.
- **HttpOnly Secure Sessions:** Zero plain-text key storage in the browser; session verification operates with strict same-origin controls.

### 3. Design System & Frontend Architecture
- **Canvas & Surface:** Light, calm `#FAFAFA` background with ambient atmospheric glows (`#EBF2E6`, `#F2F4EB`, `#E5ECE0`).
- **Cards & Typography:** Clean `#FFFFFF` cards with subtle borders (`rgba(0,0,0,0.06)`), Inter typography (400 to 800 weight), and signature meadow (`#78A738`) and sage (`#E3EDDA`) accents.
- **Onboarding Flow:** 3-stage quiet onboarding sequence with clear disclaimers that testnet assets carry zero monetary value.

---

## Future Implementation & Technical Roadmap

Tinye is designed with an extensible modular architecture. The following capabilities are planned for upcoming phases:

### 1. Multi-Chain Deposits via NEAR Intents (1Click API)
- **Cross-Chain Inflow:** Allow users to fund their Tinye savings vaults using assets from external chains (e.g., BTC, ETH, Solana SOL, Arbitrum/Base USDC) without leaving the application.
- **Execution:** Integrate NEAR Intents 1Click swap and bridge routing (`@near-intents`) to automatically convert incoming foreign assets into native NEAR and route them into the specified vault in a single atomic intent.

### 2. Recurrent / Dollar-Cost-Averaging (DCA) Streams
- **Automated Savings:** Introduce scheduled recurring deposits (daily, weekly, monthly) using NEAR meta-transactions and relayer allowances.
- **Smart Allowance Vaults:** Users grant bounded deposit allowances to an automated execution contract that transfers a fixed micro-amount to their savings goal at predetermined intervals.

### 3. Verified On-Chain Yield Protocols (Opt-In Only)
- **Real Yield, Never Fabricated:** Integrate established on-chain NEAR yield protocols (such as Meta Pool's `stNEAR` liquid staking or Burrow lending pools) for users who wish to earn yield on their earmarked funds.
- **Transparent Risk Engine:** Strict separation between principal vaults and yield-bearing positions with transparent on-chain APY metrics and risk disclosures.

### 4. Zero-Friction Web2 Onboarding (Passkey / WebAuthn)
- **FastAuth / Passkeys:** Enable users without an existing crypto wallet to onboard instantly using biometrics (TouchID/FaceID) or social logins via NEAR FastAuth MPC (Multi-Party Computation).
- **Relayed Gas Sponsorship:** Sponsor initial storage and gas deposits for newly created passkey accounts through a dedicated gas relayer.

### 5. Collaborative Group & Family Vaults
- **Shared Goals with Individual Custody:** Multiple contributors save towards a shared community or family goal (e.g., hackathon prize pool, office rent).
- **Accounting Invariants:** The contract enforces individual liability tracking so any member can withdraw their proportional contribution independently at any time.

---

## Authoritative On-Chain Evidence (NEAR Testnet)

| Milestone | Target Account / ID | Transaction Hash | Gas / Fee | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Deployer Account Creation** | `tinye.testnet` | [`HZVVYgC6...`](https://testnet.nearblocks.io/txns/HZVVYgC6y4oY5NDeq4A24ycCrrgFdKctYTLibwVSS1PG) | 10 NEAR Faucet | Verified |
| **Contract Account Creation** | `savings.tinye.testnet` | [`5ff9ysiS...`](https://testnet.nearblocks.io/txns/5ff9ysiSsrX6M86NCigFfuqLMtS15fG8MHQF1dpH8C79) | 5.0 NEAR | Verified |
| **Contract WASM Deployment** | `savings.tinye.testnet` | [`GZNbbokD...`](https://testnet.nearblocks.io/txns/GZNbbokDStLEQF1pj8P6V5ZhJWQ7ok4PFPwiaXU82n7r) | 24.2 Tgas | Verified |
| **Contract State Initialization** | `savings.tinye.testnet` | [`7CDHZbMe...`](https://testnet.nearblocks.io/txns/7CDHZbMeSDUrCxN2X32CCuKiDYVSwX4g2PXFbkyk5heP) | 2.3 Tgas | Verified |
| **Verified Goal Creation** | `emergency-fund-1` | [`Dp4fTALD...`](https://testnet.nearblocks.io/txns/Dp4fTALDA2Q1eaEodNGA7crRp7sxccaToCs8u7CTZYyM) | 0.02 NEAR Storage | Verified |
| **Verified Goal Deposit** | `emergency-fund-1` | [`BA4F2Vor...`](https://testnet.nearblocks.io/txns/BA4F2VorqZvLcEVDwL6TrtrbGE22JnWv7TjShQAjyUVv) | 1.0 NEAR | Verified |
| **Verified Goal Withdrawal** | `emergency-fund-1` | [`3uAjFHqr...`](https://testnet.nearblocks.io/txns/3uAjFHqrtzQkBE9L3Lk5EHmbJh9c733bkW1Q3StA7m9h) | 1 yoctoNEAR | Verified |

- **WASM Bytecode SHA256:** `7CF6EFC22918C7C43C2B34D791A0344FED2CFA8F0BAF0229234402FBBC740B5A`
- **WASM Bytecode Size:** 327,281 bytes

---

## Step-by-Step Verification ("Do X, See Y")

Follow these numbered deterministic steps to test the application:

### 1. Launch the Application
- **Do:** Run `npm run start -- -p 3005 -H 127.0.0.1` and open `http://127.0.0.1:3005` in your browser.
- **See:** The application loads cleanly with `#FAFAFA` neutral background, Inter typography, and zero simulated/fake balances.

### 2. Connect a NEAR Testnet Wallet
- **Do:** Navigate through the onboarding to the Wallet Setup screen. Select "NEAR Testnet Connect" and approve the connection in your wallet (e.g. Meteor, HERE, or Nightly).
- **See:** The app receives your public key, requests a cryptographic anti-replay challenge from `/api/auth/challenge`, submits a NEP-413 `signMessage` proof, and opens the Dashboard displaying your connected Account ID and live on-chain balance.

### 3. Inspect Authoritative On-Chain Vault State
- **Do:** View the top financial summary cards on the Dashboard or Wallet view.
- **See:** The total savings figure queries `savings.tinye.testnet` via `list_goals` and `get_total_withdrawn` directly on RPC (`https://test.rpc.fastnear.com`). Your liquid wallet balance and earmarked vault balances are held strictly separate.

### 4. Create an On-Chain Savings Goal
- **Do:** Click **New Goal**, specify an ID/name (e.g. `Travel Fund`), target (e.g. `5 NEAR`), and submit.
- **See:** The app prepares an on-chain `create_goal` transaction with a 0.02 NEAR attached storage deposit. Once approved and finalized, the goal card appears with real-time tracking and an immutable NEAR Explorer link.

### 5. Deposit Native NEAR to Vault
- **Do:** Open a goal card, enter `1.0 NEAR`, and approve the deposit.
- **See:** The transaction invokes `deposit_native` on `savings.tinye.testnet`. Once settled, the goal balance increases by 1 NEAR, contract total liabilities update, and a NearBlocks explorer link is shown.

### 6. Withdraw Funds from Vault
- **Do:** In an active goal with balance, enter a withdrawal amount (e.g. `0.2 NEAR`) and confirm.
- **See:** The transaction invokes `withdraw` with 1 yoctoNEAR attached. The contract verifies available balance, unreserves liability, and executes an on-chain transfer back to your account. Funds reflect in your wallet balance immediately.

---

## Automated Test Suites

Run the automated test suites locally:

```bash
# 1. 24-decimal yoctoNEAR integer precision & dust display tests
npm run test

# 2. NEP-413 challenge lifecycle, origin checks & replay defense tests
npm run test:auth
```

- **Amounts & Precision:** 3 passing unit tests verifying exact integer string parsing and formatting without floating-point conversion.
- **Authentication HTTP:** 4 passing security tests verifying unauthenticated session handling, cross-origin rejection, invalid account filtering, and forged/replayed proof rejection.

---

## Environment Configuration

Create `.env.local` (or copy from `.env.example`):

```env
# Public Frontend Configuration (Safe for browser)
NEXT_PUBLIC_NEAR_NETWORK_ID=testnet
NEXT_PUBLIC_NEAR_RPC_URL=https://test.rpc.fastnear.com
NEXT_PUBLIC_NEAR_EXPLORER_URL=https://testnet.nearblocks.io
NEXT_PUBLIC_TINYE_SAVINGS_CONTRACT=savings.tinye.testnet

# Deployment & Server Configuration (Never committed)
# NEAR_DEPLOYER_ACCOUNT_ID=tinye.testnet
# NEAR_DEPLOYER_PRIVATE_KEY=...
```

---

## Security & Architectural Guarantees
- **No Mock Funds:** Zero local storage balance fabrication; on-chain contracts are the sole source of truth for user funds.
- **Strict Network Boundary:** All operations are strictly pinned to NEAR Testnet; mainnet transactions are forbidden without human authorization.
- **Non-Custodial Architecture:** The smart contract only permits transfers back to the authentic owner who registered the goal.
