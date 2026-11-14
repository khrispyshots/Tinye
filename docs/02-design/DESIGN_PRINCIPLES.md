# Design principles

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Design lead

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Turn the visual direction into operational UX rules.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Principles

Apple-like restraint and premium fintech clarity are qualities, not templates to copy. One primary decision per screen; confirmed balance first, goal progress second, support detail progressively disclosed. Use whitespace to separate concepts while keeping amounts and their asset labels together.

Explain before asking: custody before wallet connection, terms before commitment, fees before signing. Keep financial reviews on full pages; use sheets for short contextual choices. Destructive actions require clear consequences and a specific label. Never rely on animation, colour or a disabled button alone to communicate eligibility.

## Acceptance

A mobile user can identify environment, amount, asset, destination, fee payer and current status without opening hidden controls. Loading does not show fictional values; zero means a verified zero, while unavailable means not known. Content scales to 200% and reflows at 320 CSS px. Network loss preserves safe form values and exposes status/help; it cannot manufacture a successful transaction.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
