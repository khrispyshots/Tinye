# User journeys

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** UX / product leads

## Purpose

Connect motivations to complete and recoverable workflows.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Core journeys

1. New saver: landing → welcome/how it works → account → document consent → wallet explanation/proof → basic profile → first goal. Optional marketing and notification prompts can be skipped; required legal agreement cannot.
2. Save: active goal → exact amount → asset/network/fees review → wallet approval → submitted/pending → final verification → confirmed progress and eligible points. User rejection returns to review with inputs intact.
3. Withdraw: fresh available balance → amount → rules and destination review → user signature → reservation → receipt verification → settled success or release on proven failure. Unknown stays reserved and routes to status/help.
4. Return: authenticated dashboard → last verification time → goal/history → inspect receipts; no fabricated feed while offline.
5. Correct or close: support/export → resolve unknown operations and withdraw eligible funds → revoke sessions/connections → erase eligible off-chain data while retaining legally justified records and public-chain links.

## Later journeys

Yield requires strategy consent and loss/exit handling; group joining requires explicit visibility consent and personal exit; redemption requires stock reservation and real fulfilment. These are unavailable until their decision gates are passed.

## Acceptance

Each journey has an actionable retry, saved state where safe, and a support route that does not request secrets. Test both wallet rejection and a return after connectivity loss. Account recovery never implies recovery of an external wallet key.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Screen Specifications](../02-design/SCREEN_SPECIFICATIONS.md)
- [Onboarding Flow](../03-auth/ONBOARDING_FLOW.md)
