# Demo bank transfer and wallet funding

**Status:** Deprecated - superseded by owner wallet/profile correction | **Version:** 1.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / product designer / engineering lead

## Purpose and owner direction

Historical record only: the latest owner instruction removes simulated funding and requires disabled **Direct Deposits — Coming Soon** at the existing entry. Do not implement the crediting flow below. Follow [current application flows](../APP_FLOW.md) and [wiring matrix](../SCREEN_WIRING_MATRIX.md).

The owner requested country-specific bank-transfer presentation using the fictional name **Tinye Bank of Web3**, with an **I have sent it** action that gives the user the supposed NEAR in their wallet. This document implements that intent as an explicitly labelled simulation design, not payment collection or a verified blockchain deposit. The owner requested all countries for the demonstration.

## Assumptions and dependencies

No real bank account, banking partner, exchange rate, wallet deployment or payment provider exists. No application code is created by this specification. The [locked design](../../design.md), [UI contract](../../ui.md), [quiet welcome](../03-auth/ONBOARDING_DESIGN.md) and original approval gate still apply. The demonstration needs no live on-ramp or real funds. A future real integration is a separately gated product.

## Environment boundary

Use a dedicated **Demo / simulated funds** mode. It is distinct from both real NEAR mainnet and genuine NEAR testnet transactions. Keep the demo balance in a separate simulated ledger and data namespace; never add it to authoritative on-chain balances, receipts, savings liabilities, rewards or verified transaction counts. Show the environment on onboarding, wallet, deposit review, completion and activity.

Do not call UI-only credits testnet NEAR. Testnet assets exist on a real test network; this simulation does not. If the surrounding app is a testnet build, entering this flow must still display a separate Demo banner and leave testnet balances unchanged.

## Sign-up and wallet experience

After demo sign-up, create or restore one demo wallet record for that demo user. This is a software record with a **Demo NEAR** balance, not an assigned real bank account or blockchain account. Display a non-address identifier such as `DEMO-WALLET-000001` when details are needed. Do not generate/store user private keys or pretend a mock record can receive real transfers.

Real embedded-wallet creation is a separate proposal in [EMBEDDED_WALLET_PROPOSAL.md](../03-auth/EMBEDDED_WALLET_PROPOSAL.md). Selecting an email/login UI alone does not provision a real NEAR account.

## Country and currency behaviour

Provide a searchable country/territory picker from a maintained country dataset, without inferred global service eligibility. Country selection changes the display country, proposed local currency and demo reference prefix only. The fictional bank name remains **Tinye Bank of Web3** everywhere. Do not substitute real bank names, logos, routing numbers, IBANs or sort codes.

For multiple currencies, allow explicit selection from the dataset. If a country has no configured local currency, ask the user to select a demonstration currency or explain that its demo display is not configured. Do not silently convert or claim unsupported live collection. Locale changes cannot change an existing intent's currency, amount or quote.

| Example country | Demonstration currency | Non-payable reference example |
|---|---|---|
| Nigeria | NGN | DEMO-NG-000001 |
| Ghana | GHS | DEMO-GH-000001 |
| United Kingdom | GBP | DEMO-GB-000001 |
| United States | USD | DEMO-US-000001 |

Examples are formatting illustrations, not real accounts or confirmation that a provider supports a country. Expand the country selector through data rather than hardcoded country-specific screens. No claim that live bank transfers are available in all countries.

## Screen 1: choose funding method

Wallet page: show **Demo wallet**, **Demo NEAR**, and persistent **Simulated funds - no real money** text. Offer Deposit, then **Bank transfer demo**. Explain: "Try adding demo funds. No bank transfer is needed." Do not show a live Buy NEAR CTA for this simulation.

## Screen 2: amount and demo quote

Select country and display currency; enter a positive amount in that currency's minor units using exact integer/decimal conversion. No floating-point monetary math. Show the expected Demo NEAR amount before creating the intent.

Rate label: **Illustrative demo rate - not a market quote**. No provider quote exists. Use a documented versioned deterministic rate table or an explicit demo credit package; financial owner approves its values before implementation. Do not fetch a live price and imply a real purchase or invent fees. Use **No real payment or fees** for this simulation only. Keep actual network/platform fees outside this flow.

Example only: a design fixture may show `25,000 NGN -> 5 Demo NEAR`, with the illustrative-rate label. This is not a recommended market rate or an activated pricing policy. Do not use one fictional conversion rate globally without an explicit display.

## Screen 3: bank-transfer instructions

Use a focused sage details panel and one clear primary action. Required content:

- Title: **Bank transfer demo**.
- Prominent banner: **Do not send real money. These details are fictional.**
- Bank: **Tinye Bank of Web3**.
- Account name: **Tinye Demo**.
- Field label: **Demo account reference**.
- Reference: generated non-payable value such as `DEMO-NG-000001`.
- Country, display currency, entered amount and agreed **Demo NEAR** credit.
- Explanation: **No transfer is needed. Tap below to simulate adding funds.**
- Button: **I have sent it**.
- Nearby button helper: **Simulate deposit - no payment verification**.
- Secondary action: Back / Cancel.

Never render a plausible numbers-only bank account, routable bank details, payment QR code or bank-app deep link. The `DEMO-` prefix must remain visible in full and in any copy action. The literal user-requested bank name is fictional; it must never appear as evidence Tinye is a licensed bank.

## Screen 4: simulation result

On button click, atomically post the pre-reviewed Demo NEAR amount once to the demo ledger. If processing takes time, use **Preparing demo funds**, not Bank payment received or Confirming on-chain. Success headline: **Demo funds added**. Show **5 Demo NEAR** (or the actual agreed simulated credit), the updated demo balance and a **Simulated - no real payment** badge. Actions: View demo wallet / Add to a demo goal.

Activity entries use **Simulated bank deposit** and a demo receipt ID, with no transaction hash, explorer link, blockchain confirmation or real payment status. An optional brief completion check can play only after the simulated ledger commit. Animation itself cannot originate a credit.

## State model and idempotency

`draft -> ready -> simulating -> simulated_completed`. Before posting, cancellation may reach `cancelled`. Validation or storage failure reaches `simulation_failed`; preserve the original intent for retry. These states are deliberately separate from authoritative financial-operation states.

Create a unique intent and payload hash for demo user, country, currency, entered minor units, rate/package version and Demo NEAR base-unit credit. The I have sent it action is idempotent: double taps, refreshes and retries return the original result. Changing the amount/currency creates a new reviewed intent; never accept a client-submitted arbitrary credit amount. Use an append-only demo credit with unique intent reference and update the balance transactionally.

## Proposed data and interface additions

Design notation only, not implemented schemas or SDK methods:

| Record | Required fields / constraints |
|---|---|
| demo_wallets | id, demo_user_id, balance_base_units, environment=demo; unique user; no private keys |
| demo_funding_intents | id, user_id, country_code, currency_code, fiat_minor_units, demo_rate_version, demo_near_base_units, payload_hash, nonpayable_reference, state, timestamps |
| demo_wallet_entries | id, wallet_id, intent_id unique, positive integer units, kind=simulated_bank_deposit, created_at |
| demo_rate_versions | id, currency/package rules, precision, effective_at, approved_by; clearly illustrative |

Proposed owner-scoped routes: inspect demo wallet; list country/currency display choices; preview demo quote; create demo funding intent; inspect intent; simulate intent. All mutations require authenticated demo-user scope, server validation and payload-bound idempotency. No webhook endpoint, payment-provider key or real settlement job is needed for this mode. Do not give simulation routes access to mainnet/testnet ledger tables or secrets.

## Tests and acceptance

- Every screen and copied reference says demo; no real bank details are displayed.
- All configured country choices produce valid local display choices/nonpayable references, or an explicit unavailable-currency state.
- Same intent posts one credit under repeated/concurrent clicks, refresh and retry.
- No other user can inspect/simulate an intent or manipulate its credited amount.
- Failed storage does not show success or partially update balance.
- Demo top-ups cannot reach on-chain balances, verified rewards, mainnet/testnet transaction history or ordinary financial analytics.
- Reduced motion/static fallback preserves all actions and truthful state.
- No real bank credentials, identity documents, payment provider or wallet keys are requested to try the demo.
- All demonstration content fits the locked green interface and uncluttered one-task-per-screen onboarding.

## Unresolved decisions

Approve the deterministic demo credit packages/rates, supported currency dataset, storage/reset policy and actual implementation phase. Live global banking, provider selection, KYC/legal eligibility and conversion to native NEAR are not approved or implied by this demonstration.

## Related documents

- [Embedded wallet proposal](../03-auth/EMBEDDED_WALLET_PROPOSAL.md)
- [Decision register](../00-product/DECISION_REGISTER.md)
- [Transaction processing](../10-backend/TRANSACTION_PROCESSING.md)
- [Implementation roadmap](../../IMPLEMENTATION_ROADMAP.md)
