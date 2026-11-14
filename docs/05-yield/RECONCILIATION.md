# Yield reconciliation

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Prevent strategy estimates from becoming invented liabilities.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Future reconciliation procedure

At a final chain checkpoint record strategy balances/shares, asset metadata, valuation source and pending entry/exit claims. Compare aggregate user shares plus disclosed residual/fee accounts with verified strategy holdings. Classify external deposits, withdrawals, realised gains, losses and fees before attributing earnings.

Use immutable batch IDs, checkpoint hash/height, calculation version and idempotent allocation entries. A re-indexed batch cannot allocate twice. Correct past errors through compensating entries referencing the original, never overwriting earnings history. External positions cannot be treated as immediately liquid funds.

## Acceptance / failures

Hold new allocation and distributions on mismatch, stale NAV, failed provider call or unexplained loss; preserve user exit information and incident escalation. A zero unexplained difference and independently repeatable report are release requirements. No yield jobs, strategy snapshots or earnings entries run in MVP; schemas for later features remain inactive.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
