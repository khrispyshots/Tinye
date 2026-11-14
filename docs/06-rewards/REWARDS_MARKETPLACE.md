# Rewards marketplace

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Define a disabled MVP catalogue and later stock requirements.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## MVP disposition

Real rewards and catalogue redemption are unavailable. An informational page may explain that points have no cash value and no redemption promise. Do not render fake merchants, stock, discounts or fulfilled activity as live.

## Later catalogue contract

Each item needs supplier identity/agreement, description, actual benefit, point price, eligibility/region, stock source, fulfilment method, expiry/limitations, tax/legal review and refund terms. Catalogue versions are immutable for a submitted redemption; price changes cannot silently charge more. Merchant-funded benefits need evidence and funded capacity.

## Acceptance / failures

Out-of-stock items cannot be redeemed; stock and point reservation must be atomic with the redemption request. Missing partner/fulfilment capability keeps the feature disabled. Test last-item concurrency, changed price, suspended supplier, region mismatch and inaccurate availability. Ads and sponsored placement require disclosure. Approval of noncash points does not approve a marketplace.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
