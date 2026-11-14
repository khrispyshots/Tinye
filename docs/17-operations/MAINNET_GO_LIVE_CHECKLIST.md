# Mainnet go-live checklist

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

List mandatory evidence and separate production approval.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Launch-blocking checklist

- [ ] Owner approves exact mainnet release, deployment artefact and real-money scope separately from documentation/testnet.
- [ ] Entity/countries/exclusions/age/KYC/AML/sanctions policy and applicable permissions reviewed by qualified counsel; current regulatory sources rechecked.
- [ ] All legal placeholders resolved, final terms/privacy/risk/fees published and versioned consent tested.
- [ ] Custody, operator/upgrader/emergency powers and recovery limitations disclosed accurately.
- [ ] Exact mainnet asset issuer/contract/decimals/storage/limits independently verified; no testnet substitution.
- [ ] Actual wallet/API/compiler/SDK/CLI/Sandbox compatibility and lockfiles/hashes recorded.
- [ ] Financial invariants, adverse receipts/refunds, replay/concurrency/recovery and reconciliation pass for the reviewed build.
- [ ] Independent security review/audit scope and report match build; material findings resolved and no false audit claim.
- [ ] Named deployment/governance signers, key ceremony, approvals and recovery rehearsed; production access separated.
- [ ] App accessibility, mobile wallet handoff, low-bandwidth and agreed performance targets pass.
- [ ] Admin audit, critical notices, monitoring/on-call/support contacts and incident/breach process operational.
- [ ] Backup/restore RPO/RTO and rollback/forward-repair/eligible-exit plan demonstrated.
- [ ] Revenue/reward budgets, fees and liquidity are approved; yield/groups/fiat/redemption remain off unless separately accepted.
- [ ] Rollout caps, verification checkpoints, stop conditions and accountable release owner recorded.

## Acceptance

Any unchecked mandatory item blocks mainnet. All items currently unfulfilled as implementation/launch evidence. Record approver/date/evidence per item rather than ticking from written plans. Approval of these documents never moves real funds or grants production authority.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
