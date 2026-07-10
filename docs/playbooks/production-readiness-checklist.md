# Production Readiness Checklist

Before moving any version of the Impande Truth Engine to a publicly accessible production environment, this checklist MUST be completed and signed off by a Platform Administrator.

## 1. Architecture & Isolation
- [ ] Staging and Production share **no** infrastructure (Separate DBs, separate Object Storage).
- [ ] `collectionId` boundaries are enforced across all queries and mutations.

## 2. Configuration & Secrets
- [ ] The application fails fast on startup if any environment variable is missing (validated via Zod).
- [ ] No secrets (API keys, DB credentials) are logged in plain text or exposed in error messages.

## 3. Observability & Monitoring
- [ ] Structured logging (JSON format) is enabled.
- [ ] Application metrics (Latency, Error Rates, Cache Hits) are actively being scraped.
- [ ] Tracing correlation IDs are passed across service boundaries.

## 4. Resilience & Recovery
- [ ] Automated database backups are scheduled.
- [ ] A restoration drill has been successfully performed in the last 30 days.
- [ ] Object storage has versioning enabled.

## 5. Security Hardening
- [ ] Rate limiting is enforced at the API Gateway or Middleware.
- [ ] Content Security Policy (CSP) headers are actively enforced.
- [ ] Dependencies have been scanned for known vulnerabilities.
- [ ] Database credentials operate on a least-privilege principle (no root access).

## 6. Governance & Access
- [ ] Only authorized Platform Administrators have root operational access.
- [ ] The `AuthorizationService` correctly rejects cross-collection access attempts.
