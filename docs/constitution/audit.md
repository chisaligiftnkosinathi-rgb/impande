# Constitutional Compliance Audit

This document creates traceability between Impande's philosophical principles (the Constitution) and the platform's technical implementation.

| Principle | Enforcement Mechanism | Testing Strategy |
| :--- | :--- | :--- |
| **Append-only truth** | `JournalEntryRevision` immutability in `JournalService` | Integration tests verifying mutations fail |
| **Explainability** | `MeaningService.explain()` exposing confidence metrics | API tests against the `/explain` endpoint |
| **Collection isolation** | `AuthorizationService` enforcing `collectionId` boundaries | Security tests running cross-collection reads |
| **Configuration validation** | Zod config (`src/lib/config/schema.ts`) | Startup tests forcing missing variables |
| **Source attribution** | `SourceReference` model mapping to `MediaAttachment` | Unit tests ensuring claims require sources |
| **Access governs stewardship** | `CollectionMembership` checking capabilities | Integration tests running under different roles |
| **Preservation of systems** | `Tracer.trace()` ensuring observability | E2E tests verifying JSON log generation |
