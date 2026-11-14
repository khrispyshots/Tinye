# Strategy integration

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Define evidence required for a future integration.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Due-diligence record

Capture provider legal entity, docs/version, contract address and code hash, token identity/decimals, supported network, independent security reports, administrator/upgrader keys, custody path, sanctions/region rules, liquidity constraints, operational history and failure support. No provider or address has been selected.

Adapter contract proposal: inspect capacity; quote allocation/exit and fees; obtain versioned consent; user-authorise deposit; track position/shares; reconcile realised result; request exit; settle or record loss/queue. Do not treat an HTTP 200 or quoted APY as financial settlement.

## Acceptance and edge cases

Sandbox and provider-approved test environment must cover partial fill, illiquid exit, depeg, negative return, strategy pause, callback failure, upgrade and emergency redemption. Compare independently verified holdings with user liabilities. Strategy treasury and user funds remain separate. If provider cannot supply auditable balance/receipt evidence or an exit plan, reject integration. A documentation listing is not endorsement.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
