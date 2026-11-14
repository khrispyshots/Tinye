# Product requirements and shared vocabulary

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Provide canonical rules used by design, API, storage, contracts and legal drafts.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Canonical vocabulary

| Term | Definition / source of truth |
|---|---|
| Goal | Private off-chain purpose metadata linked to an opaque on-chain vault/goal ID |
| Principal | Net accepted deposits less settled withdrawals, tracked per asset; never a guaranteed redeemable fiat value |
| Confirmed balance | Verified vault liability for a user/goal/asset at a recorded final block |
| Reserved | Amount committed to an unresolved withdrawal; cannot be spent again |
| Available | Confirmed balance less reserved amounts, subject to approved rules and fresh verification |
| Yield | Realised strategy earnings; unavailable in proposed MVP |
| Points | Separate integer loyalty units; proposed nontransferable and without cash value |
| Testnet | Separate public test environment; test assets have no claimed monetary value |

Never sum assets into a monetary total without an approved, timestamped price source. Do not use floating point. Display user-entered decimal strings through exact integer conversion using approved asset metadata; reject excess fractional digits rather than rounding contributions silently.

## Stable requirement groups

PROD: truthful scope, preservation and approval; DES: brand, screen coverage and accessibility; AUTH: secure identity, wallet proof and consent; SAVE: goals, eligibility, amounts and lifecycle; YIELD: disabled until approved; REW: verified points and fulfilment; REP: transparent history; SOCIAL: individual ownership; CHAIN: ownership, asynchronous accounting and finality; API: server authorisation and atomic projections; ADMIN: least privilege; LEGAL: counsel and publication gates; SEC: threats and key controls; NOTIFY: consent and deduplication; DATA: privacy-conscious analytics; QA: adversarial acceptance; OPS: environments/recovery; BIZ: disclosed fees and funded incentives; DEMO: honest evidence.

## Shared states

Goal: `draft`, `active`, `paused`, `target_reached`, `completed`, `closed`, `cancelled`, `restricted`. A backend goal view is derived from verified balances plus metadata. `paused` stops contributions/reminders, not ownership or the user's eligible exit. `restricted` describes an off-chain account/product restriction; it does not imply an approved power to confiscate or freeze principal.

Operation: `created`, `awaiting_signature`, `submitted`, `pending`, `confirmed`, `failed`, `cancelled`, `unknown`. Unknown is unresolved, never equivalent to failed. Reservation: `reserved`, `settled`, `released`, `recovery_required`. Goal completion and transaction confirmation are separate concepts.

## Non-negotiable acceptance

Authoritative final execution and receipt-level economic effects precede confirmed credit, withdrawal success, progress, rewards and notifications. At-least-once delivery must produce one economic effect. User ownership is enforced on-chain; UI and backend cannot authorise spending for the user. Disclosed terms and configuration are versioned; no silent penalties or retroactive changes. All future implementation components and tests are proposals, not existing files.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Goal Lifecycle](../04-savings/GOAL_LIFECYCLE.md)
- [Transaction Processing](../10-backend/TRANSACTION_PROCESSING.md)
