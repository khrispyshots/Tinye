# Metrics dashboard

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Define explainable cohorts and financial-quality measures.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Views

Acquisition/onboarding funnel: eligible starts → completed stages → wallet verification → first goal → first confirmed deposit. Report unique users, environment, cohort start and denominator at each step. Saving habits: active savers, contribution frequency, goal completion and return cohorts in stated week/month windows. No targets are invented.

Operational quality: resolved withdrawal success/failure, separate unknown/pending age, reconciliation mismatch counts and base-unit differences per asset, support ticket rate, security incidents, index lag and notification backlog. Reward view reports posted/reversed grants and later real fulfilment; redemption rate is N/A while disabled.

## Acceptance / bias controls

Display observation window, as-of time, timezone, data gaps, consent-related missingness and test/demonstration exclusions. Compare operational source counts to product events without joining wallet addresses into analytics. Do not improve a funnel by hiding rejected/unknown financial outcomes. Only verified outcomes count as conversion; amounts remain in restricted operational reporting.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Success Metrics](../00-product/SUCCESS_METRICS.md)
