# Group fund rules

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / finance / engineering leads

## Purpose

Prevent ambiguous ownership and unauthorised group withdrawals.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Conditional accounting

Every contribution retains `(network, asset, group_id, member_account, goal_id)` attribution. Aggregate progress is a projection; it creates no shared spending power. Withdrawals require the contributing member's verified owner authority and approved personal-goal rules. Organiser/admin cannot withdraw or reassign another member's funds.

No rotating payout, collective investment, joint-signature vault or pooled treasury is included. If proposed later, define beneficiaries, consent, quorum, deadlock, member death/incapacity, dissolution and legal classification before implementation.

## Acceptance and disputes

Concurrent exits cannot exceed individual liability. A group's target change does not move funds or impose locks. Group closure stops new joins/deposits while members retain eligible exit. Member deletion pseudonymises eligible social data without erasing on-chain ownership. Disputes pause social changes where justified, not arbitrary principal access. D12 remains open and MVP has no group contract paths.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
