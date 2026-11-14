# NEAR integration narrative

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / finance / demo lead

## Purpose

Explain why NEAR is proposed and what evidence will demonstrate it.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed rationale

NEAR's account/key model, Rust contract tooling and token/transaction infrastructure can support explicit user approvals, per-goal ownership and inspectable settlement. This is an architectural inference from official research, not a claim of lower cost, guaranteed speed or superior safety for Tinye. Native testnet avoids unnecessary bridges/multichain dependencies.

On-chain proposal: opaque goal owner/asset, accepted balances, reservations, withdrawal rules and events. Off-chain: private goals/profile/consent, verified projections, noncash rewards, notices and admin support. External wallet signing uses current NEAR Connect guidance if approved; backend verifies final receipts/economic effects.

## Evidence and acceptance

A future demo must show actual network/account/code hash, approved asset identity, user-signed testnet deposit and exit, receipt evidence, goal projection and reconciliation. None exists now. Explain upgrade authority and asynchronous failure/recovery limits; do not call the contract audited or claim self-custody of deposited funds without reviewing powers. Yield/Intents/Chain Signatures are not implicit integrations.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
