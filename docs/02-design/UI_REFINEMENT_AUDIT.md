# Foundation UI refinement audit

Status: Draft audit completed; refinements proposed. Version: 1.0. Updated: 2026-11-14.
Owner: Product design and frontend engineering.

Purpose: assess the current application before changing its visual system, as requested in the owner's Master UI/UX Design Refinement Directive. The attached twelve-screen board is a quality reference, not an implementation specification. This audit supplements [the master specification](../../Tinye_Master_Project_Specification.md), [current wiring matrix](../SCREEN_WIRING_MATRIX.md) and [refinement plan](FOUNDATION_REFINEMENT_PLAN.md).

## Baseline and evidence

The app is Next.js/React with Tailwind, Inter and lucide-react. Review covers seven existing view files and nine component files, their styling, controls and routing, plus `src/app/globals.css`, `src/app/layout.tsx` and `tailwind.config.js`. Prior browser review captured the current dashboard, goals and profile at [prototype-preview](prototype-preview/profile.png). Wallet/Receive are not existing implemented screens. No foundation refinement screenshots are claimed yet.

`tailwind.config.js` already defines named colours, radii, typeface and letter spacing. Components largely bypass these tokens with repeated hex/arbitrary classes. `globals.css` defines reusable `lens-card`, `lens-card-interactive`, `lens-summary-card`, `lens-pill` and `lens-input`. Keep these components and the existing app architecture. `layout.tsx` loads the light stylesheet and three fixed blurred ambient shapes. The unused dark `src/index.css` and older dark mockups are not the current rendered theme.

## Current token inventory

| Role | Existing value | Assessment |
|---|---|---|
| Canvas / card | #FAFAFA / #FFFFFF | Calm light baseline; retain |
| Tinted / summary | #F2F5F0 / #E3EDDA | Existing sage surfaces; retain |
| Main / secondary ink | #1A1B1E / #5F6368 | Good contrast on white; retain |
| Accent / hover | #78A738 / #689230 | Accent suitable for nontext indicators; avoid small text on white |
| Primary action / hover | #121316 / #27272A | Existing black action identity; do not silently replace with forest green |
| Existing dark green usage | #163829 / #2D5A27 / #507222 | Consolidate semantic roles after review |
| Radii tokens | control 12, goal 20, summary 24, sheet 28px | Many components independently choose 8–28px; converge by role |
| Typography | Inter, system fallbacks | Retain; improve hierarchy and readable body sizes |

Computed opaque colour contrast: accent #78A738 on white 2.84:1; secondary ink on white 6.05:1; #2D5A27 on white 8.07:1; #507222 on white 5.57:1; main ink on summary 14.26:1. These pairwise calculations are not a complete accessibility audit: opacity, actual backgrounds, focus, disabled content and state combinations still require rendered checks. Decorative accent may remain, but small functional text needs an existing darker green. Progress information needs readable text and semantics, not colour alone.

## Screen-by-screen inconsistencies

| Surface | Retain | Refinement needed | Scope |
|---|---|---|---|
| Dashboard / HomeView | Greeting, summary, goals, help entry, existing routes | 40px section gaps and large summary padding produce excessive mobile vertical space; duplicated headings/actions compete; recent verified activity absent; compact account indicator absent | Foundation |
| SavingsSummary | Prominent balance and one Add to goal action | 48/60px amount, two large actions, balance pills and footer compete on small widths; decorative rings add little; unsupported Verified/Instant settlement language must become evidence-aware | Foundation |
| Wallet | Existing card/button/icon language | Missing destination; needs true account/network, separate wallet/contract funds, Receive/Send/History and unavailable states | Foundation, additive |
| Profile | Initials and identity block | Oversized title, static custody/consent claims, no actual navigation/settings rows or separate financial totals; `w-13 h-13` not in default Tailwind spacing | Foundation |
| Goals / GoalRow | Category icons, progress, filters, detail modal | GoalRow stacks tall blocks on mobile, nested icon card, repeated numeric captions, 11/12px supporting text; seven radius choices across list/detail contexts | Later, approval required |
| Create goal | Existing input fields/category selection | Small labels, mixed radii, missing review/real signing states are functional gaps; refine with same fields after foundations | Later |
| Deposit | Method/amount/review structure | Direct funding simulation contradicts latest instruction; gas/confirmation labels unverified; numeric/form states need accessible errors | Safety correction authorised; visual propagation later |
| Withdrawal | Existing goal/amount/MAX flow | No separate review or robust error/unknown layout; small close target and missing explicit close label; no proven settlement | Functional work authorised; visual propagation later |
| Activity | Filters/list/receipt pattern | Small text, many card radii, no wallet-vs-savings evidence hierarchy or real explorer detail | Later |
| Rewards | Milestone/catalogue tabs | Large metric cards, coloured borders and bouncing toast compete; mock eligibility/fulfilment is not evidence | Later |
| Onboarding | Selected quiet welcome, illustrations and step flow | Repeated feature panels/technical copy crowd step two; infinite pulse lacks reduced-motion override; wallet claims cannot imply auth | Later; retain chosen journey |
| Help / HelpModal | Existing support entries | Technical vocabulary and nested cards overemphasise architecture; conflicting demo/withdrawal policy descriptions | Later; truthful content correction required |
| Admin | Existing operational destination | Green validity badge and same-value reconciliation falsely imply independent verification; protect access and show evidence status | Functional integrity correction; not foundation design |
| AppShell | Desktop sidebar and Home/Goals/Save/Rewards/Profile mobile order | Some controls below comfortable 44px targets; safe-area class has no definition in inspected config/CSS; wallet entry needed without replacing Save; lack of current-page semantics | Only minimal wallet access change initially; broad shell styling later |

## Shared usability findings

- Repeated 10–12px text makes important instructions and financial labels harder to scan. Keep metadata small sparingly; use a readable body/label hierarchy.
- Many controls use only local styling. Shared button, status, row and financial-value variants will reduce inconsistent spacing without a rewrite.
- Several icon-only close buttons lack explicit accessible names. Modal labels, focus containment/restore, Escape handling and scroll locking need consistent implementation.
- Progress attributes are attached to a decorative element without a progressbar role. Values also require zero-target and unknown-data handling.
- `animate-fadeIn` appears without a matching definition in the inspected active stylesheet/configuration; pulse and bounce use standard animations without a central reduced-motion policy.
- Main content uses `max-w-4xl`, mobile bottom navigation and desktop sidebar. Preserve these responsive conventions; handle long account IDs with wrapping/truncation plus copy/full value access.
- Financial trust is an information-design issue: seeded 14.50 NEAR, alex.testnet, fabricated confirmations, static consent badges and unverified self-custody claims must not receive polished Verified treatment.

## Reference interpretation

Adopt the reference's restraint, clear balance hierarchy, concise action labels, cohesive rows and calm spacing. Do not copy its logo, leaf, illustrations, phone shells, exact screen arrangements or sample identities. Do not import unsupported APY/fiat equivalents, sample tNEAR figures, static QR, recovery-phrase import or a replacement bottom navigation. Keep testnet explicit. Wallet receipt and savings deposit remain separate events.

## Audit acceptance and limitations

All existing screen families above are identified; foundation scope is exactly Dashboard, Wallet and Profile. This is a source/previous-render audit, not a fresh automated visual/accessibility pass. No application source, global token or navigation change is made in this audit. No blockchain verification is inferred from a screenshot. Implementation approval already exists for wallet/profile functionality; this new directive adds a separate visual review gate.

Open review: approve the attached refinement plan before major visual changes. After foundation implementation, review actual screenshots of all three screens before propagation. Current network/account/contract blockers remain recorded in [testnet setup](../TESTNET_SETUP_REPORT.md).
