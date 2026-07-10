# Impande: A Constitutional Spine

> "From Constitution to Steward, one voice."

---

## The Four Architectural Documents

As Impande moves into the refinement phase, four documents work together to ensure the platform keeps its constitutional promises:

### 1. **CODEX_ALIGNMENT.md** — The Audit
*What is aligned? What is not?*

Maps every constitutional principle to code evidence and test evidence. Shows which principles are ✅ Implemented, ⚠️ Partial, or ⏳ Planned.

**Main question:** "Does the code faithfully express the Constitution?"

**Example:**
```
Living Pages ✅ Framework Complete
Truth Engine Guards ⚠️ Partial (methods exist but not tested)
Append-only History ✅ Implemented
```

---

### 2. **IMPLEMENTATION_ALIGNMENT_ROADMAP.md** — The Action Plan
*How do we close each misalignment? In what order?*

Details 8 specific misalignments (MA-001 through MA-008) organized into 4 phases.
Each item includes: constitutional principle, implementation path, files affected, verification steps, evidence record with completion checklist.

**Main question:** "What specific work closes each gap?"

**Structure:**
- Phase A (Truth Flow): MA-007, MA-004, MA-008
- Phase B (Meaning): MA-001, MA-002, MA-003
- Phase C (Preservation): MA-005, MA-006
- Phase D (API Exposure): Captured in Phase A

**Progress tracking:** Evidence Records are updated as each misalignment resolves.

---

### 3. **FEATURE_LIFECYCLE.md** — The User Experience Principle
*How do we honor unfinished work?*

Defines 7 lifecycle states (DISCOVERED, PLANNED, PRESERVED, IMPLEMENTING, UNDER_REVIEW, READY, ARCHIVED).

Establishes principle: **"No page is born empty-handed."**

Every unfinished feature answers four questions:
1. What is this place?
2. Why does it matter?
3. What is happening now?
4. How can I participate today?

Includes complete implementation of Living Pages framework:
- Type system (FeatureStates, FeatureLifecycle)
- Registry pattern (FeatureRegistry singleton)
- Component system (LivingPage + sub-components)
- CSS styling

**Main principle:** "Nothing that belongs to the future should appear broken in the present."

---

### 4. **INTEGRATION_ROADMAP.md** — The Wiring Plan
*How do we connect the constitutional spine across the entire platform?*

Five waves of integration:
1. **Navigation** — Uses FeatureRegistry instead of hardcoding
2. **Route Pages** — Every page wraps with LivingPage
3. **Middleware** — Non-READY routes show graceful pages
4. **Calibration Engine** — Reports constitutional maturity
5. **Deployment Gate** — Enforces constitutional compliance

**Main question:** "How does every part of the platform speak with one voice?"

**Bonus:** Extension patterns for Collection, Ceremony, and Calibration registries.

---

## How They Connect

```
Constitution (Charter)
    ↓
CODEX_ALIGNMENT (What's aligned?)
    ↓
    ├─ Found 8 misalignments (MA-001 to MA-008)
    │
    └─ IMPLEMENTATION_ROADMAP (How to close gaps?)
        ├─ Phase A, B, C, D
        └─ Each phase uses FEATURE_LIFECYCLE states
            ├─ PRESERVED while work is underway
            ├─ IMPLEMENTING during active development
            ├─ UNDER_REVIEW during testing
            └─ READY when complete
                ↓
        INTEGRATION_ROADMAP (Wire everything together)
            ├─ Navigation reads from FeatureRegistry
            ├─ Pages use LivingPage component
            ├─ Middleware prevents 404s
            ├─ Calibration measures continuity
            └─ Deployment enforces compliance
                ↓
Steward Experience (One voice)
```

---

## Workflow: How They Work Together

### Scenario 1: Implementing a New Feature

1. **CODEX_ALIGNMENT** → Identify which principle this feature implements
2. **IMPLEMENTATION_ROADMAP** → Find if it's already in a misalignment item
3. **FEATURE_LIFECYCLE** → Declare featureMetadata with state (usually PRESERVED initially)
4. **INTEGRATION_ROADMAP** → Wire into Navigation, Middleware, Calibration

Example: "We're building Journeys feature"
- Constitution says: Journeys preserve community movement
- CODEX_ALIGNMENT shows: This is part of MA-002 (live data for Meaning Engine)
- IMPLEMENTATION_ROADMAP says: Journeys feature is blocked, preserve until database ready
- FEATURE_LIFECYCLE says: Mark as PRESERVED, explain purpose and timeline
- INTEGRATION_ROADMAP says: Register it, show in navigation with 🌱 badge, calibrate reports it

### Scenario 2: Completing a Misalignment

1. **IMPLEMENTATION_ROADMAP** → Pick next MA-ID to close
2. **FEATURE_LIFECYCLE** → Feature transitions (PRESERVED → IMPLEMENTING → UNDER_REVIEW → READY)
3. **CODEX_ALIGNMENT** → Update Evidence Record with completion proof
4. **INTEGRATION_ROADMAP** → Calibration Engine auto-updates state count

Example: "We're completing MA-007 (guard methods)"
- Write JournalService.updateRevision() that throws
- Tests in append-only.test.ts pass
- Mark MA-007 Evidence Record complete with commit hash
- Feature transitions READY → checks pass ✅
- Calibration reports it (READY count increases)

### Scenario 3: Deployment

**INTEGRATION_ROADMAP Deployment Gate runs:**

```
✓ Check: Every feature has a title ← FEATURE_LIFECYCLE
✓ Check: Every feature has purpose ← FEATURE_LIFECYCLE
✓ Check: Every feature has participationOptions ← FEATURE_LIFECYCLE
✓ Check: Every feature has valid state ← FEATURE_LIFECYCLE
✓ Check: All state transitions are valid ← FeatureRegistry
✓ Check: No misalignments remain ← CODEX_ALIGNMENT
→ DEPLOY ✅
```

---

## Measuring Success: Three Levels

### Level 1: Alignment
**CODEX_ALIGNMENT Dashboard:**
```
Implemented .......... 6 principles
Partial .............. 3 principles
Planned .............. 1 principle
```

### Level 2: Implementation
**IMPLEMENTATION_ROADMAP Progress:**
```
Phase A .............. 3/3 complete ✅
Phase B .............. 1/3 complete ⏳
Phase C .............. 0/2 complete ⏳
Phase D .............. Captured in Phase A
```

### Level 3: Continuity
**CALIBRATION Engine Report:**
```
READY ................ 18
UNDER_REVIEW ........ 3
IMPLEMENTING ........ 5
PRESERVED ........... 12
...
This metric measures stewardship, not velocity.
```

---

## Documentation as Living System

These four documents are not static. They evolve together:

- **CODEX_ALIGNMENT** updates when a principle is newly implemented
- **IMPLEMENTATION_ROADMAP** updates when an MA-ID completes
- **FEATURE_LIFECYCLE** updates when new states or patterns emerge
- **INTEGRATION_ROADMAP** updates as more registries (Collection, Ceremony, Calibration) come online

Together they form a **constitutional spine** that keeps the platform honest, measurable, and faithful.

---

## Next Steps

### Immediate (This Cycle)
- ✅ Create four documents ← You are here
- 🔄 Begin Phase A misalignments (MA-007, MA-004, MA-008)
- 🔄 Begin Integration Wave 1 (Navigation)

### Soon
- Complete Phase A
- Complete Integration Waves 2–5
- Measure first continuity report

### Future
- Begin Phase B (Meaning Engine)
- Introduce Collection Registry
- Introduce Ceremony Registry
- Extend pattern to other domains

---

## The Vision: Continuity Operating System

When complete, Impande is not just a platform for preserving family memory.

It is an **operating system for continuity**—where:

- Constitution → Code → Interface all speak one language
- Unfinished work is preserved with dignity, not hidden
- Stewards know exactly where the platform stands
- Every feature participates in the constitutional framework
- Continuity is measurable, not just aspirational

From philosophy to pixels, one voice. 🌱
