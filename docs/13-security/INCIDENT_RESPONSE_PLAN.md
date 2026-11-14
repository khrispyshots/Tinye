# Incident response plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Define containment and truthful escalation without invented contacts.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Severity proposal

Sev1: suspected asset loss, unauthorised contract/key change, material personal-data exposure or active takeover. Sev2: reconciliation mismatch, persistent unknown payouts or significant auth/provider outage. Sev3: contained nonfinancial degradation or isolated recoverable job issue. Security lead confirms scope and severity; named on-call personnel/contacts and time targets remain D24 blockers.

## Response workflow

Detect → preserve safe evidence/checkpoints → assign incident commander → assess impact → contain within approved authority → communicate verified facts → recover/reconcile → legal notification assessment → post-incident review. Deposit pause requires authorised signers; do not improvise principal seizure or broad freeze. Revoke compromised app sessions/credentials separately from wallet or contract keys.

Notify users with known status and next update policy, never invented loss/recovery figures. Counsel assesses regulator/data-subject notifications and deadlines for actual jurisdictions; no universal deadline is assumed. Recovery requires code/key/state verification and zero unexplained financial differences.

## Acceptance

Run tabletop for key compromise, callback failure, data breach and provider outage. Keep contact/escalation roster private but operational. Record evidence integrity, decisions, affected versions and corrective actions. No secret payloads in incident tickets.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
