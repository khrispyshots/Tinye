# Yield product specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Gate earnings behind real provider, financial and legal evidence.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## MVP disposition

Yield is unavailable. Do not display an APR/APY, projected cash earnings, withdrawable yield balance or a simulated rate in the live testnet savings view. Educational examples must live in a separately labelled demonstration with non-real test data and no redemption claim.

## Later product contract

Before enabling, record strategy source/counterparty, verified contracts, network/asset, administrator powers, user eligibility, fees, liquidity/exit queue, loss allocation, rate source/time, attribution formula and emergency procedure. Separate principal, accrued estimates and realised earnings. Strategy selection needs security diligence, legal classification and explicit owner/user approvals.

## Acceptance and failures

Provider outage disables new allocations; stale rates show unavailable, not last rate as current. Losses must be disclosed and reflected without hiding them in principal or reward balances. No fixed return, insurance or deposit protection claim without real supporting structure and counsel approval. D07/D08 block any strategy code.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Risk Disclosures](RISK_DISCLOSURES.md)
