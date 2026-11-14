# Rollback plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Separate reversible application changes from irreversible financial effects.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed rollback sequence

Identify failing build/config, halt affected new actions using approved scope, preserve final receipts and unresolved reservations, record incident/checkpoints and review compatibility. Revert frontend/API/worker to the last reviewed compatible artefact only when schema/event versions remain supported. Use additive migrations and compatibility windows where possible; destructive data rollback requires separate reviewed recovery approval.

Contract code rollback is not transaction reversal. A previous binary may be incompatible with new storage or pending callbacks. Rehearse state migration and reservations across upgrades; if safe rollback cannot be demonstrated, use a reviewed forward repair with explicit authority and user impact disclosure. Never wipe liability records or resend payouts from a restored queue.

## Acceptance

Test app rollback during pending deposit/withdrawal, worker schema drift, partial migration and duplicate event replay. Post-recovery reconciliation must have zero unexplained differences. Mainnet code changes, key actions and financial migrations require their own approvals; this plan is not deployment permission.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
