# Contract interface proposal

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Define interface-level semantics without writing application or contract code.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Toolchain boundary

Rust SDK/cargo-near are verified as current official tooling in NEAR_TECHNICAL_RESEARCH. Signatures below are **Tinye design notation**, not an implemented ABI or copyable SDK wrapper. Final types, annotations, gas and build compatibility remain gated by D02/D18/D19. Amounts serialize as decimal U128 strings, not JSON numbers.

| Proposed method | Caller / attached value | Input → output / effect |
|---|---|---|
| initialise(config) | Approved deploy authority, once | Bounded allowlist/limits/authorities → config; no repeat init |
| create_goal(goal_id, asset_id, rule_version, request_id) | Owner; approved storage charge only | Opaque ID → owned vault; immutable owner/asset |
| get_goal(goal_id) | Public view | Owner, asset, confirmed liability, reservation, rule version/status |
| get_operation(owner, request_id) | Public view | Bound payload hash and settlement state |
| ft_on_transfer(sender_id, amount, msg) | Only approved FT contract predecessor | msg contains version, goal_id, request_id; verify sender owns goal; accept amount or return unused units |
| deposit_native(goal_id, request_id) | Owner; attached native NEAR | Conditional alternative only if native asset approved; attached amount credited exactly |
| withdraw(goal_id, amount, request_id) | Owner; proposed exact 1 yoctoNEAR for deposit-capable key | Reserve units then asynchronous transfer to same owner account; return operation reference |
| settle_withdrawal(request_id, callback_nonce, result) | Own contract only/private callback | Match pending reservation; on proven transfer success settle; on proven failure release once |
| set_deposits_paused(paused, reason_ref) | Approved emergency role | Emit bounded reason/control event; cannot debit user |
| approved_config_change(version, limits) | Governed authority | Only future approved bounds; cannot retroactively remove exit |

No arbitrary destination, admin withdraw, batch sweep of liabilities or strategy deposit method. Native deposit method is absent from the proposed FT-only MVP, not a second implicit asset.

## FT receiver semantics

Trust immediate predecessor token contract, not signer symbol; trust sender_id only in that authenticated receiver context. `msg` is strictly parsed and length bounded. Owner, goal status, asset and request payload must match. Duplicate transfer-call carrying a fresh token movement must return the entire new amount unused, not credit twice or retain unaccounted funds. Amount above limits or malformed/unsupported request must not create credit. Resolution/refund evidence determines final accepted amount.

## Withdrawal recovery state machine

`reserved` → `settled` on proven payout; `reserved` → `released` on proven failure; callback failure leaves `recovery_required`/unresolved reservation. No second outbound transfer for the same request. Recovery must be idempotent and cannot trust an operator assertion that payout failed. An approved recovery design must prove outcome using trustworthy on-chain state/protocol evidence or a reviewed governance process with explicit trust disclosure. If that proof cannot be implemented safely, block vault release rather than auto-restoring balance.

## Errors and acceptance

`E_OWNER`, `E_ASSET`, `E_AMOUNT`, `E_PRECISION` (at boundary conversion), `E_LIMIT`, `E_GOAL_STATE`, `E_REPLAY_PAYLOAD`, `E_STORAGE`, `E_PAUSED`, `E_CALLBACK`, `E_INSUFFICIENT`, `E_UNRESOLVED`. Errors are stable codes with no personal data. Test each precondition, duplicate request, callback forgery and uncertain settlement. Event version is 1.0.0 proposal; ABI version begins only on approved build.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Near Technical Research](NEAR_TECHNICAL_RESEARCH.md)
- [Events And Indexing](EVENTS_AND_INDEXING.md)
