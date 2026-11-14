# Database schema

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Backend / data lead

## Purpose

Specify entities, field types, indexes, relations, access and retention.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Type and ownership conventions

Proposed PostgreSQL relational model; no migrations are written. UUID keys, UTC timestamptz instants, date for calendar targets, bounded text, explicit enums and foreign keys. `numeric(39,0)` stores unsigned U128-compatible units with CHECK >=0 and <=340282366920938463463374607431768211455; signed journal values use wider precision and bounded magnitude. JSON/API amounts are strings. Integers are required for points and counts. No floating-point money.

Each field list below is a concrete initial schema proposal. All IDs are PK unless a composite/foreign primary key is specified. FK deletions default RESTRICT for financial/audit evidence; profile deletion follows approved retention and pseudonymisation. Retention classes reference the legal schedule; periods remain unapproved, not silently infinite. Every request enforces row ownership even if DB row policies are also used. Secrets, seed phrases and private keys are absent.

| Table | Fields and types | Constraints / indexes | Relations and access | Retention class |
|---|---|---|---|---|
| users | id UUID PK; status enum; created_at UTC; closed_at nullable; version integer | status+created_at | Root owner; app self read, risk status mutation | Profile lifecycle |
| user_profiles | user_id UUID PK/FK; display_name text<=80; locale; timezone; optional avatar_ref; updated_at | user_id unique | Self read/write; support minimum view | Profile lifecycle |
| authentication_identities | id UUID; user_id FK; provider enum; subject_hash; verified_at; status | provider+subject_hash unique | Self read metadata; auth service write | Identity lifecycle |
| auth_challenges | id UUID; nonce_hash; account_id; network; recipient; expires_at; consumed_at; session_binding | nonce_hash unique; expires_at | Auth service only; never store private keys | Short security schedule |
| sessions | id_hash PK; user_id FK; created_at; idle_expires_at; absolute_expires_at; revoked_at; coarse_device | user_id+revoked_at; expiry | Self list/revoke; auth service write | Short security schedule |
| wallets | id UUID; network; epoch; account_id; user_id FK; verified_at; status | network+epoch+account_id unique | Owner and verifier; no private key fields | Identity / evidence schedule |
| wallet_connections | id UUID; wallet_id FK; provider; connected_at; disconnected_at; proof_ref | wallet_id+connected_at | Self; auth service write | Connection schedule |
| savings_goals | id UUID; chain_goal_id nullable unique; user_id FK; asset_id FK; name<=80; category; target_units numeric(39,0); target_date date nullable; timezone; mode; status; rule_version; version | user_id+status; chain_goal_id unique | Owner metadata write; verifier state projection | Goal lifecycle/evidence |
| goal_memberships | id UUID; goal_id FK; user_id FK; role; visibility_consent_id; joined_at; left_at | goal_id+user_id unique | Inactive later; member-scoped | Group lifecycle |
| supported_assets | id UUID; network; epoch; token_contract nullable; native boolean; symbol; decimals smallint; metadata_hash; limits_version; enabled | network+epoch+token identity unique | Public safe read; approved config write | Configuration evidence |
| financial_rule_versions | id text PK; asset_id FK; min/max units numeric(39,0); fee_policy; effective_at; approval_ref | asset_id+effective_at | Public terms read; governed write | Financial evidence |
| financial_operations | id UUID; user_id FK; goal_id FK; kind enum; amount_units numeric(39,0); asset_id FK; request_id; payload_hash; status; created_at; version | user_id+request_id unique; status+created_at | Owner read; verifier status write | Financial evidence |
| deposits | operation_id UUID PK/FK; accepted_units numeric(39,0); refunded_units numeric(39,0); evidence_id FK nullable | operation_id unique | Owner read; verifier write | Financial evidence |
| withdrawals | operation_id UUID PK/FK; recipient_account; reservation_state; settled_units numeric(39,0); evidence_id nullable | reservation_state; operation_id unique | Owner read; verifier write | Financial evidence |
| blockchain_transactions | id UUID; network; epoch; tx_hash; sender_account; operation_id FK nullable; final_block_hash; final_height bigint; execution_status; observed_at | network+epoch+tx_hash+sender_account unique | Verifier write; owner redacted read | Financial evidence |
| chain_events | id UUID; network; epoch; emitter; receipt_id; log_index int; data_index int; schema_version; block_hash; height bigint; parsed_payload; verified_at | network+epoch+emitter+receipt_id+log_index+data_index unique | Verifier only write; not general analytics | Financial evidence |
| ledger_entries | id UUID; operation_id FK; evidence_id FK; goal_id FK; asset_id FK; signed_units numeric(40,0); entry_type; reversal_of nullable; checkpoint | evidence_id+entry_type+goal_id unique; goal_id+asset_id | Append-only verifier; owner read via views | Financial evidence |
| goal_balance_projections | goal_id FK; asset_id FK; confirmed_units numeric(39,0); reserved_units numeric(39,0); final_height bigint; final_hash; verified_at | goal_id+asset_id PK | Verifier write only; owner read | Rebuildable projection |
| indexer_checkpoints | network; epoch; contract; partition; cursor; block_hash; updated_at | network+epoch+contract+partition PK | Worker only | Rebuildable checkpoint |
| outbox_events | id UUID; type; source_id; dedupe_key; safe_payload; status; attempts int; next_attempt_at; created_at | dedupe_key unique; status+next_attempt_at | Service worker only | Delivery schedule |
| yield_strategies | id UUID; asset_id FK; provider_ref; contract_id; risk_version; status | asset_id+status | Inactive later; governed access | Strategy evidence |
| yield_snapshots | id UUID; strategy_id FK; final_checkpoint; nav_units numeric(39,0); shares_units numeric(39,0); observed_at | strategy_id+final_checkpoint unique | Inactive later; verifier write | Strategy evidence |
| earnings_entries | id UUID; user_id FK; strategy_id FK; snapshot_id FK; signed_units numeric(40,0); formula_version | user_id+snapshot_id+formula_version unique | Inactive later; append-only verifier | Financial evidence |
| reward_accounts | user_id UUID PK/FK; posted_points bigint; reserved_points bigint; version | user_id unique | Reward worker write; self read | Reward evidence |
| reward_ledger | id UUID; user_id FK; signed_points bigint; source_kind; source_id; rule_version; reversal_of FK nullable; reason; created_at | user_id+source_kind+source_id+rule_version unique | Append-only reward worker; audited adjustments | Reward evidence |
| reward_catalogue | id UUID; version; supplier_ref; cost_points bigint; stock int; eligibility; status | id+version unique | Inactive later; catalogue role | Supplier/fulfilment schedule |
| redemptions | id UUID; user_id FK; catalogue_id/version; cost_points bigint; status; fulfilment_ref; idempotency_ref | user_id+idempotency_ref unique; fulfilment_ref unique | Inactive later; owner read/worker write | Fulfilment evidence |
| reputation_snapshots | id UUID; user_id FK; period; factors; calculation_version; source_checkpoint; generated_at | user_id+period+calculation_version unique | Owner read; derived service write | Profiling schedule |
| notifications | id UUID; user_id FK; source_id; channel; template_version; status; provider_ref; attempts; delivered_at | source_id+channel+template_version unique; status | Owner read; worker write | Delivery schedule |
| consent_records | id UUID; user_id FK; document_key/version; content_hash; purpose; required; decision; accepted_at; supersedes_id | user_id+document_key+version+purpose+decision unique | Owner read; consent service append | Consent evidence |
| support_tickets | id UUID; user_id FK; category; status; operation_id nullable; safe_description; assigned_role; created_at | user_id+created_at; status | Owner and assigned support only | Support schedule |
| admin_users | user_id UUID PK/FK; role; mfa_enrolled; status; approved_by; granted_at; expires_at | role+status | Security admin governed write | Privilege audit schedule |
| audit_logs | id UUID; actor_ref; role; action; resource_ref; reason; redacted_before/after; request_id; occurred_at; integrity_ref | resource_ref+occurred_at; actor_ref+occurred_at | Append-only audit service; auditor read | Audit/legal hold schedule |
| idempotency_records | id UUID; user_id FK; method; route; key_hash; payload_hash; response_ref; status; expires_at | user_id+method+route+key_hash unique | Service only | Replay-safe financial schedule |
| reconciliation_runs | id UUID; asset_id FK; checkpoint; status; contract_liability_units; projected_units; difference_units numeric(40,0); incident_ref | asset_id+checkpoint unique | Verifier write; operations read | Financial evidence |

## Integrity and transaction boundaries

Goals use status vocabulary in PRODUCT_REQUIREMENTS, immutable asset after funding and optimistic `version` updates. Financial operations use the shared operation states; reservation state is separate. Check confirmed>=reserved>=0, positive requested units, positive targets, legal state enums and consistent goal/user/asset ownership. Cross-table consistency uses composite FKs or transactional validation, not frontend assumptions. Derived balances cannot be updated through public APIs.

Atomically insert verified event, operation transition, journal effect, balance projection and outbox. Reward posting uses a separate transaction with source-event uniqueness and atomic cap checks. Outbox delivery is at least once; consumers deduplicate. Do not delete idempotency evidence while the contract can replay a request; expiry/reuse policy must preserve on-chain deduplication. Immutable chain journal correction uses linked compensating entries, never SQL UPDATE to historical amounts.

## Acceptance and edge cases

Test owner isolation, FK restrictions, enum transitions, U128 boundaries, concurrent withdrawals/reward caps, partial projection failures, checkpoint rollback and deletion under legal hold. Verify query indexes with realistic synthetic test data after approval. Later groups/yield/catalogue tables are specified but must not be migrated/enabled without their gate. Raw evidence retention requires privacy review and excludes signed secrets.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
- [Data Retention And Deletion Policy](../12-legal/DATA_RETENTION_AND_DELETION_POLICY.md)
