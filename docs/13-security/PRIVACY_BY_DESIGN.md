# Privacy by design

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Minimise collection and exposure across chain and application.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Controls

Keep personal goal names, images, contacts, consent and support content off-chain. Use opaque vault IDs; warn that account/transaction amounts remain publicly observable even if the app is private. Default profile/goals to owner-only; future group visibility requires explicit granular consent.

Collect minimum identity for approved access policy; do not request contacts, device fingerprint, precise location or government ID without a documented necessary legal/product purpose. Separate security logs, financial evidence and pseudonymous analytics. Prevent sensitive payload capture by error tracking and vendor SDKs. Encrypt private data in transit/at rest and restrict staff access by purpose.

## Acceptance / edge cases

Complete processing/transfer/retention inventories and impact review before real user data. Test export/correction/deletion, legal holds, restored backups and derived-history correction. Do not promise blockchain erasure or treat hashing as automatic anonymisation. New scoring/underwriting, embedded wallet or identity vendor reopens privacy review and notice requirements.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
