# Unit economics

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / finance / demo lead

## Purpose

Define measurable cost/revenue inputs without fictitious projections.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Model inputs and formula

Measure hosting/database storage/requests, worker/indexer/RPC quotas, wallet/auth charges if any, notifications, support time, security review, legal/compliance, payment/strategy costs if approved, reward fulfilment and overhead. Record currency, period, vendor quote/source date and fixed vs variable basis. None is measured or contracted now.

Contribution margin per active user = approved recognised revenue per active user − attributable variable costs. Operating result subtracts fixed costs. Break-even volume depends on positive margin and supported capacity; no numeric break-even or growth forecast is fabricated. User deposits and test assets are not revenue.

## Acceptance

Finance builds low/base/high scenarios only from documented assumptions and current quotes, with sensitivity to RPC load, support incidents and reward redemption. Report separate network subsidies if chosen. Monetary model uses decimal/fixed-point arithmetic, no floating-point financial calculations. Positive spreadsheet margins cannot replace legal, liquidity or security review.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
