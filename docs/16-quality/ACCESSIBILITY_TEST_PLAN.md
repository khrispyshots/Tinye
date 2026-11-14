# Accessibility test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Validate inclusive access across the complete financial journey.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned tests

A11Y-01 keyboard-only onboarding, nav, tabs, sheets/dialogs and financial review; focus visible, ordered and restored. A11Y-02 screen-reader labels, errors, amounts/asset units and polite transaction status announcements. A11Y-03 actual text/control/focus contrast, colour-independent status and chart/table equivalents. A11Y-04 320px reflow, 200% text/400% zoom, text spacing, long values and safe sticky navigation. A11Y-05 reduced motion, optional celebration and no flashing. A11Y-06 selected external wallet handoffs, mobile return and session-expiry warning.

Use automated scanning plus manual assistive-technology sessions; browser-only scans do not prove wallet accessibility. Record device/browser/AT version and blocking task impact. Target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) (official recommendation consulted 2026-11-14; published version dated 2024-12-12).

## Acceptance

All core tasks can be completed without sight, mouse or precise touch. No hidden fee/risk text or success dependent on colour/animation. Resolve material barriers before release; do not claim conformance until verified on implemented screens. Current token contrast calculations are documentation checks only.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
