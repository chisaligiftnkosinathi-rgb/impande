# Codex Alignment

> "As above, so below — every idea in the Constitution should have a faithful implementation in the code, and every line of code should be traceable back to the Constitution."

This document is the bridge between philosophy and engineering. It answers one question for every subsystem: **does the implementation faithfully honour the principle?**

It is a living checklist. Every feature added to Impande can ask:
- Which constitutional principle does this implement?
- Where is the evidence in code and tests?
- What remains unfinished?

---

## Alignment Stack

Every layer must remain accountable to every layer above it.

```
Manifesto
    ↓
Constitution
    ↓
Standard
    ↓
Schema (Prisma)
    ↓
Services
    ↓
API
    ↓
UI
    ↓
Steward Experience
    ↓
Preserved Memory
```

Nothing should bypass a layer. If the UI can do something the Constitution forbids, there is misalignment. If the Constitution promises something the code cannot yet do, there is unfinished work.

---

## Three Alignment Questions

Every architectural, code, and deployment decision is filtered through:

1. **Does this preserve truth?**
2. **Does this increase transparency?**
3. **Does this better serve people?**

---

## Codex Alignment Matrix

| Constitutional Principle | Code Evidence | Test Evidence | Status | Open Questions |
|---|---|---|---|---|
| **Living Pages** | Framework complete: `src/lib/lifecycle/` (FeatureStates, FeatureLifecycle, FeatureRegistry), `src/components/living-page/` (LivingPage, PagePurpose, PageStatus, PageTimeline, PageParticipation). Registry is single source of truth for all feature states. Components answer four questions automatically. | Tests can verify every component renders correctly for each state | ✅ **Framework Complete** | Integration roadmap ready: connect Navigation, Route Pages, Middleware, Calibration Engine, Deployment Gate. See `docs/INTEGRATION_ROADMAP.md` |
| **Append-only history** | `JournalEntryRevision` (Prisma model); `ReviewService.acceptSubmission()` mints new revisions, never overwrites | `tests/constitutional/append-only.test.ts` — `updateRevision()` and `deleteEntry()` both throw constitutional violations | ✅ **Implemented** | Verify `updateRevision` / `deleteEntry` throw methods exist on `JournalService` (tests reference them; implementation needs confirmation) |
| **Provenance required** | `SourceReference` model linked to every `JournalEntryRevision`; `MediaAttachment` stores `fileHash` | `tests/constitutional/audit-traceability.test.ts` | ✅ **Implemented** | No API-level enforcement that a submission is rejected if `sourceReferences` is empty |
| **Truth separated from Meaning** | `src/lib/truth/` vs `src/lib/meaning/` — distinct module trees; `MeaningService` contains no write methods | `tests/constitutional/meaning-is-readonly.test.ts` — scans `MeaningService` prototype for write methods | ⚠️ **Partial** | `MeaningService.generateExplanation()` uses hardcoded confidence values rather than calling `ConfidenceCalculator`; `ThemeAnalyzer` reads hardcoded JS journal files instead of querying Prisma |
| **No destructive deletion** | No `DELETE` routes exist in `src/app/api/`; `ReviewService` and `JournalService` have no delete paths | `append-only.test.ts` — `deleteEntry()` throws constitutional violation | ✅ **Implemented** | Audit all future API routes to enforce this at the HTTP layer (return `405 Method Not Allowed` on DELETE) |
| **Every interpretation explainable** | `ConfidenceCalculator.ts` — weighted 4-factor scoring (evidence 40%, corroboration 25%, consistency 20%, completeness 15%); `ExplanationResponse` DTO includes `confidenceBreakdown` + `provenanceChain` | `tests/constitutional/confidence-explainability.test.ts` — asserts `evidenceChain` present whenever `confidenceScore > 0` | ⚠️ **Partial** | Test calls `service.explain()` but `MeaningService` exposes `generateExplanation()` — method name mismatch; `ConfidenceCalculator` not yet called by `MeaningService` in the live code path |
| **Preservation independent of platform** | `ImpandeExporter` produces layered ZIP (`.impande`) with `continuity/`, `truth/`, `timeline/`, `memory/`, `stewardship/`; `ImpandeImporter` reads `checksums.json` and verifies SHA-256 per file | `test-exporter.ts` (manual round-trip); `tests/services.test.ts` | ⚠️ **Partial** | No import API route (`/api/preservation/import`); `PreservationValidator` cycle-detection is a stub; checksums written to ZIP but generation code not visible in exporter read — verify `checksums.json` is actually produced |
| **Stewardship before ownership** | `CollectionMembership` roles (OWNER → STEWARD → CONTRIBUTOR → READER); `ReviewService.submitEntry()` gates on `AuthorizationService.canCreateSubmission()` | `tests/constitutional/authorization-boundary.test.ts`; `tests/constitutional/collection-boundary.test.ts` | ✅ **Implemented** | Ceremony Engine `onComplete` callbacks not yet wired to `ReviewService.submitEntry()` — stewards can fill ceremony forms but data does not flow to Truth Engine |
| **Collection-scoped governance** | ADR 0001; `AuthorizationService` receives explicit `collectionId` on every call; no global roles in Prisma schema | `authorization-boundary.test.ts`; `collection-boundary.test.ts` | ✅ **Implemented** | — |
| **Calibration before development** | `scripts/calibrate.ts` engine with registry, history, and ANSI renderer; `npm run water` / `npm run calibrate`; exit code 1 halts startup if roots are MISSING | `docs/calibration/*.json` — timestamped calibration reports with SHA-256 fingerprint | ✅ **Implemented** | Calibration checks file existence but does not yet verify schema integrity against Prisma or API contract shape |

---

## Phase Status

### Phase 1 — Truth Alignment
*Confirm schema, services, and APIs faithfully implement the Constitution.*

| Item | File(s) | Status |
|---|---|---|
| Append-only `JournalEntryRevision` enforced in schema | `prisma/schema.prisma` | ✅ |
| `ReviewService` submit → steward → accept → mint revision flow | `src/lib/services/ReviewService.ts` | ✅ |
| `AuthorizationService` collection-scoped on every write | `src/lib/services/AuthorizationService.ts` | ✅ |
| `JournalService.updateRevision()` throws constitutional violation | `src/lib/services/JournalService.ts` | ⚠️ Needs verification |
| `JournalService.deleteEntry()` throws constitutional violation | `src/lib/services/JournalService.ts` | ⚠️ Needs verification |
| API enforces no `DELETE` / `PUT` on revision resources | `src/app/api/v1/` | ⚠️ Only one route exists (`/explain GET`); no listing or create routes |
| `SourceReference` required before submission accepted | `ReviewService` + Zod DTO | ⚠️ Not enforced at API boundary |
| All `JournalService` API routes follow v1 envelope | `src/app/api/v1/` | ⚠️ Only `/explain` endpoint; no `GET /journal-entries`, `POST /submissions` |

---

### Phase 2 — Meaning Alignment
*Connect the Meaning Engine to live Truth Engine data.*

| Item | File(s) | Status |
|---|---|---|
| `ConfidenceCalculator` 4-factor scoring algorithm | `src/lib/meaning/ConfidenceCalculator.ts` | ✅ |
| `MeaningService.generateExplanation()` returns typed `ExplanationResponse` | `src/lib/services/MeaningService.ts` | ⚠️ Hardcoded confidence values; not calling `ConfidenceCalculator` |
| `ThemeAnalyzer.extractGenerationalThemes()` queries Prisma | `src/lib/meaning/ThemeAnalyzer.ts` | ⚠️ Reads hardcoded JS files (`chisaliJournal`, `nkambuleJournal`), not DB |
| `MeaningEngine.analyzeSpace()` uses real data | `src/lib/meaning/MeaningEngine.ts` | ⚠️ `researchOpportunities` and `languageDistribution` are hardcoded mocks |
| `MeaningService` exposes `explain(id)` method | `src/lib/services/MeaningService.ts` | ❌ Method is `generateExplanation()` — test expects `explain()` |
| Explainability test passes | `tests/constitutional/confidence-explainability.test.ts` | ⚠️ Test-implementation contract mismatch |

---

### Phase 3 — Ceremony Alignment
*Complete the guided stewardship workflows.*

| Item | File(s) | Status |
|---|---|---|
| `CeremonyEngine` step-state machine | `src/ceremonies/CeremonyEngine.tsx` | ✅ |
| All 5 step types rendered (INVITATION, REFLECTION, RECORDING, CONFIRMATION, CONTINUATION) | `CeremonyEngine.tsx` | ✅ |
| 6 ceremony definitions authored | `src/ceremonies/definitions/` | ✅ |
| `onComplete` fires on RECORDING step | `CeremonyEngine.tsx` | ✅ Framework |
| Any ceremony `onComplete` wired to `ReviewService.submitEntry()` | `definitions/*.tsx` | ❌ No definition passes data to API |
| Ceremony data validated by Zod before submission | `src/lib/contracts/dto.ts` | ❌ Not wired |
| CONFIRMATION step reflects back what was submitted | `CeremonyEngine.tsx` | ⚠️ Step renders but receives no server acknowledgement |

---

### Phase 4 — Preservation Alignment
*Archives can be exported, verified, imported, and restored without loss.*

| Item | File(s) | Status |
|---|---|---|
| `ImpandeExporter` produces layered ZIP | `src/lib/preservation/exporter.ts` | ✅ |
| Proper export API (`/api/preservation/export`) using `ImpandeExporter` | `src/app/api/preservation/export/route.ts` | ✅ |
| Legacy flat-JSON export (`/api/export/[spaceId]`) bypasses `ImpandeExporter` | `src/app/api/export/[spaceId]/route.ts` | ⚠️ Alignment gap — two competing export paths |
| SHA-256 `checksums.json` generated in ZIP | `ImpandeExporter` | ⚠️ Needs verification — importer reads it but generation not confirmed in audit |
| `ImpandeImporter` SHA-256 integrity verification | `src/lib/preservation/importer.ts` | ✅ |
| Import API route (`/api/preservation/import`) | — | ❌ Does not exist |
| `PreservationValidator` cycle detection | `src/lib/preservation/validation.ts` | ❌ Stub only |
| Round-trip test (export → import → verify identical state) | `test-exporter.ts` | ⚠️ Manual script, not automated |

---

### Phase 5 — Deployment Alignment
*Authentication, backups, monitoring, production infrastructure, and Version 1 release.*

| Item | Status |
|---|---|
| Authentication (session / JWT) | ❌ Not implemented |
| Rate limiting | ❌ Middleware exists as stub in `src/lib/security/` |
| Secure headers (CORS, CSP) | ❌ Stub |
| Database backup strategy | ❌ Not specified |
| Observability (structured logging, metrics, tracing) | ⚠️ Interfaces exist in `src/lib/observability/`; no concrete implementation |
| Production deployment manifest | ❌ Not present |
| `npm run water` runs before every deployment | ✅ Convention established |

---

## Misalignment Register

Issues discovered during audit. Each is a gap between Constitution and code.

| ID | Layer | Description | Severity |
|---|---|---|---|
| MA-001 | Meaning | `MeaningService.generateExplanation()` uses hardcoded confidence values instead of `ConfidenceCalculator` | High — violates explainability principle |
| MA-002 | Meaning | `ThemeAnalyzer` reads hardcoded JS files, not Prisma — themes do not reflect actual steward-submitted data | High — Meaning is not derived from Truth |
| MA-003 | Meaning | `confidence-explainability.test.ts` calls `service.explain()` but method is `generateExplanation()` — test cannot pass | Medium — constitutional test is dormant |
| MA-004 | Ceremony | No ceremony `onComplete` callback submits data to `ReviewService` — ceremony workflows are UI-only shells | High — stewardship before ownership principle not implemented end-to-end |
| MA-005 | Preservation | Two competing export routes: `/api/export/[spaceId]` (flat JSON, bypasses ImpandeExporter) and `/api/preservation/export` (proper ZIP) | Medium — the legacy route could be used accidentally, producing non-standard archives |
| MA-006 | Preservation | No import API route — archives can be exported but not restored via the platform | High — preservation independence cannot be verified end-to-end |
| MA-007 | Truth | `JournalService.updateRevision()` / `deleteEntry()` referenced in tests with constitutional violation throws — need to confirm these guard methods exist in the service implementation | Medium — if missing, the constitutional test silently fails |
| MA-008 | Truth | No API routes for listing journal entries or creating submissions — only `/explain` exists | Medium — Truth Engine is queryable but not writable via API |

---

## How to Use This Document

**Adding a feature:**
1. Identify which constitutional principle it serves.
2. Add a row to the Codex Alignment Matrix.
3. Write the test before the implementation.
4. Mark status as `⚠️ Partial` until both implementation and test are passing.
5. Mark `✅ Implemented` only when test passes in CI.

**Code review:**
- Any PR that adds a write path must show it is gated by `AuthorizationService`.
- Any PR that touches the Meaning layer must show it calls `ConfidenceCalculator` and returns a traceable `ExplanationResponse`.
- Any PR that adds an API route must confirm no `DELETE` or direct-overwrite semantics.

**Resolving a Misalignment:**
1. Find the MA-ID in the register.
2. Fix the gap.
3. Update the Phase Status table and Matrix row.
4. Remove the MA-ID from the register.
