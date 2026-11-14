# Backend authorisation model

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Enforce identity and object permissions on every request.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Rules

Session identity selects user_id; never trust a request body user_id. Every goal, wallet, operation, reward and export query scopes by owner before lookup/pagination. Wallet linking requires proof and recent authentication; app identity recovery cannot reassign on-chain funds. Role membership is server-side, expiring and revoked on removal.

Support reads redacted ticket-related data. Reconciler can schedule verification and inspect evidence, not alter authoritative balances. Reward manager proposes corrections/catalogue edits; independent approver confirms sensitive adjustments. Risk role restricts off-chain access with reason/appeal. Auditor reads append-only audit reports. Security admin grants time-limited roles; no role grants user spending rights.

## Acceptance / abuse cases

Test IDOR across every resource, forged roles, stale sessions, changed wallet account, CSRF and privilege escalation. Use field allowlists to prevent mass assignment of balances, roles, status or asset after funding. Database policies may supplement API checks but do not replace them. Admin reads are logged where privacy-sensitive. On-chain caller checks remain independently necessary.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Roles And Permissions](../11-admin/ROLES_AND_PERMISSIONS.md)
