# Wallet onboarding

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Explain key control and evaluate wallet choices.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Updated owner request

The owner asked about sign-up-created wallets, then clarified that bank funding should be a fictional demonstration. [Embedded-wallet evaluation](EMBEDDED_WALLET_PROPOSAL.md) records current official options without choosing a provider. [Demo bank transfer](../20-payments/DEMO_BANK_TRANSFER.md) creates only simulated wallet credits; it does not provision or fund a real wallet. The external-wallet-only recommendation below remains historical/proposed while D04/D21 are reconsidered.

## Required explanation

Your wallet approves blockchain actions. With an external wallet, its keys and recovery process are managed by you and your chosen wallet provider. Funds placed in a goal vault are controlled by that contract's rules and potentially its upgrade authority. Tinye does not ask for your seed phrase. This distinction must appear before setup and signing.

## Provider evaluation

| Option | Benefit | Required diligence |
|---|---|---|
| External, proposed MVP | Explicit user approval; no Tinye key storage | NEAR Connect compatibility, NEP-413, testnet, mobile return, accessibility, rejection and key changes |
| Embedded | Familiar onboarding | Export/recovery, MPC/key control, region access, vendor failure, consent, custody classification, account deletion |
| Both | More choice | Identity linking, support matrix, account conflicts and equal withdrawal ability |

Current official guidance points to NEAR Connect; exact package version and runtime-manifest policies remain to be pinned. Wallet Selector is deprecated. Do not silently add local function-call keys or request unrestricted account keys.

## Acceptance and failures

Show account and network; require a fresh signed challenge for linking. Wrong network offers correction; rejected connection returns with explanation; missing gas/storage balance is distinct from insufficient savings. Disconnecting the UI does not revoke on-chain keys; explain provider revocation controls. Replacing an app connection never transfers existing goal ownership.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Wallet And Signing Flow](../09-blockchain/WALLET_AND_SIGNING_FLOW.md)
