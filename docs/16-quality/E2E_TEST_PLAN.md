# End-to-end test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Validate complete human journeys and the full screen inventory.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned journeys

E2E-01: new user understands testnet/key control, authenticates, accepts exact required documents, skips optional marketing and creates first goal. E2E-02: returning user reconnects wallet, submits valid deposit, observes pending then verified accepted result, progress and one eligible point event. E2E-03: wallet rejection, wrong network, insufficient gas/storage, precision errors and double tap preserve safe state.

E2E-04: user reviews eligible withdrawal, signs, sees reservation and verified payout; test unknown timeout and callback failure without retrying a second transfer. E2E-05: goal edit/target reached/completion/close follows canonical transitions. E2E-06: logout/recovery/wallet-link/session revoke and cross-user denial. E2E-07: export/closure respects liabilities, unknowns and public-chain limits. E2E-08: admin read/reconcile/audit and role denial. E2E-09: points/milestone/correction and descriptive history, no cash/credit claim. E2E-10: all optional feature surfaces remain honestly unavailable.

## Inventory and devices

Exercise ONB-01–17, APP-01–45, ADM-01–08 and all 16 global states from SCREEN_SPECIFICATIONS. Conditional auth/group/yield/redemption screens are tested for safe unavailable behaviour in MVP; they do not require implementing unapproved features. Check keyboard/screen reader, mobile wallet deep-link return, desktop popup, browser Back/refresh, offline return and low bandwidth.

## Acceptance

Capture real testnet receipts only after deployment approval, plus build/network/epoch and reconciliation evidence. No mocked backend alone proves a financial E2E pass. Failed/cancelled/unknown states remain distinct. No tests executed yet.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
