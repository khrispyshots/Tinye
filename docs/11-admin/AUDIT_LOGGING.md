# Admin audit logging

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / security lead

## Purpose

Preserve evidence of privileged access and changes.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Audit contract

Append records with actor_id, authenticated role/session reference, action, resource type/id, reason, request_id, occurred_at UTC, outcome and redacted before/after values. Record sensitive reads, exports, role changes, risk restrictions, reward adjustments, configuration proposals and reconciliation runs. Record on-chain control/deploy evidence references separately with signer/artefact hash.

Do not log credentials, full signatures, private goal narrative or unrestricted support messages. Access to audit records is itself purpose-bound and logged. Integrity storage should resist application-role modification; exact append-only/object retention implementation requires vendor selection.

## Acceptance and failures

Sensitive mutations fail safely if mandatory audit persistence cannot commit; a delivery outage queues evidence transactionally. Auditors can correlate changes to approvals and chain events without editing them. Test tampering, missing reason, actor impersonation, clock drift and restore continuity. Retention/erasure exceptions require the approved legal schedule, not indefinite storage by default.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
