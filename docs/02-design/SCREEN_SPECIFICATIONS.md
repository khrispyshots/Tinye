# Complete screen specifications

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** UX / product / QA leads

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Specify all 62 named screens, admin surfaces and 16 global states.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Screen contract and common interaction requirements

Every screen below is proposed, not implemented. Each entry specifies purpose/content, entry, actions, validation, loading/empty, success, failure, analytics and release scope. All screens inherit the following acceptance requirements: semantic h1/landmarks and logical focus; keyboard operation and named controls; labelled errors/status announcements without repeated polling noise; 320px reflow and user text zoom; mobile one column with safe navigation, desktop max-width content; reduced motion; safe back/refresh without resubmission. Financial reviews are full pages with persistent testnet, amount/asset, fee and rule information. Skeletons never invent values. Conditional screens present unavailable explanations and have no active financial CTA in MVP.

Screen analytics use `screen_viewed` with the stable screen_id only and event consent/purpose controls; financial actions emit canonical server-confirmed events from EVENT_TAXONOMY, not UI success. Do not include goal names, wallet addresses, signatures or amounts in general analytics. This inherited contract is part of each screen, not an optional note.

## Public and onboarding

### ONB-01 — Marketing/landing page

- **Entry / purpose:** Public URL.
- **Hierarchy and actions:** Promise, how it works, testnet boundary and risks; start onboarding.
- **Validation / permissions:** No unsupported return, banking or customer claims.
- **Loading / empty:** Static content; no invented activity feed.
- **Success:** Open welcome.
- **Failure / recovery:** Content unavailable: legal/help links remain.
- **Analytics:** `screen_viewed(ONB-01)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-02 — Welcome screen

- **Entry / purpose:** Landing or fresh app.
- **Hierarchy and actions:** Brand line, concise purpose, testnet label; continue.
- **Validation / permissions:** No deposit CTA before account/terms.
- **Loading / empty:** Static introduction.
- **Success:** Go to product introduction.
- **Failure / recovery:** Offline: cached truthful explanation.
- **Analytics:** `screen_viewed(ONB-02)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-03 — Product introduction

- **Entry / purpose:** Welcome.
- **Hierarchy and actions:** Goals, verified progress and no-yield MVP; next/skip.
- **Validation / permissions:** Do not imply points are cash.
- **Loading / empty:** Static educational cards.
- **Success:** Continue how it works.
- **Failure / recovery:** Retry missing educational content.
- **Analytics:** `screen_viewed(ONB-03)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-04 — How Tinye works

- **Entry / purpose:** Introduction or help.
- **Hierarchy and actions:** Wallet/key control, vault, contribution/exit and fees; continue.
- **Validation / permissions:** No custody guarantee; rules match approved choice.
- **Loading / empty:** Static steps.
- **Success:** Enter authentication.
- **Failure / recovery:** Unsupported method: explain options.
- **Analytics:** `screen_viewed(ONB-04)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-05 — Sign up

- **Entry / purpose:** Welcome/auth.
- **Hierarchy and actions:** Approved method choices, consent context; request challenge/create account.
- **Validation / permissions:** D21 method; no email/password collection unless approved.
- **Loading / empty:** Await challenge; new account is empty.
- **Success:** Create identity once.
- **Failure / recovery:** Replay, rate limit or provider rejection.
- **Analytics:** `screen_viewed(ONB-05)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP; method-dependent.

### ONB-06 — Sign in

- **Entry / purpose:** Auth/session expired.
- **Hierarchy and actions:** Supported login, recovery/help; authenticate.
- **Validation / permissions:** Verify challenge/account/network and eligible key.
- **Loading / empty:** Await wallet proof.
- **Success:** Issue rotated session.
- **Failure / recovery:** Invalid/expired proof; safe retry.
- **Analytics:** `screen_viewed(ONB-06)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-07 — Email or phone verification

- **Entry / purpose:** Approved email/phone method.
- **Hierarchy and actions:** Masked destination, verification input, resend; verify.
- **Validation / permissions:** TTL, attempt bounds and replay protection; paste allowed.
- **Loading / empty:** Await delivery/code; show resend cooldown.
- **Success:** Identifier verified.
- **Failure / recovery:** Expired/wrong code, unavailable delivery.
- **Analytics:** `screen_viewed(ONB-07)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Conditional D21.

### ONB-08 — Authentication error/retry

- **Entry / purpose:** Failed authentication.
- **Hierarchy and actions:** Plain failure reason and help; retry approved method.
- **Validation / permissions:** No user enumeration or secret debug data.
- **Loading / empty:** Retry state, no identity assumed.
- **Success:** Return intended route after proof.
- **Failure / recovery:** Repeated failure/rate limit: accessible wait/help.
- **Analytics:** `screen_viewed(ONB-08)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-09 — Wallet creation or connection explanation

- **Entry / purpose:** Pre-connection onboarding.
- **Hierarchy and actions:** What wallet does, who holds keys, vault risks and recovery; choose connect.
- **Validation / permissions:** Accurate D04-D06 model; no seed input.
- **Loading / empty:** No wallet selected.
- **Success:** Proceed with understanding.
- **Failure / recovery:** Unsupported option explained.
- **Analytics:** `screen_viewed(ONB-09)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-10 — Wallet setup/connection

- **Entry / purpose:** Wallet explanation.
- **Hierarchy and actions:** Supported wallets, account and network; connect/prove.
- **Validation / permissions:** NEP-413 capability, network and account binding.
- **Loading / empty:** Await provider; no fake account.
- **Success:** Verified account linked.
- **Failure / recovery:** Rejection, popup/deep-link failure, wrong network.
- **Analytics:** `screen_viewed(ONB-10)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-11 — Wallet setup success

- **Entry / purpose:** Verified connection.
- **Hierarchy and actions:** Account/network, key recovery reminder; continue.
- **Validation / permissions:** Server proof exists; connection alone insufficient.
- **Loading / empty:** Verify pending proof.
- **Success:** Proceed consent/profile.
- **Failure / recovery:** Proof stale or account switched: reverify.
- **Analytics:** `screen_viewed(ONB-11)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-12 — Terms and Privacy consent

- **Entry / purpose:** Before financial access.
- **Hierarchy and actions:** Approved Terms/Privacy versions and separate optional marketing; accept.
- **Validation / permissions:** Exact version/hash, required agreement, no prechecked optional box.
- **Loading / empty:** Load actual documents; no approved version means blocked.
- **Success:** Consent records saved.
- **Failure / recovery:** Version changed: reread; save failure: retry.
- **Analytics:** `screen_viewed(ONB-12)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-13 — Risk acknowledgement where required

- **Entry / purpose:** Required risk gate.
- **Hierarchy and actions:** Wallet/contract/asset/network risks and powers; acknowledge.
- **Validation / permissions:** Risk version matched to approved product.
- **Loading / empty:** Load disclosure; missing content blocks action.
- **Success:** Store separate acknowledgement.
- **Failure / recovery:** Decline: no financial participation; keep help/exit info.
- **Analytics:** `screen_viewed(ONB-13)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP when required.

### ONB-14 — Basic profile setup

- **Entry / purpose:** Authenticated onboarding.
- **Hierarchy and actions:** Display name, locale/timezone; save minimal profile.
- **Validation / permissions:** Bound name; no unnecessary identity data.
- **Loading / empty:** Load saved values; new profile empty.
- **Success:** Save versioned profile.
- **Failure / recovery:** Validation/version conflict: retain inputs.
- **Analytics:** `screen_viewed(ONB-14)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-15 — Notification permission request (contextual and optional)

- **Entry / purpose:** Context after useful action.
- **Hierarchy and actions:** Benefit, channel and skip choice; enable or later.
- **Validation / permissions:** Optional preference; no permission prompt before explanation.
- **Loading / empty:** No permission yet.
- **Success:** Store preference; request supported permission.
- **Failure / recovery:** Denied: in-app notices still available.
- **Analytics:** `screen_viewed(ONB-15)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP in-app; push later.

### ONB-16 — Onboarding completion

- **Entry / purpose:** Required stages completed.
- **Hierarchy and actions:** Completed setup summary, testnet reminder; continue.
- **Validation / permissions:** Required proof/consent/profile checks pass.
- **Loading / empty:** Check stage state.
- **Success:** Enter dashboard.
- **Failure / recovery:** Missing stage: route to exact requirement.
- **Analytics:** `screen_viewed(ONB-16)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### ONB-17 — First savings goal prompt

- **Entry / purpose:** Completion/no goals.
- **Hierarchy and actions:** Purpose examples and single create action.
- **Validation / permissions:** No forced contribution or fake goal.
- **Loading / empty:** No personal goals.
- **Success:** Create first goal.
- **Failure / recovery:** Dismiss to truthful empty dashboard.
- **Analytics:** `screen_viewed(ONB-17)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

## Main application

### APP-01 — Home dashboard

- **Entry / purpose:** Authenticated home.
- **Hierarchy and actions:** Confirmed/available/reserved by asset, goals and safe shortcuts; save/view history.
- **Validation / permissions:** As-of source; no cross-asset sum or yield claim.
- **Loading / empty:** Skeleton; verified zero vs unavailable distinct.
- **Success:** Verified snapshot and real progress.
- **Failure / recovery:** Stale/network failure banner with refresh/help.
- **Analytics:** `screen_viewed(APP-01)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-02 — All goals

- **Entry / purpose:** Home/Goals nav.
- **Hierarchy and actions:** Owned goal cards and status filters; create/open.
- **Validation / permissions:** Owner filter; stable pagination.
- **Loading / empty:** Skeleton; no-goals CTA.
- **Success:** List real goals.
- **Failure / recovery:** Fetch error with retry.
- **Analytics:** `screen_viewed(APP-02)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-03 — Create goal

- **Entry / purpose:** Goals/first-goal prompt.
- **Hierarchy and actions:** Name/category/target/asset/date/mode and terms; review/create.
- **Validation / permissions:** Positive exact target, limits, date, allowed asset; flexible only.
- **Loading / empty:** Asset config loading; unavailable config blocks.
- **Success:** Goal saved once.
- **Failure / recovery:** Validation/duplicate/conflict retains input.
- **Analytics:** `screen_viewed(APP-03)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-04 — Edit goal

- **Entry / purpose:** Goal details.
- **Hierarchy and actions:** Editable name/target/date/preferences; save.
- **Validation / permissions:** Owner/version; asset immutable after funding; rules unchanged.
- **Loading / empty:** Load existing values.
- **Success:** Versioned metadata saved.
- **Failure / recovery:** Concurrent edit or forbidden change explained.
- **Analytics:** `screen_viewed(APP-04)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-05 — Goal details

- **Entry / purpose:** Goal card/deep link.
- **Hierarchy and actions:** Name, amount/asset, target, state, as-of and terms; deposit/withdraw/edit/history.
- **Validation / permissions:** Owner and fresh financial availability.
- **Loading / empty:** Skeleton; zero goal with first contribution CTA.
- **Success:** Verified goal view.
- **Failure / recovery:** Not found/stale/restricted: safe next action.
- **Analytics:** `screen_viewed(APP-05)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-06 — Goal contribution history

- **Entry / purpose:** Goal detail/history link.
- **Hierarchy and actions:** Confirmed contribution rows and source details; filter/open.
- **Validation / permissions:** Owner/goal scope, exact amount and pagination.
- **Loading / empty:** No contributions explanatory state.
- **Success:** Verified contributions listed.
- **Failure / recovery:** Indexer lag/error with freshness indicator.
- **Analytics:** `screen_viewed(APP-06)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-07 — Deposit amount

- **Entry / purpose:** Save/goal.
- **Hierarchy and actions:** Asset/network, exact amount and available wallet/gas context; continue.
- **Validation / permissions:** Decimals, positive, configured bounds, goal state.
- **Loading / empty:** Fetch config; no asset selected.
- **Success:** Valid amount proceeds to review.
- **Failure / recovery:** Precision/balance/storage/gas issue inline.
- **Analytics:** `screen_viewed(APP-07)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-08 — Deposit review

- **Entry / purpose:** Valid deposit amount.
- **Hierarchy and actions:** Amount/asset, vault, network, fee/storage payer, risks; sign.
- **Validation / permissions:** Intent payload/version/expiry and wallet account unchanged.
- **Loading / empty:** Fee/config load; block unknown unsafe estimate.
- **Success:** Wallet request initiated.
- **Failure / recovery:** Changed quote/account requires re-review.
- **Analytics:** `screen_viewed(APP-08)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-09 — Deposit pending

- **Entry / purpose:** Submitted deposit.
- **Hierarchy and actions:** Amount, hash when known, current status/as-of; inspect status.
- **Validation / permissions:** Do not increase balance or points yet.
- **Loading / empty:** Pending or unknown; no fake progress.
- **Success:** Route success after final accepted effect.
- **Failure / recovery:** Proven failure routes failure; timeout stays unknown.
- **Analytics:** `screen_viewed(APP-09)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-10 — Deposit success

- **Entry / purpose:** Verified deposit.
- **Hierarchy and actions:** Accepted amount/asset, checkpoint/receipt, goal progress; done.
- **Validation / permissions:** Final retained amount verified, no duplicate event.
- **Loading / empty:** Wait for final proof before entering.
- **Success:** Show confirmed testnet deposit.
- **Failure / recovery:** Proof missing: return pending/unknown.
- **Analytics:** `screen_viewed(APP-10)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-11 — Deposit failure

- **Entry / purpose:** Proven failed deposit.
- **Hierarchy and actions:** Reason, actual fee/refund evidence, safe retry/help.
- **Validation / permissions:** Cannot claim refunded amount without proof.
- **Loading / empty:** Unresolved outcome uses pending, not failure.
- **Success:** New review only after terminal proof.
- **Failure / recovery:** Provider unavailable: status unknown.
- **Analytics:** `screen_viewed(APP-11)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-12 — Withdrawal amount

- **Entry / purpose:** Goal/wallet withdrawal.
- **Hierarchy and actions:** Fresh available vs reserved amount; enter exit amount.
- **Validation / permissions:** Owner, exact units, bounds and available balance.
- **Loading / empty:** Refresh source; zero available with reason.
- **Success:** Valid amount proceeds.
- **Failure / recovery:** Insufficient/reserved/stale balance explained.
- **Analytics:** `screen_viewed(APP-12)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-13 — Withdrawal review and rule disclosure

- **Entry / purpose:** Valid withdrawal amount.
- **Hierarchy and actions:** Owner destination, amount, fees, rules and testnet; approve.
- **Validation / permissions:** No hidden penalty; intent bound to fresh state.
- **Loading / empty:** Eligibility/fee load.
- **Success:** Wallet approval requested.
- **Failure / recovery:** Changed availability/terms requires review.
- **Analytics:** `screen_viewed(APP-13)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-14 — Withdrawal pending

- **Entry / purpose:** Submitted withdrawal.
- **Hierarchy and actions:** Reservation, hash, status and help; check status.
- **Validation / permissions:** No duplicate payout or false completion.
- **Loading / empty:** Pending/unknown; retain reservation.
- **Success:** Verified payout moves to success.
- **Failure / recovery:** Proven failure releases once; missing callback recovery required.
- **Analytics:** `screen_viewed(APP-14)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-15 — Withdrawal success

- **Entry / purpose:** Verified settled withdrawal.
- **Hierarchy and actions:** Paid amount/asset, recipient, fee evidence and receipt; done.
- **Validation / permissions:** Authoritative payout and settled reservation.
- **Loading / empty:** Do not enter until proof.
- **Success:** Confirmed testnet exit.
- **Failure / recovery:** Inconsistent proof returns unresolved incident.
- **Analytics:** `screen_viewed(APP-15)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-16 — Withdrawal failure

- **Entry / purpose:** Proven failed withdrawal.
- **Hierarchy and actions:** Failure reason, reservation release status, fees and help.
- **Validation / permissions:** Do not say funds returned until proven release.
- **Loading / empty:** Recovery-required if payout unknown.
- **Success:** Safe fresh review after proven release.
- **Failure / recovery:** Unresolved callback cannot be overwritten.
- **Analytics:** `screen_viewed(APP-16)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-17 — Wallet overview

- **Entry / purpose:** Home/Profile wallet link.
- **Hierarchy and actions:** Connected account, per-asset balances, network costs and goals; asset details.
- **Validation / permissions:** Distinguish external wallet balance from goal liability.
- **Loading / empty:** No connected wallet: explain connect.
- **Success:** Fresh verified balances.
- **Failure / recovery:** Wrong network/stale provider: block unsafe action.
- **Analytics:** `screen_viewed(APP-17)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-18 — Asset details

- **Entry / purpose:** Wallet asset row.
- **Hierarchy and actions:** Verified identity/decimals, contract, network, balance/as-of; view activity.
- **Validation / permissions:** Allowlist not symbol trust; native gas separate.
- **Loading / empty:** Metadata fetch; unapproved asset unavailable.
- **Success:** Show current supported asset.
- **Failure / recovery:** Metadata mismatch disables use.
- **Analytics:** `screen_viewed(APP-18)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-19 — Transaction history

- **Entry / purpose:** Home/wallet/history nav.
- **Hierarchy and actions:** Status/date/goal filters and transaction rows; open detail.
- **Validation / permissions:** Owner filter, stable cursor, no invented rows.
- **Loading / empty:** No transactions explanatory CTA.
- **Success:** Verified record list.
- **Failure / recovery:** Delayed indexing banner; retry reads.
- **Analytics:** `screen_viewed(APP-19)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-20 — Transaction details

- **Entry / purpose:** Transaction row/deep link.
- **Hierarchy and actions:** Amount/asset, lifecycle, fees, receipt(s), as-of and support; inspect evidence.
- **Validation / permissions:** Requested vs retained/settled amount distinguished.
- **Loading / empty:** Pending evidence and unknown labelled.
- **Success:** Show final economic result.
- **Failure / recovery:** Missing evidence stays unresolved.
- **Analytics:** `screen_viewed(APP-20)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-21 — Earnings/yield overview

- **Entry / purpose:** Optional earnings entry.
- **Hierarchy and actions:** Unavailable explanation in MVP; later realised vs estimated earnings.
- **Validation / permissions:** No live rates or simulated withdrawable earnings.
- **Loading / empty:** Disabled scope notice.
- **Success:** Later approved verified strategy view.
- **Failure / recovery:** Provider unavailable/stale NAV cannot become zero-rate claim.
- **Analytics:** `screen_viewed(APP-21)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D07/D08.

### APP-22 — Yield strategy details and risk disclosure

- **Entry / purpose:** Conditional earnings page.
- **Hierarchy and actions:** Provider, mechanics, rates/source/time, fees, risks, liquidity; consent later.
- **Validation / permissions:** Verified strategy/asset/admin and legal eligibility.
- **Loading / empty:** Unavailable until diligence approved.
- **Success:** Versioned consent before any allocation.
- **Failure / recovery:** Missing disclosure blocks activation.
- **Analytics:** `screen_viewed(APP-22)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D08.

### APP-23 — Rewards overview

- **Entry / purpose:** Rewards nav.
- **Hierarchy and actions:** Posted/noncash points, milestones and rules; view history.
- **Validation / permissions:** Never sum points with savings.
- **Loading / empty:** No rewards state; no fake benefit.
- **Success:** Verified ledger balance.
- **Failure / recovery:** Projection error: unavailable with help.
- **Analytics:** `screen_viewed(APP-23)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-24 — Points history

- **Entry / purpose:** Rewards history.
- **Hierarchy and actions:** Earn/reverse entries, source, rule version and amounts; inspect.
- **Validation / permissions:** Integer points, immutable corrections.
- **Loading / empty:** No points entries.
- **Success:** Auditable list.
- **Failure / recovery:** Missing source: flag review.
- **Analytics:** `screen_viewed(APP-24)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-25 — Streaks and milestones

- **Entry / purpose:** Rewards/milestone link.
- **Hierarchy and actions:** Contribution weeks, milestones and definitions; inspect factors.
- **Validation / permissions:** Authoritative times; no shaming or credit claims.
- **Loading / empty:** No history with supportive copy.
- **Success:** Verified badges/progress.
- **Failure / recovery:** Incorrect data: dispute and recompute.
- **Analytics:** `screen_viewed(APP-25)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-26 — Rewards catalogue

- **Entry / purpose:** Conditional rewards catalogue.
- **Hierarchy and actions:** Actual item stock, eligibility and terms; later select.
- **Validation / permissions:** No fake partners/stock; real redemption disabled.
- **Loading / empty:** Unavailable explanation in MVP.
- **Success:** Only approved supplier inventory later.
- **Failure / recovery:** Out of stock/region restriction clear.
- **Analytics:** `screen_viewed(APP-26)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D13.

### APP-27 — Reward details

- **Entry / purpose:** Conditional catalogue item.
- **Hierarchy and actions:** Benefit, cost, stock, expiry/region and supplier; select.
- **Validation / permissions:** Price/version and funded fulfilment.
- **Loading / empty:** Unavailable or loading real item.
- **Success:** Proceed later to redemption review.
- **Failure / recovery:** Unavailable item cannot redeem.
- **Analytics:** `screen_viewed(APP-27)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D13.

### APP-28 — Redemption review

- **Entry / purpose:** Conditional selected reward.
- **Hierarchy and actions:** Point cost, stock reservation, fulfilment and refund rules; confirm.
- **Validation / permissions:** Atomic availability and approved terms.
- **Loading / empty:** Unavailable in MVP.
- **Success:** Idempotent reservation request later.
- **Failure / recovery:** Price/stock change requires review.
- **Analytics:** `screen_viewed(APP-28)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D13.

### APP-29 — Redemption success/failure

- **Entry / purpose:** Conditional redemption request.
- **Hierarchy and actions:** Delivery evidence or failure/refund status; help.
- **Validation / permissions:** No fulfilled claim without real supplier evidence.
- **Loading / empty:** Unresolved fulfilment status.
- **Success:** Real fulfilled/refunded state later.
- **Failure / recovery:** Timeout cannot trigger duplicate fulfilment.
- **Analytics:** `screen_viewed(APP-29)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D13.

### APP-30 — Reputation overview

- **Entry / purpose:** Profile behaviour summary.
- **Hierarchy and actions:** Descriptive history and not-a-credit-score explanation; factors.
- **Validation / permissions:** No numeric composite or underwriting claim.
- **Loading / empty:** No history; unavailable advanced score.
- **Success:** Private verified summary.
- **Failure / recovery:** Disputed/incomplete factors labelled.
- **Analytics:** `screen_viewed(APP-30)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP descriptive only D14.

### APP-31 — Savings behaviour history

- **Entry / purpose:** Profile/history.
- **Hierarchy and actions:** Monthly verified contributions/completed goals and factors; report issue.
- **Validation / permissions:** Private, as-of and calculation version.
- **Loading / empty:** No activity explanation.
- **Success:** Inspect underlying evidence.
- **Failure / recovery:** Correction/appeal route.
- **Analytics:** `screen_viewed(APP-31)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-32 — Group savings discovery

- **Entry / purpose:** Conditional group entry.
- **Hierarchy and actions:** Privacy/rules and supported shared-goal options; discover.
- **Validation / permissions:** No public identities or pooled-fund claim.
- **Loading / empty:** Unavailable in MVP.
- **Success:** Later safe group view.
- **Failure / recovery:** Feature/region unavailable.
- **Analytics:** `screen_viewed(APP-32)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-33 — Create group goal

- **Entry / purpose:** Conditional groups.
- **Hierarchy and actions:** Group name/target/asset/visibility/individual ownership; create.
- **Validation / permissions:** Approved membership and fund rules.
- **Loading / empty:** Unavailable in MVP.
- **Success:** Later group created without transferring funds.
- **Failure / recovery:** Rule/asset invalid or duplicate.
- **Analytics:** `screen_viewed(APP-33)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-34 — Group goal details

- **Entry / purpose:** Conditional group link.
- **Hierarchy and actions:** Aggregate progress, own balance, roles and rules; contribute/leave.
- **Validation / permissions:** Members only; no organiser withdrawal of others.
- **Loading / empty:** Unavailable or no contributions.
- **Success:** Later attributed progress.
- **Failure / recovery:** Removed/restricted membership preserves own exit info.
- **Analytics:** `screen_viewed(APP-34)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-35 — Invite members

- **Entry / purpose:** Conditional organiser action.
- **Hierarchy and actions:** Invite role, expiry and privacy terms; invite/revoke.
- **Validation / permissions:** One-use hashed token, approved recipient handling.
- **Loading / empty:** No invites.
- **Success:** Later invite created.
- **Failure / recovery:** Expired/replayed/revoked invitation.
- **Analytics:** `screen_viewed(APP-35)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-36 — Group contributions

- **Entry / purpose:** Conditional group detail.
- **Hierarchy and actions:** Permitted contribution visibility and own receipts; filter.
- **Validation / permissions:** No unauthorised identity/amount disclosure.
- **Loading / empty:** No contributions.
- **Success:** Later verified member-attributed records.
- **Failure / recovery:** Consent or membership missing: deny.
- **Analytics:** `screen_viewed(APP-36)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-37 — Group activity

- **Entry / purpose:** Conditional group detail.
- **Hierarchy and actions:** Safe join/contribution/leave events; inspect.
- **Validation / permissions:** No private narrative or shame for lateness.
- **Loading / empty:** No activity.
- **Success:** Later authorised activity.
- **Failure / recovery:** Former member access revoked.
- **Analytics:** `screen_viewed(APP-37)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** Deferred D12.

### APP-38 — Notifications centre

- **Entry / purpose:** Header/Profile notices.
- **Hierarchy and actions:** Transaction/security notices and preferences; open/read.
- **Validation / permissions:** Owner, safe content and dedupe.
- **Loading / empty:** No notices.
- **Success:** Mark read without altering financial state.
- **Failure / recovery:** Delivery unavailable: source status still inspectable.
- **Analytics:** `screen_viewed(APP-38)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP in-app.

### APP-39 — Profile

- **Entry / purpose:** Profile nav.
- **Hierarchy and actions:** Minimal name, goals/history links and settings; edit.
- **Validation / permissions:** No credit label or public profile default.
- **Loading / empty:** New profile empty.
- **Success:** Saved private profile.
- **Failure / recovery:** Version conflict/save error.
- **Analytics:** `screen_viewed(APP-39)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-40 — Account settings

- **Entry / purpose:** Profile settings.
- **Hierarchy and actions:** Locale/timezone, consent preferences, export/closure; save.
- **Validation / permissions:** Marketing separate, timezone reward changes versioned.
- **Loading / empty:** Load actual preferences.
- **Success:** Saved versioned preferences.
- **Failure / recovery:** Invalid/expired session: reauthenticate.
- **Analytics:** `screen_viewed(APP-40)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-41 — Security settings

- **Entry / purpose:** Settings/security.
- **Hierarchy and actions:** Active sessions, recovery explanation, MFA if approved; revoke.
- **Validation / permissions:** Recent auth and no secrets.
- **Loading / empty:** No other sessions.
- **Success:** Session revoked.
- **Failure / recovery:** Stale session or auth failure.
- **Analytics:** `screen_viewed(APP-41)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-42 — Connected wallets

- **Entry / purpose:** Profile/wallets.
- **Hierarchy and actions:** Verified accounts/networks and provider; link/disconnect.
- **Validation / permissions:** Fresh ownership proof; no on-chain ownership reassignment.
- **Loading / empty:** No wallets.
- **Success:** Connected/disconnected app status.
- **Failure / recovery:** Proof rejected, wrong network; explain key revocation separately.
- **Analytics:** `screen_viewed(APP-42)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-43 — Help and support

- **Entry / purpose:** Global help.
- **Hierarchy and actions:** Search/FAQ, safe contact/case form; request support.
- **Validation / permissions:** No key/seed request; redact personal data.
- **Loading / empty:** No tickets or offline help.
- **Success:** Case created with reference.
- **Failure / recovery:** Delivery failed: retain safe input/retry.
- **Analytics:** `screen_viewed(APP-43)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-44 — Legal documents

- **Entry / purpose:** Public footer/settings.
- **Hierarchy and actions:** Approved legal versions and accepted history; read/download.
- **Validation / permissions:** No production placeholders, version/hash accurate.
- **Loading / empty:** Unapproved drafts labelled, not binding.
- **Success:** Correct document retrieved.
- **Failure / recovery:** Unavailable document blocks required consent.
- **Analytics:** `screen_viewed(APP-44)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

### APP-45 — Account closure flow

- **Entry / purpose:** Account settings.
- **Hierarchy and actions:** Balances, pending operations, export, deletion limits; request close.
- **Validation / permissions:** Recent auth, resolve funds/unknowns, legal holds.
- **Loading / empty:** Check closure eligibility.
- **Success:** Pending closure or closed with clear outcome.
- **Failure / recovery:** Unresolved liability cannot be erased.
- **Analytics:** `screen_viewed(APP-45)`; action outcomes use the taxonomy.
- **Accessibility / responsive:** Inherited screen contract; critical content remains visible before action.
- **Scope:** MVP.

## Admin surfaces required by section 13

### ADM-01 — Admin users

Entry is a privileged admin session. Purpose/actions: Redacted lookup/status; support-purpose and role audit; no user funds control. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-02 — Admin goal visibility

Entry is a privileged admin session. Purpose/actions: Owner/asset/rule/checkpoint and goal state; no financial amount editing. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-03 — Admin operations

Entry is a privileged admin session. Purpose/actions: Intent, receipt, reservation and unknown state; read/reconcile only. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-04 — Admin reconciliation

Entry is a privileged admin session. Purpose/actions: Per-asset final checkpoint differences and approved replay request; no manual credit. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-05 — Admin support

Entry is a privileged admin session. Purpose/actions: Assigned cases, safe evidence and appeal trail; restricted identity access. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-06 — Admin role and audit

Entry is a privileged admin session. Purpose/actions: Time-limited roles, MFA and approval history; no self-grant. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-07 — Admin reward operations

Entry is a privileged admin session. Purpose/actions: Source/rule/correction evidence; later real catalogue/fulfilment gated. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

### ADM-08 — Admin health/configuration

Entry is a privileged admin session. Purpose/actions: Index lag, outbox failures, safe versioned config proposals; no implicit deployment authority. Validate role, purpose, recent authentication and request version. Loading shows redacted skeletons; empty means no matching authorised records. Success records an audit event. Failure denies safely or exposes provider-stale status with retry, never privileged bypass. Analytics use restricted operational audit, not marketing analytics. Keyboard-accessible filters/tables become labelled cards on mobile. Core visibility is MVP; mutations follow approved permissions and conditional scope.

## Global states and acceptance

| Global state | Required content / safe action |
|---|---|
| First-time empty | Explain the product and next safe action; never seed fake goals |
| No goals | Create goal CTA; no pressure or fabricated balance |
| No transactions | Explain confirmed history appears after verification |
| No rewards | Explain eligible rules and noncash meaning |
| Network unavailable | Retain safe input; label stale data; retry reads, not financial submission |
| Wallet disconnected | Explain connect; keep history readable if authenticated |
| Wallet connection rejected | Return to explanation/review; no failure fee claim without chain evidence |
| Transaction awaiting confirmation | Pending amount/hash/as-of; no balance or point increase |
| Transaction failed | Only proven terminal failure; show fee and refund/reservation evidence |
| Transaction status unknown | Keep unresolved reservation; check status/help before new action |
| Maintenance mode | Show scope, support and eligible exit information; no invented restoration time |
| Unsupported asset/network | Explain exact supported identity and block signing |
| Session expired | Reauthenticate and safely resume; no stale intent signing |
| Restricted account | Explain allowed scope/appeal as lawful; no assumed confiscation |
| KYC pending/rejected | Conditional on approved identity policy; minimise data and provide review route |
| Account closure pending | Show unresolved balances/operations/holds and next steps |

Test each screen's inherited contract plus listed failure branches. Render full inventory across mobile/desktop; inactive later screens must be labelled and non-actionable. Screen IDs are stable for QA and traceability; no route is evidence of implemented behaviour.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Event Taxonomy](../15-analytics/EVENT_TAXONOMY.md)
- [Component Library](COMPONENT_LIBRARY.md)
- [E2E Test Plan](../16-quality/E2E_TEST_PLAN.md)
