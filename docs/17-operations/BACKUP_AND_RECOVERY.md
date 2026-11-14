# Operations backup and recovery

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Coordinate application, database, manifests and key recovery.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Recovery inventory

Encrypted SQL snapshots/PITR where available; immutable consent artefacts; source/build/config manifests; verified contract code hashes; audit integrity data; worker checkpoints; legal-hold/deletion tombstones. Operator keys follow separate secure recovery policy; no user keys are backed up by Tinye. Selected host/database vendor must demonstrate supported restore/export and regions.

## Rehearsal

Restore to an isolated network namespace with outgoing financial actions, notices and provider fulfilment disabled. Verify schema/build, owner access, journal sums, idempotency uniqueness, source checkpoint alignment and deletion tombstones. Rebuild projections from final chain evidence and compare per-asset liabilities/reservations. Resume consumers only after duplicate prevention is verified.

## Acceptance and unresolved targets

Record measured recovery time and data-loss window, then owner approves RTO/RPO, backup frequency/retention and incident contacts under D24/D23. No numerical service guarantee is invented. Test corrupt snapshot, lost config, unavailable vendor and orphaned outbox. Public chain availability does not recover private consent/profile data; database backup does not roll back chain effects.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
