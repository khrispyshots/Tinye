# Tinye private application storage

Financial balances, deposits and withdrawals live on NEAR testnet. This schema stores private profile/preferences, goal labels and hashed session identifiers only.

Apply `migrations/202611140001_tinye_profiles.sql` in the project SQL Editor, or put a Supabase management access token in ignored local environment configuration as `SUPABASE_ACCESS_TOKEN` and run:

```powershell
node scripts/supabase-migrate.mjs
```

The migration is transactional and safe to rerun. No browser `anon` or `authenticated` role has access. RLS is enabled and there are deliberately no browser policies because a Supabase Auth UUID does not establish ownership of a NEAR account. Server API routes use the secret key, derive the owner from the verified wallet session, and scope every database query to that account. Goal metadata writes additionally query the deployed contract to confirm goal ownership.

Configure the complete `SUPABASE_SECRET_KEY` only in the backend's environment. The publishable key cannot create the schema or write these private tables. Masked secrets are rejected. `GET /api/profile/storage` reports actual connection/schema readiness without revealing keys or private data.

When the backend secret is absent, profile/metadata routes report storage unavailable; the existing financial UI continues using verified blockchain state and explicitly local metadata. Sessions are local memory in local preview mode. Vercel wallet authentication fails closed until shared storage is configured. With the secret and schema configured, sessions persist as SHA-256 hashes with 30-minute expiry; raw bearer cookies are never stored in the database, and database-backed session reads fail closed on errors. External-wallet challenges live in the private `tinye_ephemeral` table, are bound to their initiating HttpOnly cookie, expire after five minutes and are consumed with an atomic delete-return operation to prevent cross-instance replay. The generic temporary-state helpers may also be used for embedded flows; the current embedded local sponsor still has its own local state and is unavailable on hosted deployments without an appropriate relayer.

No SQL migration has been applied solely by installing the package. Confirm readiness through the diagnostic endpoint and verify a real profile write before claiming persistence works.

Sources: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Management SQL API](https://supabase.com/docs/reference/api/v1-run-a-query).
