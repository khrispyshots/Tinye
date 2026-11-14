# Admin requirements

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / security lead

## Purpose

Specify core MVP visibility and constrained later operations.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Core MVP

User lookup exposes minimal identity/status; goal lookup shows owner reference, asset, rule version and verified projection; operation detail shows lifecycle, receipt evidence, reservation and reconciliation status. Filters support network/epoch/asset/status/date. No private key, seed, signature or unrestricted personal-data access. Every displayed amount includes units, environment and freshness.

Health views show index lag, unresolved operations, mismatches and outbox failures. Support can link a ticket to an operation without manually creating financial success. Admin read visibility, roles and audit ship before testnet financial workflows.

## Later / acceptance

Reward stock/fulfilment and feature flags need separate approval, versioning and dual review for sensitive changes. A feature flag cannot authorise an unapproved contract or bypass legal gates. Every privileged action has actor, purpose, timestamp and result. Test role denial, stale sessions, export limits, empty search, provider outage and masking. Admins never get an arbitrary user-fund transfer control.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
