# Data retention and deletion policy — draft

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Qualified counsel / privacy lead / product owner

## Purpose

Define data classes and deletion behaviour without fabricated periods.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

> **Unpublished legal draft. Not legal advice or evidence of compliance. Do not publish until counsel reviews the actual product, jurisdictions and every unresolved placeholder.**

## Proposed retention schedule

| Class | Trigger / purpose | Period decision | Deletion / access |
|---|---|---|---|
| Profile/goal narrative | Active account / user service | [RETENTION SCHEDULE — TO BE CONFIRMED] | Owner controls; erase/pseudonymise eligible data |
| Identity/session/challenges | Security and access | Same counsel-approved schedule, short-lived by design | Expire/revoke; restricted auth service |
| Financial journal/receipt evidence | Reconciliation, disputes and applicable obligations | Same schedule, law and holds mapped per country | Restricted verifier/auditor; immutable correction history |
| Consent/version artefacts | Demonstrate accepted rules | Same schedule | Preserve hashes/content versions lawfully |
| Rewards/fulfilment | Benefit correction/disputes | Same schedule | Ledger lineage and minimised supplier data |
| Support/audit/security logs | Investigation/accountability | Same schedule | Purpose-limited staff |
| Analytics | Aggregate measurement | Same schedule | Minimise, rotate IDs, delete eligible events |
| Backups | Recovery | Same schedule and backup expiry | Encrypted, limited restore; reapply deletion tombstones |
| Public blockchain | Independent public record | Not controlled by Tinye | Cannot promise erasure |

## Request flow

Authenticate proportionately; inventory linked records; assess unresolved balances/operations, mandatory retention and legal holds; fulfil eligible access/export/correction/deletion; explain lawful retained categories and public-chain limits. Do not delete financial evidence to disguise liability. Hold records need owner, reason, review date and release workflow; not indefinite by default.

## Acceptance

Counsel maps purpose/base/period to jurisdiction, vendor backups and transfers. Test deletion, partial legal hold, restored backups, orphaned identifiers and delayed jobs. Minimise private data on-chain from the start; no fabricated universal retention period.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Legal Review Checklist](LEGAL_REVIEW_CHECKLIST.md)
