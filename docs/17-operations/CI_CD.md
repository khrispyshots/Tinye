# CI/CD proposal

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Specify future build checks and gated release permissions.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed pipeline

Documentation check → dependency/secret scan → types/lint → unit/integration → reproducible contract build/Sandbox invariants → application build → accessibility/E2E/performance evidence → review artefacts. Exact commands/framework are chosen after D18; no workflow file or installation is created now.

Pin dependencies, compiler/SDK/Sandbox and build image/digest. Build once, record hashes and promote the reviewed artefact rather than rebuilding unpinned dependencies. Contract and app revisions are mapped in a manifest. Migrations are reviewed, backup-aware and compatible with the rollback window.

## Release gates and acceptance

PR checks do not deploy. Testnet deployment requires authorised release role and environment approval; mainnet requires separate explicit owner consent and all legal/security/operational gates. Production secrets are inaccessible to untrusted PRs and ordinary tests. Logs redact secrets. Failed tests, drifted hashes, missing receipt evidence or unresolved material findings block promotion. Rehearse revoked credentials and failed migration without production data.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
