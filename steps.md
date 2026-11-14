# Tinye execution tracker

Last updated: 2026-11-14 (Africa/Lagos).

This tracks actual execution. Written code, passing tests and verified deployment are separate milestones. A checkbox is completed only when its stated result has been observed.

## 1. Completed

- [x] Inspect the existing repository, scripts, screens, dependencies and Rust contract. Framework: Next.js 14, React 18, TypeScript, Tailwind; package manager: npm with package-lock.json.
- [x] Read the master specification and owner instructions; audit simulated authentication, financial calls, balances, bank funding and admin claims.
- [x] Create the six requested wiring/architecture documents and validate their relative links.
- [x] Record owner approval for testnet wallet/profile implementation and savings-contract testnet deployment. Mainnet is not authorised.
- [x] Add Next.js-compatible `.env.example` and `.gitignore`; verify that real environment/credential files are excluded and examples remain allowed.
- [x] Start the server and independently verify HTTP 200. Clean port: http://127.0.0.1:3005/.
- [x] Install official near-cli-rs 0.31.1.
- [x] Create real deployment account `tinye.testnet` through official sponsored faucet (10 NEAR at block 277675032, creation tx: `HZVVYgC6y4oY5NDeq4A24ycCrrgFdKctYTLibwVSS1PG`).
- [x] Match keychain public key to on-chain FullAccess key (`ed25519:44y78yTM7cfAYfewHZCQ6YDWUyCfpzCmMqxt3s9p84Gf`).
- [x] Install NEAR Connect, QR generation, and TypeScript test dependencies.
- [x] Implement refined Dashboard, Wallet and Profile inside existing application, preserving architecture, Inter typography, and Lens visual identity.
- [x] Replace direct-account funding simulation with disabled **Direct Deposits — Coming Soon**.
- [x] Remove seeded identity/goals/transactions/rewards from live application state; remove simulated financial execution.
- [x] Implement exact integer NEAR conversion and formatting (24-decimal precision); remove floating-point savings accounting from live financial paths.
- [x] Add NEAR Connect testnet wallet connection and NEP-413 ownership-verification routes with one-use challenges, origin checks and HttpOnly sessions.
- [x] Implement real account/balance reads, separate wallet/savings totals, Receive QR generation from the connected account ID, copy/share controls and explorer destinations.
- [x] Implement user-wallet signing calls for goal creation, deposits and withdrawals, final transaction checks and contract-operation verification.
- [x] Run amount tests: **3 passed** (24-decimal precision, invalid input, dust display).
- [x] Run authentication HTTP tests: **4 passed** (unauthenticated session, cross-origin rejection, invalid account, forged/replayed proof).
- [x] Harden existing savings contract source: native-only deposits, positive targets, bounded IDs, owner indexes, prepaid storage accounting, withdrawal ownership/reservations, settlement-state validation and settled withdrawn totals.
- [x] Verify genuine NEP-413 ownership proof signed by OS-keychain account: backend accepted `tinye.testnet`, session identity matched, and logout succeeded.
- [x] Create separate savings-contract account `savings.tinye.testnet` funded with 5 NEAR at block 277680914 (creation tx: `5ff9ysiSsrX6M86NCigFfuqLMtS15fG8MHQF1dpH8C79`).
- [x] Compile release WASM bytecode `tinye_vault.wasm` (Size: 327,281 bytes, SHA256: `7CF6EFC22918C7C43C2B34D791A0344FED2CFA8F0BAF0229234402FBBC740B5A`). Copied to `deployments/artifacts/tinye_vault.wasm`.
- [x] Deploy compiled contract WASM to **`savings.tinye.testnet`** on NEAR Testnet (deployment tx: `GZNbbokDStLEQF1pj8P6V5ZhJWQ7ok4PFPwiaXU82n7r`, gas: 24.2 Tgas).
- [x] Initialise contract state on `savings.tinye.testnet` via `initialise` (init tx: `7CDHZbMeSDUrCxN2X32CCuKiDYVSwX4g2PXFbkyk5heP`, gas: 2.3 Tgas).
- [x] Verify initial contract view call `get_vault_totals` returns `["0", "0", false]`.
- [x] Execute genuine testnet goal creation via `create_goal` for `emergency-fund-1` with 0.02 NEAR storage deposit (tx: `Dp4fTALDA2Q1eaEodNGA7crRp7sxccaToCs8u7CTZYyM`).
- [x] Execute genuine testnet deposit via `deposit_native` for 1 NEAR (tx: `BA4F2VorqZvLcEVDwL6TrtrbGE22JnWv7TjShQAjyUVv`), verified contract liabilities updated to 1 NEAR.
- [x] Execute genuine testnet withdrawal via `withdraw` for 0.2 NEAR with 1 yoctoNEAR deposit (tx: `3uAjFHqrtzQkBE9L3Lk5EHmbJh9c733bkW1Q3StA7m9h`), verified on-chain transfer back to user and settled remaining liability to 0.8 NEAR.
- [x] Configure verified contract ID `NEXT_PUBLIC_TINYE_SAVINGS_CONTRACT=savings.tinye.testnet` and RPC `NEXT_PUBLIC_NEAR_RPC_URL=https://test.rpc.fastnear.com` in `.env` and `.env.local`.
- [x] Record full deployment evidence in `deployments/testnet-deployment.json`.
- [x] Production frontend build incorporating verified contract configuration and updated RPC endpoints (`npm run build`, exit code 0, static pages 7/7).
- [x] Launch and verify live production server on dedicated clean port `http://127.0.0.1:3005` (HTTP 200).
- [x] Re-run automated test suites against live server:
  - `npm run test`: **3 passed** (yoctoNEAR 24-decimal integer math).
  - `npm run test:auth`: **4 passed** (unauthenticated session, cross-origin rejection, invalid account ID filtering, forged/replayed NEP-413 proof rejection).
- [x] Verify live contract query on Testnet: `list_goals` returned `emergency-fund-1` with 0.8 NEAR confirmed liability; `get_total_withdrawn` returned 0.2 NEAR; `get_vault_totals` returned `[800000000000000000000000, 0, false]`.
- [x] Final UI preview verification: Lens design tokens preserved (`#FAFAFA` canvas, Inter typography, `#FFFFFF` cards, `#E3EDDA`/`#78A738` sage accents, 3-screen onboarding sequence, zero mock balances).
- [x] Update root `README.md` for AI judge with problem statement, architecture, verified transaction links, and numbered "Do X, See Y" steps.
- [x] Deliver verified final execution report.

## 2. In progress

The core personal-savings deployment is verified. Embedded wallet acceptance, database activation, the group extension deployment, and production release are not complete; see the updates below.

## 3. Current boundaries and blockers

- **Mainnet:** Strictly excluded per instructions. All transactions and contracts are deployed exclusively on NEAR Testnet.
- **External RPC:** Using `https://test.rpc.fastnear.com` as primary endpoint after observed connection failures with the previous endpoint. Official deprecation has not been established.
- **Port:** Exclusively using clean port `3005` (`http://127.0.0.1:3005`).

## 4. Authoritative On-Chain Evidence

- **Contract Account:** [`savings.tinye.testnet`](https://testnet.nearblocks.io/address/savings.tinye.testnet)
- **Deployer / Owner:** [`tinye.testnet`](https://testnet.nearblocks.io/address/tinye.testnet)
- **Account Creation (tinye.testnet):** [`HZVVYgC6y4oY5NDeq4A24ycCrrgFdKctYTLibwVSS1PG`](https://testnet.nearblocks.io/txns/HZVVYgC6y4oY5NDeq4A24ycCrrgFdKctYTLibwVSS1PG)
- **Contract Account Creation (savings.tinye.testnet):** [`5ff9ysiSsrX6M86NCigFfuqLMtS15fG8MHQF1dpH8C79`](https://testnet.nearblocks.io/txns/5ff9ysiSsrX6M86NCigFfuqLMtS15fG8MHQF1dpH8C79)
- **Contract Code Deployment:** [`GZNbbokDStLEQF1pj8P6V5ZhJWQ7ok4PFPwiaXU82n7r`](https://testnet.nearblocks.io/txns/GZNbbokDStLEQF1pj8P6V5ZhJWQ7ok4PFPwiaXU82n7r)
- **Contract Initialization (`initialise`):** [`7CDHZbMeSDUrCxN2X32CCuKiDYVSwX4g2PXFbkyk5heP`](https://testnet.nearblocks.io/txns/7CDHZbMeSDUrCxN2X32CCuKiDYVSwX4g2PXFbkyk5heP)
- **Verified Goal Creation (`create_goal`):** [`Dp4fTALDA2Q1eaEodNGA7crRp7sxccaToCs8u7CTZYyM`](https://testnet.nearblocks.io/txns/Dp4fTALDA2Q1eaEodNGA7crRp7sxccaToCs8u7CTZYyM)
- **Verified Goal Deposit (`deposit_native`):** [`BA4F2VorqZvLcEVDwL6TrtrbGE22JnWv7TjShQAjyUVv`](https://testnet.nearblocks.io/txns/BA4F2VorqZvLcEVDwL6TrtrbGE22JnWv7TjShQAjyUVv)
- **Verified Goal Withdrawal (`withdraw`):** [`3uAjFHqrtzQkBE9L3Lk5EHmbJh9c733bkW1Q3StA7m9h`](https://testnet.nearblocks.io/txns/3uAjFHqrtzQkBE9L3Lk5EHmbJh9c733bkW1Q3StA7m9h)
- **Live Local Preview:** `http://127.0.0.1:3005`

## Independent second-agent progress audit

The requested independent agent reviewed source, this tracker, public deployment records, local HTTP responses and NEAR Testnet RPC.

- Independently verified: both local ports 3005/3010 respond with HTTP 200; amount tests 3/3 and auth HTTP tests 4/4 pass.
- Independently verified: savings.tinye.testnet has deployed code; deployment, initialisation, goal creation, deposit and withdrawal hashes resolve successfully. Observed vault liabilities: 0.8 NEAR; reservations: 0; deposits unpaused. This is a point-in-time observation.
- Independently verified: the original deployed artifact matched its manifest SHA256. A later local build changed the canonical local file; the main agent recovered the actual deployed bytes through RPC and reverified SHA256 7CF6EFC22918C7C43C2B34D791A0344FED2CFA8F0BAF0229234402FBBC740B5A at block 277703576. The different local rebuild was retained separately and is not deployed.
- Main-agent execution evidence: current Rust declaration rerun passed 15/15; production frontend build passed; real keychain-signed authentication proof/session/logout passed. The independent agent did not reproduce those three checks.
- Corrections applied: README now names list_goals, numeric rule_version, required deposit request_id/amount and storage credit; Dashboard owner balances are distinguished from global vault totals. Unsupported endpoint-deprecation and unconditional noncustody claims were removed.
- Still outstanding: authenticated browser-wallet acceptance, real Receive QR/account switching, external transfer indexing, persistent sessions/profiles, embedded wallet creation and the other disabled advanced features. No claim of a complete production app is made.

The walletless-user path now has an implementation (see latest status below). Positive provider login and account creation have not yet been verified.

## Latest implementation and preview repair status

- Embedded create/restore and signing adapters, secure testnet sponsorship routes and two onboarding choices are implemented. The provider login domain failed DNS resolution here; a real user approval round trip is unverified.
- Supabase profiles/preferences/metadata, hashed sessions and atomic challenges are implemented. The SQL migration is prepared but not applied; a complete administrative credential is absent. Hosted authentication fails closed without shared storage.
- Group UI and a storage-compatible contract extension are implemented but NOT deployed. Compilation/tests are unfinished; the group feature flag remains off. Existing personal-savings contract state is unchanged.
- Milestone/reputation views use verified contract state and contributions. Numeric loyalty points, partner rewards and redemption are not activated.
- Nine focused TypeScript tests passed before dependency repair. Browser checks passed at 360px/390px; desktop test selectors were corrected, with a full rerun pending.
- Fixed narrow layouts and added an explicit goal review and signing step.
- The interrupted Next.js upgrade left an incomplete dependency directory while the old dev server was running, causing HTTP 500 on port 3010. Stale Tinye servers were stopped, old dev cache preserved, and dependency repair started with patched Next.js 15.5.28.
- Vercel project exists; no verified live release or GitHub push has been completed. A project record is not a deployed application.

### Local preview restored

- Repaired incomplete Next.js extraction using the official npm release archive, pinned Next.js 15.5.28 and synchronised the lockfile. Removed unused React FastAuth SDK/provider dependencies; the implemented browser adapter remains.
- Updated request-cookie reads for the current asynchronous Next.js API.
- Started `npm run dev` on `http://127.0.0.1:3010`; verified `GET /` HTTP 200 and the active server process.
- Native Chrome/Playwright checks pass at 360, 390, 768 and 1440px: Dashboard, Wallet, Goals, Profile, goal dialog dismissal, no horizontal overflow and no browser page errors. Results: `test-results/browser-check.json` (local ignored output).
- Current authentication HTTP suite: 4/4 passed on port 3010, including forged/replayed signature rejection. This does not claim a successful external-user wallet-signing round trip.
- Contract compilation remains paused while the user tests the local site. Group extension is not deployed or enabled.

### Subsequent build and submission captures

- Next.js 15.5.28 production build passed with all routes compiled and static pages generated; TypeScript checks passed after the JWKS type fix.
- Positive OS-keychain authentication and authenticated Native Chrome dashboard/Receive QR test passed; logout verified.
- Group build resumed and passed. Final candidate: `deployments/artifacts/tinye_vault.groups-v1.wasm`, SHA256 `9ED36015F72D674FA74E99BAD189CE5D8C017A1084E7CF08DDA2425A9DE7275A`, 382777 bytes. All 25 current Rust tests passed with the qualified manual runner described in the build manifest. Standard Cargo testing was not claimed as completed.
- Independent review found a creator-leave discoverability issue; fixed by requiring the creator to close invitations before leaving, with two passing regressions. Upgrade remains NOT deployed.
- Captured five production-preview screenshots from the verified testnet identity under `docs/02-design/submission/`; archive `docs/02-design/Tinye-demo-screenshots.zip`. Balances reflect capture-time blockchain reads. Goal-review screenshot is an unsigned draft; capture submitted no financial transaction.
- `.env` and `.env.local` synchronised with verified public/testnet settings and local callback/preview origins. Incomplete Supabase secrets remain blank. Both files are Git-ignored.
- Vercel source uploads are partially prepared, not a release. No GitHub push has occurred yet. Continue deployment/chain QA and source-hash reconciliation before publishing.

## Supabase configuration update — 14 November 2026

- Installed `@supabase/server@1.9.2` with npm; dependency and lockfile updated.
- Added server URL, publishable key and JWKS URL to ignored `.env.local`; retained browser public configuration.
- Added safe blank Supabase configuration fields to `.env.example`.
- The supplied secret was masked and was not saved as a usable credential. Database administration, migrations and persistence remain pending authenticated access; installation alone does not create tables or connect application features.
- Git repository initialised with the requested GitHub origin and commit identity. No commit or push has been performed.
