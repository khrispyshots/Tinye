# Tinye UI and UX implementation contract: Lens theme

**Status:** Approved - Lens visual direction | **Version:** 2.0 | **Last updated:** 2026-11-14  
**Responsible role:** Product designer / frontend lead / QA lead

## Purpose

Align all frontend implementation directly with the airy, consumer-friendly [Lens](https://lens.xyz/) design system, typography, and component styling.

## Lens-informed application shell

| Width | Required behaviour |
|---|---|
| Below 640px | One column, 16px gutters, mobile header, bottom floating glass navigation with safe-area padding |
| 640-1023px | 24px gutters; retain bottom navigation; summary uses responsive columns |
| 1024px and above | Persistent 240px clean sidebar; 32px gutters; centered main content container (`max-w-4xl mx-auto`) |

## Component contracts

1. **App Shell & Sidebar:**
   - Soft off-white backdrop (`#FAFAFA`) with subtle ambient atmospheric glows.
   - Sidebar: Clean frosted card (`#FFFFFF/85 backdrop-blur-xl border-r border-black/[0.06]`).
   - Active Navigation: Pill with dark charcoal background (`#121316`) and crisp white text.
2. **Savings Summary Panel:**
   - Pale sage organic card (`#E3EDDA`) with soft 24px rounded corners.
   - Bold 52px balance typography in deep charcoal ink (`#1A1B1E`).
   - Primary Action: Pitch black button (`#121316`) with white text.
   - Secondary Action: Crisp white card button with hairline border.
3. **Goal Cards:**
   - Tinted soft sage-mist surface (`#F2F5F0`) with hairline border (`rgba(0,0,0,0.06)`).
   - Crisp green progress bar (`#78A738`) on clean track (`#E2E8DE`).
   - Clean tabular numerals and remainder metrics.
4. **Onboarding (Option 3 — 3-Screen Sequence):**
   - Screen 1: Welcome with Lens-inspired clean card and animated tile graphic.
   - Screen 2: How It Works with 3 clear value pillars.
   - Screen 3: Wallet setup and NDPC privacy consent.

## Related documents

- [Locked design](design.md)
- [Design tokens](docs/02-design/DESIGN_TOKENS.md)
- [Friendly Green Lens review](docs/02-design/concepts/FRIENDLY_GREEN_LENS_V4.md)
