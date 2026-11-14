# Tinye discovery and documentation status

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / technical lead

> **Current design update - 2026-11-14:** owner locked Friendly Green revision 4 as the default interface. [design.md](design.md) and [ui.md](ui.md) are the implementation reference. This supersedes the original report only for visual-direction approval; no application code or deployment is authorised.

## Purpose

Report what exists and distinguish proposed work from verified implementation.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](docs/00-product/PRODUCT_REQUIREMENTS.md).

## Repository inspection

Inspection on 2026-11-14 found exactly one supplied file: `Tinye_Master_Project_Specification.md` (1,919 lines, read in full). There is no `.git` directory, package manifest, source directory, dependency lockfile, design asset, environment configuration, application, contract, test or previous documentation. No applicable AGENTS.md was found in the workspace or inspected ancestor locations. Git status is unavailable because this is not a Git repository. No existing work was overwritten.

| Area | Observed status | Gap / conflict |
|---|---|---|
| Product | Master brief only | All behaviour unimplemented |
| Stack / hosting | None selected | Architecture requires approval |
| Brand / design | Palette and direction in brief | No wordmark, tokens or assets implemented |
| Financial workflows | None | No balances, deployments, activity or audits exist |
| Documentation | This draft set | Pending owner and qualified legal review |

No implementation conflict exists; there is no implementation to compare. Tensions within the brief are resolved explicitly: admin visibility belongs in core MVP, notifications include core transaction/security messages, while yield, groups, real redemption and advanced scoring remain conditional. `.env.example` is represented as a safe documentation template until code/configuration is authorised.

## Discovery recommendations and trade-offs

Prefer one TypeScript application/backend plus PostgreSQL and a durable worker, with a separately reviewed Rust vault. A React SPA plus separate API simplifies static hosting but adds deployment/session complexity; a unified full-stack app reduces operations. Exact framework and vendors remain open. A wallet-only metadata tracker has lower custody exposure but cannot enforce earmarking; a contract vault supports enforceable goal accounting while introducing contract and upgrade risk. Embedded wallets simplify onboarding but add recovery, provider and key-control dependencies.

## Research and generation plan

Official NEAR docs, upstream releases, SEC Nigeria, CBN, NDPC and FCCPC sources were consulted on 2026-11-14. The research register records observed versions and changing APIs. NEAR Connect replaces deprecated Wallet Selector. Generate all required domain documents; expand screens, schema, API, contract and legal registers; validate existence, links, duplicates, traceability and shared state/financial semantics; then stop for approval.

## Completion boundary

Documentation drafted; implementation completion is zero. See the documentation index and validation report for exact inventory and verification results. Legal suitability and SDK compatibility have not been proven by execution. No application code, deployment, migrations, provider provisioning, credentials or real funds were created or changed.

## Approval blockers

MVP, assets/network, wallet/custody, withdrawal policy, rewards, jurisdiction/entity, vendors, contract authority, quantitative limits and testnet plan require owner decisions. Production additionally requires legal classification, security review, operational evidence and separate launch consent.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](docs/00-product/DECISION_REGISTER.md)
- [Requirements Traceability](docs/00-product/REQUIREMENTS_TRACEABILITY.md)
- [Readme](docs/README.md)
- [Near Technical Research](docs/09-blockchain/NEAR_TECHNICAL_RESEARCH.md)
- [Documentation Validation](docs/DOCUMENTATION_VALIDATION.md)
- [Implementation Roadmap](IMPLEMENTATION_ROADMAP.md)
