# MVP scope

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner

## Purpose

Separate required core workflows from conditional and deferred features.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Proposed release boundary

| Core testnet MVP | Conditional later release | Explicitly deferred |
|---|---|---|
| Welcome, understandable onboarding, secure account/session, consent | Embedded wallet / additional auth methods | Lending and credit |
| External wallet proof and signing | Real yield and strategy integrations | Automated recurring debits |
| Dashboard, private goals, edit/history/progress | Groups with individually owned contributions | Multi-chain and bridging |
| Testnet deposit/withdrawal and verified history | Reward marketplace and real fulfilment | Complex investments |
| Points ledger, basic milestones, descriptive history | Numeric reputation score / underwriting | Production real funds |
| Profile/settings, help, closure/export | Fiat rails and merchant partners | Undisclosed use of assets |
| Admin user/goal/transaction visibility and audit | Additional assets and recovery vendors | Arbitrary admin withdrawals |
| Transaction/security notices, observability | Marketing and push channels | Yield promises |

## Acceptance

Core MVP requires complete user journeys and backend/contract enforcement, not UI stubs. Testnet identity is persistent on every financial surface, receipt and demo. Disabled conditional screens show an honest unavailable explanation and no active financial CTA. Admin visibility, critical notifications and reconciliation ship with financial workflows despite their later placement in the master's illustrative roadmap.

## Requested demonstration extension

[Demo bank funding](../20-payments/DEMO_BANK_TRANSFER.md) is requested for country/currency-specific presentation with fictional Tinye Bank of Web3 details and isolated simulated Demo NEAR credits. It is not real fiat integration or verified testnet activity. Live fiat/payment and actual embedded-wallet providers remain gated. Keep this demonstration separate from the testnet financial acceptance scope.

## Change control

Any addition must identify legal, custody, accounting, threat, data and test impacts. Scope approval does not authorise deployment, financial limits or a provider contract. No feature is marked implemented until evidence and owner acceptance exist.

## Unresolved decisions

D01 scope, D02 assets, D03 network, D04 wallet, D05 custody, D07 no yield, D12 groups, D13 rewards and D14 reputation remain open.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Implementation Roadmap](../../IMPLEMENTATION_ROADMAP.md)
