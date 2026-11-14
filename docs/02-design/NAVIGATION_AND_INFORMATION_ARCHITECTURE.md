# Navigation and information architecture

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** UX architect

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Keep savings tasks reachable across screen sizes.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed routes

Public: `/`, `/welcome`, `/how-it-works`, `/auth`, `/legal/:document`. Onboarding: `/onboarding/wallet`, `/onboarding/consent`, `/onboarding/profile`, `/onboarding/complete`.

Authenticated: `/home`, `/goals`, `/goals/new`, `/goals/:id`, `/goals/:id/edit`, `/save`, `/withdraw`, `/wallet`, `/transactions`, `/transactions/:id`, `/rewards`, `/profile`, `/settings`, `/security`, `/wallets`, `/help`, `/notifications`, `/account/close`. Optional later `/earnings`, `/reputation`, `/groups` and `/rewards/catalogue` are unavailable unless approved. Admin routes live behind separate privileged authorisation under `/admin`.

Mobile bottom navigation: Home, Goals, Save, Rewards, Profile. Save launches goal/amount selection; browser Back returns safely without resubmitting. Desktop sidebar uses Home, Goals, Activity and Rewards, with Profile and Help lower down. Activity opens the canonical transaction history route; Save is the prominent Add to goal action rather than another sidebar destination. Wallet/settings remain secondary routes. Legal/help remain accessible outside a signed-in session.

## Acceptance / edge cases

Deep links require login then return to the intended resource only after owner checks; expired sessions do not leak another user's details. Unknown goal IDs get a non-disclosing not-found response. URL parameters never carry secrets, signatures or personal goal names. Filters use shareable safe parameters. Account closure and unsupported network cannot strand the user without help or eligible exit information.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
