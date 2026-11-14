# NEAR testnet setup and deployment report

Status: Blocked setup; deployment not approved. Version: 1.0. Updated: 2026-11-14.
Owner: Deployment operator.

Purpose: record only observed public results from the deployment-account request. Dependencies: working network/DNS, OS protected credential store, current Rust/cargo-near, reviewed contract and explicit contract-deployment approval. [Architecture](SMART_CONTRACT_ARCHITECTURE.md) and [wallet integration](NEAR_WALLET_INTEGRATION.md) remain proposed.

## Observed results

| Deliverable | Actual status |
|---|---|
| Public deployment account ID | `tinye-admin.testnet` is the requested candidate, NOT a verified created/controlled account |
| CLI | Official `near-cli-rs` 0.31.1 installed outside repository at `%LOCALAPPDATA%\Tinye\near-cli`; version command passed |
| Creation attempt | Faucet-sponsored autogeneration/save-to-keychain command attempted; exited 1. Partial keychain side effects are possible; account existence/control is unverified. Do not export credentials to inspect this. |
| Account existence/balance | Unverified. DNS failed for `rpc.testnet.near.org` and `test.rpc.fastnear.com`; no zero/funded balance inferred |
| Available testnet funds | Unknown; insufficient evidence to proceed |
| Savings contract account | Proposed `savings.tinye-admin.testnet`, subject to verified parent control and explicit deployment approval; NOT created |
| Rewards/other contracts | None planned for deployment until requirements require and approve them |
| Deployment/init/smoke transactions | None; no fabricated hashes or explorer transaction links |
| Tests/artifact/hash | Rust toolchain unavailable on PATH; contract tests/build not run; no approved WASM artifact/hash |
| App environment | Unchanged; no unverified contract ID added as a working configuration |

The CLI command output was captured without exposing signing material. A success-related phrase in captured CLI text did not establish creation; exit code and independent blockchain verification govern this report. No mainnet account, contract deployment or real-fund spending was performed.

## Exact operator recovery steps

Resolve local DNS/network access to the official testnet RPC first. Use the installed Rust-based CLI, not the legacy JavaScript CLI. These commands contain no signing secret:

```powershell
$tinyeNear = "$env:LOCALAPPDATA\Tinye\near-cli\node_modules\.bin\near.cmd"
& $tinyeNear account view-account-summary tinye-admin.testnet network-config testnet now
& $tinyeNear tokens tinye-admin.testnet view-near-balance network-config testnet now
```

If absent, create using the official sponsored method in a private local terminal (never paste private output into chat):

```powershell
& $tinyeNear account create-account sponsor-by-faucet-service tinye-admin.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
```

If account exists, do not assume it is yours and do not overwrite credentials. Verify the locally stored PUBLIC key matches an on-chain full-access key. If unavailable to your keychain, choose another available dedicated testnet name and repeat the official sponsored process. Confirm OS keychain storage actually succeeds; do not fall back to plaintext keys in the repository.

If creation/funding service rejects the request, use the [NEAR testnet faucet](https://near-faucet.io/) for an existing controlled testnet account, or complete the sponsored CLI flow after rate-limit/network recovery. A funding faucet does not establish ownership or necessarily create a missing named account. Re-run balance and access-key queries after funding; record block hash/height and exact yoctoNEAR balance. Never claim funding from the faucet UI alone.

```powershell
& $tinyeNear account list-keys tinye-admin.testnet network-config testnet now
```

Only public account/key information belongs in the report. A pending request is not a transaction confirmation. [Official CLI documentation](https://docs.near.org/tools/cli), accessed 2026-11-14, documents keychain-backed faucet account creation.

## Contract readiness and deployment plan

1. Approve savings asset/rules, owner/upgrade/pause/recovery authorities and storage/gas budget. Resolve current source gaps before deployment.
2. Install approved Rust/cargo-near tooling; pin dependencies/lockfile. Run unit and sandbox integration tests for accounting, owner checks, token rejection, replay, concurrent withdrawals, callbacks and storage.
3. Compile release WASM; record compiler/tool versions, exact source manifest, artifact path and SHA256. Estimate storage plus operational/gas funds from build/tests. Compare with verified available balance; no arbitrary sufficient-funds claim.
4. Present exact proposed savings account, funding amount, artifact hash, init payload and test report for explicit owner deployment approval. This has not happened yet.
5. After approval, create/fund separate savings subaccount using protected keychain; deploy and initialise with approved owner/policy in the reviewed workflow. Verify deployed code hash, initialization and access keys.
6. Record genuine transaction hashes and testnet explorer links for create, deploy, init, goal creation, deposit and withdrawal. Independently query goal/operation/liability balances and withdrawal transfer/callback settlement.
7. Only then update application testnet configuration and enable financial actions. Public network/RPC/explorer/account values may enter environment configuration; private deployment keys must never be browser environment variables.

## Acceptance and unresolved issues

SETUP-01: Deployment account exists, locally controlled public key matches chain, balance observed at finality and meets measured deployment budget.

SETUP-02: Reviewed artifact has reproducible hash and passing tests; contract account is separate from all user accounts; deployment approval is explicit.

SETUP-03: Deployment report includes real code hash, transactions, explorer links, verified state and financial smoke results. Until then, all corresponding deliverables remain unavailable.

Open blockers: local DNS, unverified account/keychain result, Rust toolchain, contract readiness, product rules and deployment approval. No secret or recovery phrase should be sent to the AI conversation to resolve these blockers.
