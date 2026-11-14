# Motion and interaction

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Interaction designer

> **Default visual direction locked:** use [design.md](../../design.md), [ui.md](../../ui.md) and the [Friendly Green revision 4 reference](concepts/06-friendly-green-lens-v4.png). These supersede earlier visual proposals. Detailed feature behaviour and implementation remain gated.

## Purpose

Use restrained motion that reflects real state changes.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Selected onboarding illustration

The [quiet welcome motion brief](../03-auth/ONBOARDING_DESIGN.md) specifies one original tile-assembly illustration: 1.4 seconds total, play once, no forced delay and a static final pose for reduced motion or loading/failure. This illustration duration is separate from the shorter control/navigation timings below. Lottie-style direction is specified; no playable Lottie asset is claimed.

## Timing proposal

Micro interactions 120–180ms; everyday transitions 200–300ms; sheets/dialogs 250–350ms. Use consistent ease-out on entry and ease-in on dismissal; avoid bounce on monetary values. Goal cards may transition to details while preserving reading order and history. Sheets rise from a stable origin without moving the review amount.

Animate progress only after verified credit. Milestone celebration is brief, dismissible and optional; no flashing, sound default or forced replay. Skeletons indicate loading, never fictional transaction rows.

## Reduced motion and acceptance

When reduced motion is requested, remove transforms, number counting, parallax and celebrations; change states immediately or with a short opacity transition. Financial status has persistent text independent of animation. Focus moves only on explicit navigation or completed dialogs. Test interrupted animation, rapid repeated taps, backgrounded tabs, latency and reduced motion. No transition may trigger a financial operation or conceal an error.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
