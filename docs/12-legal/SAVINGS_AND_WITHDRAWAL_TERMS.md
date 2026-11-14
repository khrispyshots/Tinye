# Savings and withdrawal terms — draft

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Qualified counsel / privacy lead / product owner

## Purpose

Align user terms to financial state and access rules.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

> **Unpublished legal draft. Not legal advice or evidence of compliance. Do not publish until counsel reviews the actual product, jurisdictions and every unresolved placeholder.**

## Proposed product rules

One goal has one approved asset/network and an owner. Goal names/dates/targets are planning metadata, not an insured deposit or automatic debit mandate. Contributions count only after verified acceptance. Available balance excludes unresolved withdrawal reservations and any explicitly approved constraints; stale/unknown data cannot be called available.

Proposed testnet mode is flexible, with no principal lock or platform early-exit penalty. Network/storage charges may still apply and must be reviewed before signing. Limits/fee payer/amounts are [FEE AND LIMIT POLICY — TO BE CONFIRMED]. Custody, permissions and upgrade risk are [CUSTODY AND CONTROL DISCLOSURE — TO BE CONFIRMED]. Do not use this draft to impose committed modes.

## Failures, restrictions and closure

Wallet rejection is different from an on-chain failure; a timeout may be unknown. Do not retry as a new transfer before checking status. Failed execution may still incur fees. Eligible exits remain available during a proposed deposit pause; any broader restriction requires separately reviewed authority. Closure cannot erase public records or unresolved liabilities. Wrong-asset transfers are not automatically accepted and recovery is not promised.

## Acceptance

Terms, contract checks, API responses and labels must agree on availability, fees and outcomes. No rule change applies silently or retroactively. Complaint route is [SUPPORT CONTACT — TO BE CONFIRMED]; timings require an approved operational policy.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Legal Review Checklist](LEGAL_REVIEW_CHECKLIST.md)
