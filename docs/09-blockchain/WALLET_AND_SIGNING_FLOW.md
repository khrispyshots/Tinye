# Wallet and signing flow

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Specify an auditable user-approved signing boundary.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Flow

Connection chooses supported wallet/account/network; signed challenge authenticates application identity separately. Financial review shows amount/asset, vault or owner destination, methods, fees/storage, testnet and authority terms. Then NEAR Connect asks the wallet to approve the exact transaction. Backend cannot sign user funds; never accept a private key through a form.

Selected connector must support message signing and required transaction actions on supported mobile/desktop wallets. Do not adopt deprecated Wallet Selector or copy legacy SDK constructors. No local function-call-key plugin is proposed. Receipt hash returned by wallet starts verification; it does not prove economic success.

## Recovery and acceptance

Rejection before broadcast has no financial effect. Wallet popup blocked, deep-link return lost, account switched mid-review, chain mismatch and signature expiry require revalidation. A timeout after potential broadcast becomes unknown with status lookup, not automatic re-sign. Changing wallet account invalidates the current intent. Disconnection does not erase vault balances or revoke external on-chain keys.

Official method/package evidence and unpinned connector version are in the research register. Capability tests and exact versions are required before implementation acceptance.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Wallet Onboarding](../03-auth/WALLET_ONBOARDING.md)
