# Contract security model

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Constrain authority and asynchronous settlement risk.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Trust and access matrix

| Actor | Allowed | Forbidden |
|---|---|---|
| Goal owner | Create/fund own supported goal; eligible withdrawal to own account | Spend another owner's liability |
| Allowlisted FT | Invoke receiver using authenticated predecessor | Select arbitrary owner or unsupported asset |
| Own callback | Settle matched reservation once | Accept external forged result |
| Emergency role | Approved deposit pause with event/reason | Seize funds or change owner |
| Config governor | Approved bounded future config | Silent principal penalty or unrestricted transfer |
| Upgrader / account full-access holder | Only policy-approved code updates | Claimed absent if key actually exists |
| Backend/indexer | Observe and project | Authorise on-chain user spending |

Immediate caller versus original signer is chosen deliberately per method. User actions use owner authority; FT receiver checks predecessor then sender_id. Private callbacks check own account and matched operation nonce/state. Reserve before transfer and bind idempotency to payload to prevent interleaving/replay.

## Failure containment

Bound storage growth and charge disclosed storage cost, guard arithmetic, validate token identity, reserve gas for callbacks and maintain safe unresolved state. Unknown payout cannot be restored simply because a callback failed. Separate contract operating/storage balance from user liabilities. Do not log private goals or credentials.

## Acceptance

Independent review of all public methods, upgrade powers, key inventory, callback paths, storage attacks and recovery proof is required before meaningful value exposure. No audit has occurred. A compromised full-access deployment key can replace ownership checks; governance must address this honestly before launch.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Threat Model](../13-security/THREAT_MODEL.md)
