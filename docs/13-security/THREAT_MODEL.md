# Threat model

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Security / operations / privacy leads

## Purpose

Map assets, adversaries, trust boundaries and residual risks.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Assets and boundaries

Protect user liabilities/reservations, signing control, identity/sessions, private goal/profile/consent data, reward entitlements and audit evidence. Boundaries: browser↔API, browser↔wallet/runtime manifest, wallet↔chain, token↔vault, chain observation↔SQL projection, worker↔provider, admin↔privileged services and backup↔restore. Yield, group and fiat providers add new boundaries only after approval.

| Threat / actor | Abuse path | Required mitigation / residual risk |
|---|---|---|
| Malicious user | IDOR, forged role, request replay | Owner checks, payload-bound idempotency and server validation |
| Phishing/XSS | Steal sessions or replace signing details | CSP/escaping, HttpOnly cookies, domain education, wallet review; compromised device still risky |
| Compromised wallet/provider manifest | Wrong transaction/key-control model | Capability/vendor review, restricted supported wallets, no local user secrets; wallet remains external trust |
| Fake token / contract caller | Forge deposits or callbacks | Allowlist predecessor, own callback, operation binding |
| Concurrent transactions | Spend same available liability twice | On-chain reservation before external call |
| External receipt/callback failure | Payout happened but credit restored | Preserve reservation; proven idempotent recovery design |
| RPC/indexer compromise | Fabricate final effect or omit events | Trusted emitter/receipt/state verification, reconciliation and independent read fallback; provider trust recorded |
| Storage/gas attack | Unbounded state or failed cleanup | Bounds, paid storage, gas tests and durable recovery |
| Insider/admin | Change role, reward, funds or code | Least privilege, independent approval, immutable audit; full-access upgrade risk remains |
| Backup/vendor breach | Exfiltrate profile/consent/secrets | Encryption, minimum data, separate key store, tested deletion/restore |
| Future yield/custodian | Loss, illiquidity, false rates | Separate diligence, loss/exit accounting and legal consent; disabled MVP |
| Future group organiser | Reveal members or seize funds | Individual ownership and explicit visibility; disabled MVP |

## Acceptance

Each threat has a named control owner and test in security/contract plans. Revisit on new assets, vendors, auth methods, jurisdictions or permissions. Independent review is required for real funds; this model is not an audit. Unresolved recovery proof and upgrade governance block vault release.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Contract Security Model](../09-blockchain/CONTRACT_SECURITY_MODEL.md)
