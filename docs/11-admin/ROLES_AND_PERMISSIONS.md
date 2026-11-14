# Roles and permissions

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / security lead

## Purpose

Provide a least-privilege operational matrix.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed matrix

| Role | Read scope | Mutation scope | Extra control |
|---|---|---|---|
| Support | Assigned ticket and redacted user/operation | Ticket status and safe notes | Purpose-bound access |
| Reconciler | Operations, receipts, asset checkpoints | Schedule verification/reconciliation | No manual balance edit |
| Reward operator | Points evidence; later catalogue | Propose correction/fulfilment | Independent approval for sensitive correction |
| Risk reviewer | Necessary abuse evidence | Off-chain restriction with reason/review date | Appeal; no principal seizure |
| Auditor | Audit/reconciliation reports | None | Read-only export controls |
| Security administrator | Role/key metadata | Time-limited role grant/revoke | Independent approval; MFA |
| Deployment/governance | Reviewed contract artefact/config | Only separately authorised change | Outside ordinary app-admin role |

Default deny; no shared admin login. Named role holders and thresholds remain D17/D24 decisions. Production keys are separate from testnet.

## Acceptance

Enforce server-side on every route/job and review database permissions. Step-up for role changes, sensitive export, restrictions and financial-rule proposals. Time-bounded access expires automatically. No application role implies on-chain upgrade authority. Test cross-role mutation, self-grant, revoked session, stale permission cache and malicious direct requests.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
