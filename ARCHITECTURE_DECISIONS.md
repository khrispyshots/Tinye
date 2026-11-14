# Architecture decision records

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Technical / security leads

## Purpose

Compare options without making an irreversible architecture selection.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](docs/00-product/PRODUCT_REQUIREMENTS.md).

## Proposed ADRs

| ADR | Status | Proposal / rationale | Alternatives / consequence | Gate |
|---|---|---|---|---|
| ADR-001 | Proposed | Modular app/API with SQL and worker; single ownership model | SPA plus API adds CORS/session/deployment seams; microservices add operational burden | D18 |
| ADR-002 | Proposed | Native NEAR testnet vault | Wallet tracker cannot enforce earmarking; custodian adds counterparty/control obligations | D02-D06 |
| ADR-003 | Proposed | Rust SDK with cargo-near, sandbox verification | Any alternate toolchain needs official support and equivalent financial tests | D18 |
| ADR-004 | Proposed | External wallet using current NEAR Connect guidance | Embedded provider needs recovery, export, region, custody and outage assessment | D04/D21 |
| ADR-005 | Proposed | Final execution + receipt verification, atomic idempotent SQL projection | Trusting UI or indexer webhooks can invent success or double-credit | D18 |
| ADR-006 | Proposed | No yield, groups, fiat or real redemption in MVP | Wider scope needs provider, liquidity, legal and fulfilment diligence | D07-D15 |
| ADR-007 | Proposed | Separate operational balances from reward and analytics stores | Reusing points or analytics as balances is financially unsafe | D13/D23 |
| ADR-008 | Proposed | Governed upgrade assessment; deposit pause with exit preserved | Immutable code reduces admin trust but constrains repairs; any upgrade authority can alter protections | D17/D19 |

## Selection and acceptance

No ADR is accepted. On approval record exact framework, provider and versions, contract owner/key powers, state migration strategy, test evidence and affected requirements. Architecture diagrams describe the vault option only and do not imply its approval. Do not claim self-custody for deposited funds merely because users hold signing keys.

## Failure conditions

A vendor without receipt access, supported wallet proof, safe key boundaries or transactional idempotency fails evaluation. A selected token without verified issuer/network/decimals is not eligible. A full-access deployment key may bypass method-level restrictions by replacing code; disclose and review this before any assets enter the contract.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](docs/00-product/DECISION_REGISTER.md)
- [Requirements Traceability](docs/00-product/REQUIREMENTS_TRACEABILITY.md)
- [Blockchain Architecture](docs/09-blockchain/BLOCKCHAIN_ARCHITECTURE.md)
- [System Architecture](docs/10-backend/SYSTEM_ARCHITECTURE.md)
