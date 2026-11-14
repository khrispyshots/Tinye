# Voice and copy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Content designer

## Purpose

Make financial copy calm, accurate and actionable.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Writing rules

Use short active sentences and familiar verbs: Save, Add to goal, Withdraw, Review, Try again. Explain wallets as tools that approve blockchain actions; explain network fees before signing. Never hide a condition behind a tooltip or use urgency, shame or social pressure to secure a deposit.

| Situation | Approved pattern | Evidence needed |
|---|---|---|
| Submitted | Your deposit is awaiting confirmation. | Recorded submission, no balance credit |
| Unknown | We cannot confirm this transaction yet. Check its status before trying again. | Status unavailable |
| Confirmed | Your deposit is confirmed on testnet. | Verified final economic effect |
| Goal shortfall | You need {amount} {asset} to reach your target. | Exact same-asset confirmed calculation |
| Yield absent | Earnings are not available in this version. | Strategy feature disabled |
| Closure | Closing your account does not erase public blockchain records. | Chain/off-chain distinction |

Avoid guaranteed profits, 100% safe, insured without evidence, free when gas applies, and creditworthy. Your savings are growing is appropriate only when verified progress actually increased; never imply yield from a contribution alone.

## Acceptance

Errors identify the issue and next action without blame or secrets. Legal agreement and marketing preferences are separate. Content review checks every state against the transaction source of truth and testnet label.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
