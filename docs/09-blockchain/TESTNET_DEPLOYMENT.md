# Testnet deployment plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Smart-contract / security lead

## Purpose

Describe gated future deployment without executing it.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Preconditions

Explicit owner authorisation for testnet implementation/deployment, D02-D06/D17-D20 resolved, compatible pinned build, Sandbox financial tests and reviewed key inventory. No deployment or account has been created. Do not use tutorial/example contract addresses as Tinye deployments.

## Proposed runbook

1. Verify selected CLI/compiler/SDK/Sandbox and reproducible WASM/ABI hashes.
2. Create isolated testnet accounts and least-privilege governance according to the approved key policy; fund only test assets and documented operating reserve.
3. Confirm RPC network/version, allowlisted test FT metadata/storage rules, limits and no-yield config.
4. Deploy reviewed artefact using the approved CLI flow; initialise once; record account, network/epoch, code hash, config/rule versions, signer/key powers and build evidence in a deployment manifest.
5. Independently query deployed code/config; verify source/build correspondence; test unauthorised actions, deposit, duplicate, eligible exit, failed payout and pause behaviour.
6. Reconcile receipt evidence and contract liabilities to database, points and notices; exercise backup/restore and provider outage.

## Acceptance / failure

Only recorded testnet receipts count as working demonstrations. A mismatch stops new deposits and opens an incident; never deploy an unreviewed replacement to hide it. Testnet reset creates a new epoch and labelled history boundary. Mainnet remains separately prohibited.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Deployment Guide](../17-operations/DEPLOYMENT_GUIDE.md)
