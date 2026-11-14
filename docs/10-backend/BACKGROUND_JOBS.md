# Background jobs

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Define durable responsibilities and safe retries.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Job catalogue

| Job | Trigger / authority | Idempotency and failure behaviour |
|---|---|---|
| Pending-status verifier | Submitted/unknown operation; RPC receipts | Read retries only; operation/effect uniqueness |
| Chain catch-up | Checkpoint cursor | Transactional cursor + event commit; epoch aware |
| Reconciliation | Approved schedule and incidents | asset+checkpoint unique; mismatch alerts |
| Reward grant/reversal | Verified financial outbox | Source/rule unique and atomic cap |
| Notification delivery | Outbox and consent preferences | source+channel+template unique; provider reference |
| Consent/version notice | Approved document publication | user+document version unique |
| Export/deletion | Verified owner request and legal schedule | Request ID and legal-hold check |
| Backup verification | Operations schedule | Snapshot/build/run IDs |

Proposed cadence: frequent pending polling with adaptive backoff, periodic catch-up, daily full liability check plus event-triggered mismatch checks. Exact cadence, retry caps and alert thresholds require D24. No strategy allocation, automated debit or real redemption job is enabled.

## Acceptance

A lease expires safely on crash; fencing prevents stale workers from committing after takeover. Retry HTTP/RPC reads and idempotent provider calls only; do not retry signing/transfers autonomously. Exhausted jobs retain evidence and actionable dead-letter reason. Test restart, lease race, duplicate delivery and provider downtime.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
