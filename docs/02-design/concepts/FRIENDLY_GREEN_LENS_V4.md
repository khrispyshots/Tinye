# Friendly green design and UX review — revision 4 (Lens-aligned theme v2.0)

**Status:** Approved - Lens visual direction | **Version:** 2.0 | **Last updated:** 2026-11-14
**Responsible role:** Product designer

## Purpose and owner direction

Owner requested direct adoption of the [Lens](https://lens.xyz/) theme and font system on 2026-11-14. This includes Lens's signature clean, airy ground, soft organic sage/mist tinted panels, deep charcoal typography, hairline container rings, and display-tight Inter sans typography. The documentation and live Next.js implementation are updated to reflect this design benchmark.

[Desktop and mobile visual preview](06-friendly-green-lens-v4.png)

## Review findings and modifications

| Previous issue | Revised treatment | Intended UX benefit |
|---|---|---|
| Blue and stark terminal styling felt unsuitable to owner | Dark forest shell, pale sage summary and fresh green accents | Align with owner's savings/green preference |
| Shouting uppercase slogan dominated financial task | Sentence-case headings and restrained supporting copy | Easier, calmer scanning |
| Rigid borders, bracketed IDs and monospace labels | Soft corners, simple sans labels, familiar outline icons | Less intimidating first-use experience |
| Financial summary competed with large hero art | Savings, available amount and clear actions grouped in one contrast panel | Identify money and next action quickly |
| Reserved is specialist jargon | User-facing Pending withdrawals with explanation | Explain unavailable funds; canonical reservation model unchanged |
| Goal cards emphasised technical progress | Goal purpose, amount/target, percentage and exact remainder | Understand why and how far remains |
| Guidance separate from main task | Visible How withdrawals work and wallet quick guide | Support unfamiliar users before signing |
| Desktop layout did not guide repeated tasks | Persistent sidebar; mobile five-item nav with explicit Save action | Familiar orientation and direct access |

## Proposed visual system

Dark shell #10281E; raised surfaces #19382B; primary text #F5F5EB; secondary text #B7C9BC; pale-sage summary #E2EDD9; fresh accent #A7CF78; primary button #174D38 with white text. Prefer 14–20px corners, stable flat fills, Geist-like sans, tabular financial numbers, restrained soft depth and decorative linework kept out of text. Default visual direction is approved by owner instruction on 2026-11-14. Canonical implementation values are in root design.md and ui.md; pixel-exact contrast and focus-state testing still require deterministic implementation.

## Interaction requirements for the next approved design stage

1. Add to goal opens goal selection when needed, then exact amount entry, fee/rule review, wallet approval and truthful pending/confirmed/failed/unknown status. No new financial submission on timeout.
2. Withdraw remains visible; refresh available funds, distinguish pending reservations and review amount, destination, network costs and rules before signing. UI wording does not change on-chain financial rights.
3. Goal rows open accessible details; show amount, asset, target, remainder, rule version, verified-as-of time and contribution history. Add a verification freshness label to final UI; it is not a real verification claim in this mockup.
4. Create goal requests minimal fields progressively and uses a full-page review for material financial conditions. Pauses, edits and closure follow the canonical lifecycle.
5. Mobile Save is an action; Home/Goals/Rewards/Profile are destinations. Minimum 44px touch targets, visible focus, keyboard flow, reduced motion and screen-reader status labels are required.
6. Verify small-device reflow and lengthy amount/unit labels; avoid shrinking text or hiding withdrawals/fees. Empty/offline/rejected-wallet/stale/unknown states need matching visual designs.

## Sample data and scope

All amounts are fictional design examples: total/available 1,250 TEST; pending withdrawals 0 TEST; emergency goal 750 of 1,000 TEST (75%, 250 to go); laptop 500 of 2,000 TEST (25%, 1,500 to go). TEST is not an approved token or a deployment claim. No fake transaction activity, yield, APR, insurance or real customer profile is shown. Raster preview generated with built-in image_gen; no application code, configuration or deployment changed. Owner visual approval is recorded; financial/legal/implementation gates remain separate. This review predicts benefits; no usability study or implementation accessibility test has occurred.

## Related specifications

- [Design principles](../DESIGN_PRINCIPLES.md)
- [Design tokens](../DESIGN_TOKENS.md)
- [Complete screen specifications](../SCREEN_SPECIFICATIONS.md)
- [Savings and withdrawal rules](../../04-savings/DEPOSIT_AND_WITHDRAWAL_RULES.md)

## Exact generation prompt

Use case: ui-mockup.
Reference image: the supplied browser screenshot of lens.xyz is a visual STYLE REFERENCE for generous spacing, approachable typography, soft rounded controls, delicate curved linework and restrained friendly personality. Adapt these qualities into an ORIGINAL Tinye savings application; do not copy Lens logo, character, wording, app screenshots or assets.
Task: redesign Tinye's UI/UX, not just recolour the prior aggressive hackathon dashboard. User wants GREEN, friendly and welcoming while retaining their earlier preferred dark theme. Deliver a meticulous plausible app interface. No application is being implemented; this is a visual design preview.
Format: landscape wide high-resolution design board. One large DESKTOP authenticated Home app left, and one equally tall MOBILE Home artboard right. Approx 70/30 width split. Flat straight-on screens, thin subtle outlines, 24px outer corner radius, no rendered hardware, no perspective tilt, no big poster headline outside. Light warm grey-green board behind screens. Tiny outside captions "Tinye / friendly green study" and "Desktop + mobile". Footer "Design preview · fictional sample data · testnet only".
New visual language: dark forest shell #10281E, quieter raised surfaces #19382B, cream text #F5F5EB, soft secondary text #B7C9BC, calm pale-sage panel #E2EDD9, fresh botanical green #A7CF78 for selected accents, DEEP forest #174D38 filled primary buttons on pale panels with white labels. Rounded corners 14–20px, limited very soft depth, abundant thoughtful whitespace. Friendly humanist sans similar to Geist with open counters, sentence-case headings, crisp tabular figures. No electric blue, no uppercase yelling, no monospace terminal labels, no bracket numbering, no pixel icons, no neon/glow, no gradients or glassmorphism, no sterile card grid. Not every panel green. Restrained curved-line texture drawn very faintly within ONE sage area, no plants, stock piggybanks, coins, shields or growth arrows.
Desktop structure:
A narrow 180px dark-forest sidebar with provisional lowercase tinye wordmark at top, thin simple nav icons and labels Home, Goals, Activity, Rewards, then Profile and Help lower down. Home has a gentle sage selected background and dark text. No crypto terminology or fake avatar.
Main page header left "Make room for what matters." in medium-large sentence-case white type, short supporting "A little progress, at your pace." Not oversized marketing typography. Top right small clear "Testnet" badge and "Preview · sample data". 
Below a spacious horizontal pale-sage financial summary area, with asymmetrical human editorial layout and fine subtle curved line pattern ONLY on its empty far right edge. Left label "Your savings"; large forest-dark "1,250" with smaller baseline "TEST"; small "Test assets only". Small compact status row "Available 1,250 TEST" and "Pending withdrawals 0 TEST". Add a plain text explanatory note "Pending withdrawals are not available to spend." This label is friendlier than jargon reserved.
Right side of summary: one clear deep-forest button "Add to goal" with a small plus and WHITE text. Beside/below it an accessible clearly visible outlined dark-forest "Withdraw" button, not hidden. Small under-actions text link "How withdrawals work". Buttons have 14px corners, not giant pills. Amount, unit and actions remain primary.
Next section "Your goals" white, and quiet "+ Create goal" right. Two spacious dark-surface goal panels with rich purpose-specific editorial type and simple line icons, no numbered indexes, no decorative rings. Emergency fund: title, brief subtitle "For the unexpected", 750 TEST saved, target 1,000 TEST, thin gentle green progress 75%, friendly precise line "250 TEST to go", small "View goal →". New laptop: title, "Tools for your next chapter", 500 TEST saved, target 2,000 TEST, progress25%, "1,500 TEST to go", View goal. Panels differ in small icon/accent detail but same clear system; do not make them equal giant padded generic rounded banking cards. Use compact healthy proportions with generous space around the section.
Under goals a quiet nonfinancial help row with a tiny simple question icon and "New to saving with a wallet?" then "A quick guide →". No invented transaction feed or reward earnings.
Mobile:
Same design adapted, no sidebar. Header tinye left, Testnet right, beneath small "Preview · sample data". Friendly title "A little closer." and small "Make room for what matters."
Pale-sage summary area with large "1,250 TEST" and label "Your savings", small Test assets only, then available 1,250 TEST / pending withdrawals0 TEST. Clear deep-forest Add to goal button with white text and visible outlined Withdraw next to it, both large enough for touch. Short How withdrawals work link. NO squeezed disclaimer blocks or oversized typography.
Your goals section with + Create goal. Two slim stacked dark-surface rows with title, exact amount/target, progress, remainder. Emergency fund750/1,000 TEST75%, 250 TEST to go. New laptop500/2,000 TEST25%,1,500TEST to go. Values must match desktop exactly; no duplication. Human legible spacing.
Bottom nav Home, Goals, Save, Rewards, Profile, fine rounded outline icons, active Home sage, central Save is a modest circular plus action with text, not giant floating button obscuring content. Respect safe area.
UX priorities: a user instantly sees their available savings and next action; no intimidating jargon, no generic crypto product; clear labels/contrast; visible withdrawal and help; all critical content fits artboards. No yield/APR, monetary guarantees, real token/deployment claims, invented activity, dollar values or fake user pictures. All numbers visibly marked fictional sample data/testnet. Tinye identity distinct from Lens.
Aim for mature, warm, beautifully spaced authentic product design with the softness and confidence of the supplied reference, not AI concept art.

