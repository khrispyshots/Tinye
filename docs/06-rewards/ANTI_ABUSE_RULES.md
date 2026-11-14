# Rewards anti-abuse rules

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Prevent duplicate and manipulated rewards fairly.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Controls

Server-verified financial source, unique reward event identity, atomic caps, strict ownership and rule-version checks are primary defences. Detect rapid goal churn, dust contributions, artificial target decreases and cyclic deposit/exit attempts before granting additional benefits. Do not presume one wallet equals one human or collect invasive fingerprints by default.

Suspected abuse puts new benefit grants in review with reason, expiry/escalation and appeal; it does not authorise withdrawal of another user's principal. Verified invalid grants use compensating ledger entries referencing source and reviewer. Legitimate users with small or irregular contributions must not be labelled irresponsible.

## Acceptance

Test replayed events, multiple wallets per user, concurrent triggers and malicious admin adjustments. Evaluate false positives and allow correction. No paid random rewards, wagering, hidden points devaluation or monetary claims. D13/D23 govern eligibility rules and privacy-sensitive detection.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
