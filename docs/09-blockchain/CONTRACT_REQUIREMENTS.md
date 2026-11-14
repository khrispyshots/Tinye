# Contract requirements

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Define invariants and storage before implementation.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed storage schema

| Record | Key | Fields / bounds |
|---|---|---|
| Config | Singleton | schema_version, network context, allowed assets, approved limits, pause flag, authority policy |
| Goal vault | Opaque goal_id | immutable owner AccountId, asset_id, rule_version, accepted principal/settled withdrawals, reserved amount, status |
| Operation | owner + request_id | payload hash, goal_id, amount U128, kind, reservation/settlement state, callback nonce |
| Asset totals | asset_id | total liabilities, total reserved, storage reserve separately accounted |

Use bounded IDs/collections, storage-paid allocation and explicit overflow checks. No unbounded scan in a financial method. Deduplication records cannot be pruned while a replay could re-execute; future pruning needs a proven replay boundary. Balance decomposition must not count NEAR reserved for storage/gas as user principal.

## Invariants CHAIN-I01–I10

I01: eligible withdrawals never exceed owner balance minus reservations. I02: only owner signs own withdrawal. I03: credits minus settled debits equals aggregate liabilities per asset. I04: each logical operation changes accounting once. I05: unsupported token cannot create liability. I06: admin cannot transfer user funds through an exposed method. I07: fees never exceed approved bounds (zero proposed testnet platform fee). I08: pause blocks new deposits, while eligible exit remains supported. I09: emitted events correspond to committed state transitions. I10: external failures leave a safe reservation or proven release, never phantom restoration after payout.

## Acceptance

Sandbox property/adversarial tests assert each invariant across interleavings, fake tokens, direct callbacks, overflow and exhausted gas. Report privileges that can bypass invariants by upgrading code; no absolute guarantee survives unrestricted upgrades. Contract has no strategy, group pooling or reward logic in MVP.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Contract Security Model](CONTRACT_SECURITY_MODEL.md)
- [Smart Contract Test Plan](../16-quality/SMART_CONTRACT_TEST_PLAN.md)
