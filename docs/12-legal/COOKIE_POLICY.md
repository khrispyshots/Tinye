# Cookie policy — conditional draft

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Qualified counsel / privacy lead / product owner

## Purpose

Separate essential sessions from optional tracking.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

> **Unpublished legal draft. Not legal advice or evidence of compliance. Do not publish until counsel reviews the actual product, jurisdictions and every unresolved placeholder.**

## Proposed inventory

No application or cookie currently exists. Proposed server session cookie is necessary for secure sign-in, scoped to the application, Secure/HttpOnly/SameSite and inaccessible to analytics. CSRF protection may use an additional scoped token under the selected framework; exact name, lifespan and provider are unconfirmed.

Optional analytics, advertising, attribution pixels, wallet-provider storage and third-party embeds require inventory before enablement. Record cookie/storage name, provider, purpose, essential/optional class, duration, region, recipients and consent basis. Do not invent a cookie list or assume a wallet embed is exempt.

## User controls and acceptance

Where required, obtain affirmative optional consent before setting trackers, allow equally clear reject/manage choices and respect withdrawal. Essential security operation cannot be made conditional on marketing consent. No dark-pattern banner. [COOKIE INVENTORY AND DURATIONS — TO BE CONFIRMED] must be completed using an actual network/storage audit. Test reject-all, accept selected, changed preference, expired consent and third-party wallet handoff. Do not claim cookie-free unless verified.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Legal Review Checklist](LEGAL_REVIEW_CHECKLIST.md)
