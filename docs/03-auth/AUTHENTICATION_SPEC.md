# Authentication specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Distinguish wallet connection, proof of ownership and application identity.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed method

D21 recommends wallet challenge authentication for private testnet evaluation. A connected account string is not authenticated identity. Server issues a random 32-byte single-use challenge bound to recipient/domain, intended account, network, session and expiry; verify the NEP-413 payload/signature and eligible on-chain key before atomically consuming the challenge. Reject altered recipient, nonce, account, network, expired challenges and replay. Use the official backend authentication guidance linked in NEAR research; no custom signing standard.

Proposed endpoints: create challenge, verify challenge, inspect session, revoke session. Exact TTL/rate limits are proposed in API_SPECIFICATION and require D24/security approval. An authenticated user record links one or more proved wallets; adding/removing a wallet requires reauthentication and may not transfer vault ownership.

## Alternative methods and recovery

Email passwordless, passwords, phone OTP and OAuth require explicit provider/configuration approval, verified identifiers and anti-enumeration controls. No provider is selected. Account recovery can restore application access only under approved proof; it cannot recover external keys or redirect another wallet's funds. If approved identity recovery cannot prove ownership, route to support without financial reassignment.

## Acceptance

Test tampered challenge, stolen session, key revocation, same account on different networks, wallet rejection and duplicate verification races. No OAuth implementation or wallet creation is inferred from social login.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Near Technical Research](../09-blockchain/NEAR_TECHNICAL_RESEARCH.md)
- [Api Specification](../10-backend/API_SPECIFICATION.md)
