# Commitment rules

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Evaluate optional commitments without trapping principal.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed MVP

Flexible mode only: no time lock, no principal confiscation and no platform early-exit penalty. Withdrawal still depends on verified availability, user signing, network costs and contract execution. Reminders and an optional date do not create a contractual lock or mandate recurring debits.

## Alternatives for later approval

Committed goals require an explicit rule version, commitment duration, eligibility, exceptional exit process and counsel-approved consequences before opt-in. Prefer optional unvested promotional-bonus forfeiture over financial penalties; never silently reduce principal. Hybrid mode requires rules shown per goal, not a global setting that changes existing deposits.

## Acceptance and failures

A rule preview must show when money can leave, what costs apply and which incentive is affected. Target date changes cannot secretly reset a lock. Existing goals keep accepted conditions unless a lawful reviewed migration with user consent applies. Admins cannot retroactively impose commitments. Do not implement committed-mode controls while D09/D10 are open.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
