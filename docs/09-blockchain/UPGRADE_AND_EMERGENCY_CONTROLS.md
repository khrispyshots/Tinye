# Upgrade and emergency controls

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Disclose key powers and constrain emergency action.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Options requiring D19

Immutable contracts reduce upgrade abuse but can make repairs difficult. Governed upgrades permit repairs while giving the governance path power to change financial code. Full-access account keys can replace code regardless of method-level role checks; record every such key and never call a vault trustless while unrestricted replacement remains possible.

Proposed testnet policy: named separated deploy/governor/emergency roles, independently reviewed changes, deposit-only pause and continued eligible exits. Mainnet may require multisignature governance, notice/timelock and an exit window; threshold and delay are unselected, not invented here. Emergency bypass powers must be separately justified and disclosed.

## Upgrade runbook and acceptance

Record build hash, state schema, compatibility, migration rehearsal, invariant snapshots and reviewer approval. Quiesce incompatible work, preserve reservations, deploy/migrate atomically where supported and verify liabilities/events before resuming. No migration can reassign user ownership or sweep user balances. Never delete full-access keys until an audited alternative recovery/upgrade policy is proven; never retain them secretly.

Pause events include actor/reason/config version. Support and UI explain scope and exit options. Callback failure recovery cannot mint balances based on an admin assertion. Any broader freeze or seizure is outside this proposal and requires legal/owner review.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
