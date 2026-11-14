# Points economy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Provide a reviewable proposed earning and reversal schedule.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed schedule — not activated

| Trigger | Proposed points | Cap / uniqueness | Reversal |
|---|---|---|---|
| First eligible confirmed deposit for a goal | 10 | Once per goal; maximum 3 earning goals per user per calendar month | Compensating debit if original economic credit is invalidated |
| First confirmed target-reaching event | 20 | Once per goal lifetime; max 3 earning goals per user per calendar month | Reverse if milestone was founded on invalid credit; do not punish routine later exit |
| Streak contribution | 0 additional | Badge only in MVP; no per-deposit farming | Correct badge if source evidence invalid |
| Manual correction | Signed integer delta | Dual approval for sensitive adjustment; no arbitrary minting | Referenced compensating entry |

Calendar windows use the stored user timezone fixed for the month; changes apply next period to prevent boundary abuse. No expiry in the proposed noncash MVP; later changes need notice/legal review. No minimum earnable amount is invented while D20 remains open; choose an approved eligibility floor before enabling points so dust cannot farm rewards.

## Ledger invariant

Balance equals sum of immutable posted integer entries; unique `(user_id, rule_version, source_kind, source_id)` prevents repeats. Cap reservation/posting and source verification occur atomically. Reversal links to original; negative correction balance is visible but has no debt/cash meaning. Never delete history or cap credits solely in UI.

## Acceptance

Replay, two workers, end-of-month timezone changes, target edits, reversed source and parallel cap races produce the same deterministic result. D13 must approve values, eligibility floor, caps, no expiry and legal meaning before implementation.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
