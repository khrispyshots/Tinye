# Implementation roadmap and approval gates

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / technical lead

## Purpose

Make the proposed implementation sequence concrete while prohibiting premature work.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](docs/00-product/PRODUCT_REQUIREMENTS.md).

## Gate 0: documentation and decision approval

Required evidence: owner accepts this documentation version, D01-D24 resolved or explicitly deferred with dependent work removed, counsel scope identified, toolchain compatibility plan accepted. No code, provisioning or deployment precedes this gate. Documentation approval alone does not authorise testnet deployment unless explicitly included.

| Phase | Deliverables after approval | Exit evidence / acceptance |
|---|---|---|
| 1 Brand/design | Custom logo explorations/exports, accessible tokens, component states, responsive shell and onboarding | Approved wordmark; contrast and keyboard checks; all onboarding errors and testnet labels |
| 2 Core app | Profile, goals, dashboard, wallet proof, private history, consent, admin read visibility | Auth/object-ownership tests; no fabricated balances; export and recovery semantics |
| 3 Sandbox financial workflows | Rust vault, exact units, reservations/callback recovery, API intents, worker/indexing, rewards outbox and critical notices | Invariants, wrong-token/receipt/duplicate/concurrency tests; reconciliation to zero unexplained difference |
| 3b Authorised testnet | Explicit deployment authorisation, isolated accounts, verified code/manifest, recorded transactions | Real testnet deposit/exit evidence, key review, operational dashboards, restore rehearsal |
| 4 Rewards/history | Approved point schedule, milestone ledger, correction/appeal, private descriptive profile | Duplicate/reversal/cap tests; marketplace remains unavailable without separate approval |
| 5 Conditional expansion | Yield, groups, fiat, redemption, more assets or wallets only when separately approved | Provider, liquidity, legal, security, privacy and fulfilment acceptance per feature |
| 6 Security and launch | Independent contract review, application security assessment, final legal copy, operations rehearsal | Owner separately authorises mainnet with reviewed deployment artifact and all launch gates |

## Newly requested wallet/funding work

After the application phase is explicitly authorised, add the [fictional bank-transfer demo](docs/20-payments/DEMO_BANK_TRANSFER.md) using a separate Demo NEAR ledger and non-payable references. This work does not require live payment providers and cannot satisfy testnet financial verification tests. Before real wallet work, review the [embedded-wallet proposal](docs/03-auth/EMBEDDED_WALLET_PROPOSAL.md) and resolve identity/custody/recovery dependencies. Real bank collection remains a separately approved later integration; no mainnet activation follows from the demo.

## Completion reporting

For each phase record requirements delivered, exact build versions, test evidence, accessibility/performance outcomes, known limitations, unresolved decisions and owner acceptance. Notifications, admin visibility and reconciliation are prerequisites for financial testing, not optional polish. There are no deadlines, cost estimates or coverage percentages without agreed capacity and evidence.

## Stop conditions

Unexplained liability mismatch, missing receipt evidence, critical security flaw, unknown operator control, unresolved legal classification or missing required approval blocks the affected phase. Mainnet, production configuration and real funds remain outside all implicit approvals.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](docs/00-product/DECISION_REGISTER.md)
- [Requirements Traceability](docs/00-product/REQUIREMENTS_TRACEABILITY.md)
- [Release Acceptance Criteria](docs/16-quality/RELEASE_ACCEPTANCE_CRITERIA.md)
- [Mainnet Go Live Checklist](docs/17-operations/MAINNET_GO_LIVE_CHECKLIST.md)
