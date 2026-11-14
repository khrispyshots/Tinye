# Goal lifecycle

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / engineering leads

## Purpose

Define shared goal states and authorised transitions.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Transition model

| From | To | Actor / precondition |
|---|---|---|
| draft | active | Owner confirms valid goal and versioned terms |
| draft | cancelled | Owner cancels without funds |
| active | paused | Owner stops new contributions/reminders |
| paused | active | Owner resumes valid supported goal |
| active / paused | target_reached | Derived confirmed net balance reaches target |
| target_reached | active | Owner changes target or verified net balance falls below it |
| target_reached | completed | Owner marks goal fulfilled; no accounting change |
| completed | active | Owner explicitly reopens; no hidden rule change |
| active / paused / target_reached / completed | closed | Owner; zero balance, no reserved/unknown operations |
| any nonterminal | restricted | Authorised off-chain risk action with reason and appeal |
| restricted | prior valid state | Risk reviewer releases restriction; contract rights unchanged |

`closed` and `cancelled` are terminal metadata states. No funded goal is cancelled/deleted to erase liabilities. `completed` expresses achieved purpose; it does not automatically transfer funds. A partial/full withdrawal changes balances, not blindly the lifecycle; close is explicit.

## Metadata and vault coordination

Goal lifecycle is the off-chain product state; it is not a replacement for the vault's independent financial permissions. Creating metadata does not create a funded vault. Before first contribution, the owner signs the approved vault creation/registration flow and the backend binds the opaque chain_goal_id only after final verification. Until that binding exists, the goal can be displayed as active planning metadata with deposit unavailable/pending setup; never show funds or pretend registration succeeded.

A product pause prevents supported app contribution actions but is not a claimed on-chain restriction unless an owner-authorised vault setting is explicitly implemented and verified. Account restriction is likewise not a new contract freeze power. Any financial rule that must hold against direct contract calls must be enforced in the approved contract, not merely in the goal metadata.

## Acceptance / edge cases

All state mutations require owner or narrowly scoped risk authorisation, optimistic version checks and audit events. Pending deposits cannot trigger target reached. Pausing cannot remove eligible exit rights. Restrictions cannot imply an unapproved on-chain freeze. Legal deletion pseudonymises private metadata under the retention policy without deleting ledger evidence.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Database Schema](../10-backend/DATABASE_SCHEMA.md)
