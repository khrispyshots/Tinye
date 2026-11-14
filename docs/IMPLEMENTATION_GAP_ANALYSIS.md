# Implementation audit and approval plan

Status: Proposed implementation plan; no major application changes authorised by this report. Version: 1.0. Updated: 2026-11-14.
Owner: Engineering lead and product owner.

Purpose: reconcile existing code with the latest complete-flow, deployment, automatic-wallet and wallet/profile correction briefs. References: [master specification](../Tinye_Master_Project_Specification.md), [decision register](00-product/DECISION_REGISTER.md). Historical documents claiming no application exists are superseded by this dated audit; earlier proposed ADRs must not be interpreted as owner approval.

## What exists

Next.js 14/React 18/TypeScript/Tailwind application; shared context, seven local views, onboarding, goal/deposit/withdrawal/demo/help modals, Rust savings source and deployment helper scripts. Existing light green-and-cream UI, routing within local state, modal interactions, filters and layout render. Preserve these visuals. `src/app/globals.css` is loaded; dark `src/index.css` is not the current rendered baseline. No `.git` directory was present during audit, so no tracked-diff baseline is available.

## Findings

| Priority | Evidence | Gap / required correction |
|---|---|---|
| P1 | `src/services/contractClient.ts` submit methods | Generates random transaction hashes and successful results after a timer, without wallet signature/broadcast. Replace with real calls and TX lifecycle. |
| P1 | `src/context/AppContext.tsx`, `src/data/mockData.ts` | Seeded identity, goals, transactions and float balances populate financial UI. No verified account/session boundary. Remove from live account data paths. |
| P1 | `OnboardingWelcome.tsx` Sign in and completion | Direct dashboard access; wallet selection is local state. Installed FastAuth packages unused. Implement proof/session/account verification. |
| P1 | `completeDemoTransfer` and `DemoBankTransferModal.tsx` | Fictional transfer credits the same goals displayed as verified NEAR. Latest correction requires Coming Soon and no simulated credits. |
| P1 | Deposit/withdrawal/context arithmetic | Number/parseFloat/two-place rounding and amount times 1e24 violate exact units. Replace accounting with integer strings/BigInt. |
| P1 | `AdminView.tsx` | Compares local total to the same locally computed total, labels invariant valid. Replace with independent chain evidence and RBAC. |
| P1 | Rust storage/callback paths | Unbounded unpaid storage, missing explicit callback operation-state/nonce checks and failure recovery; not deployment-ready. See contract design. |
| P2 | Context rewards and RewardsView | Seeded achievements/local points and claimed fulfilment without evidence or provider. Implement verified ledger and real benefit lifecycle after rules approval. |
| P2 | Goal creation/detail handlers | Local-only creation; stale selected object; Goals Add funds loses goal context. Bind IDs and verify creation. |
| P2 | Wallet/profile/history | No Wallet page/Receive/real QR; Profile static, Activity seeded and missing explorer detail. Add required destinations using current styling. |
| P2 | Demo reference/country logic | Reference generated once from default country; only 14 country/region choices despite all-country label. Do not fix simulation into a live payment system; disable unfinished funding. |
| P2 | Groups/reputation/settings/closure | Required journeys absent. Specify rules and build actual destinations or truthful unavailable states; do not claim complete. |
| P2 | App backend | No API/session routes, persistence, indexer or reconciliation worker present. Add within existing app architecture, not unnecessary microservices. |
| P2 | Deployment scripts and README | Hardcoded account names and deployment claims are not blockchain verification. Scripts print incomplete commands and can continue after failed builds. Replace after approval. |

## Verification already performed

Production Next build passed and `npx tsc --noEmit --incremental false` passed during checkup; this establishes compilation only. Browser check reproduced Sign in bypass and seeded 14.50 NEAR dashboard. No financial action was treated as real or validated by clicking a fake success path.

Dependency audit reported 19 affected dependency entries (1 critical, 16 high, 2 low), not 19 independent vulnerabilities. Applicability/fix paths require triage; no automatic major-version audit fix was applied. No automated test files/test script found for current application journeys. Cargo absent from PATH: contract compile/unit/integration tests not run, artifact/hash unavailable. Live account/RPC verification is blocked by DNS in this environment. No contract deployment or real user signing was performed.

## Proposed implementation sequence

| Phase | Concrete scope | Exit criteria |
|---|---|---|
| 0 | Approve this plan; freeze source/visual baseline; dependency vulnerability/compatibility triage; replace misleading live labels and disable direct-deposit simulation | No fake money action reachable; current styles preserved; documented upgrade scope |
| 1 | Testnet NEAR Auth activation/proof spike, NEAR Connect, secure backend sessions, account-scoped real reads and empty/error states | AUTH-01..06; two independent test users; repeat login/recovery and switch/disconnect tests |
| 2 | Wallet/Receive/Profile correction: account-ID QR/copy/share; separate financial cards; history evidence and honest coverage | FLOW-05/09; QR decoding test and switching test; no seeded address or financial fallback |
| 3 | Harden savings contract; exact units, paid/bounded storage, idempotent accounting/callbacks/events; unit/sandbox tests and reproducible WASM | CONTRACT-01..06; reviewed artifact hash and exact configuration ready for separate deployment approval |
| 4 | After explicit deployment approval only: create/fund dedicated savings account, deploy/init, verify code/state, real user goal/deposit/withdraw smoke tests; wire current modals | FLOW-02..04 and TX-01..06 on testnet, recorded real transactions, reconciliation evidence |
| 5 | Verified rewards ledger, milestones and approved fulfilment; history/reputation breakdown; individually attributed group savings; profile settings/closure | FLOW-06..09; rule-specific tests, no invented points/score or pooled withdrawal authority |
| 6 | Full journey regression, accessibility/responsive/reduced-motion comparisons, errors/security, report limitations | All matrix rows tested; no enabled action pretending success; mainnet remains disabled |

Wallet Send can be enabled after secure signing and verification pass; otherwise use Coming Soon as explicitly allowed in the correction brief. A genuinely missing deployment cannot be hidden by showing mock savings. Phase gates do not mean the full nine-journey objective is complete early.

## Decisions requested

1. Approve NEAR Auth embedded onboarding plus NEAR Connect existing-wallet path on testnet, conditional on the documented capability/security spike.
2. Approve native NEAR, flexible withdrawals, no yield/penalties/platform fees for initial contract testing; choose storage payer and bounded sponsorship budget.
3. Approve server-side sessions and relational private metadata/projections; select host before provisioning paid infrastructure. Browser local state is insufficient.
4. Approve contract ownership, upgrade key custody, pause scope and recovery authority after review. No general administrator access to user principal.
5. Confirm points values/caps/eligible events, catalogue benefits/fulfilment, reputation formula and group fund rules before those business rules are implemented. None are invented here.
6. Latest correction disables direct deposits; prior fictional bank credit scope is superseded. No live bank/on-ramp integration is implied.

Approval of implementation is not deployment approval, provider production approval, legal sign-off, mainnet permission or permission to spend real funds. Contract deployment requires the separate artifact/account/configuration approval requested in the setup brief.

## Document index and acceptance

- [APP_FLOW](APP_FLOW.md): all nine journeys and profile/wallet correction.
- [SCREEN_WIRING_MATRIX](SCREEN_WIRING_MATRIX.md): existing interaction families and missing destinations.
- [NEAR_WALLET_INTEGRATION](NEAR_WALLET_INTEGRATION.md): provider choice, activation, signing, recovery, sessions, costs and limitations.
- [SMART_CONTRACT_ARCHITECTURE](SMART_CONTRACT_ARCHITECTURE.md): interface proposals, permissions, invariants and tests.
- [TRANSACTION_LIFECYCLE](TRANSACTION_LIFECYCLE.md): verified financial outcomes and unknown reconciliation.
- [TESTNET_SETUP_REPORT](TESTNET_SETUP_REPORT.md): account attempt and deployment blockers.

Planning acceptance: all six requested flow/architecture files exist, links resolve, the latest deposit correction is consistent, all nine journeys map to criteria, and application source/styles remain unchanged. Implementation acceptance requires executed tests and real chain evidence, not documentation alone.
