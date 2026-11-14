# NEAR technical research

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Record current official evidence, versions and compatibility limits.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Research record — accessed 2026-11-14

These are observed upstream facts, not installed dependencies or tested compatibility. Mutable documentation is rechecked before approved implementation. No project toolchain exists.

| Source | Finding / applicability | Version evidence / limit |
|---|---|---|
| [Docs index](https://docs.near.org/llms.txt) | Used to discover current canonical paths rather than stale tutorial URLs | Unversioned documentation, accessed date above |
| [Rust quickstart](https://docs.near.org/smart-contracts/quickstart) | Current path uses Rust, cargo-near, WASM build, unit/Sandbox tests and testnet | Tutorial is not a dependency lock |
| [SDK releases](https://github.com/near/near-sdk-rs/releases) | near-sdk and near-contract-standards 5.30.1 observed, 2026-11-05; prior 5.30.0 notes raise Rust requirement to 1.95 | Candidate only; check MSRV, sandbox/protocol and compile together |
| [cargo-near releases](https://github.com/near/cargo-near/releases) | 0.23.0 observed, release dated 2026-11-05, nearcore 2.14 support | Pin reproducible image/digest and compiler after compatibility test |
| [CLI release](https://github.com/near/near-cli-rs/releases/tag/v0.31.1) | 0.31.1 dated 2026-11-05 | No CLI installed or commands executed for deployment |
| [API releases](https://github.com/near/near-api-js/releases) | near-api-js 7.5.1 observed, 2026-11-11 | Candidate; no legacy constructor assumptions |
| [API libraries](https://docs.near.org/tools/near-api) | near-api-js is supported; examples specify Node >=22.22.2; near-kit alternatives also documented | Pin selected library/runtime; examples are not an app compatibility test |
| [Wallet Connector](https://docs.near.org/tools/near-connect) | NEAR Connect `@hot-labs/near-connect` is recommended; Wallet Selector is explicitly deprecated | Exact connector release not independently pinned; implementation blocker |
| [Wallet Login](https://docs.near.org/web3-apps/tutorials/wallet-login) | Connection, message signing and wallet-approved transaction flow documented | Capability-test selected wallets; no local signing-key plugin proposed |
| [Backend authentication](https://docs.near.org/web3-apps/backend/backend) | Challenge verification and account key validation establish app identity | Implement standard validation, not account-string trust |
| [Account model](https://docs.near.org/protocol/accounts-contracts/account-model) | Accounts have identity, keys, balances and optional code/state | Do not treat NEAR accounts as EVM addresses |
| [Access keys](https://docs.near.org/protocol/accounts-contracts/access-keys) | Full-access keys control account; function-call keys restrict receiver/methods and cannot attach NEAR | Do not request unrestricted account access; attached-deposit actions return to wallet |
| [Networks](https://docs.near.org/protocol/network/networks) | Mainnet/testnet have independent state; testnet is for testing and may not retain history | Explicit network-scoped identity and environment epoch |
| [RPC transactions](https://docs.near.org/api/rpc/transactions) | `send_tx`/`tx` preferred; `FINAL` includes refund finality. `tx_status` requires nearcore >=2.14; older nodes use `EXPERIMENTAL_tx_status` | Probe node version and receipt availability; finality alone is not proof of retained amount |
| [FT standard](https://docs.near.org/primitives/ft/standard) | NEP-141 transfer/receiver and NEP-148 metadata; transfer-call invokes receiver, unused amount returns via resolution; sensitive FT transfers attach 1 yoctoNEAR | Native NEAR is separate; authenticate the token contract |
| [FT integration](https://docs.near.org/integrations/fungible-tokens) | Metadata, integer units and storage registration must be handled | Verify NEP-145 storage costs/recipient registration for exact token implementation |
| [Contract events](https://docs.near.org/smart-contracts/anatomy/events) | NEP-297 `EVENT_JSON:` envelope supports structured logs | Tinye event schema is custom and versioned, not an existing standard |
| [Security checklist](https://docs.near.org/smart-contracts/security/checklist) | Caller checks, bounded inputs, storage safety and review are required considerations | A checklist is not an audit |
| [Private callbacks](https://docs.near.org/smart-contracts/security/cross-contract-calls/callbacks) | Callbacks require own-contract caller checks / `#[private]` | External calls cannot be allowed to forge settlement |
| [FT receiver security](https://docs.near.org/smart-contracts/security/cross-contract-calls/ft-transfer-call) | Validate trusted predecessor and retained amount in transfer-call handling | Do not trust a sender-supplied symbol or sender_id alone |
| [Callback failure](https://docs.near.org/smart-contracts/security/cross-contract-calls/callback-failures) | Cleanup callbacks themselves can fail | Reservation/recovery design must handle unresolved settlement |
| [Upgrades](https://docs.near.org/smart-contracts/release/upgrade) | Code can change through account full-access authority or programmatic upgrade; state migration is a separate concern | Method-level permissions do not constrain replacement code |

## Corrections to stale entry points

`/tools/wallet-selector` and `/protocol/account-model` returned 404 during research. Use the canonical connector and account URLs above. The older callback URL redirects to the cross-contract-calls path. NEP GitHub tree links failed through the browser fetcher; official FT and integration pages were read instead. Do not claim direct review of inaccessible standard pages.

## Proposed verification before code adoption

After owner approval, lock connector and API versions; select Rust/compiler/cargo-near/Sandbox versions; compile a minimal nonfinancial example; typecheck actual connector methods and message signatures; run receipt/refund failure tests on Sandbox; probe target RPC protocol/version and archive/receipt support. Record exact lockfiles, binaries and image hashes. No installed version or deployment address is claimed now.

## Implications for Tinye

Recommend a native NEAR testnet vault with one allowlisted test FT, explicit storage/gas handling, final receipt verification and user wallet signing. Intents, Chain Signatures, bridges, gas relayers, embedded wallets and new account variants are not required to meet the MVP and would add separate trust/compatibility decisions.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
