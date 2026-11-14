# Backend observability

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Expose financial correctness without leaking user data.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Signals

Structured safe logs carry request_id, operation_id, environment, network/epoch, worker version, source checkpoint, transition and error code. Public receipt references are restricted operational data, not general analytics. Never log keys, seed phrases, session tokens, complete signatures, raw consent payloads or unrestricted personal profiles.

Track pending/unknown age distributions, receipt errors, index lag, reconciliation count/amount differences per asset, reservation age, outbox retries, reward duplicate suppression, auth rejection/rate-limit events and privileged actions. Never combine token units into one unlabeled total.

## Alerts and acceptance

Any unexplained financial difference, unauthorised role action or unexpected code/key change requires urgent review. Thresholds and escalation contacts remain D24; do not invent response guarantees. Dashboards separate app, RPC, wallet and indexer failures. Trace one operation through API, chain receipt, projection, reward and notice using restricted correlation IDs. Verify redaction and alerts in a rehearsal with synthetic secrets only.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Monitoring And Alerting](../17-operations/MONITORING_AND_ALERTING.md)
