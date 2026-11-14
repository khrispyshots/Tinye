# Content and microcopy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Content / product leads

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Define precise labels for financial and empty states.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Default financial labels

Use Your savings, Available and Pending withdrawals. Pending withdrawals displays canonical reserved units, including unknown/recovery-required payouts; it does not mean payout succeeded. See root ui.md for the complete source-of-truth mapping.

## Canonical copy

| State | Label / message | Action |
|---|---|---|
| No goals | Make room for your first goal. | Create goal |
| No transactions | Confirmed activity will appear here. | Add to goal |
| No rewards | Eligible milestones will appear here. | How points work |
| Awaiting signature | Review and approve in your wallet. | Return to wallet / Cancel before submission |
| Pending | Submitted. Waiting for confirmation. | View status |
| Unknown | Status is unavailable. Check before trying again. | Check status / Get help |
| Failed | This action did not complete. Network fees may still apply. | Review details |
| Unsupported | This asset or network is not supported. | Choose supported asset |
| Stale balance | Last verified {time}. Refresh before withdrawing. | Refresh |
| No yield | Earnings are unavailable in this version. | Learn about risks |
| Testnet | Testnet — test assets, no real-money savings. | How testnet works |

Success labels include the exact asset amount, testnet environment and receipt link. Do not show APR 0% as a substitute for unavailable yield. A withdrawal failure cannot claim returned funds until reservation release and authoritative evidence are reconciled.

## Acceptance

Template interpolation uses exact decimal formatting and sanitised text. Rejection is not a financial failure; pending is not success. Legal notices use versioned source content, not abbreviated consent hidden by truncation. Review copy against brand voice, current authority model and all global states.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
