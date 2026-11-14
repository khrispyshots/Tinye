# Admin operational runbooks

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / security lead

## Purpose

Specify reviewable responses to common operational failures.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Runbook matrix

| Trigger | First response | Recovery proof |
|---|---|---|
| Pending/unknown transaction | Inspect trusted RPC receipts, signer/network and intent; no new transfer | Verified terminal effect or unresolved case with next check |
| Reconciliation mismatch | Stop new deposits if authorised; preserve exits and snapshot | Replayed checkpoint with zero unexplained difference |
| Reward discrepancy | Freeze affected grants, inspect source/cap/rule | Audited compensation and deterministic ledger sum |
| Suspected compromised account | Revoke app sessions; warn user through verified channel | Identity verified; no false claim of wallet-key recovery |
| Contract/key change | Escalate security, inspect code/key inventory | Approved change evidence or incident containment |
| Provider outage | Mark stale, use reviewed read fallback | Consistent final evidence from healthy source |

## Acceptance

Each incident records owner, environment, timestamps, evidence, authorised actions, user impact and post-incident review. No operator SQL balance edit or unsupported manual callback is a recovery shortcut. Contacts, rotation and alert thresholds need named owners before deployment. Exercise runbooks during testnet acceptance.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
