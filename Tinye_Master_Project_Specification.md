# TINYE --- MASTER PRODUCT, BRAND, DESIGN, ENGINEERING & AI BUILDER SPECIFICATION

**Document type:** Master project instruction and
documentation-generation brief\
**Product:** Tinye\
**Category:** Goal-based savings and financial wellness platform\
**Blockchain ecosystem:** NEAR Protocol\
**Design direction:** Apple-like minimalism × premium fintech\
**Primary brand line:** Put something aside. Build something bigger.\
**Status:** Planning and documentation phase --- implementation must not
begin until the documentation gates are passed.

------------------------------------------------------------------------

# 0. CRITICAL INSTRUCTIONS TO THE AI BUILDER

You are the lead product architect, product designer, UX researcher,
brand designer, technical lead, smart-contract engineer, backend
engineer, security engineer, QA lead and documentation writer for Tinye.

Your first assignment is **NOT to build the application**. Your first
assignment is to inspect the existing repository (if one exists),
understand the product requirements, research current official technical
documentation, resolve ambiguities, and create a complete set of
detailed Markdown specification files.

## 0.1 Mandatory execution order

Follow this sequence exactly:

1.  Inspect the entire existing repository and identify the current
    stack, structure, implemented features, dependencies, design assets,
    environment configuration and existing documentation.
2.  Do not overwrite, delete or refactor existing work during
    inspection.
3.  Identify what already exists, what is incomplete, what conflicts
    with this specification and what is missing.
4.  Research current official NEAR Protocol documentation, SDKs, wallet
    standards, account model, smart-contract tooling, testnet/mainnet
    requirements and security recommendations. Use current official
    sources, not remembered APIs or outdated tutorials.
5.  Research relevant current legal and regulatory considerations for
    the jurisdictions the product intends to serve. Do not invent legal
    conclusions.
6.  Create the documentation directory and all required Markdown files
    listed in this specification.
7.  Cross-reference the documents so that product behaviour, design,
    database, API and contract requirements agree.
8.  Create a decision register for unresolved questions. Do not silently
    invent business, financial, legal or custody decisions.
9.  Produce a traceability matrix linking every major requirement to its
    specification, implementation component and test.
10. Present a documentation completion report and a list of decisions
    requiring the product owner's approval.
11. STOP. Do not implement features, deploy contracts, migrate data,
    alter production configuration or perform destructive actions until
    the owner explicitly approves the documentation and implementation
    plan.
12. After approval, implement in small phases, with tests and acceptance
    checks at every phase.

If the repository already contains code, preserve it. This is an
enhancement and completion project unless the owner explicitly
authorises a rewrite.

## 0.2 Non-negotiable rules

-   Never fabricate balances, deposits, withdrawals, transaction
    confirmations, yields, APRs, rewards, wallet addresses, contract
    deployments or user activity.
-   Clearly distinguish production functionality, testnet functionality,
    mock data and simulated demonstrations.
-   Never represent simulated yield as real earnings.
-   Never promise a fixed or guaranteed return unless a real, legally
    approved product structure supports that promise and the risks are
    disclosed.
-   Never make an investment, lending, deposit-taking, custody or
    regulatory claim without evidence and appropriate professional
    review.
-   Never expose private keys, seed phrases, signing secrets, API
    secrets or privileged credentials in frontend code, logs or source
    control.
-   Never use floating-point arithmetic for token balances or monetary
    calculations. Use integer base units and explicit decimal
    conversion.
-   Every financial transaction must have an auditable lifecycle and
    authoritative verification.
-   Smart contracts must enforce on-chain rules; the frontend must not
    be trusted to enforce financial permissions.
-   Do not silently penalise users, lock funds, change withdrawal
    conditions or alter reward rules.
-   No feature may be labelled complete merely because its UI exists.
-   Do not use invented NEAR SDK methods, outdated package names or
    unverified wallet APIs.
-   Keep a record of assumptions and decisions.
-   Do not claim legal compliance merely because policy documents have
    been generated.
-   All legal documents are drafts requiring review by qualified counsel
    before launch.
-   Build for accessibility, mobile usability, clear language and
    low-bandwidth conditions.

## 0.3 Product decisions that must remain configurable until approved

Do not assume the following decisions have been made. Record options,
implications and a recommended default in
`docs/00-product/DECISION_REGISTER.md`.

-   Initial supported currencies and tokens: USDC, NEAR, other
    stablecoins or multiple assets.
-   Initial supported networks and exact NEAR ecosystem deployment
    architecture.
-   Embedded wallet, external wallet or both.
-   Custody model: self-custody, third-party custody,
    smart-contract-controlled funds or another model.
-   Whether Tinye ever receives or controls user assets.
-   Yield source, strategy, counterparty, risk, fees and withdrawal
    liquidity.
-   Whether yield is available in MVP or only after a verified
    integration.
-   Flexible, committed or hybrid savings rules.
-   Early withdrawal treatment and any fee or forfeited rewards.
-   Target launch countries and excluded jurisdictions.
-   User age requirements and identity verification requirements.
-   Whether group savings are included in MVP.
-   Whether rewards have monetary value, are transferable or are
    redeemable only inside Tinye.
-   Whether the reputation score is purely informational or will later
    be used in third-party underwriting.
-   Whether fiat on/off-ramp integrations are included.
-   Business entity, governing law, dispute forum and legal contact
    details.
-   Production deployment owner, administrators and emergency
    authorities.

Where a choice blocks architecture, present the alternatives and wait
for approval rather than making an irreversible assumption.

------------------------------------------------------------------------

# 1. PRODUCT FOUNDATION

## 1.1 Product vision

Tinye is a goal-based savings and financial wellness platform that helps
people put money aside consistently, track progress towards meaningful
goals, understand how their savings may grow, and build healthier
financial habits.

Tinye should make saving feel simple and rewarding. Blockchain should
support the financial infrastructure behind the experience without
forcing ordinary users to understand crypto terminology.

**Core promise:** Put something aside. Build something bigger.

## 1.2 Problem statement

Many people want to save but struggle with consistency, motivation,
fragmented financial tools, unclear returns, and difficulty tracking
progress. Existing financial products can feel intimidating or
disconnected from users' personal goals.

Tinye should help users:

-   Define a specific financial goal.
-   Decide how much they want to save and by when.
-   Contribute towards that goal.
-   Understand the rules governing access to their money.
-   See verified contributions and earnings.
-   Build consistent saving habits.
-   Earn clearly explained loyalty or achievement points.
-   Review their savings behaviour over time.
-   Save with other people where group savings are supported.

## 1.3 Product pillars

1.  **Save:** Personal savings goals and transparent contribution rules.
2.  **Grow:** Verified yield or earnings only when a real, approved
    strategy is integrated.
3.  **Reward:** Points, milestones and rewards for positive saving
    behaviour.
4.  **Build:** A transparent savings-history and financial-habit
    profile.
5.  **Together:** Optional group goals and shared accountability.

## 1.4 Product principles

-   Human-first, not crypto-first.
-   Clear before clever.
-   Financial transparency over gamification.
-   Principal protection and risk clarity over aggressive growth claims.
-   User control and informed consent.
-   No dark patterns.
-   No confusing financial terminology.
-   No punitive mechanics that unfairly trap users.
-   Privacy and security by design.
-   Progressive disclosure: show essential information first, advanced
    details when needed.

## 1.5 Target users

Document user personas, jobs-to-be-done, needs, barriers and
accessibility considerations. Include:

-   First-time savers.
-   People saving towards a specific purchase or life event.
-   Consistent savers who want to track progress.
-   Users familiar with digital wallets and stablecoins.
-   Users who are unfamiliar with blockchain and need a simple
    experience.
-   People who want to save with friends or family.

Do not assume every user is crypto-native or financially sophisticated.

## 1.6 MVP scope

The initial MVP should prioritise:

-   Welcome and onboarding.
-   Authentication and account setup.
-   Wallet connection or approved wallet creation flow.
-   User dashboard.
-   Create, view and manage savings goals.
-   Deposit and withdrawal flows on the approved test environment.
-   Verified transaction history.
-   Goal progress.
-   Rewards points ledger and basic milestones.
-   Basic profile and settings.
-   Admin visibility into users, goals and transactions.
-   Clear testnet/demo labelling where applicable.

Potential MVP features, only after technical and legal feasibility is
established:

-   Real yield integration.
-   Group savings.
-   Rewards marketplace with real fulfilment.
-   Advanced reputation score.
-   Fiat payment integrations.

Defer lending, credit products, automated recurring debits, complex
investment strategies and multi-chain support unless explicitly approved
and fully scoped.

## 1.7 Success metrics

Define measurable metrics without inventing targets:

-   Onboarding completion rate.
-   Wallet setup/connection completion.
-   First-goal creation rate.
-   First verified deposit rate.
-   Active savers.
-   Contribution frequency.
-   Goal completion rate.
-   Withdrawal completion and failure rates.
-   Reward redemption rate.
-   Support ticket rate.
-   Transaction reconciliation accuracy.
-   Security incidents.
-   User retention.

Create an analytics event dictionary and privacy-conscious measurement
plan.

------------------------------------------------------------------------

# 2. BRAND STRATEGY AND IDENTITY

Create `docs/01-brand/BRAND_STRATEGY.md`, `LOGO_DIRECTION.md`,
`VISUAL_IDENTITY.md`, `VOICE_AND_COPY.md` and
`BRAND_ASSET_GUIDELINES.md`.

## 2.1 Brand name

**Tinye**

The name is inspired by the Igbo word *tinye*, commonly used in the
sense of putting, placing or inserting something. In the context of the
product, it evokes putting something aside for a future purpose.

Before publishing a definitive linguistic or cultural explanation,
verify the wording with fluent Igbo speakers and document dialect or
contextual nuance. Do not claim that the name has one exclusive
translation.

## 2.2 Brand positioning

Tinye is a modern savings and financial wellness product that makes it
easier to save with purpose, stay consistent and understand financial
progress.

It should feel:

-   Premium but approachable.
-   Calm but motivating.
-   Modern but not trendy for its own sake.
-   Trustworthy but not institutional or cold.
-   Globally usable while retaining an authentic Nigerian/Igbo-inspired
    identity.

## 2.3 Brand line

Primary: **Put something aside. Build something bigger.**

Supporting copy options:

-   Save with purpose.
-   Small steps. Meaningful progress.
-   Make room for what matters.
-   Your goals deserve a plan.

Do not overload the interface with slogans. Use concise copy.

## 2.4 Logo direction

Develop a distinctive lowercase `tinye` wordmark.

Requirements:

-   Primarily typographic.
-   Legible at small sizes.
-   Works in one colour.
-   Works on light and dark backgrounds.
-   Has a compact app icon derived from the wordmark or a simple ownable
    typographic mark.
-   Avoid generic piggy banks, coins, vault doors, dollar signs, crypto
    coins and clichéd growth arrows.
-   Provide SVG, PNG and favicon/app-icon exports.
-   Document clear space, minimum size, monochrome use and prohibited
    treatments.

Do not generate a final logo by merely typing the word in a default
font. Explore considered letterforms and provide a rationale.

## 2.5 Colour system

Initial proposed palette; validate contrast and usage in the actual
interface:

  Token     Hex                      Intended use
  --------- ------------------------ ---------------------------------------
  Forest    `#174D38`                Primary brand, key actions
  Emerald   `#32A879`                Positive actions and progress
  Sage      `#E5F0E8`                Soft highlights and selected surfaces
  Cream     `#F8F9F6`                Main background
  White     `#FFFFFF`                Cards and elevated surfaces
  Ink       `#202923`                Main text
  Muted     `#68736C`                Secondary text
  Border    `#E7EBE6`                Dividers and outlines
  Warning   Accessible amber token   Warnings
  Danger    Accessible red token     Errors and destructive actions

Use semantic design tokens rather than hard-coded colours throughout the
application. Check text contrast, focus states, disabled states, dark
mode and data visualisation colours. Do not use colour alone to
communicate financial status.

Suggested balance: predominantly neutral surfaces, dark text and
restrained green accents. Avoid making every card green.

## 2.6 Typography

Preferred typeface: Geist. Inter is an acceptable alternative if Geist
is unavailable or unsuitable.

Define a complete responsive type scale for:

-   Display balance.
-   Page title.
-   Section title.
-   Card title.
-   Body.
-   Supporting text.
-   Labels.
-   Captions.
-   Numeric financial values.

Use tabular numerals for balances and financial figures. Avoid
excessively thin weights for important financial information.

## 2.7 Brand voice

Tinye speaks in plain, calm, supportive language.

Do:

-   "Your savings are growing."
-   "You're \$150 away from your goal."
-   "Review your withdrawal terms."
-   "Your deposit is awaiting confirmation."

Do not:

-   "Guaranteed profits!"
-   "Get rich while you sleep."
-   "You cannot lose."
-   "Your money is 100% safe."
-   Confusing blockchain jargon without explanation.

Create copy rules for onboarding, validation, transaction states, empty
states, errors, support and legal consent.

------------------------------------------------------------------------

# 3. DESIGN SYSTEM AND UI/UX

Create `docs/02-design/` with:

-   `DESIGN_PRINCIPLES.md`
-   `DESIGN_TOKENS.md`
-   `COMPONENT_LIBRARY.md`
-   `NAVIGATION_AND_INFORMATION_ARCHITECTURE.md`
-   `RESPONSIVE_BEHAVIOUR.md`
-   `MOTION_AND_INTERACTION.md`
-   `ACCESSIBILITY.md`
-   `SCREEN_SPECIFICATIONS.md`
-   `CONTENT_AND_MICROCOPY.md`

## 3.1 Overall direction

**Apple-like minimalism × premium fintech.**

Reference qualities, not copied layouts:

-   Apple's restraint, typography and interaction discipline.
-   Premium fintech clarity and financial hierarchy.
-   Clear savings-goal visualisation.
-   A distinctive Tinye identity.

The result must be original. Do not reproduce another company's screens,
brand assets or exact layouts.

## 3.2 Layout

-   Mobile-first.
-   Responsive desktop and tablet layouts.
-   Generous but efficient spacing.
-   Clear content hierarchy.
-   Consistent grid and spacing scale.
-   Comfortable touch targets.
-   Avoid cramped financial tables on mobile.
-   Use bottom sheets for short contextual actions where appropriate.
-   Use full pages for complex or high-risk financial decisions.

## 3.3 Components

Specify behaviour, states, responsive rules and accessibility for:

-   Primary, secondary, tertiary and destructive buttons.
-   Text fields and numeric amount inputs.
-   Password and verification inputs.
-   Selectors and date pickers.
-   Goal cards.
-   Balance cards.
-   Progress indicators.
-   Circular progress.
-   Transaction rows.
-   Status badges.
-   Bottom navigation.
-   Desktop sidebar/navigation.
-   Tabs.
-   Modals and bottom sheets.
-   Tooltips.
-   Toasts and alerts.
-   Skeleton loaders.
-   Empty states.
-   Error states.
-   Confirmation screens.
-   Charts.
-   Reward and achievement cards.
-   Tables and filters.

Every component must have default, hover, focus, active, disabled,
loading, success and error states where applicable.

## 3.4 Motion

Use restrained motion, not decorative animation everywhere.

Initial timing guidance:

-   Micro-interactions: 120--180ms.
-   Everyday transitions: 200--300ms.
-   Larger sheet or modal transitions: 250--350ms.

Use consistent easing and respect reduced-motion preferences.

Examples:

-   Goal card opens into its detail view with a coherent transition.
-   Deposit sheet rises smoothly.
-   Progress animates only after the transaction is verified.
-   Milestone celebrations are brief and optional.
-   Loading uses skeletons, not fake transaction activity.

## 3.5 Navigation

Proposed mobile navigation:

1.  Home
2.  Goals
3.  Save (primary action)
4.  Rewards
5.  Profile

Wallet, transactions, earnings and settings should be reachable without
overcrowding the main navigation.

Desktop navigation should preserve the same information architecture
with a suitable sidebar or top navigation.

------------------------------------------------------------------------

# 4. COMPLETE SCREEN INVENTORY

Create a specification for every screen, including purpose, entry
points, content hierarchy, components, user actions, validation,
loading, empty, success and failure states, analytics events,
accessibility and responsive behaviour.

## 4.1 Public and onboarding screens

1.  Marketing/landing page.
2.  Welcome screen.
3.  Product introduction.
4.  How Tinye works.
5.  Sign up.
6.  Sign in.
7.  Email or phone verification.
8.  Authentication error/retry.
9.  Wallet creation or connection explanation.
10. Wallet setup/connection.
11. Wallet setup success.
12. Terms and Privacy consent.
13. Risk acknowledgement where required.
14. Basic profile setup.
15. Notification permission request (contextual and optional).
16. Onboarding completion.
17. First savings goal prompt.

Onboarding must be short, progressive and understandable. Do not request
unnecessary personal information. Explain what a wallet is before asking
an unfamiliar user to connect one.

Never imply that accepting Terms and Privacy is optional where legally
required, but keep marketing consent separate and optional where
appropriate. Record the accepted document version and timestamp.

## 4.2 Main application

1.  Home dashboard.
2.  All goals.
3.  Create goal.
4.  Edit goal.
5.  Goal details.
6.  Goal contribution history.
7.  Deposit amount.
8.  Deposit review.
9.  Deposit pending.
10. Deposit success.
11. Deposit failure.
12. Withdrawal amount.
13. Withdrawal review and rule disclosure.
14. Withdrawal pending.
15. Withdrawal success.
16. Withdrawal failure.
17. Wallet overview.
18. Asset details.
19. Transaction history.
20. Transaction details.
21. Earnings/yield overview.
22. Yield strategy details and risk disclosure.
23. Rewards overview.
24. Points history.
25. Streaks and milestones.
26. Rewards catalogue.
27. Reward details.
28. Redemption review.
29. Redemption success/failure.
30. Reputation overview.
31. Savings behaviour history.
32. Group savings discovery.
33. Create group goal.
34. Group goal details.
35. Invite members.
36. Group contributions.
37. Group activity.
38. Notifications centre.
39. Profile.
40. Account settings.
41. Security settings.
42. Connected wallets.
43. Help and support.
44. Legal documents.
45. Account closure flow.

Group savings screens are conditional on the feature being approved for
the relevant release.

## 4.3 Global states

Specify:

-   First-time empty state.
-   No goals.
-   No transactions.
-   No rewards.
-   Network unavailable.
-   Wallet disconnected.
-   Wallet connection rejected.
-   Transaction awaiting confirmation.
-   Transaction failed.
-   Transaction status unknown.
-   Maintenance mode.
-   Unsupported asset/network.
-   Session expired.
-   Restricted account.
-   KYC pending or rejected if applicable.
-   Account closure pending.

Never display a success state until authoritative confirmation has
occurred.

------------------------------------------------------------------------

# 5. ONBOARDING AND AUTHENTICATION

Create `docs/03-auth/ONBOARDING_FLOW.md`, `AUTHENTICATION_SPEC.md`,
`WALLET_ONBOARDING.md`, `SESSION_AND_ACCOUNT_SECURITY.md` and
`CONSENT_RECORDS.md`.

Document:

-   Supported sign-up methods.
-   Email/phone verification.
-   Passwordless or password-based authentication decision.
-   OAuth only if explicitly approved and properly configured.
-   Wallet creation/connection options.
-   Embedded-wallet provider evaluation if considered.
-   External wallet connection.
-   Account recovery.
-   Device/session management.
-   Rate limiting.
-   Abuse and bot prevention.
-   Account deletion and data export.
-   Consent and legal document version tracking.

Do not assume social login creates a blockchain wallet unless the
selected provider explicitly supports that flow and the security model
has been evaluated.

A user must understand whether Tinye, a wallet provider or the user
controls the keys. Explain recovery implications in plain language.

------------------------------------------------------------------------

# 6. SAVINGS GOALS AND RULES

Create `docs/04-savings/` with:

-   `SAVINGS_PRODUCT_SPEC.md`
-   `GOAL_LIFECYCLE.md`
-   `DEPOSIT_AND_WITHDRAWAL_RULES.md`
-   `COMMITMENT_RULES.md`
-   `FEES_AND_LIMITS.md`
-   `EDGE_CASES.md`

## 6.1 Goal creation

A goal should support, subject to product approval:

-   Goal name.
-   Goal category.
-   Target amount.
-   Supported asset.
-   Optional target date.
-   Optional contribution schedule.
-   Savings mode.
-   Goal image/icon or colour.
-   Visibility/privacy setting.
-   Clear terms before confirmation.

Examples: emergency fund, education, rent, travel, equipment or personal
purchase.

## 6.2 Goal lifecycle

Define statuses such as:

-   Draft.
-   Active.
-   Paused (if allowed).
-   Target reached.
-   Completed.
-   Withdrawn/closed.
-   Cancelled.
-   Restricted.

Define valid transitions and the permissions required for each.

## 6.3 Savings modes

Evaluate:

-   Flexible savings: deposits and withdrawals according to disclosed
    network and platform constraints.
-   Committed savings: a user voluntarily commits to a period or
    contribution plan, with clearly disclosed withdrawal conditions.
-   Hybrid savings: a user chooses a mode for each goal.

Do not design a penalty that confiscates principal. If early withdrawal
affects an incentive, it must be clearly disclosed, lawful,
proportionate and approved. Prefer forfeiting unvested loyalty bonuses
over punitive financial penalties. Any fee must be justified, disclosed
before commitment and included in legal review.

## 6.4 Deposits

Specify:

-   Asset and network selection.
-   Amount validation.
-   Minimum and maximum amounts.
-   Fee estimate and fee payer.
-   Wallet signature flow.
-   Transaction submission.
-   Confirmation requirements.
-   Indexing delay.
-   Duplicate prevention.
-   Reconciliation.
-   Retry behaviour.
-   Failure recovery.
-   User-facing status.

## 6.5 Withdrawals

Specify:

-   Available versus committed balance.
-   Withdrawal eligibility.
-   Applicable network/platform fees.
-   Expected processing time only when grounded.
-   Required user confirmation.
-   Contract checks.
-   Pending, completed and failed states.
-   Dispute and support process.

Do not label funds as available until the authoritative source confirms
availability.

------------------------------------------------------------------------

# 7. YIELD AND EARNINGS

Create `docs/05-yield/YIELD_PRODUCT_SPEC.md`, `STRATEGY_INTEGRATION.md`,
`YIELD_CALCULATION.md`, `RISK_DISCLOSURES.md` and `RECONCILIATION.md`.

Yield is not a decorative dashboard metric. It must correspond to a
real, verified and approved source of earnings.

Before implementation, document:

-   Source of yield.
-   Protocol or counterparty.
-   Strategy mechanics.
-   Asset and network.
-   Contract addresses and verification.
-   Strategy administrator.
-   Fees.
-   Liquidity and withdrawal conditions.
-   Smart-contract and counterparty risks.
-   Market and depeg risks.
-   Expected versus realised yield.
-   How the displayed rate is calculated.
-   How often rates are updated.
-   How earnings are attributed to users.
-   How losses, downtime and emergency exits are handled.

Distinguish APY from APR and explain compounding assumptions. Do not
display a rate without a timestamp and source. Do not promise that a
historical rate will continue.

If no real strategy is integrated, the interface must say that yield is
unavailable or show a clearly labelled demonstration using non-real test
data. Never imply that demo earnings are withdrawable.

------------------------------------------------------------------------

# 8. REWARDS, POINTS AND MARKETPLACE

Create `docs/06-rewards/` with:

-   `REWARDS_PRODUCT_SPEC.md`
-   `POINTS_ECONOMY.md`
-   `STREAKS_AND_MILESTONES.md`
-   `REWARDS_MARKETPLACE.md`
-   `REDEMPTION_AND_FULFILMENT.md`
-   `ANTI_ABUSE_RULES.md`

Define:

-   How points are earned.
-   Eligible and ineligible events.
-   Point values and caps.
-   Whether points expire.
-   Whether points are transferable.
-   Whether points have monetary value.
-   Reversals for refunded or reversed transactions.
-   Idempotency and duplicate-event handling.
-   Reward inventory.
-   Redemption eligibility.
-   Fulfilment and refunds.
-   Admin adjustment permissions.
-   Audit trail.

Points must not be awarded merely because the frontend says a deposit
succeeded. Reward events must be tied to verified, eligible actions.

Avoid gambling-like mechanics, random paid rewards or misleading
monetary equivalence. Make reward terms clear.

------------------------------------------------------------------------

# 9. FINANCIAL REPUTATION AND SAVINGS SCORE

Create `docs/07-reputation/REPUTATION_MODEL.md`,
`SCORING_TRANSPARENCY.md` and `DATA_GOVERNANCE.md`.

The initial reputation feature should describe saving behaviour, not
pretend to be a formal credit bureau score.

Potential factors:

-   Consistency of contributions.
-   Goals completed.
-   Length of savings history.
-   Frequency of successful contributions.
-   User-selected commitment completion.
-   Responsible account behaviour.

Document the exact formula only after product approval. Explain what the
score does and does not mean. Users should be able to inspect the
factors affecting their score and challenge inaccurate records.

Do not claim that the score guarantees loans, credit access or approval.
Any future lending use requires separate legal, underwriting, fairness,
privacy and regulatory review.

------------------------------------------------------------------------

# 10. GROUP SAVINGS

Create `docs/08-social/GROUP_SAVINGS.md`,
`INVITATIONS_AND_MEMBERSHIP.md` and `GROUP_FUND_RULES.md`.

Specify:

-   Group creation.
-   Invites and membership.
-   Contribution visibility.
-   Group roles and permissions.
-   Individual ownership and attribution.
-   Group goal progress.
-   Member departure.
-   Failed or late contributions.
-   Disputes.
-   Group closure.
-   Withdrawal authority.

For the MVP, prefer individually attributable funds and avoid ambiguous
pooled custody. Do not assume a group administrator can withdraw other
members' funds.

------------------------------------------------------------------------

# 11. NEAR PROTOCOL AND SMART CONTRACT ARCHITECTURE

Create `docs/09-blockchain/` with:

-   `BLOCKCHAIN_ARCHITECTURE.md`
-   `NEAR_TECHNICAL_RESEARCH.md`
-   `CONTRACT_REQUIREMENTS.md`
-   `CONTRACT_INTERFACE.md`
-   `CONTRACT_SECURITY_MODEL.md`
-   `TOKEN_AND_ASSET_SUPPORT.md`
-   `WALLET_AND_SIGNING_FLOW.md`
-   `EVENTS_AND_INDEXING.md`
-   `TESTNET_DEPLOYMENT.md`
-   `MAINNET_RELEASE_PLAN.md`
-   `UPGRADE_AND_EMERGENCY_CONTROLS.md`

## 11.1 Research requirement

Before writing contract code:

-   Read current official NEAR documentation.
-   Verify the current recommended language, SDK, tooling and build
    process.
-   Verify current account and transaction semantics.
-   Verify the current wallet integration and signing standards.
-   Verify the correct fungible-token interfaces for every supported
    asset.
-   Verify testnet and mainnet configuration.
-   Record source URLs, access dates, version numbers and compatibility
    notes.
-   Avoid relying on stale examples or unsupported methods.

Potential starting points for research (verify current status and
paths):

-   https://docs.near.org/
-   https://docs.near.org/smart-contracts/what-is
-   https://docs.near.org/tools/near-cli
-   https://docs.near.org/web3-apps
-   https://github.com/near

The exact architecture must be selected from current verified
documentation, not assumed from this list.

## 11.2 Contract responsibilities

The contract design may need to support:

-   User-authorised deposits.
-   Goal or vault accounting.
-   Withdrawals subject to approved rules.
-   Asset accounting.
-   Authorised strategy interactions, if any.
-   Events for indexing.
-   Pausing or emergency controls, if justified.
-   Carefully controlled upgrades, if supported and approved.
-   Access control and admin roles.
-   Fee configuration with explicit constraints.

Do not put every business function on-chain by default. Document what
belongs on-chain, what belongs in the backend and why.

## 11.3 Contract invariants

Write testable invariants, including:

-   A user cannot withdraw more than their eligible balance.
-   One user's funds cannot be withdrawn by another user without
    explicit, approved authorisation.
-   Contract accounting cannot create value through rounding or
    duplicate execution.
-   Replayed or duplicate requests cannot double-credit a deposit.
-   Unsupported assets cannot be accepted.
-   Admin permissions cannot silently bypass user ownership rules.
-   Fees cannot exceed configured and approved bounds.
-   Paused operations behave exactly as documented.
-   Contract events match state changes.
-   Failed external calls do not leave inconsistent accounting.

## 11.4 Security

Specify:

-   Threat model.
-   Reentrancy or callback risks relevant to the chosen runtime and
    standards.
-   Access-control review.
-   Integer overflow/underflow protections.
-   Decimal and rounding rules.
-   External contract risk.
-   Upgrade authority risk.
-   Key management.
-   Emergency pause authority.
-   Recovery and incident response.
-   Independent review/audit requirements.

Do not claim a contract is audited unless a real independent audit has
occurred and the report is available.

## 11.5 Contract implementation deliverables

Before coding, create:

-   Architecture diagram.
-   State model.
-   Storage schema.
-   Function/interface specification.
-   Event schema.
-   Access-control matrix.
-   Error catalogue.
-   Invariants.
-   Threat model.
-   Unit and integration test plan.
-   Deployment and verification plan.
-   Upgrade and emergency plan.

Do not deploy to mainnet without explicit approval.

------------------------------------------------------------------------

# 12. BACKEND, DATABASE AND API

Create `docs/10-backend/` with:

-   `SYSTEM_ARCHITECTURE.md`
-   `DATABASE_SCHEMA.md`
-   `API_SPECIFICATION.md`
-   `AUTHORIZATION_MODEL.md`
-   `TRANSACTION_PROCESSING.md`
-   `EVENT_PROCESSING.md`
-   `BACKGROUND_JOBS.md`
-   `OBSERVABILITY.md`
-   `BACKUP_AND_RECOVERY.md`

## 12.1 Architecture

Recommend a maintainable architecture appropriate to the existing
repository. Do not introduce unnecessary microservices for an MVP.

Separate:

-   Frontend.
-   Authentication and identity.
-   User/profile data.
-   Savings goal metadata.
-   Blockchain transaction tracking.
-   Contract interaction services.
-   Yield provider integration.
-   Rewards ledger.
-   Notifications.
-   Admin services.
-   Analytics.

Clearly identify the source of truth for every field. On-chain balances
and transactions must be reconciled with indexed backend views.

## 12.2 Database

Design a relational schema where appropriate. Consider entities such as:

-   users
-   user_profiles
-   authentication_identities
-   wallets
-   wallet_connections
-   savings_goals
-   goal_memberships
-   deposits
-   withdrawals
-   blockchain_transactions
-   supported_assets
-   yield_strategies
-   yield_snapshots
-   earnings_entries
-   reward_accounts
-   reward_ledger
-   reward_catalogue
-   redemptions
-   reputation_snapshots
-   notifications
-   consent_records
-   support_tickets
-   admin_users
-   audit_logs
-   idempotency_records

For every table document fields, types, constraints, indexes,
relationships, retention and access permissions. Avoid storing secrets
or unnecessary personal data.

Use integer base units for monetary values and explicit asset decimals.
Use appropriate database transactions and idempotency keys for financial
workflows.

## 12.3 API

Specify:

-   Endpoint/method.
-   Authentication requirements.
-   Authorisation.
-   Request and response schemas.
-   Validation.
-   Error codes.
-   Rate limits.
-   Idempotency.
-   Pagination.
-   Audit events.
-   Versioning.

Create an OpenAPI specification if the selected stack supports it.

## 12.4 Transaction processing

Document the full lifecycle:

1.  User initiates an action.
2.  Backend validates the request and current eligibility.
3.  Wallet signs the transaction where required.
4.  Transaction is submitted.
5.  Transaction identifier is recorded.
6.  Chain/indexer confirms the result.
7.  Backend verifies the authoritative outcome.
8.  Ledger and goal views are updated idempotently.
9.  Eligible rewards are recorded.
10. User receives a status notification.

Define reconciliation for delayed, failed, dropped, duplicated or
re-indexed events.

------------------------------------------------------------------------

# 13. ADMIN DASHBOARD AND OPERATIONS

Create `docs/11-admin/` with:

-   `ADMIN_REQUIREMENTS.md`
-   `ROLES_AND_PERMISSIONS.md`
-   `AUDIT_LOGGING.md`
-   `SUPPORT_AND_DISPUTES.md`
-   `OPERATIONAL_RUNBOOKS.md`

Admin capabilities may include:

-   User lookup and account status.
-   Goal and transaction visibility.
-   Transaction reconciliation.
-   Reward catalogue management.
-   Reward fulfilment.
-   Support cases.
-   Risk and abuse review.
-   System health.
-   Feature flags.
-   Approved configuration management.

Use least-privilege roles. Require stronger authentication for
privileged actions. Record actor, timestamp, reason and before/after
values for sensitive changes.

Admins must not have arbitrary access to user funds. Any emergency
control must be specified, constrained, independently reviewed where
appropriate and transparently logged.

------------------------------------------------------------------------

# 14. LEGAL, PRIVACY AND COMPLIANCE DOCUMENTATION

Create `docs/12-legal/` with the following Markdown drafts:

1.  `TERMS_OF_SERVICE.md`
2.  `PRIVACY_POLICY.md`
3.  `COOKIE_POLICY.md` (if cookies or similar technologies are used)
4.  `RISK_DISCLOSURE.md`
5.  `SAVINGS_AND_WITHDRAWAL_TERMS.md`
6.  `YIELD_AND_EARNINGS_DISCLOSURE.md` (only if yield exists)
7.  `REWARDS_TERMS.md`
8.  `GROUP_SAVINGS_TERMS.md` (if group savings exists)
9.  `ACCEPTABLE_USE_POLICY.md`
10. `COMPLAINTS_AND_DISPUTE_PROCESS.md`
11. `DATA_RETENTION_AND_DELETION_POLICY.md`
12. `THIRD_PARTY_PROCESSOR_REGISTER.md`
13. `LEGAL_REVIEW_CHECKLIST.md`
14. `LEGAL_DOCUMENT_VERSIONING.md`

## 14.1 Mandatory legal drafting rules

These are structured drafts, not legal advice and not proof of
compliance. Do not invent:

-   Company legal name.
-   Registered address.
-   Registration number.
-   Governing law.
-   Court or arbitration venue.
-   Regulatory licence.
-   Custodian.
-   Banking partner.
-   Payment provider.
-   Data protection officer.
-   Support email.
-   Fee amount.
-   Yield source.
-   Insurance or deposit-protection coverage.
-   Data retention period.
-   User age threshold.

Use clearly marked placeholders such as
`[LEGAL ENTITY NAME — TO BE CONFIRMED]`. Maintain a missing-information
register. Do not publish documents containing unresolved placeholders.

The legal documents must be reviewed by qualified counsel in the
jurisdictions where Tinye will operate. Assess the relevance of
financial services, deposit-taking, investment, custody, payment
services, consumer protection, AML/CFT, sanctions, data protection,
electronic communications and marketing laws. Do not state that a
particular licence is or is not required without jurisdiction-specific
legal advice.

## 14.2 Terms of Service contents

At minimum, draft sections for:

-   Introduction and acceptance.
-   Eligibility and age.
-   Account registration and security.
-   Accurate information.
-   Wallets and blockchain interactions.
-   Supported assets and networks.
-   Savings goals and product rules.
-   Deposits and withdrawals.
-   Fees and limits.
-   Yield or third-party strategy terms, if applicable.
-   Rewards and points.
-   Group savings, if applicable.
-   Prohibited use.
-   Third-party providers.
-   Blockchain irreversibility and network risks.
-   Service availability and maintenance.
-   Suspension and termination.
-   Account closure.
-   Complaints and support.
-   Disclaimers.
-   Limitation of liability, subject to applicable law.
-   Indemnity, subject to applicable law.
-   Changes to terms.
-   Governing law and disputes, only after confirmation.
-   Contact details.

## 14.3 Privacy Policy contents

At minimum, document:

-   Data controller and contact placeholders.
-   Personal data collected.
-   Wallet/public blockchain data.
-   Authentication data.
-   Financial activity data.
-   Device and technical data.
-   Support and communication data.
-   Purposes of processing.
-   Legal bases, determined by counsel.
-   Data sharing and processors.
-   International transfers.
-   Retention periods.
-   Security measures.
-   User rights and request process.
-   Cookies and analytics.
-   Automated decisions and profiling.
-   Reputation score processing.
-   Children's data and age restrictions.
-   Data breach process.
-   Policy updates.
-   Contact and complaint routes.

Do not claim that public blockchain data can be erased if it cannot.
Explain the distinction between off-chain personal data and immutable
public-chain records.

## 14.4 Risk disclosures

Address, as relevant:

-   Smart-contract vulnerabilities.
-   Wallet loss and compromised credentials.
-   Blockchain congestion and fees.
-   Transaction irreversibility.
-   Asset volatility and stablecoin depeg risk.
-   Third-party protocol/custodian risk.
-   Liquidity and withdrawal delays.
-   Yield variability and possible loss.
-   Regulatory changes.
-   Internet and service interruptions.
-   Fraud, phishing and impersonation.
-   Group savings disputes.
-   Reward availability and fulfilment.

Only include risks applicable to the actual architecture, and do not
imply protections that do not exist.

------------------------------------------------------------------------

# 15. SECURITY AND PRIVACY ENGINEERING

Create `docs/13-security/` with:

-   `THREAT_MODEL.md`
-   `SECURITY_REQUIREMENTS.md`
-   `KEY_MANAGEMENT.md`
-   `PRIVACY_BY_DESIGN.md`
-   `INCIDENT_RESPONSE_PLAN.md`
-   `VULNERABILITY_DISCLOSURE.md`
-   `SECURITY_TEST_PLAN.md`

Include:

-   Secure authentication.
-   Session expiry and revocation.
-   MFA or passkeys where appropriate.
-   Role-based access control.
-   CSRF/XSS/SQL injection protections appropriate to the stack.
-   Server-side input validation.
-   Rate limiting.
-   Secrets management.
-   Dependency scanning.
-   Secure headers and transport.
-   Logging without secrets.
-   Data minimisation.
-   Backups and restore testing.
-   Admin audit trails.
-   Phishing and wallet-signing education.
-   Smart-contract review.
-   Incident severity and escalation.
-   Breach notification assessment.
-   Responsible disclosure process.

Create a threat model covering users, frontend, backend, wallet
provider, RPC/indexer, contracts, yield providers, admins and external
integrations.

------------------------------------------------------------------------

# 16. NOTIFICATIONS AND COMMUNICATIONS

Create `docs/14-notifications/NOTIFICATION_SPEC.md` and
`MESSAGE_TEMPLATES.md`.

Potential notifications:

-   Welcome.
-   Goal created.
-   Deposit submitted.
-   Deposit confirmed.
-   Deposit failed.
-   Withdrawal submitted.
-   Withdrawal confirmed.
-   Goal milestone reached.
-   Goal completed.
-   Reward earned.
-   Reward redeemed.
-   Security alert.
-   Group invitation.
-   Group contribution event.

Define channel, consent, delivery status, retry behaviour, frequency
controls and user preferences. Do not send marketing messages without
the required consent.

------------------------------------------------------------------------

# 17. ANALYTICS AND PRODUCT MEASUREMENT

Create `docs/15-analytics/` with:

-   `EVENT_TAXONOMY.md`
-   `METRICS_DASHBOARD.md`
-   `EXPERIMENTATION_POLICY.md`
-   `ANALYTICS_PRIVACY.md`

Define event names and properties for onboarding, goal creation,
deposits, withdrawals, rewards and retention. Never send seed phrases,
private keys, full sensitive payloads or unnecessary personal data to
analytics.

------------------------------------------------------------------------

# 18. TESTING AND QUALITY ASSURANCE

Create `docs/16-quality/` with:

-   `QA_STRATEGY.md`
-   `UNIT_TEST_PLAN.md`
-   `INTEGRATION_TEST_PLAN.md`
-   `E2E_TEST_PLAN.md`
-   `SMART_CONTRACT_TEST_PLAN.md`
-   `SECURITY_TEST_PLAN.md`
-   `ACCESSIBILITY_TEST_PLAN.md`
-   `PERFORMANCE_TEST_PLAN.md`
-   `RELEASE_ACCEPTANCE_CRITERIA.md`

Test at minimum:

-   Sign-up and login.
-   Account recovery.
-   Wallet connection and rejection.
-   Goal creation and editing.
-   Valid and invalid amounts.
-   Deposit success, delay, failure and duplication.
-   Withdrawal eligibility and restrictions.
-   Network interruption.
-   Indexer delay.
-   Incorrect or unsupported token.
-   Decimal precision.
-   Reward duplication and reversal.
-   Permission boundaries.
-   Account deletion.
-   Admin actions.
-   Contract invariants.
-   Mobile and desktop layouts.
-   Screen reader and keyboard use.
-   Reduced motion.
-   Low bandwidth.
-   Concurrent transactions.

Financial and contract tests must use realistic edge cases and
adversarial inputs. Define coverage goals, but do not treat code
coverage alone as proof of safety.

------------------------------------------------------------------------

# 19. DEPLOYMENT AND INFRASTRUCTURE

Create `docs/17-operations/` with:

-   `ENVIRONMENT_STRATEGY.md`
-   `DEPLOYMENT_GUIDE.md`
-   `CI_CD.md`
-   `ENVIRONMENT_VARIABLES.md`
-   `MONITORING_AND_ALERTING.md`
-   `BACKUP_AND_RECOVERY.md`
-   `ROLLBACK_PLAN.md`
-   `MAINNET_GO_LIVE_CHECKLIST.md`

Separate local, development, testnet, staging and production
environments.

Document:

-   Hosting.
-   Database hosting.
-   RPC and indexer providers.
-   Wallet provider.
-   Domain and DNS.
-   Secrets.
-   Build pipeline.
-   Migrations.
-   Contract deployment.
-   Contract verification.
-   Monitoring.
-   Error tracking.
-   Backups.
-   Rollback.
-   Incident contacts.

Never commit `.env` files or real credentials. Create `.env.example`
with safe placeholders only.

------------------------------------------------------------------------

# 20. BUSINESS MODEL AND FINANCIAL TRANSPARENCY

Create `docs/18-business/` with:

-   `BUSINESS_MODEL.md`
-   `FEE_MODEL.md`
-   `UNIT_ECONOMICS.md`
-   `REWARD_BUDGET.md`
-   `TREASURY_AND_OPERATIONS.md`

Explore possible revenue sources without assuming they are approved:

-   Transparent service fees.
-   Clearly disclosed strategy fees where legally and commercially
    appropriate.
-   Optional premium features.
-   Merchant-funded rewards.
-   Business partnerships.

Do not design revenue around hidden withdrawal penalties, misleading
yield spreads or undisclosed use of user funds.

------------------------------------------------------------------------

# 21. HACKATHON AND DEMONSTRATION READINESS

Create `docs/19-hackathon/` with:

-   `PROJECT_OVERVIEW.md`
-   `PROBLEM_AND_SOLUTION.md`
-   `NEAR_INTEGRATION.md`
-   `DEMO_SCRIPT.md`
-   `FEATURES_AND_LIMITATIONS.md`
-   `SUBMISSION_CHECKLIST.md`
-   `PRESENTATION_OUTLINE.md`

Clearly explain:

-   The human problem being solved.
-   Why Tinye uses NEAR.
-   What is on-chain and what is off-chain.
-   The user journey.
-   What works on testnet.
-   What is simulated.
-   What is not yet implemented.
-   Security assumptions.
-   Future roadmap.

Never present a prototype, mock yield, simulated deposit or incomplete
contract as a live financial product.

------------------------------------------------------------------------

# 22. REQUIRED DOCUMENTATION DIRECTORY

Create the following structure, adapting only where the repository
requires a clear equivalent. Do not omit a document silently. If a
document is not applicable, create it with a clear explanation and
rationale.

``` text
docs/
├── README.md
├── 00-product/
│   ├── PRODUCT_VISION.md
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── MVP_SCOPE.md
│   ├── USER_PERSONAS.md
│   ├── USER_JOURNEYS.md
│   ├── SUCCESS_METRICS.md
│   ├── ASSUMPTIONS_AND_CONSTRAINTS.md
│   ├── DECISION_REGISTER.md
│   └── REQUIREMENTS_TRACEABILITY.md
├── 01-brand/
│   ├── BRAND_STRATEGY.md
│   ├── LOGO_DIRECTION.md
│   ├── VISUAL_IDENTITY.md
│   ├── VOICE_AND_COPY.md
│   └── BRAND_ASSET_GUIDELINES.md
├── 02-design/
│   ├── DESIGN_PRINCIPLES.md
│   ├── DESIGN_TOKENS.md
│   ├── COMPONENT_LIBRARY.md
│   ├── NAVIGATION_AND_INFORMATION_ARCHITECTURE.md
│   ├── RESPONSIVE_BEHAVIOUR.md
│   ├── MOTION_AND_INTERACTION.md
│   ├── ACCESSIBILITY.md
│   ├── SCREEN_SPECIFICATIONS.md
│   └── CONTENT_AND_MICROCOPY.md
├── 03-auth/
│   ├── ONBOARDING_FLOW.md
│   ├── AUTHENTICATION_SPEC.md
│   ├── WALLET_ONBOARDING.md
│   ├── SESSION_AND_ACCOUNT_SECURITY.md
│   └── CONSENT_RECORDS.md
├── 04-savings/
│   ├── SAVINGS_PRODUCT_SPEC.md
│   ├── GOAL_LIFECYCLE.md
│   ├── DEPOSIT_AND_WITHDRAWAL_RULES.md
│   ├── COMMITMENT_RULES.md
│   ├── FEES_AND_LIMITS.md
│   └── EDGE_CASES.md
├── 05-yield/
│   ├── YIELD_PRODUCT_SPEC.md
│   ├── STRATEGY_INTEGRATION.md
│   ├── YIELD_CALCULATION.md
│   ├── RISK_DISCLOSURES.md
│   └── RECONCILIATION.md
├── 06-rewards/
│   ├── REWARDS_PRODUCT_SPEC.md
│   ├── POINTS_ECONOMY.md
│   ├── STREAKS_AND_MILESTONES.md
│   ├── REWARDS_MARKETPLACE.md
│   ├── REDEMPTION_AND_FULFILMENT.md
│   └── ANTI_ABUSE_RULES.md
├── 07-reputation/
│   ├── REPUTATION_MODEL.md
│   ├── SCORING_TRANSPARENCY.md
│   └── DATA_GOVERNANCE.md
├── 08-social/
│   ├── GROUP_SAVINGS.md
│   ├── INVITATIONS_AND_MEMBERSHIP.md
│   └── GROUP_FUND_RULES.md
├── 09-blockchain/
│   ├── BLOCKCHAIN_ARCHITECTURE.md
│   ├── NEAR_TECHNICAL_RESEARCH.md
│   ├── CONTRACT_REQUIREMENTS.md
│   ├── CONTRACT_INTERFACE.md
│   ├── CONTRACT_SECURITY_MODEL.md
│   ├── TOKEN_AND_ASSET_SUPPORT.md
│   ├── WALLET_AND_SIGNING_FLOW.md
│   ├── EVENTS_AND_INDEXING.md
│   ├── TESTNET_DEPLOYMENT.md
│   ├── MAINNET_RELEASE_PLAN.md
│   └── UPGRADE_AND_EMERGENCY_CONTROLS.md
├── 10-backend/
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_SPECIFICATION.md
│   ├── AUTHORIZATION_MODEL.md
│   ├── TRANSACTION_PROCESSING.md
│   ├── EVENT_PROCESSING.md
│   ├── BACKGROUND_JOBS.md
│   ├── OBSERVABILITY.md
│   └── BACKUP_AND_RECOVERY.md
├── 11-admin/
│   ├── ADMIN_REQUIREMENTS.md
│   ├── ROLES_AND_PERMISSIONS.md
│   ├── AUDIT_LOGGING.md
│   ├── SUPPORT_AND_DISPUTES.md
│   └── OPERATIONAL_RUNBOOKS.md
├── 12-legal/
│   ├── TERMS_OF_SERVICE.md
│   ├── PRIVACY_POLICY.md
│   ├── COOKIE_POLICY.md
│   ├── RISK_DISCLOSURE.md
│   ├── SAVINGS_AND_WITHDRAWAL_TERMS.md
│   ├── YIELD_AND_EARNINGS_DISCLOSURE.md
│   ├── REWARDS_TERMS.md
│   ├── GROUP_SAVINGS_TERMS.md
│   ├── ACCEPTABLE_USE_POLICY.md
│   ├── COMPLAINTS_AND_DISPUTE_PROCESS.md
│   ├── DATA_RETENTION_AND_DELETION_POLICY.md
│   ├── THIRD_PARTY_PROCESSOR_REGISTER.md
│   ├── LEGAL_REVIEW_CHECKLIST.md
│   └── LEGAL_DOCUMENT_VERSIONING.md
├── 13-security/
│   ├── THREAT_MODEL.md
│   ├── SECURITY_REQUIREMENTS.md
│   ├── KEY_MANAGEMENT.md
│   ├── PRIVACY_BY_DESIGN.md
│   ├── INCIDENT_RESPONSE_PLAN.md
│   ├── VULNERABILITY_DISCLOSURE.md
│   └── SECURITY_TEST_PLAN.md
├── 14-notifications/
│   ├── NOTIFICATION_SPEC.md
│   └── MESSAGE_TEMPLATES.md
├── 15-analytics/
│   ├── EVENT_TAXONOMY.md
│   ├── METRICS_DASHBOARD.md
│   ├── EXPERIMENTATION_POLICY.md
│   └── ANALYTICS_PRIVACY.md
├── 16-quality/
│   ├── QA_STRATEGY.md
│   ├── UNIT_TEST_PLAN.md
│   ├── INTEGRATION_TEST_PLAN.md
│   ├── E2E_TEST_PLAN.md
│   ├── SMART_CONTRACT_TEST_PLAN.md
│   ├── SECURITY_TEST_PLAN.md
│   ├── ACCESSIBILITY_TEST_PLAN.md
│   ├── PERFORMANCE_TEST_PLAN.md
│   └── RELEASE_ACCEPTANCE_CRITERIA.md
├── 17-operations/
│   ├── ENVIRONMENT_STRATEGY.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── CI_CD.md
│   ├── ENVIRONMENT_VARIABLES.md
│   ├── MONITORING_AND_ALERTING.md
│   ├── BACKUP_AND_RECOVERY.md
│   ├── ROLLBACK_PLAN.md
│   └── MAINNET_GO_LIVE_CHECKLIST.md
├── 18-business/
│   ├── BUSINESS_MODEL.md
│   ├── FEE_MODEL.md
│   ├── UNIT_ECONOMICS.md
│   ├── REWARD_BUDGET.md
│   └── TREASURY_AND_OPERATIONS.md
└── 19-hackathon/
    ├── PROJECT_OVERVIEW.md
    ├── PROBLEM_AND_SOLUTION.md
    ├── NEAR_INTEGRATION.md
    ├── DEMO_SCRIPT.md
    ├── FEATURES_AND_LIMITATIONS.md
    ├── SUBMISSION_CHECKLIST.md
    └── PRESENTATION_OUTLINE.md
```

Also create at repository root:

-   `PROJECT_STATUS.md`
-   `IMPLEMENTATION_ROADMAP.md`
-   `ARCHITECTURE_DECISIONS.md`
-   `CHANGELOG.md` if one does not already exist.

------------------------------------------------------------------------

# 23. DOCUMENT QUALITY REQUIREMENTS

Every Markdown document must:

1.  Have a clear title and purpose.
2.  State its status: Draft, Proposed, Approved, Implemented or
    Deprecated.
3.  Identify its owner or responsible role.
4.  State assumptions and dependencies.
5.  Define terms consistently.
6.  Include flows, tables or diagrams where they improve understanding.
7.  Identify edge cases and failure states.
8.  Include acceptance criteria where applicable.
9.  Link to related documents using relative Markdown links.
10. Identify unresolved decisions.
11. Avoid contradictory requirements.
12. Distinguish MVP from later phases.
13. Cite official sources for changing technical facts.
14. Include last-updated date and version.
15. Never use filler text to make a document appear complete.

For diagrams, use Mermaid where useful. For API schemas, include
concrete request/response examples. For smart contracts, include
interface-level pseudocode or signatures only after verifying the
selected toolchain.

Do not create dozens of shallow files containing the same generic
paragraph. Each file must contain meaningful, specific content.

------------------------------------------------------------------------

# 24. REQUIREMENTS TRACEABILITY AND CONSISTENCY

Create a traceability table with:

  Requirement ID   Requirement   Spec file   Component   Test   Status
  ---------------- ------------- ----------- ----------- ------ --------

Use stable IDs such as `PROD-001`, `DES-001`, `AUTH-001`, `SAVE-001`,
`CHAIN-001`, `LEGAL-001`, `SEC-001`.

Check consistency across:

-   User-visible labels and financial rules.
-   Goal states and database states.
-   Contract state and backend ledger state.
-   Deposit/withdrawal rules and Terms of Service.
-   Yield calculations and disclosures.
-   Reward rules and points ledger.
-   Reputation formula and Privacy Policy.
-   Wallet custody model and onboarding copy.
-   Admin permissions and contract authority.
-   Analytics and privacy commitments.

If any inconsistency is found, record it and resolve it before approval.

------------------------------------------------------------------------

# 25. IMPLEMENTATION ROADMAP --- AFTER DOCUMENT APPROVAL

Do not begin this phase until the owner approves the documentation and
unresolved architecture decisions.

Suggested phases:

## Phase 0 --- Approval and foundation

-   Confirm product decisions.
-   Confirm stack.
-   Confirm wallet and custody model.
-   Confirm supported asset/network.
-   Confirm legal review requirements.
-   Confirm architecture and deployment environments.

## Phase 1 --- Brand and design foundation

-   Logo and brand assets.
-   Design tokens.
-   Typography.
-   Responsive layout.
-   Shared components.
-   Navigation.
-   Onboarding and authentication UI.

## Phase 2 --- Core application

-   Dashboard.
-   Profile.
-   Goal creation and management.
-   Wallet connection.
-   Transaction history.
-   Empty/loading/error states.

## Phase 3 --- Testnet financial workflows

-   Contract implementation.
-   Deposit flow.
-   Withdrawal flow.
-   Transaction verification.
-   Backend indexing and reconciliation.
-   Invariant and integration tests.

## Phase 4 --- Rewards and reputation

-   Points ledger.
-   Milestones.
-   Reward catalogue.
-   Redemption workflow.
-   Transparent savings-history profile.

## Phase 5 --- Optional advanced features

-   Verified yield integration.
-   Group savings.
-   Notifications.
-   Admin operations.
-   Additional wallet or asset support.

## Phase 6 --- Security and launch readiness

-   Independent contract review/audit as appropriate.
-   Penetration and application security testing.
-   Legal review and final legal copy.
-   Incident-response rehearsal.
-   Backup and restore test.
-   Production monitoring.
-   Mainnet launch approval.

Each phase must have a written completion report, tests, known
limitations and explicit acceptance criteria.

------------------------------------------------------------------------

# 26. DEFINITION OF DONE

A feature is complete only when:

-   Its requirements are documented.
-   Its design matches the approved design system.
-   All required states are implemented.
-   Frontend validation exists.
-   Backend validation exists where required.
-   Authorisation is enforced server-side or on-chain.
-   Financial operations are verified against the authoritative source.
-   Duplicate and failure cases are handled.
-   Audit/analytics events are correct and privacy-conscious.
-   Unit, integration and relevant end-to-end tests pass.
-   Accessibility and responsive checks pass.
-   Documentation is updated.
-   No secrets or sensitive information are exposed.
-   The feature has been reviewed and accepted.

A polished screen without working and verified underlying behaviour is
not a completed feature.

------------------------------------------------------------------------

# 27. FIRST RESPONSE REQUIRED FROM THE AI BUILDER

After inspecting the repository, do not start implementing. Return a
concise but complete discovery report containing:

1.  Existing stack and repository structure.
2.  Existing features and their implementation status.
3.  Existing design system and assets.
4.  Missing features and documentation.
5.  Conflicts between current implementation and this specification.
6.  Current official NEAR technical sources consulted, with dates and
    version details.
7.  Recommended architecture options and trade-offs.
8.  Decisions requiring owner approval.
9.  Proposed documentation generation plan.
10. Any blockers.

Then create all required Markdown files and provide a documentation
index.

## Documentation approval gate

After generating the documents:

-   Validate every expected file exists.
-   Check for empty, duplicated or placeholder-only documents.
-   Check all internal links.
-   Check the decision register.
-   Check the legal placeholder register.
-   Check technical citations and versions.
-   Check the requirements traceability matrix.
-   Check consistency across the entire documentation set.

Then present:

-   Files created.
-   Important decisions still open.
-   Recommended defaults and reasons.
-   Risks and legal review requirements.
-   Proposed implementation sequence.
-   Exact items needing approval.

**STOP AND WAIT FOR EXPLICIT OWNER APPROVAL BEFORE WRITING OR MODIFYING
APPLICATION CODE.**

------------------------------------------------------------------------

# 28. OWNER APPROVAL CHECKLIST

The AI builder must ask for approval of the actual decisions, not ask
the owner to repeat information already in the repository or
specification.

At minimum, obtain approval for:

-   [ ] MVP scope.
-   [ ] Supported assets and network.
-   [ ] Wallet and custody model.
-   [ ] Savings modes and withdrawal rules.
-   [ ] Yield strategy or no-yield MVP.
-   [ ] Points and rewards rules.
-   [ ] Group savings inclusion or deferral.
-   [ ] Reputation score scope.
-   [ ] Target jurisdictions and legal review plan.
-   [ ] Final brand and design direction.
-   [ ] Technical architecture.
-   [ ] Contract permissions and emergency controls.
-   [ ] Testnet implementation plan.
-   [ ] Production deployment restrictions.

Do not treat this checklist as consent to deploy or move real funds.

------------------------------------------------------------------------

# 29. FINAL INSTRUCTION

Build Tinye as a coherent, trustworthy savings product, not a collection
of disconnected screens or a speculative crypto dashboard.

Preserve the selected visual direction:

**Apple-like minimalism × premium fintech.**

Preserve the brand idea:

**Tinye --- Put something aside. Build something bigger.**

Prioritise clarity, transparent financial rules, excellent mobile UX,
reliable transaction accounting, security and user trust.

**First inspect. Then research. Then document. Then validate. Then
request approval. Only then build.**
