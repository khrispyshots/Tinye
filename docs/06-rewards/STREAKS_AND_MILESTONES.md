# Streaks and milestones

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Recognise consistency without shaming irregular savers.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed milestone logic

First contribution and first target reached follow final verified savings events. Visual checkpoints at 25%, 50%, 75% and 100% may be shown as informational progress; only approved point triggers earn ledger entries. Target edits do not regenerate point entitlement. Over-target progress displays true amount while the progress graphic caps at full.

A weekly streak badge is proposed for one or more eligible contributions in consecutive user-calendar weeks. Store timezone and rule version. Do not reward multiple deposits in one week, backdate contributions from client clocks or hide a network delay; use authoritative execution time. Grace treatment for provider outages must be approved before claiming streak continuity.

## Acceptance / failures

Explain the observation window and factors, allow corrected history review and use neutral language after missed weeks. No reminders imply an obligation to contribute. Reverse invalid milestones through linked evidence. Test daylight-saving changes, irregular income, target decrease, duplicate confirmations and a delay crossing week boundaries. Streaks do not become credit scores.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
