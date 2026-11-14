# Dashboard, Wallet and Profile refinement proposal

Status: Proposed; awaiting visual-direction review. Version: 1.0. Updated: 2026-11-14.
Owner: Product design and frontend engineering.

Purpose: improve the existing product's craft without rebuilding it. Depends on [the UI audit](UI_REFINEMENT_AUDIT.md), [approved functional scope](../IMPLEMENTATION_APPROVAL.md), [wallet plan](../NEAR_WALLET_INTEGRATION.md) and real data availability. The owner requires review before major visual changes, then separate three-screen approval before application-wide propagation.

## Proposed design decision

Refine the existing light Tinye interface. Retain Inter, current neutral/sage palette, dark primary buttons, icon library, navigation order and component architecture. Use the reference for quality and hierarchy only. The proposed forest #174D38/emerald #32A879 palette is a fallback for missing tokens, not a reason to replace the existing configured palette. No new logo or illustration commission in this phase.

## Token and component changes

| Area | Proposal | Implementation boundary |
|---|---|---|
| Colour | Reuse configured canvas/card/tinted/summary/ink/action colours. Use existing dark green for readable financial status; bright accent for progress only | Add semantic aliases; do not globally recolour other screens |
| Spacing | 4/8/12/16/20/24/32px scale. Mobile page inset 20px; 24–32px between sections; card inset 20px mobile/24px desktop | Existing main container retained; compact foundation content internally |
| Type | Page title 24/32 mobile, 32/40 desktop; section 18/26; body 14/22; financial balance 36/40 mobile, 48/52 desktop; labels 13/18; essential state copy 14/22 | Inter 400/500/600/700, tabular amounts; avoid unnecessary 800 weight |
| Shape | Existing 12px controls, 20px ordinary cards, 24px financial summary, 28px sheet; pill for compact network/status only | Scope variants to foundations first |
| Elevation | One subtle card shadow, thin border, avoid nested elevated surfaces | Reuse lens-card; no ambient glow additions |
| Controls | At least 44px comfortable tap area; primary/secondary/quiet/disabled variants, clear focus ring | Additive shared primitives; do not replace every existing button |
| Icons | Lucide, 20px actions/18px rows, consistent 1.75–2 stroke | Preserve existing symbols where understandable |
| Motion | Restrained 160–220ms state transitions; no indefinite celebratory motion; reduced-motion removes nonessential transforms/animation | Foundation-scoped motion before broad rollout |
| Data states | Shared loading, disconnected, unavailable, stale, pending, failed and unknown treatments | No unavailable amount replaced by fake zero; Verified only with evidence |

Extract small presentational variants around existing markup: financial amount, network/account status, action button, settings row and empty/error notice. Keep AppContext/provider separation, existing views and routes. Sharing a new component must not cause unreviewed global restyling.

## A. Dashboard composition

1. Compact greeting/header with actual account status and Testnet badge. Use a neutral greeting when no display name exists; no invented user.
2. Retain the sage savings summary with one prominent, verified contract-savings figure. Show asset, last confirmed freshness and compact available/pending details only when known. Primary action remains Add to goal; Withdraw becomes a restrained secondary action. Remove decorative rings and unsupported instant-settlement claim.
3. Preserve goals list using existing GoalRow. Make only necessary foundation-local density adjustments; do not restyle the separate Goals page before approval. Keep Create goal as a quiet section action.
4. Add up to three genuinely verified recent activities with View all. With no verified history, use an honest empty state, not sample transactions.
5. Reduce help strip to a quiet support row, retaining its destination. Keep the current mobile Save action/navigation order. Wallet is reachable through a compact account entry and My Wallet in Profile; do not replace a tab to match the reference.

Acceptance: greeting/account fits 320px width; one obvious primary savings action; wallet and savings do not merge; unknown savings reads as unavailable; no mock Verified badge; current goal/help routes remain usable.

## B. Wallet composition

1. Heading My Wallet, network/status and full/copyable verified account identity. Long names wrap or truncate with accessible full value.
2. Primary wallet-asset amount on existing card/sage treatment; token units only, no invented USD. Separate savings-contract balance in a flat row below. Different assets remain separate.
3. Compact Receive, Send and History controls. Receive opens the existing sheet/dialog visual pattern with actual account-ID QR; no static or disconnected QR. Send remains disabled Coming Soon until secure signing and verification pass.
4. Place Direct Deposits — Coming Soon in a quiet bordered row at the existing funding entry. Required explanatory copy and disabled button; no bank details, fake credit or timer.
5. Wallet management and explorer remain secondary. History distinguishes wallet transfers from savings contract events. Refresh shows last successful data freshness and errors without overwriting known values with invented ones.

Acceptance: actual account/key verification precedes ready state; Receive QR decodes to current plain account ID and changes on switch; savings distinct from wallet; disconnected/RPC-error states usable; real explorer/network links only. Testnet label explains no real monetary value.

## C. Profile composition

1. Compact identity header with initials/avatar, actual display name/email when available and verified wallet/network. Replace unsupported self-custody/NDPC verification claims with actual provider and consent status.
2. One restrained financial overview with Wallet Balance, Total Savings and Total Withdrawn. Use three equal columns only when labels/amounts fit; stack rows at narrow widths and with long values. No three oversized dashboard cards.
3. Flat grouped settings rows: My Wallet, Savings Goals, Transaction History, Rewards & Points, Savings Reputation; then Security, Notifications, Preferences; then Help, Terms, Privacy, Risk. Each row has one icon/label/chevron and a real destination or explicit unavailable state.
4. Disconnect and Log Out remain clear separate actions; neither deletes a wallet nor moves funds. Account closure has a review flow and blockchain-data permanence disclosure.

Acceptance: financial totals show asset and withdrawn time scope; no wallet sends counted as savings withdrawals; identity/card remain readable at 200% zoom; settings reachable by keyboard; unsupported destinations do not silently do nothing.

## Delivery and review gates

1. Review this concrete proposal. Do not change application visuals before the owner approves it. Prior functional approval remains recorded; this is the newly requested visual gate.
2. Implement only Dashboard, Wallet and Profile inside the current application, plus minimal supporting primitives and functional states. Do not rebuild onboarding/navigation or propagate styling globally.
3. Capture actual application screenshots of each foundation at 390px mobile and 1440px desktop; additionally test 320px width, 200% zoom, keyboard, long IDs, reduced motion, loading/disconnected/error and pending states. Screenshots must label disconnected/unavailable honestly if real account/contract data is absent.
4. Present all three screens together for visual approval. Record what is implemented, what is unverified and relevant functional tests. Never use a mockup as proof of real wallet functionality.
5. Only after that approval, apply approved rules incrementally to remaining screens in the audit inventory. Preserve all working interactions; pair each rollout with relevant functional and responsive checks.

## Verification checklist

- No horizontal overflow at 320/390/768/1440px; bottom navigation respects safe area and focused controls remain visible.
- Readable financial labels/status, visible keyboard focus, 44px tap areas, named modal/close controls and proper focus return.
- Text contrast at least 4.5:1 for normal text; check rendered opacity/background combinations. Nontext controls/statuses are distinguishable without colour alone.
- Signing or RPC failure cannot show success; QR/account data refreshes on switch; financial formatting uses exact base units.
- No fabricated user, balance, reward, fiat value, hash, legal verification or custody claim.
- No global theme/nav/font change and no full-app rollout before foundation approval.

## Open decisions

Approve this refinement direction, including retaining current dark primary buttons and sage summary rather than copying the reference's dark-green balance cards. Wallet activation, session store, contract deployment, fulfilment and group policy blockers remain functional decisions in the existing implementation plan; they are not solved by visual approval.
