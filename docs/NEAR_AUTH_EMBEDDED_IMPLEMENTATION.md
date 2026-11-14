# Embedded wallet implementation — testnet

The existing onboarding now offers **Create new wallet** and **Connect existing wallet**. The former uses NEAR Auth's Auth0 approval and MPC-derived Ed25519 identity; the latter retains NEAR Connect. Styling and navigation are preserved.

## Real account creation

1. A same-origin, HttpOnly-cookie-bound, five-minute challenge is encoded using NEP-413.
2. NEAR Auth opens its provider-hosted approval popup using the shared official testnet client. Available email/social providers depend on that tenant.
3. The server validates the RS256 signing JWT against the fixed provider JWKS, issuer, audience, client and exact challenge bytes. Tokens never enter application logs or the database.
4. The server derives the user's public key from `v1.signer-prod.testnet` with predecessor `fast-auth.testnet`. The user's key comes from their provider identity, never from Tinye's deployment wallet.
5. A funded operator submits the approved signing request to `fast-auth.testnet`. The returned MPC signature is cryptographically verified before account activation.
6. If the implicit NEAR account does not exist, the operator transfers **0.1 testnet NEAR** to activate it. RPC must confirm the account and FullAccess key before a Tinye session is issued. This is testnet sponsorship, not fiat funding.

## Signing and sessions

The server prepares the exact savings transaction for the verified session account, with a fresh access-key nonce and block hash. Only the configured testnet savings contract is permitted, with methods `create_goal`, `deposit_native`, `withdraw`, `create_group`, `join_group`, `leave_group`, `close_group`, `invite_group_member` and `revoke_group_invitation`. Group creation/joining require exactly 0.02 NEAR storage; invitation requires 0.005 NEAR; leaving/closing/revoking invitations and withdrawals require one yoctoNEAR. The provider's approval JWT must match the complete transaction bytes. The server verifies the MPC signature and broadcasts the signed transaction; the existing frontend verifies final execution and contract operation state before changing financial balances.

Sessions retain `walletKind: embedded`. Supabase persistence is used only when its server secret and migration are configured; otherwise the documented local memory session remains. Logout clears local provider tokens and Tinye session state. A page reload may require provider reauthentication before a later signing popup.

## Local operator configuration

```dotenv
TINYE_EMBEDDED_SPONSOR_ENABLED=true
TINYE_EMBEDDED_SPONSOR_ACCOUNT=tinye.testnet
# Optional explicit absolute executable path; auto-detected in this Windows workspace.
TINYE_NEAR_CLI_PATH=
NEXT_PUBLIC_NEAR_AUTH_CLIENT_ID=np8paqIpMWmNbzT4xAvOOapZBjsOpptl
```

The operator uses `near-cli-rs sign-with-keychain`; no signing secret is exported into the app. The local service serialises sponsor nonces, reserves at least 2 NEAR before new-account activation, limits request rates, caps pending challenges, and caps sponsorship to 100 signing requests per process/day. These in-memory caps are development protection, not a distributed production abuse-control system.

## Boundaries and remaining verification

- An actual provider login and positive MPC round trip require user interaction. Merely installing the SDK or opening the popup does not prove successful creation. Report actual verification separately. A readiness check verified deployed NEAR Auth and MPC accounts, successful synthetic-path public-key derivation, and the sponsor balance of 4.161518783975570199999999 NEAR at block 277707397. No account was created by that probe. Both testnet provider discovery/JWKS HTTP checks failed with DNS `EAI_AGAIN` in this environment; positive provider login remains unverified.
- NEAR Auth publishes narrowly scoped signing approval JWTs on-chain by design. General login ID tokens are not sent to the chain. Treat the approval and identity privacy implications honestly.
- Recovery and continued access depend on the selected identity provider, NEAR Auth guards and MPC infrastructure. Tinye does not request recovery phrases and does not claim unconditional noncustody.
- The shared Auth0 tenant must allow the application's origin/callback. Unsupported origins must fail without creating a session.
- A Vercel deployment cannot access this machine's Windows keychain. Production needs a dedicated, funded secure relayer service, persistent sponsorship budgets and registered provider configuration. The embedded path fails closed where signing infrastructure is absent; existing-wallet testnet access remains available.
- No mainnet accounts or funds are used. Mainnet provider credentials require approval and a separate production security review.

Sources: [NEAR Auth testnet configuration](https://docs.auth.near.org/resources/testnet), [browser signing quickstart](https://docs.auth.near.org/home/quickstart), [official provider source](https://github.com/Peersyst/fast-auth/blob/main/packages/providers/javascript/src/provider.ts). The published JavaScript provider 1.4.1 lacks the reference repository's message-signing method, so Tinye uses the public Auth0 SPA API with the same reference `nep413` request format. The Browser SDK 1.4.2 recovers MPC signatures; React 19 SDK hooks are not imported into this React 18 app.

## Confirmed local provider setup

Google and Cloudflare DNS-over-HTTPS both returned valid records for the official testnet domain while Windows system DNS returned a server failure. A TLS-validated request to the independently resolved address returned discovery HTTP 200 and JWKS HTTP 200 with two keys. This distinguishes a local resolver failure from a provider outage. `embedded-jwks.ts` provides an application-scoped, fixed-host JWKS fallback through public DNS-over-HTTPS; it retains hostname/certificate validation, response limits and timeout controls, and never changes system DNS settings.

A read-only Auth0 `prompt=none` authorization check confirmed **http://localhost:3000** is accepted by the shared client (`login_required`, HTTP 200). Both `http://127.0.0.1:3010` and `http://localhost:3010` returned HTTP 403 with **Callback URL mismatch**. The local onboarding directs embedded setup to the wallet-ready localhost:3000 preview. The registered public production callback remains an operator/provider setup requirement. These probes do not authenticate a user or prove a completed wallet creation.
