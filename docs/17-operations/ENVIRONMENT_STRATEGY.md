# Environment strategy

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Isolate development, test assets and production authority.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Environment matrix

| Environment | Chain/data | Credentials / permission |
|---|---|---|
| Local | Synthetic data, local mocks only when labelled | No production secrets; no real transfer claims |
| Development | Local Sandbox for contract work | Disposable synthetic identities |
| Testnet | Approved native NEAR testnet, selected test asset | Dedicated accounts/keys; explicit deployment authority |
| Staging | Release-candidate app against isolated testnet namespace/epoch | Separate SQL, vendor sandbox and service keys |
| Production | Mainnet only after separate approval | New secrets/governance, verified asset allowlist and limits |

Network, environment epoch, contract identity, code hash, supported assets and rule versions are pinned in an approved manifest. Hostname alone cannot determine network. No promotion by replacing testnet with mainnet in strings. Testnet resets are a new epoch; old history remains labelled as historical test data.

## Acceptance

Startup/build rejects mismatched network/contract/asset configuration and missing approved values. Persistent environment label appears on app, reviews, receipts, admin, notifications and demos. CI cannot access production credentials by default. Vendors, domain/DNS and regions remain D18/D23/D24; nothing is provisioned.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
