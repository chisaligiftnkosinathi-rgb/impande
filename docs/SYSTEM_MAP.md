# System Map: The Constitutional Platform Architecture

**Version**: 1.0 (Phase 2 Threshold Document)  
**Date**: 2026-07-06  
**Purpose**: Living dependency map for Impande's integrated systems

---

## The Founding Rule: Phase 2

> **No new major subsystem until the constitutional spine is connected.**

Not because new ideas aren't valuable, but because the existing ones now deserve to become fully alive.

**What this means:**
- Every new subsystem must attach to the existing map
- If it cannot attach, it probably isn't ready yet
- Connection comes before expansion

---

## The System Map

```
                    Constitution
                          │
                    (Living Guide)
                          │
          ┌───────────────┼───────────────┐
          │               │               │
      Truth          Living Pages    Calibration
      Engine          Framework      Engine
          │               │               │
          │  Truth Flow   │               │
          │    ↓          │               │
          └──────┬────────┘               │
                 │                        │
             Meaning                      │
             Engine                       │
                 │                        │
                 │  Continuity ←──────────┤
                 │  Metrics              │
                 │                        │
                 └──────────────┬─────────┘
                                │
                           Preservation
                             System
                                │
                            .impande
                           Archive Format
```

---

## Component Meanings

### Constitution
**The source of truth about what Impande is.**
- Living guide (not static policy)
- Answers: Why does this exist?
- Inspected by: Stewards, developers, auditors

### Truth Engine
**Append-only journal of recorded reality.**
- Source: Ceremonies collect facts
- Storage: Immutable JournalEntryRevision model
- Access: ReviewService → Truth API
- Never deletes, never assumes

### Living Pages Framework
**Interface for any system state.**
- 7 lifecycle states (DISCOVERED → ARCHIVED)
- Honors unfinished work with purpose + participation
- Answers: What is this place? Why? Now? How to participate?
- Components: LivingPage.tsx + 4 sub-components
- Registry: Single source of truth for feature state

### Calibration Engine
**Platform observing itself.**
- Pre-startup integrity verification (SHA-256 fingerprints)
- Continuity metrics (feature state counts)
- Constitutional compliance checks
- Reports platform health to deployment gate
- Invoked: `npm run water`

### Meaning Engine
**Analysis that emerges from evidence.**
- Input: Truth Engine (immutable facts)
- Process: ConfidenceCalculator → ThemeAnalyzer → Explainability
- Rule: Meaning never assumes, only interprets preserved evidence
- Output: Confidence levels, themes, interpretations
- Reading: JSON-based or database-backed (decision pending)

### Preservation System
**Export → Archive → Restore continuity.**
- Export: ImpandeExporter creates layered .impande ZIP
- Archive: Portable, verifiable, future-readable format
- Import: Restore truth to new instance
- Closes: The continuity loop

---

## The Four Priority Flows

### Priority 1: Truth Flow
**Get ceremony data into the Truth Engine**

```
Ceremony Form
     ↓
Collect formData
     ↓
ReviewService.submitEntry()
     ↓
JournalService.recordEntry()
     ↓
Truth Engine (Immutable)
     ↓
API /v1/journal-entries
     ↓
Living Page displays it
```

**Implementation Files:**
- `src/ceremonies/definitions/*.tsx` (onComplete callback)
- `src/app/service/ReviewService.ts` (orchestrate)
- `src/app/service/JournalService.ts` (guard + record)
- `src/app/api/v1/journal-entries.ts` (expose)
- `src/components/living-page/` (display)

**Complete When:**
- Ceremony submission reaches Truth Engine
- JournalService guards prevent updates/deletes
- API exposes all 6 routes (GET entries, GET entry, GET history, POST submit, POST accept, POST reject)
- Living page shows entry with confidence + themes

**Misalignments Closed:** MA-007, MA-004, MA-008

---

### Priority 2: Meaning Flow
**Extract meaning from Truth without assumptions**

```
Truth Engine
     ↓
ConfidenceCalculator
     ↓
ThemeAnalyzer
     ↓
Meaning Engine
     ↓
Explainability Reports
     ↓
Living Page displays it
```

**Implementation Files:**
- `src/app/service/ConfidenceCalculator.ts` (algorithm ready)
- `scripts/engine/analyzer.ts` (theme extraction)
- `src/app/service/MeaningService.ts` (orchestrate)
- `src/components/meaning/` (display themes + confidence)

**Complete When:**
- Confidence always calculated from data, never hardcoded
- Themes extracted only from existing entries
- No "guesses" appear in UI
- Explainability shows which facts led to conclusion

**Misalignments Closed:** MA-001, MA-002, MA-003

---

### Priority 3: Preservation Flow
**Close the loop: Truth → Portable Archive → Restored Truth**

```
Truth Engine
     ↓
ImpandeExporter
     ↓
.impande (ZIP with layers)
     ↓
ImpandeImporter
     ↓
Truth restored to new instance
```

**Implementation Files:**
- `src/app/service/ExportService.ts` (orchestrate)
- `scripts/exporter.ts` (create archive)
- `scripts/importer.ts` (restore instance)

**Complete When:**
- Export produces verifiable .impande file
- Archive contains all layers (raw, processed, metadata, manifest)
- Import successfully restores complete truth to new instance
- Verification confirms identity and integrity

**Misalignments Closed:** MA-005, MA-006

---

### Priority 4: Steward Flow
**Every steward experiences the same constitutional journey**

```
Calibration
     ↓
(Platform health known)
     ↓
Living Page
     ↓
(Understands where they are)
     ↓
Ceremony
     ↓
(Participates in truth-gathering)
     ↓
Truth Engine
     ↓
(Records what matters)
     ↓
Meaning Engine
     ↓
(Interprets what it means)
     ↓
Preservation
     ↓
(Ensures continuity)
```

**Implementation Files:**
- `src/components/living-page/` (consistent interface)
- `src/lib/lifecycle/FeatureRegistry.ts` (single source of truth)
- `scripts/calibrate.ts` (health checks)
- All ceremony definitions

**Complete When:**
- Every feature uses Living Page framework
- Navigation shows actual system state (from registry)
- Middleware prevents dead ends (shows graceful pages)
- Calibration runs before deployment
- Stewards understand platform journey, not just individual features

---

## How to Propose New Subsystems

When a new idea emerges, ask:

1. **Where does it attach to the map?**
   - Does it connect to Constitution, Truth, Living Pages, Calibration, Meaning, or Preservation?
   - If yes → Proceed to step 2
   - If no → The idea may be premature

2. **What flow does it complete?**
   - Does it close a misalignment in Truth/Meaning/Preservation/Steward flows?
   - Is there clear test for "complete"?

3. **Who does it serve?**
   - Steward (interface) — How does the steward experience it?
   - Developer (code) — What changes in the codebase?
   - Historian (documentation) — What provenance is created?

4. **What three things must be aligned?**
   - Philosophy (Constitution principle)
   - Implementation (code change)
   - Experience (interface change)

**If all four questions have clear answers, the subsystem is ready for Phase 2.**

---

## The Three-Audience Principle

The strongest pattern is that every important decision serves three different audiences:

### The Steward
Understands through the interface:
- Living Page answers: What? Why? Now? Participate?
- Navigation shows actual system state
- Ceremonies guide participation
- Results appear in meaningful context

### The Developer
Understands through the code:
- Constitution → Type system (interfaces enforce principles)
- Truth Engine → Append-only database model
- Living Pages → Component hierarchy + registry pattern
- API routes → Version envelopes, consistent errors
- Calibration → Testable assertions about system health

### The Future Historian
Understands through documentation and provenance:
- CODEX_ALIGNMENT shows which principles are implemented
- IMPLEMENTATION_ROADMAP tracks which misalignments are closed
- FEATURE_LIFECYCLE explains why features have lifecycle states
- SYSTEM_MAP shows how parts connect
- Git history + commit messages provide provenance
- .impande archives preserve evidence for future audit

**Design principle:** A decision that only optimizes for one audience is incomplete.

---

## Phase 2 Metrics

### Alignment Metrics
- CODEX_ALIGNMENT: How many principles are ✅/⚠️/⏳?
- Target: All 10 principles at ✅ by end of Phase 2

### Implementation Metrics
- IMPLEMENTATION_ROADMAP: How many misalignments (MA-001 through MA-008) are closed?
- Target: 8/8 misalignments closed (phases A→B→C→D complete)

### Continuity Metrics
- Feature states: How many features in each state?
- Target: No features in DISCOVERED without PLANNED milestone
- Target: All public features answer 4 questions
- Target: Calibration engine passes all health checks

### Connection Metrics
- Integration waves: Which waves are complete?
- Target by end of Phase 2: All 5 waves integrated
- Navigation reads from registry, pages use LivingPage, middleware shows graceful pages, calibration reports, deployment enforces

---

## What "Connected" Means

The constitutional spine is connected when:

✅ **Truth Flow** — Ceremony → ReviewService → Truth Engine → API → Living Page works end-to-end  
✅ **Meaning Flow** — Truth → Confidence → Themes → Explainability all use fact-based reasoning  
✅ **Preservation Flow** — Export → Archive → Import → Verified restores complete truth  
✅ **Steward Flow** — Every steward sees same interface, understands same journey  

✅ **Alignment** — Constitution and code reinforce the same values  
✅ **Integration** — All 5 waves complete, registry drives all decisions  
✅ **Continuity** — Platform reports its own health accurately  

---

## The Real Measure

Not "Is the code correct?"

**"Does the system speak with one voice?"**

- Constitution says one thing
- Code implements that thing  
- UI displays that thing
- Steward experiences that thing
- Historian documents that thing

When all five sources tell the same story, the spine is truly alive. 🌱

---

## Phase 2 Roadmap

### Wave 1: Establish (Now through month end)
- Priority 1 (Truth Flow) implementation
- Priority 2 (Meaning Flow) wiring
- Priority 3 (Preservation Flow) testing
- Priority 4 (Steward Flow) integration

### Wave 2: Validate (Month 2)
- All 4 flows working end-to-end
- All 8 misalignments closed
- Calibration engine green
- Living pages deployed

### Wave 3: Extend (Month 3+)
- Registry pattern deployed to Collections, Ceremonies, Calibration
- Custom analysis engines attach to Meaning Flow
- Export/import tested with real steward data
- Platform demonstrates durability

**The horizon:** A platform that stewards trust because it provably keeps its promises.

🌱
