# Performance test plan

**Status:** Draft | **Version:** 0.1 | **Last updated:** 2026-11-14  
**Responsible role:** QA lead / domain reviewer

## Purpose

Test useful responsiveness and financial recovery under realistic constraints.

## Assumptions and dependencies

This is a documentation proposal, not an implemented or approved product. The master specification and owner approval govern scope. MVP means the proposed testnet release; later features require separate acceptance. Terms and shared states follow the [product requirements](../00-product/PRODUCT_REQUIREMENTS.md).

## Planned cases

PERF-01 measure first useful content, largest content rendering, input responsiveness and layout stability on mid/low-spec mobile over throttled high-latency/low-bandwidth connections. PERF-02 test paginated goal/history/admin queries with realistic synthetic volume and indexes. PERF-03 burst duplicate intents/events and concurrent withdrawals; correctness must hold under load. PERF-04 prolonged RPC/indexer/provider outage, catch-up backlog, worker restart and dead-letter visibility. PERF-05 offline/reconnect, interrupted wallet return, font/image failure and reduced-data experience.

## Targets and evidence

Quantitative latency, throughput, polling, bundle, RPC quota and recovery targets remain D24 decisions after baseline measurement. Report p50/p95/p99, device/network profile, environment/build, query plan and error/unknown rate; do not promise chain confirmation time from marketing averages. Provider latency is distinguished from app processing.

## Acceptance

No dropped financial event, duplicate effect or false success under tested load. Amount entry/review and status/help remain usable on constrained devices; heavy charts/images are deferred. Document measured bottlenecks and agreed thresholds before release, rather than inventing a passing benchmark.

## Unresolved decisions

See the linked decision register; recommendations are not approvals.

## Related documents

- [Decision Register](../00-product/DECISION_REGISTER.md)
- [Requirements Traceability](../00-product/REQUIREMENTS_TRACEABILITY.md)
