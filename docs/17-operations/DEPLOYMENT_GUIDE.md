# Deployment guide — future authorised use

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Describe a concrete reviewable release process without deploying.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Gate and preparation

Do not run deployments until explicit owner authorisation covers the target environment. Confirm decision dependencies, build/tests, legal/test-user policy, infrastructure ownership, secrets, backup/restore evidence and approved manifest. Select hosting/database/RPC/wallet providers and domain/DNS through documented review; no vendors are silently selected.

## Future procedure

1. Review exact source revision, lockfiles, application artefact and contract WASM/ABI hashes with independent reviewer.
2. Verify target network/epoch, contract keys/powers, token identity/metadata/storage, fees/limits and no-yield flags.
3. Back up current data/config; rehearse additive migrations and read-model compatibility in staging. No migration exists now.
4. Deploy application/worker and contract only under their separate approved runbooks. Initialise once; record signer, code/config hash and time. No public credentials in build output.
5. Independently query deployed code/state; smoke-test authentication, goal, final deposit/withdraw, reward dedupe, notice and admin audit.
6. Reconcile at final checkpoint, inspect alerts and record acceptance/limitations before opening access.

## Failure handling

Hold new deposits on unauthorised change or mismatch using approved controls. Roll back compatible app artefacts; never assume chain effects reverse. Contract migration/upgrade requires reviewed state and reservation preservation. Mainnet uses the separate go-live checklist and is not approved by this plan.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
