# Component library

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Design systems / frontend leads

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Define reusable behaviour and all applicable interaction states.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Common state contract

Interactive controls support default, hover (pointer only), visible focus, active, disabled and loading. Forms additionally support valid/success and inline error with associated text. Display-only components have default/loading/empty/error/success where meaningful; hover/active/disabled are not fabricated for static text. Loading prevents duplicate submit while preserving an accessible status. Target size proposal is at least 44×44 CSS px.

| Component | Behaviour / validation | Responsive and accessibility |
|---|---|---|
| Primary / secondary / tertiary / destructive buttons | One primary action; specific verb; destructive review; loading retains width | Native button, focus ring, disabled reason nearby |
| Text / password / verification fields | Persistent label, length bounds, paste supported; password reveal announced; OTP one logical input | Error via described-by, autocomplete purpose, no placeholder-only labels |
| Numeric amount | Decimal string, asset suffix, exact precision, max available excludes reservation/gas | Decimal inputmode, no spin step that changes money, speak asset |
| Selectors / date pickers | Search when long, explicit timezone, optional date clear | Native where possible; keyboard list navigation and text date alternative |
| Goal cards | Name, amount/asset, target, progress, next action | Full-width mobile, real link, progress text; no nested conflicting click targets |
| Balance cards | Confirmed/available/reserved, as-of time, environment | Long numbers wrap safely; never clip decimals |
| Linear / circular progress | Confirmed amount / target; capped visual with uncapped text | Accessible value/text; reduced motion; no success before verification |
| Transaction rows / badges | Status, amount, asset, timestamp and details link | Mobile stacked rows; icon and label, not colour alone |
| Bottom nav / desktop sidebar | Home, Goals, Save action, Rewards, Profile | Current page announced; save is action not false page; safe-area padding |
| Tabs | Switch related views, preserve filter state | Arrow-key navigation; scrollable labels, selected semantics |
| Modal / bottom sheet | Short choice; dismiss returns focus; financial review uses page | Dialog title, focus containment, Escape unless critical action in flight with explanation |
| Tooltip | Supplemental explanation only | Keyboard focus and touch alternative; never hide fees |
| Toast / alert | Toast noncritical; persistent alert for financial errors | Polite status, assertive only urgent; actionable errors remain visible |
| Skeleton / empty / error | Preserve layout; explain lack of data and retry | No fake amounts, decorative skeleton hidden to AT |
| Confirmation | Result, amount/asset, receipt, next step | Heading focused, status text and testnet label |
| Charts | Verified time series with source/as-of | Table alternative, labelled axes, patterns, keyboard accessible details |
| Reward / achievement card | Eligibility, point amount, evidence and reversal caveat | No cash equivalence; later redemption clearly unavailable |
| Table / filters | Server pagination, stable sort, filters and clear action | Card rows on mobile; headers/caption and filter labels |

## Acceptance

Catalogue each component's state examples after approval; test keyboard, screen reader, 320px reflow, touch, low bandwidth and reduced motion. Every error retains user input safely. Unsupported state combinations such as confirmed+loading are rejected by component contracts.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
