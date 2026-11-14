# Redemption and fulfilment

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Specify auditable future point spending and real delivery.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed later lifecycle

`requested` → `reserved` → `fulfilling` → `fulfilled`; failure branches `rejected`, `cancelled`, `refund_pending`, `refunded`. A request uses an idempotency key, catalogue version and exact point cost. Reserve available points and inventory together; call supplier through an outbox with a stable fulfilment reference. A timeout remains unresolved, not permission to fulfil twice.

Supplier evidence must support success. On proven nonfulfilment release stock/points or post the approved compensating credit; no silent deletion. The user sees status, benefit terms and support route. Separate points reservation from posted spend so available points cannot go negative through concurrent requests.

## Acceptance

Test duplicate clicks, insufficient points, last-stock races, provider callback replay, delivery timeout, refund and supplier failure after reservation. Administrators cannot mark fulfilled without evidence or mint cash equivalence. Real redemption is disabled in MVP and requires D13, supplier contracts, funded budget and counsel approval.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
