# Smart-contract test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Turn each proposed invariant into adversarial Sandbox evidence.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned tests and properties

| ID | Cases / invariant evidence |
|---|---|
| SC-01 | Owner-only create/withdraw; forged sender/signature/caller cannot spend others' funds; I01/I02 |
| SC-02 | Native/FT units and totals, one-unit/U128 limits, underflow/overflow; I03 |
| SC-03 | Replay request, changed payload, repeated transfer-call with new movement; duplicate returns unused amount; I04 |
| SC-04 | Fake/unsupported FT, malformed message, wrong goal asset, direct transfer; no unauthorised credit; I05 |
| SC-05 | Admin/config/governance cannot use methods to spend user liability; review replacement-code power separately; I06 |
| SC-06 | Zero proposed platform fees and configured bounds; I07 |
| SC-07 | Deposit pause rejects deposits and preserves eligible exit; I08 |
| SC-08 | Final event schemas equal committed state; failed receipts cannot credit; I09 |
| SC-09 | Reserve-before-transfer, concurrent interleavings, repeated callback, false callback and external failure; I10 |
| SC-10 | Callback out-of-gas/failure after successful payout: reservation remains unresolved, no automatic restored credit; reviewed recovery proof required |
| SC-11 | Storage exhaustion/registration failure, malicious collection growth, fee/gas operating reserve isolation |
| SC-12 | Initialise once, upgrade/state migration, key inventory and network/epoch config; no ownership reassignment |

## Method

Unit context tests plus multi-contract Sandbox with malicious token/callback contracts and gas/storage failures after approval. Property sequences assert per-asset conservation after each transition. Then authorised testnet smoke deposit/withdraw and independent read verification of exact deployed code/config.

## Acceptance

All I01–I10 have observed passing evidence for the exact build; unresolved callbacks and recovery cannot create value or double payout. Independent reviewer examines trust/governance and residual risk. No audit or test pass is claimed now.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
