# Consent records

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Capture versioned agreements without bundling optional permission.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Record schema

`consent_records`: UUID, user_id, document_key, document_version, content_hash, accepted_at UTC, locale, channel, purpose, required boolean, decision (`accepted`/`withdrawn`), supersedes_id. Record the exact document artefact shown and publication approval, not just a checkbox. Store coarse provenance only where justified; raw IP/device fingerprint is not a default requirement.

## Rules

Terms acceptance, privacy notice acknowledgement, applicable risk consent and marketing opt-in are distinct records. Counsel determines lawful bases; a privacy notice is not blanket consent to all processing. No prechecked optional boxes. Withdrawal of marketing preference stops future marketing without cancelling essential security/service notices. Material financial rule changes trigger review and renewed agreement where required; never retroactively change a goal's agreed terms.

## Acceptance / edge cases

Document version/hash is immutable after publication. If a version changes between display and submit, show the new content and request acceptance rather than silently recording it. Duplicate submits return the same result. Users can inspect accepted versions and timestamps. Unapproved legal drafts and unresolved placeholders cannot become production consent documents.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Legal Document Versioning](../12-legal/LEGAL_DOCUMENT_VERSIONING.md)
