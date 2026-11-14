# Treasury and operations

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / finance / demo lead

## Purpose

Separate operating assets from customer liabilities and authorities.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Boundaries

Operating cash, network-gas/storage reserve, future reward funding and user vault liabilities require separate records/accounts and authorised use. No operator may borrow, pledge, lend or spend user assets for platform costs. Native operating balance is not counted as user savings; fees are recognised only under an approved transparent model.

## Governance proposal

Named finance/deployment roles, independent approval of sensitive transfers/configuration and auditable signer inventory. Exact entity, banking/custodian partners, thresholds, signers and production powers remain open. Do not imply a banking relationship or insurance. Testnet funding uses clearly labelled test assets only.

## Acceptance and failures

Per-asset reconciliation compares liabilities, reservations, attributable holdings and separately identified operating reserve. Any shortfall is an incident, not an opportunity to net balances silently. Future yield losses and liquidity queues need separate allocation rules before integration. Treasury reports use integer units, source checkpoints and lawful retention; no real funds moved in planning.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
