# Savings edge cases

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Define safe behaviour for adverse financial conditions.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Case matrix

| Case | Required outcome |
|---|---|
| More decimal places than asset | Reject and explain precision; no silent rounding |
| 0, negative, exponent notation, huge amount | Reject under canonical amount bounds |
| Duplicate intent/event | Return original outcome; one ledger effect |
| Two withdrawals against same balance | Contract reserves atomically; second fails if insufficient |
| Wallet rejects | Cancel before submission; no debit or reward |
| Wallet returned no hash / RPC timeout | Unknown; recover by evidence, do not resubmit blindly |
| FT transfer-call returned unused tokens | Credit only retained amount; reconcile refund |
| Unsupported FT called receiver | Authenticate token predecessor; refuse credit/return unused safely |
| Direct transfer without goal reference | Unattributed review; no fabricated goal or refund authority |
| Callback out of gas/fails | Retain recovery-required reservation; no second transfer or automatic restore |
| Indexer delayed / replayed | Pending/freshness marker; deduplicate final evidence |
| Goal closed while operation pending | Reject closure until operation resolved |
| Account restricted/closed | Preserve records and lawful eligible exit; no arbitrary admin seizure |
| Target edited during deposit | Version conflict for metadata; balance credit unaffected by target |
| Testnet reset | Label lost test history, reinitialise only with documented environment epoch |

## Acceptance

Every case has a named QA test in the integration/contract plans. Support can inspect evidence but cannot manufacture balances or mark financial success without verified receipts. A discrepancy remains visible with an incident ticket until resolved.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
