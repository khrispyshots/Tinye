# Analytics event taxonomy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Define privacy-minimised events and authoritative origins.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Common event envelope

`event_id`, `event_name`, `schema_version`, `occurred_at`, `environment`, `pseudonymous_user_ref`, optional `screen_id`, `flow_id`, `result_code`, `latency_bucket`, `source_kind`. No goal names, wallet/public addresses, transaction hashes, monetary amounts, signature payloads, contact details, IP or secrets in general product analytics. Operational evidence stays in restricted systems. Optional measurement respects approved consent/base.

| Event | Origin / trigger | Allowed additional properties |
|---|---|---|
| screen_viewed | UI visible | Stable screen_id, release_scope |
| onboarding_started / onboarding_step_completed / onboarding_completed | Valid stage transition | Stage enum, approved_method |
| authentication_completed / authentication_failed | Server validation | Method enum, coarse result_code |
| wallet_connection_started / wallet_connection_rejected / wallet_connection_verified | UI start/rejection; server verified outcome | Wallet family if approved, network enum |
| goal_creation_started / goal_created / goal_updated / goal_completed | UI start; server persisted outcome | Mode enum, category only if privacy-approved |
| deposit_intent_created / deposit_submitted / deposit_confirmed / deposit_failed / deposit_unknown | Server lifecycle | Asset category if approved, duration bucket, reason enum |
| withdrawal_intent_created / withdrawal_submitted / withdrawal_confirmed / withdrawal_failed / withdrawal_unknown | Server lifecycle | Same safe lifecycle properties |
| points_awarded / points_reversed / milestone_reached | Posted ledger / verified milestone | Rule version, milestone enum; no amount |
| redemption_requested / redemption_fulfilled / redemption_refunded | Later real lifecycle only | Catalogue category if approved |
| support_requested / account_closure_requested / account_closed | Server persisted outcome | Safe category/result |
| consent_updated | Saved preference/version | Purpose enum, version; no full consent payload |

## Deduplication and acceptance

Server event IDs are stable per source transition; analytics delivery is at least once and consumers deduplicate. Confirmation events cannot originate from a frontend success animation. Synthetic demos/testnet/mainnet are separated. Returning user/retention is derived from eligible activity under the chosen lawful measurement plan, not fingerprinting. Suppressed analytics never suppresses financial journals or essential service delivery.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
