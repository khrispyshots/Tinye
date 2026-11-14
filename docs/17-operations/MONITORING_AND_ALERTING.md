# Monitoring and alerting

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Track user impact and financial integrity before enabling deposits.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Signals and proposed routing

| Signal | Required response |
|---|---|
| Any unexplained asset liability/reservation mismatch | Security/finance incident; approved deposit containment; preserve exits |
| Unexpected code/key/authority change | Urgent security review and verified evidence |
| Unknown/pending age or index lag | Check RPC/receipt/provider health and communicate stale status |
| Outbox/dead-letter growth | Inspect consumer/provider, safe deduplicated retry |
| Auth abuse / admin privilege anomaly | Security review, session/role controls |
| Backup failure / restore drift | Recovery owner escalates; release blocked without viable backup |
| Frontend/API error or latency rise | Operations triage with safe traces |

Thresholds, on-call contacts, support times and monitoring vendors are unselected D24 values. Alerts include environment/network/asset/checkpoint and restricted correlation IDs; no seeds, signatures or personal narrative.

## Acceptance

Synthetic test alerts reach actual assigned responders after approval, have runbook links and clear acknowledgement/escalation. Distinguish provider delay from contract failure and sent from delivered notices. No status page promises recovery time without evidence. Health dashboards are operational requirements before authorised testnet financial testing.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
