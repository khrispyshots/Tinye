# Rewards product specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Reward verified habits without monetary misrepresentation.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed MVP rules

Points are a separate integer loyalty ledger, nontransferable, not withdrawable and with no cash value. Basic milestones recognise verified actions. Real catalogue stock, paid rewards, transferable tokens, gambling mechanics and fulfilment are disabled until approved.

Events eligible for review: first confirmed deposit to a goal and first target-reaching milestone. Frontend success, unsubmitted intents, failed/refunded/unattributed deposits and duplicate indexed logs are ineligible. Withdrawals do not earn points. An ordinary lawful withdrawal does not confiscate principal or already valid points; demonstrable reversal/abuse uses audited corrections under published rules.

## Acceptance

The points history shows earning source, amount, rule version and reversal reason. A reward balance is never included in savings totals. Pending events cannot be spent. Admin adjustments require reason, permission and audit. All numeric amounts, caps and expiry rules remain proposed in POINTS_ECONOMY and need D13 approval.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Points Economy](POINTS_ECONOMY.md)
