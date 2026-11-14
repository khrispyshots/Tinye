# Success metrics

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product analyst

## Purpose

Measure meaningful adoption and financial correctness without invented targets.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Measurement contract

| Metric | Numerator / denominator or definition |
|---|---|
| Onboarding completion | Completed / eligible onboarding starts, unique user cohort |
| Wallet completion | Verified connections / wallet flow starts |
| First-goal creation | Users creating first goal / eligible newly onboarded users |
| First verified deposit | First confirmed depositor users / users with a goal |
| Active savers | Users with at least one verified contribution in selected period |
| Contribution frequency | Confirmed eligible deposits per active saver per period |
| Goal completion | Completed goals / active goal cohort; report elapsed time |
| Withdraw success/failure | Confirmed or failed operations / resolved submitted withdrawals; unknown separate |
| Redemption | Fulfilled redemptions / eligible redemption requests; N/A while disabled |
| Support burden | Tickets / active users; classify financial incidents separately |
| Reconciliation accuracy | Matched liabilities / checked liabilities, plus count and amount of differences per asset |
| Security | Confirmed incidents by severity; no claim of safety from zero reports |
| Retention | Cohort users returning or contributing in stated week/month window |

Use UTC processing timestamps and a documented reporting timezone. Always show cohort, environment, observation window, missing data and unknown status counts. Never mix demo activity with testnet confirmations or mainnet analytics.

## Acceptance

Product events can be reconciled to authoritative operational counts without putting public wallet addresses into analytics. Targets remain unset until a baseline and business approval exist. Reconciliation uses exact counts and base units; statistical sampling alone cannot settle liabilities.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Metrics Dashboard](../15-analytics/METRICS_DASHBOARD.md)
- [Event Taxonomy](../15-analytics/EVENT_TAXONOMY.md)
