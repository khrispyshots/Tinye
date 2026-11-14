# Release security test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Coordinate application and contract security verification for release.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Release security suite

QA-SEC-01 maps SEC-T01–T08 to the exact build/config and verifies completion evidence. Exercise authentication replay, IDOR/role escalation, CSRF/XSS/SQL injection, session expiry/revoke and wallet challenge binding. Inspect bundles, logs, error tracking and analytics for synthetic secret leakage. Verify dependency lock integrity, known vulnerable dependencies, safe headers and transport.

QA-SEC-02 covers wallet phishing prompts, changed account/network and unsupported capabilities. QA-SEC-03 covers contract callback/token spoofing, replay, concurrency, storage/gas and upgrade/governance attacks. QA-SEC-04 covers admin approval/audit and restore/incident rehearsal. Full control ownership remains in the security-domain plan to avoid competing test definitions.

## Acceptance

Security lead signs evidence and remediation; unresolved exploitable high/critical findings or uncertain fund-accounting paths block release. Penetration and independent contract review scope must be appropriate to value exposure; no audit is implied by a checklist. Use isolated synthetic data and authorised targets. This plan is not executed.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
