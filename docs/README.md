# Tinye documentation index

**Status:** Draft | **Version:** 0.2 | **Last updated:** 2026-11-14  
**Responsible role:** Documentation / product lead

## Purpose

Index all required specifications and guide owner review.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](00-product/PRODUCT_REQUIREMENTS.md).

## Locked design baseline

Current precedence (2026-11-14): the owner now requires preservation of the rendered application, including its light green-and-cream theme. Do not recolour it to earlier dark mockups during wiring. Historical selections below remain references.

The owner selected Friendly Green revision 4 on 2026-11-14. Start future UI work with [design.md](../design.md), [ui.md](../ui.md) and the [approved desktop/mobile reference](02-design/concepts/06-friendly-green-lens-v4.png). Prior concepts are archived alternatives. This is scoped visual approval, not authorisation to implement or deploy.

## Selected onboarding

Owner selected [option 3: A quiet welcome](03-auth/ONBOARDING_DESIGN.md). Its uncluttered entrance and motion brief extend the locked green interface. [Selected image](02-design/concepts/onboarding/03-quiet-welcome.png). Remaining setup, animation production and application implementation are pending.

## Wallet and funding update

Latest correction supersedes the fictional bank-transfer credit flow: keep direct deposits visible as disabled Coming Soon; remove fake processing and balance credits. The application currently contains prototype code; earlier implementation-pending notes are historical.

## Current wiring review and approval package

- [Complete application flows](APP_FLOW.md)
- [Screen wiring matrix](SCREEN_WIRING_MATRIX.md)
- [NEAR wallet integration](NEAR_WALLET_INTEGRATION.md)
- [Smart-contract architecture](SMART_CONTRACT_ARCHITECTURE.md)
- [Transaction lifecycle](TRANSACTION_LIFECYCLE.md)
- [Implementation gaps and phased approval plan](IMPLEMENTATION_GAP_ANALYSIS.md)
- [Testnet setup results and deployment gate](TESTNET_SETUP_REPORT.md)

These are proposed, not implemented. No contract deployment occurred; testnet account creation/balance verification is blocked by local DNS. Review this package before major code changes.

- [Demo bank transfer and simulated Demo NEAR wallet](20-payments/DEMO_BANK_TRANSFER.md): owner-requested fictional bank flow; no real funds.
- [Embedded wallet and future real funding proposal](03-auth/EMBEDDED_WALLET_PROPOSAL.md): official-source research, recovery/control requirements and separate live-service gates.

All-country demo display is not a global banking-coverage claim. No provider has been integrated or real wallet created.

## Review starting points

1. Read the [discovery/status report](../PROJECT_STATUS.md), [MVP scope](00-product/MVP_SCOPE.md) and [decision register](00-product/DECISION_REGISTER.md).
2. Review [architecture alternatives](../ARCHITECTURE_DECISIONS.md), [official NEAR research](09-blockchain/NEAR_TECHNICAL_RESEARCH.md), [screens](02-design/SCREEN_SPECIFICATIONS.md), [data schema](10-backend/DATABASE_SCHEMA.md), [API](10-backend/API_SPECIFICATION.md) and [contract proposal](09-blockchain/CONTRACT_INTERFACE.md).
3. Review [legal research/checklist](12-legal/LEGAL_REVIEW_CHECKLIST.md), [missing facts](12-legal/LEGAL_PLACEHOLDER_REGISTER.md), [traceability](00-product/REQUIREMENTS_TRACEABILITY.md), [validation](DOCUMENTATION_VALIDATION.md) and [implementation roadmap](../IMPLEMENTATION_ROADMAP.md).

Most product/domain documents remain Draft version 0.1. The locked visual contracts have explicit scoped approval and their own versions. No product code, contracts, deployments, integrations or audits exist. Recommended defaults are conditional; owner approval is required before implementation. Mainnet/real funds require separate approval even after documentation/testnet acceptance.

## Root documents

- [Project status](../PROJECT_STATUS.md)
- [Implementation roadmap](../IMPLEMENTATION_ROADMAP.md)
- [Architecture decisions](../ARCHITECTURE_DECISIONS.md)
- [Changelog](../CHANGELOG.md)
- [Preserved master specification](../Tinye_Master_Project_Specification.md)

## Required documentation inventory

### 00-product

- [Product Vision](00-product/PRODUCT_VISION.md)
- [Product Requirements](00-product/PRODUCT_REQUIREMENTS.md)
- [Mvp Scope](00-product/MVP_SCOPE.md)
- [User Personas](00-product/USER_PERSONAS.md)
- [User Journeys](00-product/USER_JOURNEYS.md)
- [Success Metrics](00-product/SUCCESS_METRICS.md)
- [Assumptions And Constraints](00-product/ASSUMPTIONS_AND_CONSTRAINTS.md)
- [Decision Register](00-product/DECISION_REGISTER.md)
- [Requirements Traceability](00-product/REQUIREMENTS_TRACEABILITY.md)

### 01-brand

- [Brand Strategy](01-brand/BRAND_STRATEGY.md)
- [Logo Direction](01-brand/LOGO_DIRECTION.md)
- [Visual Identity](01-brand/VISUAL_IDENTITY.md)
- [Voice And Copy](01-brand/VOICE_AND_COPY.md)
- [Brand Asset Guidelines](01-brand/BRAND_ASSET_GUIDELINES.md)

### 02-design

- [Design Principles](02-design/DESIGN_PRINCIPLES.md)
- [Design Tokens](02-design/DESIGN_TOKENS.md)
- [Component Library](02-design/COMPONENT_LIBRARY.md)
- [Navigation And Information Architecture](02-design/NAVIGATION_AND_INFORMATION_ARCHITECTURE.md)
- [Responsive Behaviour](02-design/RESPONSIVE_BEHAVIOUR.md)
- [Motion And Interaction](02-design/MOTION_AND_INTERACTION.md)
- [Accessibility](02-design/ACCESSIBILITY.md)
- [Screen Specifications](02-design/SCREEN_SPECIFICATIONS.md)
- [Content And Microcopy](02-design/CONTENT_AND_MICROCOPY.md)

### 03-auth

- [Onboarding Flow](03-auth/ONBOARDING_FLOW.md)
- [Authentication Spec](03-auth/AUTHENTICATION_SPEC.md)
- [Wallet Onboarding](03-auth/WALLET_ONBOARDING.md)
- [Session And Account Security](03-auth/SESSION_AND_ACCOUNT_SECURITY.md)
- [Consent Records](03-auth/CONSENT_RECORDS.md)

### 04-savings

- [Savings Product Spec](04-savings/SAVINGS_PRODUCT_SPEC.md)
- [Goal Lifecycle](04-savings/GOAL_LIFECYCLE.md)
- [Deposit And Withdrawal Rules](04-savings/DEPOSIT_AND_WITHDRAWAL_RULES.md)
- [Commitment Rules](04-savings/COMMITMENT_RULES.md)
- [Fees And Limits](04-savings/FEES_AND_LIMITS.md)
- [Edge Cases](04-savings/EDGE_CASES.md)

### 05-yield

- [Yield Product Spec](05-yield/YIELD_PRODUCT_SPEC.md)
- [Strategy Integration](05-yield/STRATEGY_INTEGRATION.md)
- [Yield Calculation](05-yield/YIELD_CALCULATION.md)
- [Risk Disclosures](05-yield/RISK_DISCLOSURES.md)
- [Reconciliation](05-yield/RECONCILIATION.md)

### 06-rewards

- [Rewards Product Spec](06-rewards/REWARDS_PRODUCT_SPEC.md)
- [Points Economy](06-rewards/POINTS_ECONOMY.md)
- [Streaks And Milestones](06-rewards/STREAKS_AND_MILESTONES.md)
- [Rewards Marketplace](06-rewards/REWARDS_MARKETPLACE.md)
- [Redemption And Fulfilment](06-rewards/REDEMPTION_AND_FULFILMENT.md)
- [Anti Abuse Rules](06-rewards/ANTI_ABUSE_RULES.md)

### 07-reputation

- [Reputation Model](07-reputation/REPUTATION_MODEL.md)
- [Scoring Transparency](07-reputation/SCORING_TRANSPARENCY.md)
- [Data Governance](07-reputation/DATA_GOVERNANCE.md)

### 08-social

- [Group Savings](08-social/GROUP_SAVINGS.md)
- [Invitations And Membership](08-social/INVITATIONS_AND_MEMBERSHIP.md)
- [Group Fund Rules](08-social/GROUP_FUND_RULES.md)

### 09-blockchain

- [Blockchain Architecture](09-blockchain/BLOCKCHAIN_ARCHITECTURE.md)
- [Near Technical Research](09-blockchain/NEAR_TECHNICAL_RESEARCH.md)
- [Contract Requirements](09-blockchain/CONTRACT_REQUIREMENTS.md)
- [Contract Interface](09-blockchain/CONTRACT_INTERFACE.md)
- [Contract Security Model](09-blockchain/CONTRACT_SECURITY_MODEL.md)
- [Token And Asset Support](09-blockchain/TOKEN_AND_ASSET_SUPPORT.md)
- [Wallet And Signing Flow](09-blockchain/WALLET_AND_SIGNING_FLOW.md)
- [Events And Indexing](09-blockchain/EVENTS_AND_INDEXING.md)
- [Testnet Deployment](09-blockchain/TESTNET_DEPLOYMENT.md)
- [Mainnet Release Plan](09-blockchain/MAINNET_RELEASE_PLAN.md)
- [Upgrade And Emergency Controls](09-blockchain/UPGRADE_AND_EMERGENCY_CONTROLS.md)

### 10-backend

- [System Architecture](10-backend/SYSTEM_ARCHITECTURE.md)
- [Database Schema](10-backend/DATABASE_SCHEMA.md)
- [Api Specification](10-backend/API_SPECIFICATION.md)
- [Authorization Model](10-backend/AUTHORIZATION_MODEL.md)
- [Transaction Processing](10-backend/TRANSACTION_PROCESSING.md)
- [Event Processing](10-backend/EVENT_PROCESSING.md)
- [Background Jobs](10-backend/BACKGROUND_JOBS.md)
- [Observability](10-backend/OBSERVABILITY.md)
- [Backup And Recovery](10-backend/BACKUP_AND_RECOVERY.md)

### 11-admin

- [Admin Requirements](11-admin/ADMIN_REQUIREMENTS.md)
- [Roles And Permissions](11-admin/ROLES_AND_PERMISSIONS.md)
- [Audit Logging](11-admin/AUDIT_LOGGING.md)
- [Support And Disputes](11-admin/SUPPORT_AND_DISPUTES.md)
- [Operational Runbooks](11-admin/OPERATIONAL_RUNBOOKS.md)

### 12-legal

- [Terms Of Service](12-legal/TERMS_OF_SERVICE.md)
- [Privacy Policy](12-legal/PRIVACY_POLICY.md)
- [Cookie Policy](12-legal/COOKIE_POLICY.md)
- [Risk Disclosure](12-legal/RISK_DISCLOSURE.md)
- [Savings And Withdrawal Terms](12-legal/SAVINGS_AND_WITHDRAWAL_TERMS.md)
- [Yield And Earnings Disclosure](12-legal/YIELD_AND_EARNINGS_DISCLOSURE.md)
- [Rewards Terms](12-legal/REWARDS_TERMS.md)
- [Group Savings Terms](12-legal/GROUP_SAVINGS_TERMS.md)
- [Acceptable Use Policy](12-legal/ACCEPTABLE_USE_POLICY.md)
- [Complaints And Dispute Process](12-legal/COMPLAINTS_AND_DISPUTE_PROCESS.md)
- [Data Retention And Deletion Policy](12-legal/DATA_RETENTION_AND_DELETION_POLICY.md)
- [Third Party Processor Register](12-legal/THIRD_PARTY_PROCESSOR_REGISTER.md)
- [Legal Review Checklist](12-legal/LEGAL_REVIEW_CHECKLIST.md)
- [Legal Document Versioning](12-legal/LEGAL_DOCUMENT_VERSIONING.md)

### 13-security

- [Threat Model](13-security/THREAT_MODEL.md)
- [Security Requirements](13-security/SECURITY_REQUIREMENTS.md)
- [Key Management](13-security/KEY_MANAGEMENT.md)
- [Privacy By Design](13-security/PRIVACY_BY_DESIGN.md)
- [Incident Response Plan](13-security/INCIDENT_RESPONSE_PLAN.md)
- [Vulnerability Disclosure](13-security/VULNERABILITY_DISCLOSURE.md)
- [Security Test Plan](13-security/SECURITY_TEST_PLAN.md)

### 14-notifications

- [Notification Spec](14-notifications/NOTIFICATION_SPEC.md)
- [Message Templates](14-notifications/MESSAGE_TEMPLATES.md)

### 15-analytics

- [Event Taxonomy](15-analytics/EVENT_TAXONOMY.md)
- [Metrics Dashboard](15-analytics/METRICS_DASHBOARD.md)
- [Experimentation Policy](15-analytics/EXPERIMENTATION_POLICY.md)
- [Analytics Privacy](15-analytics/ANALYTICS_PRIVACY.md)

### 16-quality

- [Qa Strategy](16-quality/QA_STRATEGY.md)
- [Unit Test Plan](16-quality/UNIT_TEST_PLAN.md)
- [Integration Test Plan](16-quality/INTEGRATION_TEST_PLAN.md)
- [E2E Test Plan](16-quality/E2E_TEST_PLAN.md)
- [Smart Contract Test Plan](16-quality/SMART_CONTRACT_TEST_PLAN.md)
- [Security Test Plan](16-quality/SECURITY_TEST_PLAN.md)
- [Accessibility Test Plan](16-quality/ACCESSIBILITY_TEST_PLAN.md)
- [Performance Test Plan](16-quality/PERFORMANCE_TEST_PLAN.md)
- [Release Acceptance Criteria](16-quality/RELEASE_ACCEPTANCE_CRITERIA.md)

### 17-operations

- [Environment Strategy](17-operations/ENVIRONMENT_STRATEGY.md)
- [Deployment Guide](17-operations/DEPLOYMENT_GUIDE.md)
- [Ci Cd](17-operations/CI_CD.md)
- [Environment Variables](17-operations/ENVIRONMENT_VARIABLES.md)
- [Monitoring And Alerting](17-operations/MONITORING_AND_ALERTING.md)
- [Backup And Recovery](17-operations/BACKUP_AND_RECOVERY.md)
- [Rollback Plan](17-operations/ROLLBACK_PLAN.md)
- [Mainnet Go Live Checklist](17-operations/MAINNET_GO_LIVE_CHECKLIST.md)

### 18-business

- [Business Model](18-business/BUSINESS_MODEL.md)
- [Fee Model](18-business/FEE_MODEL.md)
- [Unit Economics](18-business/UNIT_ECONOMICS.md)
- [Reward Budget](18-business/REWARD_BUDGET.md)
- [Treasury And Operations](18-business/TREASURY_AND_OPERATIONS.md)

### 19-hackathon

- [Project Overview](19-hackathon/PROJECT_OVERVIEW.md)
- [Problem And Solution](19-hackathon/PROBLEM_AND_SOLUTION.md)
- [Near Integration](19-hackathon/NEAR_INTEGRATION.md)
- [Demo Script](19-hackathon/DEMO_SCRIPT.md)
- [Features And Limitations](19-hackathon/FEATURES_AND_LIMITATIONS.md)
- [Submission Checklist](19-hackathon/SUBMISSION_CHECKLIST.md)
- [Presentation Outline](19-hackathon/PRESENTATION_OUTLINE.md)

## Supplementary reports

- [Documentation validation and completion report](DOCUMENTATION_VALIDATION.md)
- [Legal placeholder register](12-legal/LEGAL_PLACEHOLDER_REGISTER.md)

## Acceptance and unresolved decisions

Expected-document existence and internal-link checks establish documentation coverage only. D22 visual direction is approved (residual brand deliverables pending); the other 23 decisions remain open; legal placeholders prevent publication; SDK compatibility, financial recovery and all application tests remain unexecuted. Owner should approve or amend the concrete defaults in the decision register and roadmap. Stop at this documentation gate until explicit approval is recorded.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](00-product/DECISION_REGISTER.md)
- [Requirements Traceability](00-product/REQUIREMENTS_TRACEABILITY.md)
- [Documentation Validation](DOCUMENTATION_VALIDATION.md)
