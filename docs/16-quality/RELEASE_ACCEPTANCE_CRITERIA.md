# Release acceptance criteria

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Define explicit documentation, testnet and production gates.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Documentation gate

All required files exist; metadata/links/traceability/placeholder register validated; recommendations remain visibly unapproved. Owner reviews D01–D24 and the implementation roadmap. Legal drafts remain unpublished. File completeness is distinct from product approval.

## Approved implementation/testnet gate

Scope/assets/network/wallet/custody/rules/fees/authority/config approved; actual compatible toolchain pinned; complete screen/API/contract states implemented; server/on-chain authorisation and exact units enforced; financial invariants, duplicate/failure/concurrency tests pass; reconciliation has zero unexplained per-asset differences; accessibility and performance criteria met; admin visibility, notices, audit, backup/restore and incident runbooks exercised. No secrets; recorded code/config hashes and real testnet evidence.

## Mainnet gate

Separate explicit owner release/deployment consent; legal classification and final published documents, entity/contacts/countries/age/identity policy, independent exact-build security review, production governance/key ceremony, operational targets/support and rollback/exit rehearsal. No open publication placeholders or unapproved real-money limits. Testnet acceptance alone cannot satisfy this gate.

## Definition of done

A feature requires documented/approved behaviour, all UI states, frontend/backend validation as applicable, enforced permissions, authoritative financial proof, duplicate/failure recovery, safe analytics/audit, relevant tests, accessibility/responsive checks, updated docs and owner acceptance. Polished UI alone is incomplete. Present a phase completion report with limitations; no such implementation report exists yet.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
