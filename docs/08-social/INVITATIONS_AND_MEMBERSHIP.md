# Invitations and membership

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Define privacy-preserving conditional group participation.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed later flow

Owner creates an expiring invitation with group_id, role, token_hash, invited identity if known, created_at, expires_at and one-use status. Raw invitation tokens are not logged. Accept requires authentication, explicit visibility/rules consent and atomic membership creation. A forwarded or expired invite cannot add an unintended user.

Roles: organiser (metadata/invites), member (own contributions/exit), viewer only if separately approved. No role grants access to another user's signing key or balance. Removing a member stops social access and future contributions; it cannot remove their exit claim.

## Acceptance

Test invitation replay, link leakage, concurrent accept/revoke, removal during pending contribution and deleted organiser. Show decline and leave actions. Group activity stops exposing a former member's private details according to the approved retention policy; chain records remain public. Feature remains disabled until D12 and counsel/privacy review.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
