# Local environment template

Status: Implemented template; application wiring pending. Version: 1.0. Updated: 2026-11-14.
Owner: Application and deployment engineering.

Purpose: adapt the owner's proposed Vite environment example to this existing Next.js 14 application without changing the framework or UI. Dependencies: verified deployment IDs before enabling contracts; protected deployment credentials outside browser code.

Use the root [.env.example](../../.env.example) as a safe template. Copy locally to `.env.local` and populate only verified public configuration. `.env.local` and other real environment files are ignored; example files remain allowed. Never place secrets in an example file.

This application uses `NEXT_PUBLIC_*`, not `VITE_*`. [Next.js environment documentation](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables), checked 2026-11-14, explains browser-exposed public variables and build-time inlining. Public configuration changes require a rebuild/restart as applicable; never prefix deployment secrets with `NEXT_PUBLIC_`.

| Variable family | Consumer | Current status |
|---|---|---|
| NEXT_PUBLIC_NEAR_NETWORK_ID / RPC_URL / EXPLORER_URL | Browser chain configuration | Testnet values in safe template; consuming code not yet wired |
| NEXT_PUBLIC_TINYE_SAVINGS_CONTRACT | Verified savings contract integration | Blank; no verified deployment |
| NEXT_PUBLIC_TINYE_REWARDS_CONTRACT | Approved future rewards contract, if required | Blank; no deployment authorised or needed yet |
| NEAR_DEPLOYER_ACCOUNT_ID / NEAR_CREDENTIALS_PATH | Local deployment tooling only | Blank; never browser imports |
| NEAR_DEPLOYER_PRIVATE_KEY | Optional deployment tool only | Commented placeholder; prefer keychain, not an environment key |

The current `src/services/contractClient.ts` still has hardcoded defaults and simulated operations. Adding this template does not replace those calls, verify an account, create a session or connect a contract. The approved implementation must consume validated configuration, reject wrong networks, and treat missing contract IDs as unavailable rather than substituting a guessed address.

The [.gitignore](../../.gitignore) excludes environment files, NEAR credential directories, signing key extensions, dependencies, Next/build outputs, coverage and Rust targets. It cannot remove secrets already tracked in Git or prevent secrets stored under unexpected names. No existing credential contents were opened or printed during this change. No Git repository was present in the workspace at the time of validation.

Acceptance: safe examples allowed, actual environment/key files ignored, public/private variable boundary documented, no application/UI or deployment change. Open: verified contract IDs, deployment operator configuration and secure integration implementation. See [testnet report](../TESTNET_SETUP_REPORT.md).
