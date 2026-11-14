# Integration test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Verify seams where duplicate and uncertain financial outcomes arise.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned cases

| ID | Setup / action | Expected result |
|---|---|---|
| INT-01 | Two auth verifications reuse one challenge | One session-authorised result, replay denied |
| INT-02 | User B requests A's goal/operation/export | Non-disclosing denial; no data mutation |
| INT-03 | Two workers ingest same final deposit | One event/effect/credit/reward/notice |
| INT-04 | Crash after event insert before projection/outbox | Transaction rollback or complete atomic commit; safe replay |
| INT-05 | Submitted hash wrong network/token/receiver/request | No credit; quarantined evidence |
| INT-06 | Missing/refund/partial acceptance receipts and delayed index | Exact retained units only; pending/unknown until evidence |
| INT-07 | Concurrent withdrawals/callback failure | Reservation safe, no duplicate payout or phantom restoration |
| INT-08 | Replay/rebuild final checkpoint | Same journal sums/projections and no duplicate reward/notice |
| INT-09 | Concurrent rewards at cap, reversal and ordinary exit | Approved cap, linked corrections; no principal penalty |
| INT-10 | Export/delete with legal hold and backup restore | Owner-only data; lawful retained classes and deletion tombstones |
| INT-11 | Admin mutation without reason/MFA/approver | Denied; sensitive action audit is atomic |
| INT-12 | Provider down / poisoned event / worker lease race | Stale status, dead-letter visibility, fenced worker commit |

## Acceptance

Use isolated SQL plus Sandbox and controlled provider failures, then selected testnet endpoints. Reconcile ledger, vault liabilities and reservations per asset at identical checkpoints. No production data or automatic financial resubmission. Tests remain planned.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
