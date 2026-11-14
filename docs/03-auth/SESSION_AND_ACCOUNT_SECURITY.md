# Session and account security

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Prevent replay, session theft and misleading recovery.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed controls

Use server-managed opaque sessions in Secure, HttpOnly, SameSite cookies over TLS. Rotate on authentication/privilege changes, enforce idle/absolute expiry and revoke on logout, recovery, security incident or admin role removal. Proposed baseline: 30-minute idle and 24-hour absolute expiry for user sessions; privileged sessions shorter and with MFA/step-up. Final values require security review and D24. Apply CSRF protection to mutations and origin checks; never put session tokens in URLs or analytics.

Expose active devices with coarse last-used information and revoke actions. Financial signing still occurs in the wallet even with a valid app session. Export, wallet linking and account closure require recent authentication. Admins require separate roles and phishing-resistant MFA where supported.

## Closure and recovery

Pending/unknown withdrawals block irreversible closure until reconciled; show progress and support. Export private profile, goals and activity through an expiring owner-only channel. Delete eligible off-chain records subject to an approved retention/legal-hold schedule; retain public-chain reality and explain limitations. Recovery of application access does not grant control of a wallet or permit admin withdrawals.

## Acceptance

Test stolen/revoked cookies, concurrent logout, CSRF, session fixation, closed users, shared devices and identity enumeration. Logs exclude credentials and full wallet signatures.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
