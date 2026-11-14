# Requirements traceability matrix

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** Product / QA / technical leads

## Purpose

Link every major master requirement to a specification, component and planned test.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](PRODUCT_REQUIREMENTS.md).

## Traceability rules

Implementation statuses remain **Specified / not implemented**. Default visual direction is approved in root design.md and ui.md; this does not approve the remaining detailed behaviour or financial decisions. Component names are planned responsibilities, not claims that source files exist. Test IDs reference planned cases in linked test plans; none has run. Conditional later tests remain blocked until feature/financial/legal decisions are approved. Every master section 0–29 maps to the groups below; screen/component/table inventories provide item-level detail without duplicating specifications.

| Requirement ID | Requirement | Specification file | Proposed implementation component | Planned test / evidence | Status |
|---|---|---|---|---|---|
| PROD-001 | Inspect/preserve repository; document current stack, assets, config and gaps | [PROJECT_STATUS.md](../../PROJECT_STATUS.md) | Documentation/discovery | [Documentation validation](../16-quality/QA_STRATEGY.md) | Specified; unapproved; not implemented |
| PROD-002 | No code/deployment/data/config changes before explicit approval | [IMPLEMENTATION_ROADMAP.md](../../IMPLEMENTATION_ROADMAP.md) | Approval gates | [Documentation gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| PROD-003 | Truthful balances/activity and testnet/mock/production separation | [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) | All financial UI and verifier | [E2E-02/E2E-10](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| PROD-004 | Goal-based vision, personas and complete user journeys | [USER_JOURNEYS.md](USER_JOURNEYS.md) | Onboarding and goals | [E2E-01/E2E-05](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| PROD-005 | Core MVP, optional scope and deferred lending/debits/multichain | [MVP_SCOPE.md](MVP_SCOPE.md) | Feature configuration | [E2E-10](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| PROD-006 | Measurable metrics without invented targets | [SUCCESS_METRICS.md](SUCCESS_METRICS.md) | Private reporting | [INT-08 and metric reconciliation](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| PROD-007 | Open decisions and architecture trade-offs recorded | [DECISION_REGISTER.md](DECISION_REGISTER.md) | Owner review/ADR | [Documentation gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| DES-001 | Distinctive lowercase wordmark, cultural verification and asset exports planned | [LOGO_DIRECTION.md](../01-brand/LOGO_DIRECTION.md) | Brand asset pipeline | [Phase 1 asset review](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| DES-002 | Calm brand voice; no guaranteed profit, insurance or credit claims | [VOICE_AND_COPY.md](../01-brand/VOICE_AND_COPY.md) | Content templates | [E2E-01/E2E-10](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-003 | Semantic light/dark tokens, type, exact numeral hierarchy and contrast | [DESIGN_TOKENS.md](../02-design/DESIGN_TOKENS.md) | Design token definitions | [A11Y-03/A11Y-04](../16-quality/ACCESSIBILITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-004 | All component interaction/loading/empty/error states | [COMPONENT_LIBRARY.md](../02-design/COMPONENT_LIBRARY.md) | Shared component library | [Screen/global-state coverage](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-005 | All public/onboarding/main/admin screens and global states | [SCREEN_SPECIFICATIONS.md](../02-design/SCREEN_SPECIFICATIONS.md) | ONB-01–17 / APP-01–45 / ADM-01–08 | [E2E-01–10](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-006 | Mobile navigation and responsive layouts; low bandwidth | [RESPONSIVE_BEHAVIOUR.md](../02-design/RESPONSIVE_BEHAVIOUR.md) | Responsive shell | [PERF-01/PERF-05](../16-quality/PERFORMANCE_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-007 | Keyboard/screen reader/reflow/contrast accessibility | [ACCESSIBILITY.md](../02-design/ACCESSIBILITY.md) | All screens and wallet handoff | [A11Y-01–06](../16-quality/ACCESSIBILITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DES-008 | Restrained motion and reduced-motion support | [MOTION_AND_INTERACTION.md](../02-design/MOTION_AND_INTERACTION.md) | Transitions and celebrations | [A11Y-05](../16-quality/ACCESSIBILITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-001 | Progressive onboarding and approved sign-up/login methods | [ONBOARDING_FLOW.md](../03-auth/ONBOARDING_FLOW.md) | Identity/onboarding module | [E2E-01/E2E-06](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-002 | Wallet challenge, domain/network/key verification and replay defence | [AUTHENTICATION_SPEC.md](../03-auth/AUTHENTICATION_SPEC.md) | Auth challenge verifier | [INT-01/INT-02](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-003 | Clear key control, wallet explanation, connection/rejection and recovery | [WALLET_ONBOARDING.md](../03-auth/WALLET_ONBOARDING.md) | Wallet connector | [E2E-03/E2E-06](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-004 | Revocable sessions, rate limits, step-up and recovery boundaries | [SESSION_AND_ACCOUNT_SECURITY.md](../03-auth/SESSION_AND_ACCOUNT_SECURITY.md) | Session/security module | [QA-SEC-01](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-005 | Required version/hash consent separate from optional marketing | [CONSENT_RECORDS.md](../03-auth/CONSENT_RECORDS.md) | Consent module | [UNIT-06](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| AUTH-006 | Account export/closure/deletion with chain limits and unresolved balances | [SESSION_AND_ACCOUNT_SECURITY.md](../03-auth/SESSION_AND_ACCOUNT_SECURITY.md) | Account lifecycle jobs | [INT-10; E2E-07](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-001 | Goal fields, ownership, immutable asset and private metadata | [SAVINGS_PRODUCT_SPEC.md](../04-savings/SAVINGS_PRODUCT_SPEC.md) | Goals module/vault | [UNIT-02](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-002 | Valid goal lifecycle transitions and permissions | [GOAL_LIFECYCLE.md](../04-savings/GOAL_LIFECYCLE.md) | Goal state service | [UNIT-03](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-003 | Exact integer amounts, decimals, bounds and no silent rounding | [FEES_AND_LIMITS.md](../04-savings/FEES_AND_LIMITS.md) | Amount validation / allowlist | [UNIT-01/UNIT-04](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-004 | Deposit review/sign/submission/finality/refund/deduplication | [DEPOSIT_AND_WITHDRAWAL_RULES.md](../04-savings/DEPOSIT_AND_WITHDRAWAL_RULES.md) | Intent/receiver/verifier | [INT-03–06](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-005 | Eligible withdrawal, reservations, fees and safe failure/unknown | [DEPOSIT_AND_WITHDRAWAL_RULES.md](../04-savings/DEPOSIT_AND_WITHDRAWAL_RULES.md) | Withdrawal state machine | [SC-01/SC-09/SC-10](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-006 | Flexible default; commitments and early exit remain approved-only | [COMMITMENT_RULES.md](../04-savings/COMMITMENT_RULES.md) | Rule configuration | [E2E-04/E2E-05](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SAVE-007 | Network interruption, delay, wrong asset, duplicate and concurrency edges | [EDGE_CASES.md](../04-savings/EDGE_CASES.md) | Verifier and recovery | [INT-03–08/INT-12](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| YIELD-001 | No real yield without verified approved source and legal structure | [YIELD_PRODUCT_SPEC.md](../05-yield/YIELD_PRODUCT_SPEC.md) | Disabled strategy feature | [E2E-10](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| YIELD-002 | Provider/admin/fees/liquidity/loss/exit diligence | [STRATEGY_INTEGRATION.md](../05-yield/STRATEGY_INTEGRATION.md) | Future strategy adapter | [Conditional strategy approval](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| YIELD-003 | APR/APY, timestamped rate, realised attribution and integer math | [YIELD_CALCULATION.md](../05-yield/YIELD_CALCULATION.md) | Future earnings calculator | [Later formula tests after D08](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| YIELD-004 | Reconcile positions, gains, fees/losses and residuals | [RECONCILIATION.md](../05-yield/RECONCILIATION.md) | Future strategy reconciler | [Later provider/position tests after D08](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| REW-001 | Approved point values/caps/expiry/meaning and verified eligibility | [POINTS_ECONOMY.md](../06-rewards/POINTS_ECONOMY.md) | Rewards ledger | [UNIT-05](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| REW-002 | Idempotent grant/reversal, admin audit and anti-abuse | [ANTI_ABUSE_RULES.md](../06-rewards/ANTI_ABUSE_RULES.md) | Rewards worker/reviewer | [INT-09/INT-11](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| REW-003 | Streak/milestone rules and fair target/timezone handling | [STREAKS_AND_MILESTONES.md](../06-rewards/STREAKS_AND_MILESTONES.md) | Milestone service | [UNIT-05](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| REW-004 | Real catalogue/stock/fulfilment/refunds only after approval | [REDEMPTION_AND_FULFILMENT.md](../06-rewards/REDEMPTION_AND_FULFILMENT.md) | Future redemption service | [Conditional supplier/fulfilment gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| REP-001 | Private descriptive history, no unapproved credit score/formula | [REPUTATION_MODEL.md](../07-reputation/REPUTATION_MODEL.md) | Behaviour summary | [E2E-09](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| REP-002 | Inspect factors, dispute/correct records and govern data/sharing | [DATA_GOVERNANCE.md](../07-reputation/DATA_GOVERNANCE.md) | History correction/privacy | [INT-10 and profile corrections](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SOCIAL-001 | Groups deferred; individual attribution/no organiser withdrawal | [GROUP_FUND_RULES.md](../08-social/GROUP_FUND_RULES.md) | Future group projection/vault | [Later member isolation tests after D12](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SOCIAL-002 | Consentful invitations/membership/visibility/leave/disputes | [INVITATIONS_AND_MEMBERSHIP.md](../08-social/INVITATIONS_AND_MEMBERSHIP.md) | Future invitation/membership service | [Later invite/revoke/leave tests after D12](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-001 | Research official SDK/account/tooling/wallet/token/networks/security | [NEAR_TECHNICAL_RESEARCH.md](../09-blockchain/NEAR_TECHNICAL_RESEARCH.md) | Toolchain compatibility record | [Pinned build compatibility gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| CHAIN-002 | On-chain/off-chain diagram, custody choices and state/storage model | [BLOCKCHAIN_ARCHITECTURE.md](../09-blockchain/BLOCKCHAIN_ARCHITECTURE.md) | Vault and backend architecture | [SC-01/SC-02/SC-12](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-003 | Explicit interface/access/errors/events and ownership invariants | [CONTRACT_INTERFACE.md](../09-blockchain/CONTRACT_INTERFACE.md) | Rust vault proposed ABI | [SC-01–12 / I01–I10](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-004 | Trusted FT caller, asset metadata/decimals/storage and refunds | [TOKEN_AND_ASSET_SUPPORT.md](../09-blockchain/TOKEN_AND_ASSET_SUPPORT.md) | Allowlist/receiver | [SC-03/SC-04/SC-11](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-005 | User signing, wallet capability and no secret exposure | [WALLET_AND_SIGNING_FLOW.md](../09-blockchain/WALLET_AND_SIGNING_FLOW.md) | NEAR Connect adapter | [E2E-03/E2E-06](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-006 | Receipt finality and idempotent event indexing/reconciliation | [EVENTS_AND_INDEXING.md](../09-blockchain/EVENTS_AND_INDEXING.md) | Receipt verifier/index worker | [INT-03–08](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-007 | Callback/reentrancy/overflow/storage/external failure defences | [CONTRACT_SECURITY_MODEL.md](../09-blockchain/CONTRACT_SECURITY_MODEL.md) | Contract reservation and callbacks | [SC-02/SC-09–11](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-008 | Admin cannot bypass owner rules through methods; upgrade power disclosed | [UPGRADE_AND_EMERGENCY_CONTROLS.md](../09-blockchain/UPGRADE_AND_EMERGENCY_CONTROLS.md) | Governance/key policy | [SC-05/SC-07/SC-12](../16-quality/SMART_CONTRACT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| CHAIN-009 | Gated testnet/mainnet deployment, verification and code hashes | [TESTNET_DEPLOYMENT.md](../09-blockchain/TESTNET_DEPLOYMENT.md) | Release manifest | [Testnet and mainnet gates](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| API-001 | Maintainable modular backend with explicit sources of truth | [SYSTEM_ARCHITECTURE.md](../10-backend/SYSTEM_ARCHITECTURE.md) | Application/API/worker | [INT-03/INT-04/INT-08](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| API-002 | Concrete table types, constraints/indexes/relations/access/retention | [DATABASE_SCHEMA.md](../10-backend/DATABASE_SCHEMA.md) | Relational schema | [INT-02/INT-04/INT-10](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| API-003 | Endpoint schemas/errors/rate limits/pagination/audit/versioning | [API_SPECIFICATION.md](../10-backend/API_SPECIFICATION.md) | Versioned API contract | [INT-01/INT-02/INT-11 and API schema checks](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| API-004 | Atomic event/journal/projection/outbox and durable idempotency | [TRANSACTION_PROCESSING.md](../10-backend/TRANSACTION_PROCESSING.md) | Financial processor | [INT-03/INT-04/INT-07/INT-08](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| API-005 | Leased jobs, backoff, dead letters and replay-safe checkpoints | [BACKGROUND_JOBS.md](../10-backend/BACKGROUND_JOBS.md) | Durable worker | [INT-12](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| ADMIN-001 | Core visibility into users/goals/transactions and health | [ADMIN_REQUIREMENTS.md](../11-admin/ADMIN_REQUIREMENTS.md) | Admin UI/read API | [E2E-08](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| ADMIN-002 | Least privilege, MFA, reason/approval and immutable audit | [ROLES_AND_PERMISSIONS.md](../11-admin/ROLES_AND_PERMISSIONS.md) | Admin authorisation/audit | [INT-11](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| ADMIN-003 | Support, disputes, safe reconciliation and operational runbooks | [OPERATIONAL_RUNBOOKS.md](../11-admin/OPERATIONAL_RUNBOOKS.md) | Support/reconciler console | [E2E-08; incident rehearsal](../16-quality/E2E_TEST_PLAN.md) | Specified; unapproved; not implemented |
| LEGAL-001 | Unpublished counsel-reviewed terms/privacy/risk with no invented facts | [LEGAL_REVIEW_CHECKLIST.md](../12-legal/LEGAL_REVIEW_CHECKLIST.md) | Legal publication gate | [Legal and mainnet gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| LEGAL-002 | Current jurisdiction-specific issue spotting and missing-information register | [LEGAL_PLACEHOLDER_REGISTER.md](../12-legal/LEGAL_PLACEHOLDER_REGISTER.md) | Counsel review register | [Placeholder and jurisdiction review](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| LEGAL-003 | Fees/withdrawal/yield/rewards/groups agree with product and control model | [SAVINGS_AND_WITHDRAWAL_TERMS.md](../12-legal/SAVINGS_AND_WITHDRAWAL_TERMS.md) | Legal/product reconciliation | [Cross-domain consistency review](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| LEGAL-004 | Privacy/cookies/retention/processors/rights/chain erasure limits | [PRIVACY_POLICY.md](../12-legal/PRIVACY_POLICY.md) | Privacy notices and data jobs | [INT-10; analytics payload audit](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| LEGAL-005 | Version/hash/effective date and no unresolved publication placeholders | [LEGAL_DOCUMENT_VERSIONING.md](../12-legal/LEGAL_DOCUMENT_VERSIONING.md) | Consent/publication service | [UNIT-06](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SEC-001 | Threat model across user/frontend/backend/wallet/RPC/contracts/admin/vendors | [THREAT_MODEL.md](../13-security/THREAT_MODEL.md) | Threat/control register | [QA-SEC-01–04](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SEC-002 | Session/injection/CSRF/role/validation/rate-limit protections | [SECURITY_REQUIREMENTS.md](../13-security/SECURITY_REQUIREMENTS.md) | App security middleware | [QA-SEC-01](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SEC-003 | Separate user/operator keys, secrets, rotation and recovery | [KEY_MANAGEMENT.md](../13-security/KEY_MANAGEMENT.md) | Secret manager/governance | [QA-SEC-01/QA-SEC-03](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SEC-004 | Privacy minimisation, data export/deletion and profiling limits | [PRIVACY_BY_DESIGN.md](../13-security/PRIVACY_BY_DESIGN.md) | Data governance | [INT-10](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| SEC-005 | Incident severity/response/breach assessment and disclosure intake | [INCIDENT_RESPONSE_PLAN.md](../13-security/INCIDENT_RESPONSE_PLAN.md) | Incident operations | [QA-SEC-04](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| NOTIFY-001 | Service/marketing channel consent, retries/frequency/preferences | [NOTIFICATION_SPEC.md](../14-notifications/NOTIFICATION_SPEC.md) | Outbox/delivery/preferences | [INT-03/INT-12](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| NOTIFY-002 | All welcome/goal/deposit/withdrawal/reward/security/group templates | [MESSAGE_TEMPLATES.md](../14-notifications/MESSAGE_TEMPLATES.md) | Versioned safe messages | [UNIT-08; E2E-02/E2E-04](../16-quality/UNIT_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DATA-001 | Analytics event dictionary/cohorts/metrics with verified origins | [EVENT_TAXONOMY.md](../15-analytics/EVENT_TAXONOMY.md) | Analytics adapter/dashboard | [INT-08 and event-source reconciliation](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DATA-002 | No secrets/unnecessary personal data; consent-aware experimentation | [ANALYTICS_PRIVACY.md](../15-analytics/ANALYTICS_PRIVACY.md) | Analytics allowlist/experiment gate | [QA-SEC-01; UNIT-08](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| QA-001 | Full unit/integration/E2E/contract/security/a11y/performance coverage | [QA_STRATEGY.md](../16-quality/QA_STRATEGY.md) | Test suites/review evidence | [All suite IDs; no tests executed](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| QA-002 | Definition of done includes underlying verified behaviour and acceptance | [RELEASE_ACCEPTANCE_CRITERIA.md](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Release review | [Phase completion reports](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| OPS-001 | Isolated local/dev/testnet/staging/production and safe environment template | [ENVIRONMENT_VARIABLES.md](../17-operations/ENVIRONMENT_VARIABLES.md) | Future config/manifest | [Environment validation](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| OPS-002 | Gated CI/deployment/migrations/contract verification and no mainnet consent inferred | [CI_CD.md](../17-operations/CI_CD.md) | Future pipeline/release | [Deployment artefact and approval gate](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| OPS-003 | Monitoring, alert thresholds, error tracking and named responders | [MONITORING_AND_ALERTING.md](../17-operations/MONITORING_AND_ALERTING.md) | Operations dashboards/alerts | [QA-SEC-04](../16-quality/SECURITY_TEST_PLAN.md) | Specified; unapproved; not implemented |
| OPS-004 | Encrypted backups, measured restore and chain-aware rollback | [BACKUP_AND_RECOVERY.md](../17-operations/BACKUP_AND_RECOVERY.md) | Backup/restore/reconciliation | [INT-08/INT-10; restore rehearsal](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| BIZ-001 | Revenue options, transparent fee bounds and no hidden use of funds | [BUSINESS_MODEL.md](../18-business/BUSINESS_MODEL.md) | Approved pricing/treasury | [Business/counsel approval](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| BIZ-002 | Unit economics, funded rewards and separated treasury/operating reserve | [TREASURY_AND_OPERATIONS.md](../18-business/TREASURY_AND_OPERATIONS.md) | Finance reporting | [Per-asset reserve reconciliation](../16-quality/INTEGRATION_TEST_PLAN.md) | Specified; unapproved; not implemented |
| DEMO-001 | Human problem, NEAR rationale, on/off-chain and honest working/simulated limits | [DEMO_SCRIPT.md](../19-hackathon/DEMO_SCRIPT.md) | Demo/submission materials | [Submission evidence review](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |
| DEMO-002 | Overview/problem/features/checklist/presentation and approved phased roadmap | [SUBMISSION_CHECKLIST.md](../19-hackathon/SUBMISSION_CHECKLIST.md) | Hackathon review | [Claim-to-artefact checks](../16-quality/RELEASE_ACCEPTANCE_CRITERIA.md) | Specified; unapproved; not implemented |

## Master section coverage

| Master sections | Requirement groups / item detail |
|---|---|
| 0, 22–29 | PROD-001/002/007, QA-001/002, OPS-002; inventory, decisions, roadmap and validation |
| 1 | PROD-003–006; personas, journeys and metric definitions |
| 2–4 | DES-001–008; all 62 master screens, 8 admin surfaces, 16 global states and component catalogue |
| 5–6 | AUTH-001–006, SAVE-001–007 |
| 7–10 | YIELD-001–004, REW-001–004, REP-001/002, SOCIAL-001/002 |
| 11–13 | CHAIN-001–009, API-001–005, ADMIN-001–003 |
| 14–17 | LEGAL-001–005, SEC-001–005, NOTIFY-001/002, DATA-001/002 |
| 18–21 | QA-001/002, OPS-001–004, BIZ-001/002, DEMO-001/002 |

## Scoped design approval

Owner approved Friendly Green revision 4 as the default visual baseline on 2026-11-14. [design.md](../../design.md) and [ui.md](../../ui.md) govern visual execution for DES-002 through DES-008. D22 is partially approved for this scope. Final brand assets, detailed state implementation and all test evidence remain pending; no component is Implemented.

## Consistency acceptance

Use shared states/units in product requirements, goal lifecycle, schema, API and contract; verify legal terms/copy match custody/fees/availability; points remain separate; score has no numeric formula; admin has no arbitrary withdrawal; privacy controls analytics. The validation report records resolved tensions and unresolved release decisions. A green file/link check does not make any row Approved or Implemented.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](DECISION_REGISTER.md)
- [Documentation Validation](../DOCUMENTATION_VALIDATION.md)
