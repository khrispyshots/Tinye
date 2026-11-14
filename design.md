# Tinye locked design direction: Lens-aligned theme

**Status:** Approved - Lens visual direction | **Version:** 2.0 | **Last updated:** 2026-11-14  
**Responsible role:** Product owner / design lead

## Purpose

Align Tinye's visual identity, typography and surface theme directly with [Lens](https://lens.xyz/). This supersedes the previous matte-dark palette with Lens's signature airy, consumer-friendly aesthetic: generous whitespace, high-contrast charcoal ink, soft organic sage/mist tinted panels, and crisp Inter typography.

## Approval and source of truth

The owner explicitly requested alignment with the live **[Lens](https://lens.xyz/)** design system on 2026-11-14.

- **Design Benchmark:** [lens.xyz](https://lens.xyz/)
- **Core Aesthetic:** Crisp, airy, high-contrast modern Web3 consumer interface.
- **Typography:** **Inter** with display-tuned tracking (`-0.025em` on headlines, tight `-0.015em` on body/UI).
- **Surface Atmosphere:** Pure white / soft cloud canvas, soft sage-tinted panels (`#F4F6F2`), hairline 1px borders (`rgba(0,0,0,0.06)`), and deep charcoal typography (`#1A1B1E`).

## Locked colour system: Lens theme

| Semantic token | Value | Intended pairing / role |
|---|---|---|
| surface.canvas | #FAFAFA | Primary airy page background and app shell |
| surface.card | #FFFFFF | Pure white elevated cards with diffuse soft shadow |
| surface.tinted | #F2F5F0 | Soft sage-mist tinted panels and goal cards |
| surface.summary | #E3EDDA | Signature pale sage financial summary panel |
| text.primary | #1A1B1E | High-contrast charcoal ink for primary headings and values |
| text.secondary | #5F6368 | Muted slate grey for supporting text and captions |
| text.onDark | #FFFFFF | Crisp white text on dark buttons and pills |
| accent.fresh | #78A738 | Fresh botanical green for active indicators and progress fills |
| action.primary | #121316 | Deep charcoal/black primary CTA button with white text |
| action.secondary | #FFFFFF | Outlined button with 1px hairline border and charcoal text |
| border.hairline | rgba(0,0,0,0.07) | Ultra-subtle hairline container separation |
| border.control | rgba(0,0,0,0.12) | Defined interactive input boundaries |
| progress.track | #E2E8DE | Clean muted track with high-contrast fresh green progress bar |

## Typography and spacing (Lens specification)

- **Font Family:** `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Headings & Hero:** Bold/Semi-bold (`font-weight: 600 - 700`), tight letter spacing (`letter-spacing: -0.025em`), line-height `1.15–1.2`.
- **Body & UI Text:** Regular (`400`) and Medium (`500`), slightly tight tracking (`-0.01em`) for high legibility on screens.
- **Financial Balances:** Tabular numerals (`tabular-nums`) with baseline asset labels (`NEAR`).
- **Border Radius:** Controls: 12px; Cards: 20px; Summary Panel: 24px; Modals: 28px.
- **Shadows:** Soft diffuse elevation (`box-shadow: 0 10px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)`).

## Related documents

- [UI contract](ui.md)
- [Design tokens](docs/02-design/DESIGN_TOKENS.md)
- [Friendly Green Lens review](docs/02-design/concepts/FRIENDLY_GREEN_LENS_V4.md)
- [Complete screen specifications](docs/02-design/SCREEN_SPECIFICATIONS.md)
