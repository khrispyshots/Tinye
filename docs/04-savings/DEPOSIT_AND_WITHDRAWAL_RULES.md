# Deposit and withdrawal rules

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Specify complete financial journeys and recovery.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Deposit

Select goal and allowlisted network/asset → enter exact amount → validate per-asset limits and wallet gas/storage → review amount, asset, vault, fee payer and network → sign in wallet → record hash/intent → pending → verify final execution and accepted economic effect → credit projection once → award eligible points/outbox notice. FT path uses the selected token's transfer-call and trusted receiver; a direct token transfer is not automatically goal credit. Native NEAR path is separate and only enabled if approved.

## Withdrawal

Refresh contract liability/reservations → validate owner and available amount → show destination (same owner account proposed), network costs and terms → user signs → contract reserves before asynchronous transfer → settlement callback records success or proven failure release → backend verifies evidence → success/failed/unknown. The backend never signs for the user or changes the destination to an administrator.

## Retry and confirmation

One idempotency key per logical intent; changed payload returns conflict. Rejection before submission cancels intent without financial effect. A timeout after signing/submission is unknown and must be checked; no automatic new financial transaction. Authoritative finality is necessary but insufficient without receipt outcome/amount/receiver verification. Index lag keeps pending with as-of time. Refunds and partial acceptance are reconciled before claiming a result.

## Acceptance

Double click, replay, duplicate event, wrong asset, wrong receiver, fee-only failure, no gas, storage failure, callback failure and lost wallet return cannot create a second credit/debit. No precise processing-time promise until measured and approved.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Contract Interface](../09-blockchain/CONTRACT_INTERFACE.md)
- [Transaction Processing](../10-backend/TRANSACTION_PROCESSING.md)
