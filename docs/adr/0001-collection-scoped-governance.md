# ADR 0001: Collection-Scoped Governance and Capability-Based Authorization

**Date:** 2026-07-06
**Status:** Accepted

## Context
As Impande grows from a single-family archive into a platform supporting multiple families, institutions, and communities, global permissions (e.g., a user being a `STEWARD` everywhere) break down. We need a way to restrict a user's authority to specific collections, ensuring that unpublished or sensitive evidence in one collection cannot leak into another.

Furthermore, we need a clean boundary between "having a role" and "being authorized to perform an action," allowing the platform's policies to evolve without requiring constant refactoring of business logic.

## Decision
1. **Remove Global Roles:** We removed the `role` enum from the `User` model, replacing it with a minimal `isPlatformAdmin` boolean.
2. **Introduce CollectionMembership:** We created a `CollectionMembership` model linking a `User` to a `Collection`. All roles (`OWNER`, `STEWARD`, `CONTRIBUTOR`, `READER`) and their lifecycles (`INVITED`, `ACTIVE`, `SUSPENDED`) are now scoped exclusively to this model.
3. **Capability-Based AuthorizationService:** We centralized policy logic in a new `AuthorizationService`. Instead of checking `if (user.role === 'STEWARD')` inside `JournalService`, the service now asks the policy layer: `AuthorizationService.canReviewSubmission(userId, collectionId)`.
4. **Explicit Boundaries:** Every read or write service method is now required to take `collectionId` as an explicit parameter, enforcing a hard boundary for all data access.

## Consequences
**Positive:**
- **Federation Ready:** Different organizations can now host and manage collections independently on the same platform.
- **Separation of Concerns:** Business logic (Journal, Review) no longer knows about roles, only capabilities.
- **Security:** Hard boundary isolation prevents accidental cross-collection contamination.
- **Flexibility:** New roles or granular permissions can be added entirely within the `AuthorizationService` without touching the domain services.

**Negative/Trade-offs:**
- **Complexity:** Every service call now requires an extra authorization lookup, increasing latency slightly (though this can be cached in the future).
- **Refactoring:** We had to retroactively inject `collectionId` boundaries into existing commands and APIs.

## Constitutional Alignment
This decision directly implements the principle:
> **Access governs stewardship, not truth.** Permissions determine who may contribute, review, or curate evidence, but they never alter the provenance or historical record itself.
