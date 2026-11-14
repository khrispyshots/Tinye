# Decision register

**Status:** Draft | **Version:** 0.2 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner

## Purpose

Record every material unresolved choice, alternatives and consequences.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Decision workflow

D22 is **partially approved: default visual direction locked**. The other 23 decisions remain **Open**. A recommendation is a reviewable proposal, never consent. Record owner, selected option, rationale, approval date, affected documents and evidence before marking Approved. Split approvals are valid; unresolved blockers remain blocked. D01-D24 require a recorded response or explicit deferral. Dependencies cannot be bypassed by feature flags alone.

| ID | Decision | Options | Recommended default and reason | Accountable role | Blocks |
|---|---|---|---|---|---|
| D01 | MVP | Core testnet flows vs expanded launch | Core scope in MVP_SCOPE; smaller auditable financial surface | Product owner | Implementation start |
| D02 | Assets | Native test NEAR vs allowlisted test FT vs multiple assets | One test FT for stablecoin-like UX, clearly named test token; no USDC claim without issuer verification | Owner / contract lead | Contract/schema finalisation |
| D03 | Network | Native NEAR vs Intents / bridged / multichain | Native NEAR testnet only; fewer settlement dependencies | Owner / technical lead | All financial work |
| D04 | Wallet | External vs embedded vs both | Under review: owner exploring sign-up-created embedded wallet; compare NEAR Auth/Privy and external option before selection | Owner / security lead | Authentication design |
| D05 | Custody | Metadata-only wallet tracking vs contract vault vs custodian | Contract-controlled vault with user keys external; counsel must classify Tinye control | Owner / counsel | Contract architecture |
| D06 | Control of assets | No operator spending vs privileged operator/custodian access | No arbitrary admin spending; disclose upgrade influence before deposits | Owner / counsel / security | Permissions and disclosures |
| D07 | Yield | No yield vs real strategy integration | No-yield MVP; no strategy, APR or earnings metric presented as live | Owner | Scope and marketing |
| D08 | Strategy terms | Provider, counterparty, risk, liquidity and loss allocation options | Defer selection and integration until independent diligence and counsel | Owner / counsel | Any yield release |
| D09 | Savings modes | Flexible vs committed vs hybrid | Flexible only; commitments later require versioned rules and lawful exit | Owner | Withdrawal implementation |
| D10 | Early exit | No penalty vs unvested bonus forfeiture vs fee | No principal penalty, no lock and no platform withdrawal fee in testnet proposal | Owner / counsel | Terms and contract |
| D11 | Jurisdictions / age / KYC | Country allowlist, excluded countries, age and identity triggers | Private testnet evaluation first; Nigeria assessment provisional; no age or KYC exemption assumed | Owner / counsel | Recruitment and public access |
| D12 | Groups | Defer vs individual attribution vs pooled vault | Defer MVP; later individual balances and member-only withdrawals | Owner | Social scope |
| D13 | Rewards | Noncash points vs redeemable or transferable benefits | Nontransferable, no cash value; first-deposit/milestone rules proposed separately; real redemption disabled | Owner / finance / counsel | Points and terms |
| D14 | Reputation | Descriptive history vs numeric score vs underwriting | Private descriptive history only; no credit or lending claim | Owner / privacy lead | Profile and analytics |
| D15 | Fiat rails | Defer vs regulated partner integration | Owner requests fictional all-country bank-transfer demo; live rails deferred. See DEMO_BANK_TRANSFER; no real partner or conversion promise | Owner / counsel | Payments scope |
| D16 | Legal identity | Entity, registered address, law, forum and contact options | Owner supplies real details; counsel selects applicable terms; no fabricated default | Owner / counsel | Legal publication |
| D17 | Deployment authorities | Named owners, admin roles, emergency signers and production access | Separate testnet keys; dual-reviewed changes; no production authority granted here | Owner / security | Testnet deployment |
| D18 | Technical stack | Full-stack TypeScript app + SQL/worker vs SPA + API; hosting vendors | Modular monolith with relational transactions and durable worker; framework/vendor review before adoption | Owner / technical lead | Scaffolding |
| D19 | Upgrade / pause | Immutable vs governed upgrades; deposit-only vs broader pause | Evaluate governed testnet upgrades, deposit pause, continued eligible exit; key powers transparent | Owner / security / counsel | Contract implementation |
| D20 | Limits / gas / fees | Per-asset limits, platform fee, storage payer, gas reserve | No platform fee in proposed testnet; benchmark gas/storage; explicit min/max and caps before use | Owner / finance / engineering | Amount validation |
| D21 | Authentication | Wallet challenge vs email/passwordless vs password / OAuth | Wallet challenge for testnet baseline; email/phone/OAuth unselected conditional screens | Owner / security / UX | Sign-up and recovery |
| D22 | Brand / design | Letterform options, palette, accessibility and cultural meaning | Selected Friendly Green / Lens-informed revision 4; root design.md and ui.md lock the default UI. Final bespoke logo, cultural claims and accessibility execution remain pending | Owner / brand lead | Design implementation |
| D23 | Privacy / vendors | Processors, lawful bases, retention, transfers, analytics consent | Minimise data and optional analytics; counsel approves schedule and provider agreements | Owner / privacy / counsel | User-data collection |
| D24 | SLOs / operations | Monitoring thresholds, RPO/RTO, contacts and support response times | Set measured targets after rehearsal; no invented service promises | Owner / operations | Release acceptance |

## Explicit approval package

Approve MVP; one exact asset/network and verified token identity; wallet/key-control and contract custody; flexible exit and fees; no yield; point schedule/caps; group deferral; descriptive history; jurisdictions, age and legal review plan; brand/design; stack; contract permissions/emergency powers; testnet plan; privacy/operational values. Production remains prohibited without independent release approval and launch evidence. Approval of documents is not permission to deploy or move real funds.

## Decision audit record

Approved on 2026-11-14 by the product owner in chat: D22 default interface/visual direction, Friendly Green revision 4. Evidence: owner instruction to lock the current default interface and add design.md/ui.md. Selected artifact: [revision 4 PNG](../02-design/concepts/06-friendly-green-lens-v4.png). Canonical contracts: [design.md](../../design.md), [ui.md](../../ui.md). Scope: forest/sage default theme, friendly hierarchy and desktop/mobile composition. No blanket approval of final logo/cultural claims, implemented accessibility, financial rules, application implementation or deployment. D22 remains partially open only for these residual brand/design deliverables.

Current approved decision scope: D22 visual direction only. Future record fields: decision_id, prior_status, selected_option, approver, timestamp, rationale, document_version, evidence_reference. Reopen when a new vendor, jurisdiction, asset or privileged permission changes risk.

## Additional D22 visual selection - 2026-11-14

Owner selected onboarding option 3, A quiet welcome. [Design contract](../03-auth/ONBOARDING_DESIGN.md) and [reference](../02-design/concepts/onboarding/03-quiet-welcome.png) are the entrance baseline. Approval covers its minimal composition and future motion direction, not a finished Lottie asset, all later setup screens, authentication/provider selection or implementation/deployment authorisation.

## Wallet and funding request - 2026-11-14

Owner clarified D15 to an all-country **demonstration**, using the fictional Tinye Bank of Web3 and a button-triggered simulated NEAR credit. [Demo funding contract](../20-payments/DEMO_BANK_TRANSFER.md) is the requested scope: non-payable references, no real money and isolated Demo NEAR balances. Live fiat rails remain deferred/unapproved. Demo rates/packages and implementation phase are pending. This does not approve real global bank coverage, bank account generation or provider collection.

D04/D21: sign-up-created real wallet experience is under evaluation; [current provider proposal](../03-auth/EMBEDDED_WALLET_PROPOSAL.md) replaces treating external-wallet-only as the preferred experience without owner review. No embedded wallet vendor, recovery model, auth method or custody decision is approved by a question or simulation request. D02: native NEAR purchasing interest does not select savings-goal assets. Financial/mainnet gates remain intact.

## Unresolved decisions

D01-D21 and D23-D24 remain Open. D22 visual direction is approved; residual logo/cultural/accessibility deliverables remain pending. No broader consent is inferred.

## Related documents

- [Requirements Traceability](REQUIREMENTS_TRACEABILITY.md)
- [Architecture Decisions](../../ARCHITECTURE_DECISIONS.md)
- [Legal Review Checklist](../12-legal/LEGAL_REVIEW_CHECKLIST.md)
