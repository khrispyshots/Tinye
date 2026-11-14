# Unit test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Specify deterministic rules and exact arithmetic tests.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned cases

| ID | Procedure / expected result |
|---|---|
| UNIT-01 | Parse/display integer units at zero, one base unit, max decimals and U128 max; reject sign, exponent, excess decimals and overflow; round-trip exact |
| UNIT-02 | Validate target/name/date/mode/asset and funded-asset immutability; invalid fields cannot mutate state |
| UNIT-03 | Enumerate goal and operation state transitions; forbidden transitions rejected, unknown not failed |
| UNIT-04 | Compute confirmed/reserved/available with no double subtraction; over-withdraw rejected |
| UNIT-05 | Reward source uniqueness, caps, timezone periods, target edit and reversal; deterministic ledger sum |
| UNIT-06 | Consent document/hash/version and required vs optional preference checks |
| UNIT-07 | Role/owner policy table including deny-by-default, closure and restriction scope |
| UNIT-08 | Notification/event allowlists and safe redaction; no secrets/private inputs |

Use table/property tests with boundary and malformed values. Avoid tests that merely repeat implementation internals; assert business invariants and externally visible results. Later yield/share math tests activate only after formula approval.

## Acceptance

All conversion and permission boundaries covered; no binary floating-point calculations. Failures are stable error codes and preserve prior valid state. Evidence is recorded for an actual future build; this document claims no passing tests.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
