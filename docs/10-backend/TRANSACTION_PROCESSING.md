# Transaction processing

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Specify authoritative financial lifecycle and atomic projections.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Canonical operation flow

`created` → `awaiting_signature` → `submitted` → `pending` → `confirmed` or `failed`. Pre-submission user rejection may become `cancelled`. Lost response, provider inconsistency or missing evidence becomes `unknown`; recovered evidence may return to pending or prove a terminal outcome. Do not allow UI/manual admin promotion to confirmed. A final chain result is inspected for actual retained/debited amount, receiver, trusted emitter, network and request binding.

Withdrawal reservation state is separate: reserved, settled, released or recovery_required. Reserve before asynchronous payout. A proven failure releases once; unknown payout retains reservation. Backend SQL reservation is a projection, not a replacement for contract enforcement.

## Atomic processing

1. Create validated intent and payload/idempotency binding.
2. User signs; record returned hash/sender as untrusted candidate.
3. Worker fetches final execution/receipts; compare approved token/vault/actions/request and economic result.
4. In one SQL transaction claim unique event/effect, transition operation, append journal, update goal projection/checkpoint and create outbox event.
5. Reward and notification consumers deduplicate their work using source reference.
6. Periodic reconciliation compares per-asset liabilities and reservations at recorded final checkpoints.

## Acceptance and failures

Timeout does not mean failure. Failed FT receiver/refund path can yield no accepted credit even when a wallet returned a hash. Fees and storage are distinct from saved units. Direct transfers without attribution are reviewed, not assigned by guess. Test crashes between each step, two workers, receipt duplication, callback failure, partial refunds and late evidence. No retries create a fresh transfer without informed user authorisation.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Events And Indexing](../09-blockchain/EVENTS_AND_INDEXING.md)
