# Events and indexing

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Define financial event schemas, provenance and deduplication.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Tinye event proposal

NEP-297-style envelope: `standard: tinye`, `version: 1.0.0`, `event`, `data: [record]`, prefixed `EVENT_JSON:`. This is a proposed custom standard identifier, not registered ecosystem compatibility.

| Event | Record fields | Financial effect |
|---|---|---|
| goal_created | goal_id, owner_id, asset_id, rule_version | None |
| deposit_accepted | goal_id, owner_id, asset_id, amount_units, request_id | Candidate credit, confirmed only after final resolution |
| withdrawal_reserved | goal_id, owner_id, amount_units, request_id | Reservation, no settled debit |
| withdrawal_settled | request_id, goal_id, amount_units, recipient_id | Settled debit after payout verification |
| withdrawal_released | request_id, amount_units, reason_code | Release only on proven failure |
| deposits_pause_changed | paused, actor_id, reason_ref, config_version | Operational control audit |

No names, contacts or private purpose text. Each observation stores network, epoch, contract/code version, final block hash/height, receipt_id, log_index and data_index. Unique event key includes all provenance fields needed to distinguish records. A tx hash alone cannot identify multiple logs.

## Verification / acceptance

Check trusted emitter, final receipt outcome, schema version, operation payload, accepted token and recipient/amount. Logs are evidence candidates; failed/rolled-back calls cannot credit users. Reconcile aggregate vault state to projected liabilities at recorded checkpoints. Persist cursor only in the same database transaction as committed effects/outbox. Replay duplicate/out-of-order events safely and quarantine unknown schema. Public-chain indexing is distinct from private analytics.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Event Processing](../10-backend/EVENT_PROCESSING.md)
