# Legal review checklist and research

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Qualified counsel / product owner

## Purpose

Track legal issue spotting, official sources and publication gates.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

> **Unpublished legal review material. Qualified jurisdiction-specific counsel must approve before launch.**

## Jurisdiction scope and research limitations

No launch country is selected. Nigeria is a provisional assessment motivated by the supplied Nigerian/Igbo brand context, not a conclusion that the business is Nigerian or that Nigerian law alone applies. Identify entity establishment, user residence, marketing destinations, provider locations and asset/control path before expanding country research. An internet-accessible testnet is not assumed legally exempt.

## Official source register — accessed 2026-11-14

| Source | Instrument / observed date | Relevance and open legal question |
|---|---|---|
| [SEC digital asset rules](https://sec.gov.ng/documents/8/Rules-on-Issuance-Offering-and-Custody-of-Digital-Assets.pdf) | 2022 rules on issuance, offering, custody and VASPs | Assess actual facilitation/control functions, current amendments and any infrastructure distinction; no exemption conclusion |
| [SEC rules register](https://sec.gov.ng/our-mandate/regulation/rules-and-regulations/) | Current official rules/amendments listing | Confirm applicable consolidated rules, AML/CFT and newer instruments |
| [SEC capital circular](https://home.sec.gov.ng/for-investors/keep-track-of-circulars/revised-minimum-capital-mc-for-regulated-capital-market-entities/) | Published 2026-01-16 | Category-specific financial requirements may matter if regulated; classification and applicability unconfirmed |
| [SEC investment warning](https://sec.gov.ng/for-investors/keep-track-of-circulars/public-notice-unregistered-online-investment-schemes/) | Published 2026-05-14, notice signed 2026-05-08 | Investment promotion/solicitation and unrealistic return language need counsel review under current ISA framework |
| [SEC ARIP checklist](https://sec.gov.ng/about/resources/checklists/accelerated-regulatory-incubation-program-arip-checklist-for-vasp-onboarding/) | Published 2025-05-25 | Review onboarding/registration routes if applicable; participation is not granted or assumed |
| [CBN VASP bank-account guidelines](https://www.cbn.gov.ng/out/2024/fprd/guidelines%20on%20operations%20of%20bank%20accounts%20for%20virtual%20asset%20providers.pdf) | Dated 2023-12-22 | Banking relationships for VASPs; does not establish Tinye banking access or licence |
| [CBN non-security virtual asset regulations](https://www.cbn.gov.ng/Out/2026/CCD/REGULATIONS%20FOR%20THE%20OPERATIONS%20OF%20NON-SECURITY%20VIRTUAL%20ASSETS%20IN%20NIGERIA.pdf) | Official 169-page PDF, closing page November 2026 | Addresses non-security virtual assets including stablecoins and service activities. Section 56.1 says issuing instrument specifies commencement. Issuing/commencement instrument not verified here; counsel must confirm status, effective date, classification and CBN/SEC overlap before relying on it |
| [NDPC GAID](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf) | GAID 2025 dated 2025-03-20 under NDPA 2023 | Assess controller duties, bases, data minimisation, DPO/registration, transfers, rights, profiling, security and incident reporting |
| [NDPC annual report](https://ndpc.gov.ng/wp-content/uploads/2026/02/Print_NDPC-Annual-Report-2025-1.pdf) | 2025 report published in 2026 | Reports GAID took effect 2025-09-19; counsel verifies current application |
| [FCCPC official Act page](https://fccpc.gov.ng/resources-library/fccpa/) | FCCPA 2018 source gateway | Review consumer terms, advertising, unfair practices and complaints; gateway read, no full Act opinion provided |

No third-party blog is relied upon for a legal conclusion. This is issue spotting, not a full legal opinion or statement that licences are or are not required. Supersession, implementing instruments and cross-border rules require counsel follow-through.

## Counsel work order

- [ ] Classify each actual activity: deposit-taking, investment/collective scheme, custody/control including upgrades, payments/remittances, VASP, strategy/rewards and any future credit use.
- [ ] Confirm entity, countries/exclusions, age/children handling, KYC/AML/CFT, sanctions and any Travel Rule obligations; define testnet evaluation constraints.
- [ ] Review asset issuer terms and stablecoin classification, fee disclosures, withdrawal rights, losses, complaints and consumer protection.
- [ ] Determine privacy lawful bases, impact assessments, DPO/registration, processors/transfers, retention, rights and breach/marketing obligations.
- [ ] Confirm governing law/forum and enforceable disclaimers/liability/indemnity without overriding mandatory rights.
- [ ] Close all placeholders; check actual implementation and consent/version capture before approving publication.
- [ ] Re-run jurisdiction and regulatory research immediately before launch and material feature changes.

## Missing-information register

The companion LEGAL_PLACEHOLDER_REGISTER contains every marked placeholder and its file references, owner and publication-blocking status. Unknown licences/partners/insurance are not replaced with invented values. A non-applicable conditional feature needs an explicit approved deferral and truthful UI, not silent omission.

## Acceptance

Owner approves target scope and engages qualified counsel; counsel provides review outcome and evidence per issue; legal drafts are reconciled with implementation; no unresolved placeholder is published. Production remains blocked while classification, commencement, identity, privacy schedule or customer terms are incomplete.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Legal Placeholder Register](LEGAL_PLACEHOLDER_REGISTER.md)
