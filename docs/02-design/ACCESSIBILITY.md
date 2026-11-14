# Accessibility requirements

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Accessibility / QA lead

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Set testable inclusive interaction requirements.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed standard and checks

Target WCAG 2.2 AA; conformance is not claimed until audited. Use semantic landmarks/headings, explicit form labels, descriptive links, status announcements and logical focus order. All functionality must work by keyboard; focused controls cannot be hidden under sticky navigation. Touch targets aim for 44px, exceeding the AA minimum where possible.

Normal text contrast 4.5:1; large text and meaningful UI graphics 3:1. Colour must be accompanied by labels/icons. Wallet dialogs and vendor handoffs are part of the tested journey; inaccessible provider UI is an evaluation failure, not an exemption. Charts need equivalent tables. Amounts must announce units and separate decimal value from status.

## Acceptance / edge cases

Test screen reader plus keyboard in onboarding, amount entry, review, wallet handoff, pending status, goal editing and closure. Support 320px reflow, text spacing and reduced motion. Validation errors link from a summary to fields and preserve input. Session timeouts warn and allow safe continuation where security permits; expired signatures require fresh review. Record manual findings alongside automated scans. See official WCAG reference in the quality plan.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
