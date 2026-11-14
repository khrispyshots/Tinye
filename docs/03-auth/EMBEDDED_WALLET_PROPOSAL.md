# Embedded wallet and future real funding proposal

**Status:** Proposed - provider selection and implementation pending | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Identity / wallet / security lead

## Purpose

Explain how a real sign-up-created NEAR wallet could work and distinguish it from the owner's now-requested [demo bank funding](../20-payments/DEMO_BANK_TRANSFER.md). A demo wallet can be provisioned as a software record. A real wallet requires an evaluated signing/key-control system, account activation and recovery policy.

## Assumptions and dependencies

The quiet welcome and friendly green design are approved. Authentication method, embedded-wallet provider, custody/control, production credentials and financial implementation remain gated. No provider was provisioned, no wallet created and no code written during this research. The real bank on-ramp request was clarified into a fictional demonstration; live collection remains future scope.

## Proposed real user journey

Quiet welcome -> Get started -> approved sign-up method -> required disclosures/consent -> create or recover embedded wallet -> verify account/network readiness -> minimal profile -> first goal. Wallet education is a short separate stage explaining who can sign and how recovery works; never ask a new user to paste a seed phrase. An advanced Connect existing wallet alternative can be offered only if approved.

The application binds a stable provider subject to its user record and one verified wallet per intended network. Do not use a mutable email string alone as wallet ownership or assign wallets from a shared administrator-controlled pool. Idempotent provisioning prevents a new account on every login. Key derivation/signing support is not proof that a funded, active NEAR account already exists; verify actual account activation and receive/send readiness before displaying it as ready to receive.

Provisioning stages: not_started, provisioning, ready, failed, recovery_required. These are wallet setup states, not financial transaction confirmations. On timeout, inspect the prior request/provider identity before retrying creation. Display the actual account/network only after verification; no invented vanity address. Exact account creation/storage/gas/relayer sponsorship must be tested and approved.

## Current official research - accessed 2026-11-14

| Source | Verified finding | Selection consequence |
|---|---|---|
| [NEAR Auth tutorial](https://docs.near.org/web3-apps/tutorials/near-auth) | Documents Web2 login and MPC signing; production requires approved credentials | Strong native-NEAR candidate for evaluation; not selected or provisioned |
| [NEAR Auth quickstart](https://docs.auth.near.org/home/quickstart) | Includes React/browser SDK paths, testnet resources and signature flow; mainnet requires access approval | Verify exact SDK/API compatibility and account activation in a test spike after implementation approval |
| [NEAR Auth MPC](https://docs.auth.near.org/protocol/concepts/mpc) | Deterministic identity-scoped signing and distributed key shares | Recovery depends on identity/provider/control assumptions; do not promise universal key export or seed recovery |
| [NEAR Privy integration](https://docs.near.org/web3-apps/tutorials/privy) | Describes email/social onboarding and a NEAR wallet integration, directly or through NEAR Connect | Alternative requiring its own signing, recovery/export, region and production review |
| [Onramper pair-specific methods](https://docs.onramper.com/reference/get_supported-payment-types-source) | Method availability alone does not guarantee a current pair-specific quote | A future country/currency/native-NEAR transfer route needs live pair/quote validation |
| [Transak on-ramp](https://docs.transak.com/products/on-ramp) | Widget/API funding flows documented | Candidate only; this does not prove any specific global local-bank-to-NEAR corridor |
| [Transak webhooks](https://docs.transak.com/features/webhooks) | Documents signed notifications and production KYB gating; user marking paid differs from verified payment | A future real flow must authenticate evidence and verify chain delivery separately |
| [Yellow Card coverage](https://docs.yellowcard.engineering/v1.0.23/docs/coverage-widget) | Versioned widget documentation lists NGN bank transfer | Historical/provider documentation, not an active Tinye service agreement |
| [Yellow Card asset list](https://docs.yellowcard.engineering/v1.0.23/docs/supported-crypto-widget) | Published widget list does not list NEAR | Do not promise direct NEAR delivery from its NGN bank coverage; exact partner capability remains unverified |

Some guessed MoonPay/Onramper detail URLs and the NEAR Auth apply detail page could not be fetched. No unsupported finding is inferred from them. No live quote or partner-credential API was called. Package versions, costs, service levels, licensing and actual route eligibility remain unconfirmed. No recommendation to use a bridge, intermediary asset or trade is approved.

## Recovery and permission evaluation

Before selecting a real provider, demonstrate: repeat login restores the same account; identity change/linking cannot take over another wallet; lost device recovery and passkey/MFA options; provider/identity outage behaviour; export or alternate recovery if actually supported; credential revocation; user approval for signing; gas sponsorship costs/limits; compatible contract caller identity; privacy and regional access; provider/operator upgrade/control risks. Document residual lockout risk honestly.

The app never stores plaintext private keys or seeds. Email access alone must not become an undocumented administrative path to user-fund control. External key possession, MPC signing and contract-controlled savings are separate trust boundaries. App recovery cannot silently change vault ownership or redirect existing funds.

## What a future real bank flow would require

For each country, verify the exact local-currency/payment-method/native-NEAR/network combination with a current quote, applicable partner approval and user eligibility. Show the real provider, destination, fees/spread, expiry, limits, KYC and refund/support terms. Banks/payment references must come from the approved provider, not a Tinye random-number generator. Payer-name matching, late/under/overpayment, compliance holds and failed delivery need explicit handling.

An I have sent it click is a user assertion only. It cannot confirm a real payment, mint real NEAR or update a verified wallet balance. Provider-authenticated settlement plus independently verified native-NEAR delivery to the correct wallet is necessary. Purchasing NEAR into the wallet is separate from a later user-approved contribution to a goal vault. Local-bank cash-out is a separate off-ramp, not implied by buying support.

NEAR is a variable-price asset; buying it is not a guaranteed fiat savings value. Choosing native NEAR for purchase does not automatically choose the asset held by savings goals. Mainnet money and genuine testnet assets cannot be funded by the current simulation.

## Acceptance and implementation sequence

1. Implement only the approved demonstration scope once the application phase is explicitly authorised; no real money or wallet secrets needed.
2. Resolve D04/D05/D06/D21 and select a real embedded-wallet candidate; test sign-up, account activation, signing, returning login and recovery on testnet.
3. Resolve country, entity/legal/KYC and partner requirements for real payments. Verify exact corridors; do not launch globally from a generic provider marketing claim.
4. Add real funding behind a separate environment/feature gate only after reviewed quotes, receipts, signed notifications, reconciliation and refunds pass.
5. Obtain separate mainnet/real-funds approval before activation.

## Unresolved decisions

Demo funding is requested; real wallet/provider/auth and live banking remain unselected. No user is assigned an actual wallet by these documents. Exact demo rate/credit packages also require a concrete selection before implementation.

## Related documents

- [Demo transfer contract](../20-payments/DEMO_BANK_TRANSFER.md)
- [Wallet onboarding](WALLET_ONBOARDING.md)
- [Decision register](../00-product/DECISION_REGISTER.md)
- [Key management](../13-security/KEY_MANAGEMENT.md)
