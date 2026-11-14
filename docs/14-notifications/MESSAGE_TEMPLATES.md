# Message templates

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Provide truthful, safe service copy for every required notification.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Proposed templates — no messages sent

| Trigger | Template | Proof / channel |
|---|---|---|
| Welcome | Welcome to Tinye. Start with a goal that matters to you. | Account created; in-app |
| Goal created | Your goal is ready. Add a contribution when you are ready. | Saved goal; in-app |
| Deposit submitted | Your testnet deposit was submitted. It is awaiting confirmation. | Submission recorded; in-app |
| Deposit confirmed | Your testnet deposit is confirmed. View its details in Tinye. | Verified accepted effect; in-app |
| Deposit failed | Your deposit did not complete. Review the details before trying again. | Proven failure; in-app |
| Withdrawal submitted | Your testnet withdrawal was submitted. Check its status in Tinye. | Submitted/reserved; in-app |
| Withdrawal confirmed | Your testnet withdrawal is confirmed. View the receipt in Tinye. | Verified settled payout; in-app |
| Withdrawal failed | Your withdrawal did not complete. Review its status and any network fees. | Proven failure/release details |
| Milestone | You reached a verified goal milestone. See your progress. | Verified threshold; in-app |
| Goal completed | You marked your goal completed. Review your savings history. | Owner completion; not an invented transfer |
| Reward earned | You earned {points} points under {rule_name}. Points have no cash value. | Posted ledger, approved rule |
| Reward redeemed | Your reward fulfilment status has changed. Open Tinye for details. | Later real evidence only |
| Security alert | There was a security change on your Tinye account. Review your active sessions. | Verified security event; approved channels |
| Group invitation | You have a group invitation. Review the rules and privacy choices before joining. | Later valid invite, no member details |
| Group contribution | Your group progress has updated. View permitted details in Tinye. | Later verified event and visibility consent |

## Acceptance

Templates are versioned, localisable and avoid secret/sensitive interpolation. Links use the verified app domain and never request seed phrases. Unknown transaction messages say status cannot yet be confirmed and advise checking before retrying. Optional reminders avoid pressure. External channels and timing await approval; no campaign or message has been sent.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
