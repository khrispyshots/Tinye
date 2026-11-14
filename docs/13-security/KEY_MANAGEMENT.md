# Key management

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Keep user and operator signing secrets out of unsafe systems.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Key inventory proposal

User external wallet keys never enter Tinye systems. Application sessions, database credentials, notification/provider secrets and operator contract keys are separate classes. Store service secrets in the selected encrypted secret manager with least-privilege access and audit; exact vendor remains open. Public RPC URLs/account IDs are configuration, not proof of deployment.

For every operator key record network/account, public identifier, permission scope, custodian, creation/rotation/revocation process, recovery ceremony and last review. Full-access contract account keys must be disclosed; they can replace financial code. Testnet keys cannot be reused for production. No private material in `.env.example`, chat, source or screenshots.

## Acceptance / incident handling

No shared admin key. Prefer independently controlled signers/hardware-backed production authority after approval; exact quorum is D17/D19. Rehearse lost/compromised key response without moving user funds arbitrarily. Rotate service credentials and revoke sessions promptly when compromised; wallet recovery follows its provider and cannot be promised by Tinye. Scan safe synthetic samples to test leakage detection.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
