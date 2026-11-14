# Onboarding flow

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Specify progressive account setup and safe resumability.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Selected entrance - owner approved

Use [A quiet welcome](ONBOARDING_DESIGN.md), option 3 selected on 2026-11-14. The entrance has one illustration, one headline, one supporting line, Get started and Sign in. The former crowded board is superseded as an entrance proposal. Subsequent setup screens remain one-task-at-a-time and require their own review. This visual choice does not change required consent or wallet education gates.

## Flow

Welcome → concise introduction/how it works → approved authentication → required document acceptance and risk acknowledgement → wallet explanation/connection and proof → minimal profile → completion → first-goal prompt. Wallet-first authentication can combine connection/proof with account creation, but consent must be recorded before financial participation. Ordering must be tested for comprehension; no deposit CTA precedes required agreements.

Request only a display name and optional preferences in the proposed MVP. Phone/email verification screens are conditional on D21, not evidence those methods exist. Ask for optional notifications after a relevant action, not at app launch. Store stage/version server-side and resume without repeating accepted consent unless its version changes.

## Acceptance and failures

Reject expired/replayed challenges; allow wallet rejection to return safely; explain unsupported wallets and network mismatch. Account creation is idempotent. Required terms and acknowledgement are separate from optional marketing consent. Do not request seed phrases or imply Tinye can recover a lost external wallet. Track started/completed stages without sensitive input.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Consent Records](CONSENT_RECORDS.md)
- [Wallet Onboarding](WALLET_ONBOARDING.md)
