# Reputation data governance

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Constrain profiling, sharing and corrections.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Governance model

Purpose is personal financial-habit reflection only. Inputs come from verified contribution/goal records, not device contacts, messages, location, religion, ethnicity, social graphs or purchased credit data. The profile is owner-only; staff access requires a support purpose and audit.

Store snapshot user_id, period, factor counts, source checkpoint, calculation_version and generated_at. Separate snapshots from immutable ledger evidence so inaccurate projections can be corrected. Do not send wallet addresses or habit profiles to general analytics. Retention and lawful basis remain counsel decisions under D23.

## Acceptance and edge cases

Users can export factors and challenge errors; corrections propagate to current summaries while audit lineage remains. Account deletion removes eligible private profile/snapshots under policy, not public blockchain history. Any external sharing, automated consequential decision or future underwriting reopens D14/D23 and requires a new impact assessment and notices.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
