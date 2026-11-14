# Notification specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Define consent-aware messages tied to real events.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Channel and lifecycle policy

Core MVP supports in-app service/security notices; email/push/SMS require approved vendor, destination verification and consent/lawful basis. Marketing is separately optional and never bundled with required service agreement. Delivery lifecycle: queued → sending → sent → delivered if evidence exists; failure/unknown/retry and suppressed are distinct. Sent is not necessarily delivered/read.

Dedupe `(user, source_event, channel, template_version)`. Transactional outbox originates from verified state; submitted notice explicitly says unconfirmed. Confirmation notices only follow final economic verification. Respect preference changes, rate/frequency caps and quiet hours for nonurgent reminders. Security alerts may bypass nonessential quiet hours only under approved policy.

## Acceptance / failures

Read retries use bounded backoff; provider timeout cannot send repeatedly without a stable provider reference. Permanent failure goes to dead-letter review with in-app fallback. No full wallet address, goal narrative, secret or detailed balance in lock-screen content by default. Welcome/goal/reward milestones are deduplicated. Group/real redemption notices remain disabled until their features are approved. D23/D24 select channel vendors, timing and frequency values.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
