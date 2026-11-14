# Security requirements

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Define minimum application, financial and supply-chain controls.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Required controls

TLS, secure headers/CSP, output encoding, CSRF protection, prepared/parameterised SQL, server schema validation, object-level authorisation and safe file handling. Use rate limits and replay protection without allowing account-ID lockout attacks. Session revocation, privilege step-up and phishing-resistant admin MFA are required design goals. No secrets in source, browser bundles, telemetry or error responses.

Financial controls: integer units, bounded inputs, payload-bound idempotency, receipt-level verification, atomic event/journal/outbox commit and per-asset reconciliation. On-chain ownership and callback restrictions are independent of app sessions. Pause policy cannot silently remove exit rights. Backups are encrypted and restored in isolation.

## Acceptance and failures

Dependency/secret scanning and security review gate approved builds; resolve exploitable critical/high issues before meaningful value exposure. Numerical risk classification and exceptions require documented reviewer rationale. Test direct API calls, injections, XSS, CSRF, IDOR, concurrency, callback spoofing and secret redaction. An audit label requires a real report for the exact build; none exists.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
