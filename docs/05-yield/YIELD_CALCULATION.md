# Yield calculation

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Separate rates, projections and realised earnings.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Calculation proposal for later review

APR is a simple annualised rate; APY assumes compounding at a stated frequency. Educational relationship: APY = (1 + APR/n)^n − 1 only under fixed-rate periodic assumptions, not a guarantee. Variable strategies require provider-specific methodology and timestamped source. All implementation would use fixed-point/integer arithmetic with explicit precision and round-down rules for user allocations; no binary floating point.

Realised net earnings over a reconciliation interval = closing verified strategy NAV + settled external distributions − opening NAV − net external contributions, with fees/losses separately recorded. Allocate only using an approved share/time-weight methodology; never infer earnings from a wallet balance increase that may be a deposit.

Rounding residuals remain in a disclosed strategy reconciliation account, never secretly credited as platform profit. Share price, fees and timestamps must be stored with calculation version.

## Acceptance

Test zero NAV, negative yield, tiny units, leap-day/year basis, mid-period deposits, partial exits, rate changes and conservation of allocated units plus residual. Formula is not activated in MVP; strategy-specific share, time basis and fee rules remain unapproved.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
