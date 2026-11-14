# API specification

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Define concrete proposed endpoints, schemas and boundaries.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Protocol and shared schemas

Proposed REST JSON `/v1`; no server or OpenAPI artefact exists yet. D18 selects stack before a generated OpenAPI contract is committed. User authentication is a server session; mutations require CSRF/origin checks. Wallet connection alone is insufficient. Owner-only resources return non-disclosing 404 for another user's identifier. Admin endpoints require explicit role and step-up where sensitive.

Amount: decimal digit string in base units, positive and U128-bounded; asset_id is an approved network-scoped ID; IDs are opaque UUID strings; date is ISO calendar date; instants are UTC ISO-8601. Error envelope: `{ "error": { "code": "AMOUNT_PRECISION", "message": "Use the supported asset precision.", "request_id": "example-request" } }` (synthetic schema example, no activity). Stable errors: VALIDATION 400, AUTH_REQUIRED 401, FORBIDDEN 403, NOT_FOUND 404, VERSION_CONFLICT/IDEMPOTENCY_CONFLICT/STATE_CONFLICT 409, UNSUPPORTED_ASSET 422, RATE_LIMITED 429, PROVIDER_UNAVAILABLE 503. Unknown transaction is a returned operation state, not a fabricated terminal error.

## Proposed endpoint catalogue

| Method/path | Auth and authorisation | Request → response | Validation / idempotency / audit |
|---|---|---|---|
| POST /auth/challenges | Anonymous, origin/rate checked | account_id,network,recipient → challenge_id,nonce,expires_at | 32-byte random challenge; single use; auth.challenge_created |
| POST /auth/verify | Challenge/session binding | challenge_id,signature,public_key,account_id → user,session expiry via cookie | Verify standard/domain/network/key/expiry; atomic consumption; auth.login |
| GET /session | Self | none → user_id,expiry,roles | No cache; session inspection |
| DELETE /session | Self + CSRF | none → 204 | Revoke idempotently; auth.logout |
| GET /profile | Self | none → display_name,locale,timezone,version | Private no-store |
| PATCH /profile | Self | allowed fields + version → profile | Reject arbitrary user_id; audit profile.updated |
| GET /wallets | Self | cursor,limit → verified wallet summaries | Owner only |
| POST /wallets/link | Recent self auth | fresh proof → linked wallet | No ownership reassignment; wallet.linked |
| DELETE /wallets/{id} | Recent self auth + owner | none → disconnected status | Cannot erase liabilities/recovery rights; wallet.disconnected |
| POST /consents | Self | document_key,version,hash,purpose,decision → record | Published/approved version only; immutable dedupe; consent.recorded |
| GET /goals | Self | status,cursor,limit → goal[] + next_cursor | Owner filter before pagination |
| POST /goals | Self | name,category,target_units,asset_id,target_date?,mode,terms_version → draft/active goal | Positive bounded target; idempotency key; goal.created |
| GET /goals/{id} | Owner | none → metadata,confirmed_units,reserved_units,verified_at,checkpoint | No API balance authorisation |
| PATCH /goals/{id} | Owner | mutable fields + version → updated goal | If-Match/version; asset immutable after funding; goal.updated |
| POST /goals/{id}/state | Owner or scoped risk role | desired_state,version,reason? → goal | Transition matrix; idempotent; goal.state_changed |
| POST /financial/intents | Self, goal/wallet owner | kind,goal_id,asset_id,amount_units,request_id,terms_version → intent,review,signing_request,expires_at | Fresh eligibility, fee/storage estimate, payload binding; financial.intent_created |
| POST /financial/intents/{id}/submission | Owner | tx_hash,sender_account_id → operation pending | Treat hash as untrusted candidate; key/header required; financial.submission_observed |
| GET /operations/{id} | Owner | none → shared state,amount,evidence?,as_of | Unknown remains unresolved |
| GET /transactions | Self | cursor,limit,goal_id?,status? → records,next_cursor | Network-scoped and owner-filtered |
| GET /transactions/{id} | Owner | none → receipt references,fees,verified outcome | No invented explorer/hash |
| GET /rewards | Self | none → posted_points,reserved_points,rule_version | Noncash label |
| GET /rewards/ledger | Self | cursor,limit → immutable entries | No financial balance aggregation |
| GET /history/behaviour | Self | period → descriptive factors,as_of | No composite credit score |
| GET /notifications | Self | cursor,limit → safe messages | Hide sensitive payloads |
| PATCH /preferences | Self | allowed service/marketing preferences → saved version | Consent-aware; preferences.updated |
| POST /support | Self or limited public support | category,operation_id?,safe_description → ticket_id | Anti-spam; no secrets/uploads default; support.created |
| POST /account/export | Recent self auth | format → export request/status | Idempotent; owner-only expiring result; account.export_requested |
| POST /account/closure | Recent self auth | acknowledgement,version → closure pending/status | Resolve balances/unknowns, retention holds; account.closure_requested |
| GET /admin/users /goals /operations | Privileged assigned scope | query,cursor,limit → redacted results | Step-up for sensitive records; admin.read |
| POST /admin/reconciliation-runs | Reconciler | asset_id,checkpoint → run_id | No manual balance overwrite; admin.reconcile |
| POST /admin/reward-adjustments | Reward role + independent approver | user_id,delta,reason,source,approval_ref → ledger entry | Unique request; audit before/after |
| POST /admin/restrictions | Risk role + step-up | user_id,reason,review_at → status | Off-chain scope only; audit/appeal |

Yield, group, fiat and redemption endpoints are absent from enabled MVP; future additions require separate schemas/authorisation and approval.

## Goal-vault registration boundary

Goal creation persists private planning metadata first. The financial intent service can return a reviewed owner-signed `create_goal` registration request where needed; final registration proof binds the chain_goal_id to the same owner/asset. Deposit intent creation is blocked until that binding is verified. The backend cannot create an owner vault by signing as the user, and a supplied chain_goal_id is never trusted without proof. Product `active` therefore does not imply an on-chain funded vault; responses include setup/verification state separately from the canonical goal status.

## Concrete synthetic examples

Create goal request (example values only, not an actual token deployment):

```json
{"name":"Emergency fund","category":"emergency","target_units":"100000000","asset_id":"approved-test-asset-id","target_date":"2027-06-01","mode":"flexible","terms_version":"draft-example-not-published"}
```

Proposed response shape:

```json
{"goal":{"id":"example-goal-id","status":"draft","asset_id":"approved-test-asset-id","target_units":"100000000","version":1},"environment":"testnet"}
```

Financial intent request:

```json
{"kind":"withdrawal","goal_id":"example-goal-id","asset_id":"approved-test-asset-id","amount_units":"1000","request_id":"example-client-request","terms_version":"draft-example-not-published"}
```

Response schema example (not a signable transaction):

```json
{"intent_id":"example-intent-id","status":"awaiting_signature","review":{"amount_units":"1000","network":"testnet","asset_id":"approved-test-asset-id","platform_fee_units":"0","network_fee_estimate":null},"signing_request":null,"blocked_reason":"CONFIGURATION_NOT_APPROVED"}
```

An approved implementation returns a typed, expiring signing request only after limits, contract identity, fee policy and eligibility checks pass. A client-provided transaction cannot mutate ownership or bypass these checks; chain verification binds it to the original intent.

## Rate limits, pagination and errors

Proposed initial caps, to load/security-test under D24: challenge 5/minute per coarse origin/account; verify 5/minute per challenge/account; reads 60/minute per authenticated user; financial intent/submission 10/minute per user; exports 1/hour; privileged mutations 5/minute per actor. Add global anti-abuse ceilings without relying solely on shared IPs. Return 429 with Retry-After; do not lock a victim's account because an attacker knows its ID.

Lists use opaque signed cursor over `(created_at,id)`, default limit 20/max 100, stable ordering and no offset-based financial omissions. All mutations accept an Idempotency-Key; financial requests additionally bind contract request_id. Same key+payload returns prior result; changed payload returns 409. Durable record uniqueness and contract dedupe outlive transport retries. Errors never reveal secrets, another user or unverified success.

## Acceptance

Validate auth, object ownership, every endpoint schema, rate caps, pagination continuity, version conflicts, idempotency races and audit emission. Publish generated OpenAPI only after stack approval and compare generated types against implemented handlers. API success for intent creation is not transaction success.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Authentication Spec](../03-auth/AUTHENTICATION_SPEC.md)
- [Authorization Model](AUTHORIZATION_MODEL.md)
