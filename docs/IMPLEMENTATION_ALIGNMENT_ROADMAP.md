# Implementation Alignment Roadmap

> "The Constitution is the covenant — what should exist.
> The Codex is the earthly expression — what actually exists.
> This roadmap measures the distance between them and charts the path to close it."

Each item below is a misalignment discovered during the Codex Alignment Audit.
When every checkbox is complete, the platform will not merely express its philosophy in documents —
it will embody that philosophy in every request, every ceremony, every archive, and every preserved memory.

**Completion signal:** When all eight are checked, update `docs/CODEX_ALIGNMENT.md` Misalignment Register to mark each MA-ID resolved.

---

## Feature Lifecycle During Implementation

See `docs/FEATURE_LIFECYCLE.md` for the constitutional principle: **"Nothing that belongs to the future should appear broken in the present."**

As each misalignment is resolved, the corresponding feature transitions through lifecycle states:

| MA-ID | Feature | PRESERVED → IMPLEMENTING → UNDER_REVIEW → READY |
|---|---|---|
| MA-007, MA-004, MA-008 | Ceremony → Truth Engine Flow | ▶ Today | Implementing guard methods, wiring ceremonies, exposing APIs |
| MA-001, MA-002, MA-003 | Meaning Engine | Future | Connecting confidence calculator, live data, and test alignment |
| MA-005, MA-006 | Preservation (Export/Import) | Future | Unifying export paths and completing round-trip import |

**Stewards will never see a broken feature.** As work progresses:

- MA-007 → Ceremony transitions from READY to IMPLEMENTING (honest message during refactor)
- MA-008 completed → API routes transition to READY (new endpoints available)
- MA-006 completed → Import feature transitions to READY (archive round-trip fully supported)

The user experience evolves with the implementation, always reflecting the true state of the platform.

---

## Integration Work: Connecting the Constitutional Spine

In parallel with Phases A–D, the `INTEGRATION_ROADMAP.md` describes how to connect the constitutional spine across the entire platform.

These integration points include:
- **Navigation** reads from FeatureRegistry (menu always reflects reality)
- **Route Pages** wrap with LivingPage component (every page answers four questions)
- **Middleware** shows graceful pages instead of 404s (no dead ends)
- **Calibration Engine** reports constitutional maturity (continuity measurement)
- **Deployment Gate** enforces constitutional compliance (block bad deploys)

**Timing:** Integration work can begin immediately and happens in parallel with Phase A/B/C/D. Both streams eventually converge: alignment work closes misalignments, integration work connects everything to the constitutional spine.

**See:** `docs/INTEGRATION_ROADMAP.md`

---

## Phase A — Complete the Truth Flow

*Without reliable data flowing from Ceremony into the Truth Engine, nothing else has a foundation.*

```
Steward → Ceremony → ReviewService → JournalService → Truth Engine
```

---

### ☐ MA-007
**Confirm constitutional guard methods exist on JournalService**

**Status:** OPEN

**Constitution:**
Append-only history. No revision may be mutated. No entry may be deleted. These are not conventions — they are constitutional guarantees.

**Implementation:**
Add `updateRevision()` and `deleteEntry()` methods to `JournalService` that throw:
```
Constitutional Violation: JournalEntryRevisions are immutable. Append a new revision instead.
Constitutional Violation: Deletions are not permitted in the Truth Engine. Supersede with a new claim.
```
Both methods must exist so the constitutional tests in `tests/constitutional/append-only.test.ts` have real targets to call.

**Files:**
- `src/lib/services/JournalService.ts` — add the two guard methods
- `tests/constitutional/append-only.test.ts` — tests already written, must now pass

**Verification:**
- ✓ `append-only.test.ts` passes with no mocks required
- ✓ No `UPDATE` or `DELETE` Prisma calls exist anywhere on `JournalEntryRevision`

---

**Evidence Record** (Complete when MA-007 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `JournalService.updateRevision()` exists and throws constitutional violation
  - ☐ `JournalService.deleteEntry()` exists and throws constitutional violation
  - ☐ `tests/constitutional/append-only.test.ts` passes without modification
  - ☐ `npm run water` calibration reports Truth Engine layer healthy
  - ☐ No `UPDATE` or `DELETE` in any Prisma query on `JournalEntryRevision`

---

### ☐ MA-004
**Wire ceremony `onComplete` to `ReviewService.submitEntry()`**

**Status:** OPEN

**Constitution:**
Stewardship before ownership. The act of preservation — the ceremony — must carry truth into the archive. A ceremony that does not write to the Truth Engine is a ritual without a record.

**Implementation:**
Each ceremony definition in `src/ceremonies/definitions/` must pass its `onComplete` callback an implementation that:
1. Maps collected `formData` to a `SubmitJournalEntryCommand` DTO
2. Calls `ReviewService.submitEntry(command)` (or the equivalent API route)
3. Returns the created submission ID so the CONFIRMATION step can display it

The flow per ceremony:
```
RECORDING step collects formData
    ↓
onComplete(formData) fires
    ↓
POST /api/v1/submissions  (new route — see MA-008)
    ↓
ReviewService.submitEntry()
    ↓
JournalEntry + Submission created in Truth Engine
    ↓
CONFIRMATION step renders submission ID
```

**Files:**
- `src/ceremonies/definitions/*.tsx` — add `onComplete` implementations
- `src/lib/contracts/dto.ts` — `SubmitJournalEntryCommand` already defined; map form fields to it
- API route for submissions (see MA-008)

**Verification:**
- ✓ Completing any ceremony creates a `Submission` row in the database
- ✓ CONFIRMATION step receives and displays the submission ID
- ✓ No ceremony definition has an undefined or no-op `onComplete`

---

**Evidence Record** (Complete when MA-004 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ All ceremony definitions in `src/ceremonies/definitions/` have `onComplete` implementations
  - ☐ `onComplete` collects `formData` and maps to `SubmitJournalEntryCommand`
  - ☐ Ceremony submission flow creates a row in the `Submission` table
  - ☐ CONFIRMATION step receives and displays `submissionId`
  - ☐ No ceremony workflow completes without data flowing to Truth Engine

---

### ☐ MA-008
**Add missing Truth Engine API routes**

**Status:** OPEN

**Constitution:**
Every constitutional service must be reachable. The API is the interface between the Steward Experience and the Truth Engine. An engine with no door is inaccessible.

**Implementation:**
Add the following routes under `src/app/api/v1/`, each as a thin adapter over the existing service layer (no business logic in routes):

| Method | Route | Service call |
|---|---|---|
| `GET` | `/api/v1/journal-entries` | `JournalService.listEntries()` |
| `GET` | `/api/v1/journal-entries/[id]` | `JournalService.getCurrentRevision()` |
| `GET` | `/api/v1/journal-entries/[id]/history` | `JournalService.getRevisionHistory()` |
| `POST` | `/api/v1/submissions` | `ReviewService.submitEntry()` |
| `POST` | `/api/v1/submissions/[id]/accept` | `ReviewService.acceptSubmission()` |
| `POST` | `/api/v1/submissions/[id]/reject` | `ReviewService.rejectSubmission()` |

All routes must return the standard v1 response envelope (`data`, `meta`, `links`).
No `DELETE` or `PUT` routes may be added.

**Files:**
- `src/app/api/v1/journal-entries/route.ts` (new)
- `src/app/api/v1/journal-entries/[id]/route.ts` (new)
- `src/app/api/v1/journal-entries/[id]/history/route.ts` (new)
- `src/app/api/v1/submissions/route.ts` (new)
- `src/app/api/v1/submissions/[id]/accept/route.ts` (new)
- `src/app/api/v1/submissions/[id]/reject/route.ts` (new)

**Verification:**
- ✓ All routes return the v1 envelope
- ✓ No write route accepts a body that bypasses `AuthorizationService`
- ✓ No `DELETE` or `PUT` route exists anywhere under `/api/v1/`

---

**Evidence Record** (Complete when MA-008 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ All 6 routes created under `src/app/api/v1/submissions/` and `journal-entries/`
  - ☐ All routes return v1 response envelope (`data`, `meta`, `links`, `errors`)
  - ☐ All write routes call `AuthorizationService` gating
  - ☐ No `DELETE` or `PUT` route exists anywhere under `/api/v1/`
  - ☐ All routes tested (at least happy-path) in `tests/api.test.ts` or similar
  - ☐ Ceremony `onComplete` callbacks successfully call `POST /api/v1/submissions`

---

## Phase B — Connect the Meaning Engine

*Replace every hardcoded value with a derivation from real Truth Engine data.*

```
Prisma → MeaningService → ConfidenceCalculator → ThemeAnalyzer
```

---

### ☐ MA-001
**Connect `MeaningService` to `ConfidenceCalculator`**

**Status:** OPEN

**Constitution:**
Every interpretation must be explainable. Confidence is not an opinion — it is a calculation derived from evidence. If a confidence value is hardcoded, it cannot be questioned, traced, or improved.

**Implementation:**
In `MeaningService.generateExplanation()`, replace the hardcoded confidence object:
```typescript
// Before (hardcoded — constitutionally invalid)
confidenceBreakdown: {
  evidence: revision.evidenceStrength === 'strong' ? 0.9 : 0.5,
  corroboration: supporting.length > 0 ? 0.8 : 0.2,
  ...
}
```
with a real call to `ConfidenceCalculator.evaluateClaim()`:
```typescript
// After (derived — constitutionally valid)
const confidence = ConfidenceCalculator.evaluateClaim(journalEntries);
confidenceBreakdown: confidence.breakdown
```
This requires passing `JournalEntry[]` objects (from `src/lib/truth/journals/types.ts`) into `generateExplanation()`, which may require a small signature change.

**Files:**
- `src/lib/services/MeaningService.ts` — replace hardcoded values with `ConfidenceCalculator` call
- `src/lib/contracts/dto.ts` — verify `ExplanationResponse` shape matches `ConfidenceResult`

**Verification:**
- ✓ `MeaningService.generateExplanation()` imports and calls `ConfidenceCalculator.evaluateClaim()`
- ✓ No numeric confidence literals exist in `MeaningService`
- ✓ `confidence-explainability.test.ts` passes (see also MA-003)

---

**Evidence Record** (Complete when MA-001 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `MeaningService.generateExplanation()` calls `ConfidenceCalculator.evaluateClaim()`
  - ☐ No hardcoded confidence literals (`0.9`, `0.5`, etc.) in `MeaningService`
  - ☐ `ExplanationResponse.confidenceBreakdown` matches `ConfidenceResult.breakdown` shape
  - ☐ Changing evidence in a journal entry changes the returned confidence score
  - ☐ All Meaning Engine tests pass

---

### ☐ MA-002
**Connect `ThemeAnalyzer` to Prisma**

**Status:** OPEN

**Constitution:**
Meaning derives from Truth. If the Meaning Engine reads from hardcoded data files rather than the Truth Engine database, it is not deriving meaning — it is reciting a script. The themes displayed to stewards must reflect the claims they have actually submitted.

**Implementation:**
Replace the hardcoded journal imports in `ThemeAnalyzer.extractGenerationalThemes()`:
```typescript
// Before (hardcoded — disconnected from Truth Engine)
const allEntries = [...chisaliJournal, ...nkambuleJournal];
```
with a Prisma query scoped to the `spaceId` argument:
```typescript
// After (live — derived from Truth Engine)
const revisions = await prisma.journalEntryRevision.findMany({
  where: { journalEntry: { collectionId: spaceId } },
  include: { sourceReferences: true }
});
```
Map the Prisma results to `JournalEntry[]` before passing to `ConfidenceCalculator`.

Apply the same replacement in `MeaningEngine.analyzeSpace()` — remove the hardcoded `researchOpportunities` and `languageDistribution` arrays and derive them from live queries.

**Files:**
- `src/lib/meaning/ThemeAnalyzer.ts` — replace hardcoded imports with Prisma query
- `src/lib/meaning/MeaningEngine.ts` — replace hardcoded mock arrays with derived queries
- `src/lib/truth/journals/chisaliJournal.ts`, `nkambuleJournal.ts` — retain as reference/seed data only, not as runtime data source

**Verification:**
- ✓ `ThemeAnalyzer` imports no hardcoded journal files
- ✓ `MeaningEngine.analyzeSpace()` contains no hardcoded arrays
- ✓ Changing a claim in the database changes the theme output on next analysis

---

**Evidence Record** (Complete when MA-002 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `ThemeAnalyzer.extractGenerationalThemes()` queries Prisma for journal entries filtered by `spaceId`
  - ☐ No imports of `chisaliJournal` or `nkambuleJournal` in runtime code paths
  - ☐ Hardcoded journal files retained only in `tests/` or `prisma/seed.ts`
  - ☐ `MeaningEngine.analyzeSpace()` derives `researchOpportunities` and `languageDistribution` from Prisma
  - ☐ Manual test: add a claim to the database and verify it appears in theme analysis

---

### ☐ MA-003
**Align the explainability constitutional test with the implementation**

**Status:** OPEN

**Constitution:**
Constitutional tests are the proof that the platform keeps its promises. A test that cannot run is a promise that cannot be verified.

**Implementation:**
The test in `tests/constitutional/confidence-explainability.test.ts` calls `service.explain('subject-123')`.
The `MeaningService` exposes `generateExplanation()`.

Two options — choose the one that serves stewards better:

**Option A (recommended):** Add an `explain(id: string)` method to `MeaningService` that fetches the entry from Prisma and calls `generateExplanation()`. This becomes the public interface for the explainability contract.

**Option B:** Rename `generateExplanation()` to `explain()` and update all callers.

Whichever option is chosen, the test must call a method that:
1. Accepts a journal entry ID
2. Returns `{ narrative, confidenceScore, evidenceChain }`
3. Guarantees `evidenceChain.length > 0` when `confidenceScore > 0`

**Files:**
- `src/lib/services/MeaningService.ts` — add or rename the `explain()` method
- `tests/constitutional/confidence-explainability.test.ts` — update mock if needed; test logic is correct

**Verification:**
- ✓ `confidence-explainability.test.ts` passes without modification to the test assertions
- ✓ `MeaningService.explain()` exists and is callable

---

**Evidence Record** (Complete when MA-003 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `MeaningService.explain(id: string)` method exists (either new or renamed)
  - ☐ `tests/constitutional/confidence-explainability.test.ts` passes without modification
  - ☐ `explain()` returns `ExplanationResponse` with `narrative`, `confidenceScore`, `evidenceChain`
  - ☐ Guarantee enforced: `evidenceChain.length > 0` when `confidenceScore > 0`
  - ☐ Test assertion for empty chain when score is 0 passes

---

## Phase C — Complete Preservation

*One exporter. One importer. One archive format. No competing paths.*

```
Truth Engine → ImpandeExporter → .impande archive → ImpandeImporter → Truth Engine
```

---

### ☐ MA-005
**Retire the legacy flat-JSON export route**

**Status:** OPEN

**Constitution:**
Preservation must be independent of platform. Two archives representing the same family must have the same structure. If two export routes exist, the standard is undefined — and continuity is weakened.

**Implementation:**
The route at `src/app/api/export/[spaceId]/route.ts` produces a flat JSON file and bypasses `ImpandeExporter`. It must be replaced:

1. Update `src/app/api/export/[spaceId]/route.ts` to call `ImpandeExporter.exportSpace()` and return a ZIP response (identical behaviour to `/api/preservation/export`)
2. Or remove the route and redirect callers to `/api/preservation/export?spaceId=...`
3. Confirm no UI component calls the legacy route directly

There must be exactly one code path that produces a `.impande` archive.

**Files:**
- `src/app/api/export/[spaceId]/route.ts` — replace inline Prisma logic with `ImpandeExporter` call or remove
- Any UI component calling the legacy export endpoint

**Verification:**
- ✓ Only one route in the codebase produces a `.impande` file
- ✓ Both routes (if kept as aliases) call `ImpandeExporter.exportSpace()` with no duplication of Prisma logic
- ✓ A downloaded archive from either route has identical structure

---

**Evidence Record** (Complete when MA-005 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `/api/export/[spaceId]/route.ts` removed or refactored to call `ImpandeExporter.exportSpace()`
  - ☐ No competing flat-JSON export path remains
  - ☐ Grep confirms no other routes produce `.impande` or JSON archives
  - ☐ UI components updated if they referenced legacy export endpoint
  - ☐ Manual verification: both export paths (if aliased) produce identical checksums

---

### ☐ MA-006
**Add the import API route**

**Status:** OPEN

**Constitution:**
Preservation independence means a family's archive belongs to them — not to any server. An archive that can be exported but not restored is a one-way door. Continuity requires a complete cycle.

**Implementation:**
Add `src/app/api/preservation/import/route.ts`:

```
POST /api/preservation/import
Content-Type: multipart/form-data
Body: { file: <.impande archive>, targetSpaceName?: string }
```

The route must:
1. Accept a `.impande` ZIP upload
2. Pass it to `ImpandeImporter`
3. Call `importer.verifyIntegrity()` — reject with `422` if checksums fail
4. Call `importer.importToDatabase({ targetSpaceName })`
5. Return the new space ID in the v1 response envelope

The integrity check is non-negotiable. An archive that fails SHA-256 verification must never be imported.

**Files:**
- `src/app/api/preservation/import/route.ts` (new)
- `src/lib/preservation/importer.ts` — `importToDatabase()` is partially implemented; complete entity/claim re-creation logic

**Verification:**
- ✓ A round-trip (export space → import to new space) produces an identical `checksums.json`
- ✓ A corrupted archive is rejected with a clear error
- ✓ `test-exporter.ts` manual script is converted to or supplemented by an automated Vitest test

---

**Evidence Record** (Complete when MA-006 is resolved)

- **Completed On:**
- **Commit Hash:**
- **Evidence:**
  - ☐ `src/app/api/preservation/import/route.ts` created with POST handler
  - ☐ Route accepts multipart/form-data with `.impande` file and optional `targetSpaceName`
  - ☐ Calls `ImpandeImporter.verifyIntegrity()` and rejects with 422 if checksums fail
  - ☐ Calls `ImpandeImporter.importToDatabase()` on successful verification
  - ☐ Returns v1 response envelope with new space ID
  - ☐ Round-trip test (export → import → verify) passes in Vitest
  - ☐ Manual test: corrupted archive rejected with clear error message

## Phase D — Complete the API

*The API is the last membrane between the Constitution and the Steward Experience. It must be thin, faithful, and complete.*

*(All Phase D items are captured within MA-008 above. No additional misalignments.)*

---

## Completion Tracker

| ID | Phase | Description | Status |
|---|---|---|---|
| MA-007 | A | Add constitutional guard methods to `JournalService` | ☐ OPEN |
| MA-004 | A | Wire ceremony `onComplete` to `ReviewService` | ☐ OPEN |
| MA-008 | A | Add missing Truth Engine API routes | ☐ OPEN |
| MA-001 | B | Connect `MeaningService` to `ConfidenceCalculator` | ☐ OPEN |
| MA-002 | B | Connect `ThemeAnalyzer` to Prisma | ☐ OPEN |
| MA-003 | B | Align explainability test with implementation | ☐ OPEN |
| MA-005 | C | Retire legacy flat-JSON export route | ☐ OPEN |
| MA-006 | C | Add import API route | ☐ OPEN |

---

*When every row reads ✓ RESOLVED, update this table, close the Misalignment Register in `docs/CODEX_ALIGNMENT.md`, and record the alignment date.*

*That will be the moment the Codex and the Constitution are aligned.*

---

## Integration with the Calibration Engine

The Calibration Engine (`scripts/calibrate.ts`) can eventually read this roadmap and report alignment status to every steward before they begin work.

### Future Enhancement: Alignment Report

When calibration runs, it could parse this file and produce output like:

```
🧭 Implementation Alignment Report
   Generated: 2026-07-06T14:23:00Z

Phase A — Complete the Living Truth Loop
  ✓ MA-007: Constitutional guard methods
  ✓ MA-004: Ceremony to ReviewService flow
  ⚠ MA-008: API routes (3 of 6 complete)

Phase B — Connect the Meaning Engine
  ○ MA-001: Confidence integration
  ○ MA-002: Live database derivation
  ⚠ MA-003: Test alignment (in progress)

Phase C — Complete Preservation
  ○ MA-005: Retire legacy export
  ○ MA-006: Add import route

Phase D — Complete the API
  🔒 Locked until Phase A is complete

Blockage: Phase B is waiting on Phase A completion
Next: Complete MA-008 to unlock Phase B

Constitution Alignment: 37.5% (3 of 8 items)
```

### Implementation Notes

The calibration element would:

1. Read `docs/IMPLEMENTATION_ALIGNMENT_ROADMAP.md`
2. Parse completion status from each "Evidence Record" section
3. Count completed vs. open items per phase
4. Check for phase dependencies (Phase B blocked until Phase A = 100%)
5. Render a visual alignment report before startup proceeds
6. Optionally fail startup if critical items are incomplete (configurable)

This transforms the roadmap from a static document into a **living gauge of platform integrity**.

---

## Recording a Resolution

When you complete an item, update its Evidence Record section like this:

```markdown
**Evidence Record** (Complete when MA-007 is resolved)

- **Completed On:** 2026-07-06
- **Commit Hash:** a1b2c3d
- **Evidence:**
  - ✓ `JournalService.updateRevision()` exists and throws constitutional violation
  - ✓ `JournalService.deleteEntry()` exists and throws constitutional violation
  - ✓ `tests/constitutional/append-only.test.ts` passes without modification
  - ✓ `npm run water` calibration reports Truth Engine layer healthy
  - ✓ No `UPDATE` or `DELETE` in any Prisma query on `JournalEntryRevision`
```

Then update the Completion Tracker above:

```markdown
| MA-007 | A | Add constitutional guard methods to `JournalService` | ✓ RESOLVED |
```

Finally, update the Misalignment Register in `docs/CODEX_ALIGNMENT.md` and remove the MA-ID.

That way, every checkpoint leaves an audit trail for future stewards to understand not only *what* was done, but *when*, *how it was verified*, and *by whom* (via git commit log).

---

## Feature Lifecycle & User Experience

See `docs/FEATURE_LIFECYCLE.md` for the constitutional principle:

> **"Nothing that belongs to the future should appear broken in the present."**

As each misalignment is resolved, the corresponding feature transitions through lifecycle states, ensuring stewards never see errors — only honest, graceful acknowledgment of where the platform stands.

### Example: Phase A Completion Sequence

```
Day 1 — MA-007 resolved
  └─ Ceremony Engine transitions PRESERVED → IMPLEMENTING
     (User sees: "Currently refactoring for consistency, brief updates expected")

Day 3 — MA-004 resolved
  └─ Ceremony Engine transitions IMPLEMENTING → UNDER_REVIEW
     (User sees: "Testing ceremony-to-Truth flow, steward feedback invited")

Day 5 — MA-008 resolved
  └─ Ceremony Engine transitions UNDER_REVIEW → READY
     └─ Journal Entry API routes transition PLANNED → READY
     └─ Submission API routes transition PLANNED → READY
     (User sees: All features fully operational; changelog updated)
```

This approach ensures:
- **No broken experiences** — every intermediate state has a graceful UI
- **Transparency** — stewards understand the platform's progress
- **Trust** — the platform admits what is and isn't ready
- **Alignment** — implementation progress directly reflects in the user experience
