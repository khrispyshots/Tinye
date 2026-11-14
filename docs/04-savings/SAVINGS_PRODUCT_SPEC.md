# Savings product specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Define personal goals and authoritative balances.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Goal contract

Required: private name (proposed 1–80 characters), category from approved enum plus other, positive exact target, one approved asset/network and flexible savings mode. Optional: date, reminder schedule, icon/colour and private visibility preference. Reminder schedules do not authorise debits. Dates are calendar dates in the user's chosen timezone; transaction instants remain UTC. Do not put personal names, images or target purposes on-chain.

An asset is immutable after first accepted contribution; migration requires a separately approved new goal and user-directed exit. Target/name/date edits are versioned and cannot change ownership, balance or withdrawal terms. Reaching a target follows confirmed net balance, not a pending intent. No cross-asset aggregation without approved rates.

## Accounting and acceptance

For a goal/asset: confirmed balance = accepted credits minus settled debits; available = confirmed minus unresolved withdrawal reservations. On-chain accounting is authoritative; SQL is a verified read model. UI shows verified-as-of time and stale/unknown state. Zero target, unsupported asset, excessive decimals and negative amounts are invalid. An over-target deposit is allowed only if the approved cap permits it; visual progress caps at 100%, numerical amount remains exact.

Core testnet goals have no yield, principal penalties or undisclosed locks. Deposits/withdrawals need rules and fee review before signing.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Goal Lifecycle](GOAL_LIFECYCLE.md)
- [Fees And Limits](FEES_AND_LIMITS.md)
