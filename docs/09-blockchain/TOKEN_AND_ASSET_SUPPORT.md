# Token and asset support

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Prevent wrong-token, decimals and network ambiguity.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed allowlist

No actual token address is selected. Recommend one explicitly named test FT on native NEAR testnet, subject to D02/D03; native NEAR is needed for network/storage costs and is not implicitly a supported goal asset. No token is labelled USDC merely because a test contract uses that symbol.

For every enabled asset store network_id, environment_epoch, token_contract (or native marker), issuer/source evidence, display name/symbol, decimals, metadata/code verification checkpoint, supported transfer standard, storage registration policy, fee behaviour and approved limits. Verify asset identity through issuer documentation and on-chain metadata; symbols alone are untrusted.

## Amount conversion

Parse a normal decimal string, reject signs/exponents/excess decimals, convert to bounded integer base units. Display by exact division/padding using the configured decimals. Native NEAR uses its documented base-unit precision only if approved; FT decimals must be verified individually. Never mix token units, yoctoNEAR attached deposit, gas units and loyalty points.

## Acceptance

Wrong network, lookalike token, changed metadata, unsupported fee-on-transfer/rebasing behaviour and missing storage registration block use. Storage registration must be reviewed for sender, vault and withdrawal recipient. Separate mainnet allowlist requires new approval and identity verification; testnet addresses are never promoted by string substitution.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Fees And Limits](../04-savings/FEES_AND_LIMITS.md)
