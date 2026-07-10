# ADR 0006: Cross-Cutting Operational Services

**Date:** 2026-07-06
**Status:** Accepted

## Context
As Impande prepares for production, we must ensure the platform is secure, observable, and resilient. If operational concerns (like reading environment variables, logging errors, or emitting metrics) are embedded directly inside domain services (e.g., `JournalService` or `ReviewService`), the codebase becomes tightly coupled to specific infrastructure choices. We needed a way to standardize operations across the entire architecture.

## Decision
We established a dedicated **Operations Layer** as a cross-cutting concern that supports all other layers (Truth, Confidence, Meaning, Stewardship, API).

1. **Centralized Configuration:** We introduced a Zod-based configuration schema (`src/lib/config/schema.ts`). Services no longer read `process.env` directly. Instead, the application validates the environment on startup and fails fast if required secrets or URLs are missing.
2. **Observability Abstractions:** We created standard interfaces for Logging (`Logger`), Metrics (`Metrics`), and Tracing (`Tracer`).
3. **Structured Context:** Operational tools now expect standardized context (e.g., `collectionId`, `correlationId`, `durationMs`) rather than unstructured text logs.
4. **Security Middleware:** We mock-implemented security boundaries (rate limiting, secure headers) at the very edge of the network request, keeping security decoupled from business logic.

## Consequences
**Positive:**
- **Reliability:** The fail-fast configuration ensures we never start the app in a broken state.
- **Portability:** We can swap out the underlying Logger (e.g., to Winston or Pino) or Metrics provider (e.g., Datadog or Prometheus) without changing a single line of business logic.
- **Debuggability:** Standardized tracing allows us to measure exact latencies across complex operations.

**Negative/Trade-offs:**
- **Boilerplate:** Developers must remember to wrap complex operations in `Tracer.trace()` rather than just writing `console.log`.

## Constitutional Alignment
This decision implements the principle:
> **The preservation of systems is the preservation of evidence.** Operational reliability, security, recoverability, observability, and transparency are essential responsibilities of stewardship.
