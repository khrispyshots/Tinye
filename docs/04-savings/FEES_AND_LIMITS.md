# Fees and limits

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Separate network costs, storage and platform charges.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed configuration model

Per `(network, asset_id, rule_version)` record: exact token contract, decimals, min_deposit_units, max_deposit_units, max_goal_units, max_withdrawal_units, operational exposure cap, fee_policy_version and activation time. Bounds remain unset until approved; an unconfigured asset is disabled, not unlimited. Do not assume stablecoin decimals from its symbol.

Testnet recommendation: no platform service/withdrawal fee. User pays disclosed network execution and any required token/vault storage registration; fee payer and reserve policy require D20. Estimates show units, source/time and variability. Network fees may apply to a failed transaction; storage deposit is not described as a service fee. Gas funds cannot be counted as available savings.

## Acceptance

Validate minimum, maximum, exactly-on-boundary, available-minus-one and one-unit-over cases with integer arithmetic. Fee bounds are enforced by the contract if applicable and versioned in legal copy. No hidden spread, automatic principal penalty or fee collected through reward deduction. Unknown fee estimates block signing or require a reviewed explicit fallback; never show zero by default. USD equivalents require a separate approved price source.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Fee Model](../18-business/FEE_MODEL.md)
