# Responsive behaviour

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** UX / frontend lead

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Specify reliable mobile, tablet and desktop layouts.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Layout rules

Below 640px use one column, 16px gutters and bottom navigation with safe-area padding. At 640–1023px use up to two goal columns with 24px gutters; navigation follows available space. At 1024px and above use sidebar and a maximum 1200px content area with 32px gutters; financial review stays within 680px reading width.

Tables become labelled transaction cards on narrow screens, retaining amount, asset, status and details. Balance numbers wrap at safe groups without ellipsis; decimal precision is available on detail. Sheets fit the viewport with internal scroll; keyboard opening keeps amount and primary action visible without obscuring disclosure. Forms have single-column reading order even when cards sit side by side.

## Acceptance and failure modes

Check 320/375/768/1024/1440 CSS px, portrait/landscape, 200% text and 400% browser zoom where applicable. No horizontal page scroll, trapped sheet, hidden fee, overlapping nav or unclickable sticky CTA. Avoid heavy images above the first useful content. Offline and long translated strings must preserve layout. Browser refresh on a pending transaction restores status lookup, not repeat submission.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
