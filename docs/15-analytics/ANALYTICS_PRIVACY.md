# Analytics privacy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Keep measurement separate from identity and transaction authority.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Data policy

Use pseudonymous rotating references only where the approved lawful basis permits. Pseudonymisation is not anonymity; restrict the mapping and minimise retention. Collect only allowlisted envelope/properties from EVENT_TAXONOMY. Never send seed phrases, keys, signatures, wallet addresses, transaction hashes, exact balances, goals narrative, contact information or unrestricted error payloads to analytics.

Essential security/financial records have their own purpose/access schedule; refusing optional analytics must not prevent required financial reconciliation or service notices. Provider role, regions, transfer safeguards, retention and opt-out need D23 and counsel approval before any SDK is loaded.

## Acceptance

Inspect actual network payloads and vendor defaults after implementation; disable automatic page/form capture unless reviewed. Test no-consent, withdrawal, export/deletion and restored data scenarios. Aggregate reports must disclose missing cohorts and not infer identity through device fingerprinting. Reputation/underwriting data cannot be shared as routine product telemetry.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
