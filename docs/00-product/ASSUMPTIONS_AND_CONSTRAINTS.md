# Assumptions and constraints

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Technical lead

## Purpose

Make planning assumptions visible and reversible.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Evidence versus proposals

Evidence: only the supplied specification exists. There is no selected stack, deployed contract, audit, partner, support address or legal entity. Brand palette and slogan are supplied preferences. All application behaviour described in this set is proposed.

Planning baseline: one NEAR testnet, one approved test asset, user-held external wallet keys, contract-controlled goal balances, flexible exits, no yield, no pooled funds, non-monetary points and descriptive savings history. This baseline is conditional on approval; it is not a custody determination. Tinye-controlled upgrade keys could affect assets and must be assessed explicitly.

## Constraints and failure responses

Do not implement, install a project stack, provision services, migrate data, create credentials, deploy or move funds before explicit approval. Do not alter the master. Record safe environment placeholders in Markdown; actual `.env.example` waits for authorised configuration work. No token address or ABI is invented. No final logo export is claimed during documentation.

Official documentation is mutable and not an execution test. Recheck packages, sandbox binary, compiler, wallet capabilities and network protocol at implementation time. Public testnet can reset. Chain history cannot be erased by deleting a database row. Provider outages require unknown states and reconciliation, never guessed success.

## Acceptance

Every future phase starts with its decision dependencies resolved, keeps a record of adopted versions and returns a completion report with tests and limitations. Launch country selection triggers jurisdiction-specific research and counsel review.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Project Status](../../PROJECT_STATUS.md)
- [Architecture Decisions](../../ARCHITECTURE_DECISIONS.md)
