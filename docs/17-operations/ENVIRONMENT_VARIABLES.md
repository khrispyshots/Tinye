# Environment variables and safe template

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Operations / release / security leads

## Purpose

Document future configuration without changing application configuration.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Variable catalogue

| Variable | Exposure | Source / validation |
|---|---|---|
| APP_ENV | Public-safe label | enum local/development/testnet/staging/production |
| NEAR_NETWORK_ID | Public | Approved network, cross-check RPC status |
| NEAR_ENVIRONMENT_EPOCH | Public | Approved testnet reset/deployment namespace |
| NEAR_RPC_URL | Server by default | Reviewed provider endpoint; secret token separated |
| NEAR_RPC_API_KEY | Secret | Secret manager; never client bundle/log |
| TINYE_CONTRACT_ID | Public | Actual approved deployment manifest; none exists |
| SUPPORTED_ASSET_CONFIG_REF | Server/public-safe subset | Approved exact assets/decimals/limits version |
| DATABASE_URL | Secret | Selected SQL service, least privilege |
| SESSION_SECRET | Secret | Generated after approval, rotation policy |
| APP_ORIGIN | Public | Verified domain, challenge/CSRF recipient mapping |
| NOTIFICATION_PROVIDER_KEY | Secret | Conditional approved channel/vendor |
| ANALYTICS_ENABLED | Public-safe boolean | False until privacy approval |
| YIELD_ENABLED / GROUPS_ENABLED / REDEMPTION_ENABLED | Public-safe flags | False in proposed MVP; cannot bypass approval |

No user wallet key or unrestricted operator private key belongs in frontend env variables. Prefix-based public exposure depends on the eventual framework and requires review.

## Safe `.env.example` content for later creation

The master requests a root example; the owner's stricter documentation-only gate means its safe contents are recorded here until configuration creation is authorised. No `.env` or `.env.example` is created now.

```dotenv
APP_ENV=testnet
NEAR_NETWORK_ID=testnet
NEAR_ENVIRONMENT_EPOCH=replace-with-approved-epoch
NEAR_RPC_URL=replace-with-reviewed-rpc-url
NEAR_RPC_API_KEY=replace-with-secret-manager-reference
TINYE_CONTRACT_ID=replace-with-actual-approved-deployment
SUPPORTED_ASSET_CONFIG_REF=replace-with-approved-config-version
DATABASE_URL=replace-with-database-secret-reference
SESSION_SECRET=replace-with-generated-secret-reference
APP_ORIGIN=replace-with-approved-origin
ANALYTICS_ENABLED=false
YIELD_ENABLED=false
GROUPS_ENABLED=false
REDEMPTION_ENABLED=false
```

## Acceptance

These replacement markers are not usable credentials/deployments. Missing/unapproved config fails closed; do not default to mainnet or invented token addresses. Actual config files remain gated by explicit implementation approval.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
