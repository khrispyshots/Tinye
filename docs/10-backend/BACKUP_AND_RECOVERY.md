# Backend backup and recovery

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Restore private state without replaying financial effects.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Recovery plan

Use encrypted database backups with point-in-time recovery if selected vendor supports it; exact vendor, retention and RPO/RTO are unapproved. Back up consent versions/hashes, goal metadata, journals, idempotency records, role/audit data, outbox and worker checkpoints. Private keys are managed separately, not copied into database snapshots.

Restore into an isolated environment, disable outbound signing/delivery and verify schema/build. Reconstruct chain projections from known final checkpoints, preserve original event/effect uniqueness and reconcile liabilities/reservations. Never resend historical withdrawals or duplicate reward/notification delivery merely because an outbox was restored.

## Acceptance and failures

A recovery rehearsal verifies counts, foreign keys, journal sums, consent artefacts, owner access and zero unexplained per-asset differences; document measured recovery time and lost-data window before approving targets. Hold legal deletion requests consistently across backup lifecycle; after restore reapply deletion tombstones/holds under policy. Test missing backup, corrupted snapshot and checkpoint newer than restored data.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Backup And Recovery](../17-operations/BACKUP_AND_RECOVERY.md)
