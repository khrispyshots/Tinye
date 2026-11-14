# Event processing

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Make at-least-once observations produce one economic effect.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Processing contract

Input is final chain receipt/log evidence from the approved network/epoch and emitter. Validate schema/version, execution outcome, asset, amount, owner, goal and intent; store provenance. Deduplicate by network, epoch, emitter, receipt, log index and data index; operation effect uniqueness also guards repeated representations of the same action.

Persist parsed event, journal effect, projection update, checkpoint and outbox within one database transaction. Reward and notice workers consume stable source IDs. Out-of-order evidence waits for prerequisites or rebuilds from a trusted checkpoint; do not credit unresolved deposits because an indexer cursor advanced.

## Recovery and acceptance

Use leases with fencing for workers, bounded exponential backoff with jitter for reads and a dead-letter queue for malformed/incompatible evidence. Poison events cannot halt all assets silently. Reprocessing/reindexing must reproduce identical balances, points and notices without duplicates. Preserve original journal entries and append reviewed corrections. Finality/provider contradictions trigger incident review, not an assumption that NEAR reorganised. No analytics webhook can originate a financial event.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
