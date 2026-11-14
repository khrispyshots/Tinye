# QA strategy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Define evidence-based verification across product, data and chain.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Test layers and coverage goals

Unit tests cover exact-unit conversion, validation, state transitions, rule/cap calculations and policy decisions. Integration tests cover session/ownership, SQL transactions/outbox, receipt verification, replay and reconciliation. Sandbox tests cover contract invariants and external failures. E2E tests exercise actual approved testnet journeys, wallet handoffs, accessibility and responsive layouts. Security/performance/recovery tests gate release separately.

Coverage goal is every major traceability row, every financial invariant, every applicable screen/global state and every public API/contract permission/failure branch. A numerical line-coverage threshold requires agreed toolchain/baseline; none is fabricated. Coverage is evidence of exercised code, not proof of safety.

## Test data and evidence

Use synthetic identities, local/Sandbox assets and clearly labelled testnet accounts. Never use real seeds, production dumps or personal data. Record test ID, requirement IDs, build/config/network/epoch, expected/observed outcomes, receipts/checkpoints and reviewer. Current test status: **planned, not executed**; no application exists.

## Acceptance

Financial results reconcile per asset with no unexplained differences; duplicate/concurrency/failure paths preserve liabilities; all material security/accessibility issues resolved or explicitly accepted by authorised reviewers. Each phase produces a completion report and known limitations. Tests cannot substitute for owner/counsel/security approval.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
