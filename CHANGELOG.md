# Documentation changelog

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Documentation maintainer

## Purpose

Track reviewable specification changes.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](docs/00-product/PRODUCT_REQUIREMENTS.md).

## 0.4 - 2026-11-14: demo wallet and bank-funding scope

## 0.5 - 2026-11-14: real-wallet planning and testnet setup audit

- Added six requested flow, wiring, wallet, contract, transaction and gap documents plus testnet setup report.
- Recorded latest Coming Soon instruction superseding simulated direct-deposit credits; preserve current rendered UI.
- Installed official near-cli-rs 0.31.1 outside repository; faucet creation failed and RPC checks hit DNS failures. No verified account/balance or deployed contract is claimed.
- Application/contract/deployment-script sources unchanged. Major implementation and deployment approval gates remain.

### Historical 0.4 details

- Researched current official embedded-wallet and fiat-on-ramp options; no provider or credentials provisioned.
- Captured owner clarification: all-country fictional Tinye Bank of Web3 display, non-payable references and button-triggered Demo NEAR credit.
- Added DEMO_BANK_TRANSFER.md and EMBEDDED_WALLET_PROPOSAL.md, separating simulation from real bank settlement and on-chain verification.
- Updated UI, wallet onboarding, scope, roadmap, index and open decisions. Demo rates/packages and application implementation remain pending.
- No application code, real wallet, bank account, payment, testnet transaction or deployment created.

## 0.3 - 2026-11-14: quiet welcome selected

- Owner selected onboarding option 3, A quiet welcome; recorded its image/hash and scoped approval.
- Added ONBOARDING_DESIGN.md with minimal screen contract, next actions, responsive behaviour and play-once Lottie-style motion brief/static fallback.
- Linked design.md, ui.md, onboarding flow, motion docs, index and decision register to the selected entrance; preserved alternatives.
- No playable animation, application code or deployment is claimed or created.

## 0.2 - 2026-11-14: default interface locked

- Recorded explicit owner selection of Friendly Green / Lens-informed revision 4 for default desktop/mobile UI.
- Added root design.md and ui.md with source image/hash, semantic tokens, layout, components, financial wording, interactions, accessibility and visual regression acceptance.
- Synchronised design tokens and linked domain design docs to the selected baseline; preserved earlier concepts.
- Marked D22 visual direction approved within its scope; other decisions and final logo/cultural/accessibility work remain pending.
- No application code, configuration, migration or deployment changed.

## 0.1 — 2026-11-14

- Read and preserved the master specification; documented the empty implementation baseline.
- Added all requested planning domains, architecture alternatives, legal drafts and open decision register.
- Added source-dated NEAR research, explicit proposed API/contract/state/data definitions and testnet-first roadmap.
- Added validation and traceability artifacts, including legal publication blockers.
- Application features, configuration, deployments, migrations and financial integrations remain unimplemented.

## Change policy

Before approval, revisions remain Draft and increment documentation versions for material changes. After approval, record owner, reason and affected requirements; financial term changes require renewed review and consent where required. Never use this changelog to imply an audit or release that did not occur.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](docs/00-product/DECISION_REGISTER.md)
- [Requirements Traceability](docs/00-product/REQUIREMENTS_TRACEABILITY.md)
