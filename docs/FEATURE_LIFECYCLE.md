# Feature Lifecycle & Graceful Degradation

> **Constitutional Principle**: "Unfinished work is not a failure. It is work that has been preserved until its proper time."

> **Design Philosophy**: Preservation comes before revelation. A feature that is not yet ready is not an error — it is preserved work awaiting its season. Impande grows through discovery as much as planning. Some of the platform's most essential parts (Calibration Engine, Meaning Engine, Heritage Pilot) were never predicted — they emerged through the work itself. This deserves recognition.

---

## Lifecycle States

Every route, feature, and page in Impande has a lifecycle state. The platform respects this state in routing, navigation, and error handling. A state is not invisible — it is communicated with honesty and grace.

| State | Symbol | Meaning | User Sees | Navigation Shows |
|---|---|---|---|---|
| `DISCOVERED` | 🔦 | Emerged through the work; now recognized as a feature | Discovery notice | "Newly discovered" or featured |
| `PLANNED` | 🗺️ | Designed but not yet implemented | Blueprint page | Grayed out or not listed |
| `PRESERVED` | 🌱 | Work is underway with care | Growing page with eta | "In preparation" |
| `IMPLEMENTING` | 🧪 | Active development, subject to change | Development notice | "Coming soon" or hidden |
| `UNDER_REVIEW` | 🔍 | Awaiting steward verification | Review notice + feedback form | "Being verified" |
| `READY` | ✅ | Available to all stewards | Full feature | Normal navigation |
| `ARCHIVED` | 📚 | Historical, preserved for reference | Read-only view | Archive section only |

---

## Core Principle: No Page Is Born Empty-Handed

> **"A feature may be incomplete, but it must never be empty."**

Just as a newborn arrives with dignity, value, and a place in the family before accomplishing anything, every page in Impande should arrive with purpose before all of its functionality is complete.

No page shows a 404. No page shows "Coming Soon." Every page teaches something of value, even while unfinished.

### What Each Lifecycle State Offers to the Steward

| State | What the Steward Experiences | Value Even When Incomplete |
|---|---|---|
| `DISCOVERED` | Why this space exists and the vision behind it | Learn how a feature emerged from real need |
| `PLANNED` | What is being designed and the constitutional principles guiding it | Understand the vision and philosophy |
| `PRESERVED` | The work is safely preserved for its proper time, with no error pages | Confidence that this space is being tended |
| `IMPLEMENTING` | Honest progress and what is currently being built | See the platform grow transparently |
| `UNDER_REVIEW` | Invitation to help test or contribute evidence | Become part of verification |
| `READY` | Full functionality | Use the feature as intended |
| `ARCHIVED` | Historical record and provenance | Learn from what came before |

### Every Unfinished Page Answers Four Questions

When a steward reaches a page that is not yet `READY`, it should answer:

**1. What is this place?**
> *"This space will preserve community journeys."*

**2. Why does it matter?**
> *"Journeys help future generations understand not only where we lived, but how we travelled together."*

**3. What is happening now?**
> *"This feature is being carefully tended and preserved until it is ready."*

**4. How can I participate today?**
> - Read related stories
> - Record a journal entry
> - Explore connected memories
> - Return later when ready

Every unfinished page becomes a **teacher before it becomes a tool**.

### Examples: Teaching Before Functioning

- **Discovery** can already teach people how discoveries become evidence
- **Africa** can already tell the story of why places matter before maps are complete
- **Service** can already explain the philosophy of remembering acts of kindness
- **Journeys** can already introduce migration, pilgrimage, work, and homecoming even before timelines are finished
- **Roots** can already explain lineage and continuity
- **Truth** can already explain provenance and evidence
- **Spaces** can already describe stewardship

None of these pages are blank. None of them are dead ends. All of them participate in continuity.

---

## Understanding DISCOVERED

Not all features are designed in advance. Impande has repeatedly grown through discovery:

- **Calibration Engine** was discovered while researching integrity verification
- **Meaning Engine** emerged from the limitations of the Truth Engine alone
- **Heritage Pilot** was discovered through real work with family members
- **Confidence Calculator** emerged as a needed answer to the question: "How do we measure trustworthiness?"

When a feature is discovered, it moves from invisible (not yet recognized as part of the system) to visible (acknowledged as part of Impande's character). This is distinct from `PLANNED` (which was designed beforehand) because it represents the platform's organic growth.

A `DISCOVERED` feature immediately receives a lifecycle state (usually `PRESERVED` or `IMPLEMENTING`) so stewards understand what has emerged and where it fits.

---

## User Experience Pattern

When a steward reaches a feature that is not `READY`, they encounter a graceful acknowledgment, not an error:

```
🌱 Heritage Maps

Status: Preserved for a future release

This work has already been given a place within Impande.
It is being completed carefully so that when it opens,
it reflects the Constitution faithfully.

Why this matters:
Heritage Maps will help families visualize the geographical
movement and settlement patterns across generations.
It requires careful work with place names and migration records.

Current focus:
Building the database layer to store place relationships
and their historical context.

Return to Continuity Spaces →
```

### Key Elements of Every Unfinished Page

Every page, regardless of lifecycle state, must answer the four questions and include:

1. **What is this place?** — Help the steward understand the space's purpose
2. **Why does it matter?** — Connect to constitutional values and family needs
3. **What is happening now?** — Be honest about the current state
4. **How can I participate today?** — Offer a meaningful next step

Additionally:

5. **Status badge** — Clear lifecycle state symbol
6. **Graceful exit** — Navigation to related spaces or home

### For `UNDER_REVIEW` Pages

```
🔍 Ceremony Engine: Oral History Recording

Status: Awaiting Steward Review

--- What is this place? ---
This is where stewards record and preserve oral histories —
the spoken word, the voice, the presence of lived experience.

--- Why does it matter? ---
Oral histories capture what written records cannot:
intonation, emotion, context, the feeling of a moment.
They help future generations hear their ancestors, not just read about them.

--- What is happening now? ---
This feature has been built and is being verified by trusted stewards
to ensure it honors the Constitution. We are testing:
✓ That every recorded story flows to the Truth Engine
✓ That CONFIRMATION step displays what was submitted
✓ That the archive maintains integrity

--- How can I participate today? ---
If you are a steward, we invite you to test this flow and share
your experience. [Provide Feedback]

Expected availability: July 20, 2026
```

### For `IMPLEMENTING` Pages

```
🧪 Meaning Engine Dashboard

Status: Under Active Development

--- What is this place? ---
This dashboard will help you see how Impande understands the meaning
behind your family's stories — not just what was said, but why it matters.

--- Why does it matter? ---
The Truth Engine preserves every story faithfully. The Meaning Engine
shows connections, patterns, and the deeper significance that emerges
when stories are understood together.

--- What is happening now? ---
This feature is being built and refined. The interface, data, and outputs
are subject to change as we learn what truly helps stewards understand
their family's meaning.

--- How can I participate today? ---
Read about how meaning is calculated in the Constitution.
Explore completed journal entries to understand evidence.
Return when the dashboard is ready for full use.

If you would like to observe the development process or provide
early feedback, please reach out to the core team.

Return to Continuity Spaces →
```

---

## Single Source of Truth

Eventually, all lifecycle state should come from one place:

```
src/lib/lifecycle/
    FeatureLifecycle.ts
```

This single source will be consulted by:
- Navigation components
- API routers
- Page implementations
- Middleware
- The Calibration Engine
- Deployment scripts
- Documentation

This prevents one part of the system saying a feature is `READY` while another says `IMPLEMENTING`. There is one truth. Everyone reads it.

---

## Implementation: Route Lifecycle Decorator

Every API route and page should declare its lifecycle state:

```typescript
// src/app/api/v1/heritage-maps/route.ts

import { RouteLifecycle } from '@/lib/routing/lifecycle';

export const lifecycle: RouteLifecycle = {
  state: 'PRESERVED',
  feature: 'Heritage Maps',
  description: 'Visualize geographical movement and settlement patterns',
  estimatedReadyDate: '2026-08-15',
  reason: 'Database schema for place relationships is under construction',
  links: {
    issue: 'https://github.com/impande/impande/issues/142',
    discussion: 'https://github.com/impande/impande/discussions/88'
  }
};

export async function GET(request: Request) {
  return new RouteLifecycleResponse(lifecycle, 'Heritage Maps');
}
```

```typescript
// src/app/heritage-maps/page.tsx

import { FeatureLifecycle } from '@/components/FeatureLifecycle';
import { pageLifecycle } from '@/lib/routing/lifecycle';

export default function HeritageMapsPage() {
  return (
    <FeatureLifecycle
      state="PRESERVED"
      feature="Heritage Maps"
      description="Visualize family migrations and settlement patterns"
      whyItMatters="..."
      currentFocus="Building database schema for places and movements"
      estimatedReadyDate="2026-08-15"
    />
  );
}
```

---

## Navigation Respects Lifecycle

The main navigation component filters what to show based on lifecycle state:

```typescript
// src/components/MainNav.tsx

const navigationItems = [
  { path: '/continuity-spaces', label: 'Continuity Spaces', lifecycle: 'READY' },
  { path: '/search', label: 'Search Archive', lifecycle: 'READY' },
  { path: '/ceremonies', label: 'Ceremonies', lifecycle: 'READY' },
  { path: '/heritage-maps', label: 'Heritage Maps', lifecycle: 'PRESERVED' },
  { path: '/meaning-engine', label: 'Meaning Engine', lifecycle: 'UNDER_REVIEW' },
  { path: '/admin', label: 'Admin', lifecycle: 'PLANNED' }
];

export function MainNav() {
  const items = navigationItems.filter(item => {
    // Show all READY items
    if (item.lifecycle === 'READY') return true;
    // Show PRESERVED/UNDER_REVIEW if user is authenticated (optional)
    if (item.lifecycle === 'PRESERVED') return true;
    // Hide PLANNED/IMPLEMENTING by default
    return false;
  });

  return (
    <nav>
      {items.map(item => (
        <NavItem
          key={item.path}
          href={item.path}
          label={item.label}
          lifecycle={item.lifecycle}
        />
      ))}
    </nav>
  );
}
```

---

## Middleware: Graceful Lifecycle Handling

A middleware layer intercepts requests to features that are not `READY`:

```typescript
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRouteLifecycle } from '@/lib/routing/lifecycle';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if this route has a lifecycle state
  const lifecycle = await getRouteLifecycle(path);

  if (lifecycle && lifecycle.state !== 'READY' && lifecycle.state !== 'ARCHIVED') {
    // Redirect to a graceful "not yet ready" page instead of 404
    request.nextUrl.pathname = `/feature-status/${lifecycle.feature}`;
    request.nextUrl.searchParams.set('state', lifecycle.state);
    request.nextUrl.searchParams.set('reason', lifecycle.reason);

    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/:path*']
};
```

---

## Integration with the Calibration Engine

The Calibration Engine can check feature readiness on startup:

```typescript
// scripts/calibrate.ts

interface FeatureHealthReport {
  feature: string;
  lifecycle: RouteLifecycle;
  status: 'ON_TRACK' | 'DELAYED' | 'BLOCKED' | 'COMPLETED';
  blockage?: string;
}

// During calibration, scan all features and their lifecycle states
const features: FeatureHealthReport[] = await scanFeatures();

// Report in calibration output
features.forEach(feature => {
  if (feature.status === 'BLOCKED') {
    console.warn(`⚠️  ${feature.feature} blocked: ${feature.blockage}`);
  } else if (feature.lifecycle.state === 'READY') {
    console.log(`✓ ${feature.feature} ready`);
  }
});
```

The calibration report could show:

```
🌱 Feature Readiness

Ceremonies
  ✓ Recording Ceremony — READY
  🧪 Reflection Ceremony — UNDER_REVIEW
  🌱 Naming Ceremony — IMPLEMENTING
  🗺️ Family Council Ceremony — PLANNED

Meaning Engine
  🧪 Confidence Calculator — UNDER_REVIEW
  🌱 Theme Analysis — IMPLEMENTING
  🗺️ Heritage Timeline — PLANNED

Preservation
  ✓ Export (ZIP) — READY
  ⏳ Import — PRESERVED (blocked by MA-006)
  🗺️ Archival Catalog — PLANNED
```

### Measuring Continuity, Not Coverage

The Calibration Engine can report platform maturity as a lifecycle summary:

```
🧭 Platform Continuity Report — 2026-07-06

READY ................ 18 features
UNDER_REVIEW ........ 3 features
IMPLEMENTING ........ 5 features
PRESERVED ........... 12 features
PLANNED ............. 7 features
DISCOVERED .......... 2 features
ARCHIVED ............ 1 feature

This metric measures continuity over time.
Not code coverage. Not lines of code.
But how many features are being faithfully stearded.
```

This shows the platform's health not as "what percentage works?" but as "how is Impande continuing to grow and mature?"

---

## Constitutional Alignment

This principle reinforces core Impande philosophy:

| Principle | How Lifecycle Honors It |
|---|---|
| **Stewardship before ownership** | Work is openly preserved, not hidden. Stewards can see what is being tended. |
| **Transparency at all levels** | The platform admits what is and isn't ready, building trust. |
| **Append-only preservation** | Features are added to the platform via lifecycle, never vanish or break. |
| **Continuity across time** | Work can be preserved for months or years and still be honored when revealed. |
| **No destructive deletion** | Features move through states, they are never truly gone (see `ARCHIVED`). |

---

## Example: Wiring Ceremony onComplete to the Truth Engine

During Phase A work (MA-004), the Ceremony Engine will transition from `IMPLEMENTING` to `UNDER_REVIEW`:

1. **Current state (IMPLEMENTING):** If someone reaches the ceremony page directly, they see the graceful message with progress
2. **Testing begins (UNDER_REVIEW):** Stewards are invited to test; the page shows a feedback form
3. **Ready for all (READY):** The feature becomes a full part of the platform

No 404. No broken experience. Just honest progression.

---

## Graceful Error Fallback

If a route's lifecycle is not found or invalid, fallback to a safe message:

```typescript
// Generic graceful degradation for unknown features

export function DefaultFeatureStatusPage() {
  return (
    <div className="preserved-feature">
      <h1>🌱 Work in Progress</h1>
      <p>
        This feature is being prepared with care.
        The archive is whole, and this space is protected.
      </p>
      <a href="/continuity-spaces">Return to your spaces →</a>
    </div>
  );
}
```

---

## Navigation Philosophy: Never Abandon a Steward

Navigation should follow a simple, unwavering rule:

**✓ Always show a preserved space with purpose, context, and hope**

❌ Never show a 404 for an intentional feature
❌ Never show "Coming Soon" without context
❌ Never show an empty page

Every link leads somewhere meaningful, even if that somewhere is a page explaining that this feature is being tended and offering ways to engage today.

---
## Living Pages Framework

Rather than a convention, Living Pages is now a **framework**. Every feature declares its state once, and the entire system reads from that one source.

### Architecture

```
src/lib/lifecycle/
  ├── FeatureStates.ts        (State constants & metadata)
  ├── FeatureLifecycle.ts     (Type definitions & responses)
  ├── FeatureRegistry.ts      (Central registry)
  └── index.ts                (Exports)

src/components/living-page/
  ├── LivingPage.tsx          (Main component)
  ├── PagePurpose.tsx         (Renders Q1)
  ├── PageStatus.tsx          (Renders Q3)
  ├── PageTimeline.tsx        (Renders timeline)
  ├── PageParticipation.tsx   (Renders Q4)
  ├── LivingPage.module.css   (Styling)
  └── index.ts                (Exports)
```

### How a Feature Declares Its State

Every route/page declares its feature metadata once:

```typescript
// src/app/journeys/page.tsx

import { FeatureMetadata } from '@/lib/lifecycle';
import { LivingPage } from '@/components/living-page';

export const featureMetadata: FeatureMetadata = {
  id: 'journeys',
  title: 'Journeys',
  state: 'PRESERVED',

  // The four questions
  purpose: 'This space will preserve community journeys — the paths taken, the reasons traveled, the arrival and homecoming.',
  whyMatters: 'Journeys help future generations understand not only where we lived, but how we travelled together. Migration, pilgrimage, work, and homecoming are the rivers of family history.',
  currentStatus: 'The database layer for tracking journey phases is under construction. We are designing how to capture the arc of a journey faithfully.',

  participationOptions: [
    {
      label: 'Read a family story about migration',
      href: '/stories/migration-example'
    },
    {
      label: 'Explore connected memories',
      href: '/archive/tag/journey'
    }
  ],

  timeline: {
    currentPhase: 'Database schema design',
    nextMilestone: 'UI prototype for journey mapping',
    estimatedReadyDate: '2026-09-01',
    blockages: [
      'Need historical place name verification system',
      'Timeline component design for migration arcs'
    ]
  }
};

export default function JourneysPage() {
  // If state is READY, render full feature with children
  // If state is not READY, render graceful Living Page
  return (
    <LivingPage feature={featureMetadata}>
      {/* Full feature content here */}
    </LivingPage>
  );
}
```

### The Registry: Single Source of Truth

All features register at startup:

```typescript
// src/lib/lifecycle/registry.ts (initialization)

import { FeatureRegistry } from '@/lib/lifecycle';
import { featureMetadata as journeys } from '@/app/journeys/page';
import { featureMetadata as ceremonies } from '@/app/ceremonies/page';
import { featureMetadata as meanings } from '@/app/meaning-engine/page';

// Register all features
export function initializeFeatureRegistry() {
  FeatureRegistry.register(journeys);
  FeatureRegistry.register(ceremonies);
  FeatureRegistry.register(meanings);
  // ... all features
}
```

Now the entire system reads from one place:

```typescript
// Navigation can filter by state
const visibleFeatures = FeatureRegistry.getPublic();

// Middleware can check state
const feature = FeatureRegistry.get('journeys');
if (feature.state !== 'READY') {
  return renderLivingPage(feature);
}

// Calibration engine can count states
const counts = FeatureRegistry.countByState();
// { READY: 18, IMPLEMENTING: 4, UNDER_REVIEW: 2, ... }

// Validation can ensure no feature is empty
const issues = FeatureRegistry.validateLivingPages();
```

### Benefits of the Framework

1. **No Blank Pages** — The framework enforces four questions
2. **Consistent UX** — Every state uses the same component
3. **Automatic Navigation Badges** — Navigation shows state without hardcoding
4. **Auditable Progress** — Registry tracks all state transitions with commit hashes
5. **Deployment Safety** — Can verify no intentional page is accidentally empty
6. **Calibration Integration** — Provides live feature health metrics

### Rendering Living Pages

The `LivingPage` component automatically handles all states:

```typescript
import { LivingPage } from '@/components/living-page';
import { featureMetadata } from './featureMetadata';

export default function ExamplePage() {
  return (
    <LivingPage feature={featureMetadata}>
      {/* Children only render if state === 'READY' */}
    </LivingPage>
  );
}
```

The component renders:
- State badge (with symbol)
- Title and description
- Q1: What is this place? (purpose)
- Q2: Why does it matter? (whyMatters)
- Q3: What is happening now? (currentStatus + blockages)
- Timeline (if applicable)
- Q4: How can I participate today? (participationOptions)
- Links and footer

---
## Constitutional Principle — Living Pages

> **"Every space within Impande must contribute something of value from the moment it is discovered. A feature may be incomplete, but it must never be empty. If functionality is still being tended, the page shall preserve its purpose, explain its future, and offer the steward a meaningful next step. In this way, no visitor reaches a dead end, and every page participates in continuity."**

This principle reflects Impande's core commitment to dignity and stewardship. Just as the platform itself never abandons incomplete work (it preserves it), the user experience should never abandon a steward who arrives at an unfinished feature.

Instead:
- The page welcomes them with purpose
- It explains why the work matters
- It offers a meaningful path forward
- It honors them as participants in the platform's continuing journey

---

## Recommended Implementation Order

1. Define lifecycle state type and constants ✅ (FeatureStates.ts)
2. Add lifecycle metadata to each route/page ✅ (FeatureLifecycle.ts)
3. Create `FeatureLifecycle` component for consistent UI ✅ (LivingPage.tsx)
4. Implement middleware for non-READY routes (next)
5. Update navigation to respect states (next)
6. Add lifecycle scanning to calibration engine (next)
7. Document lifecycle states in CODEX_ALIGNMENT.md (completed)
8. Add "Living Pages" principle to Constitution (completed)

This ensures that as Phase A, B, C, D work progresses, the user experience never feels broken — only *preserved*. Every page is a teacher. Every steward finds welcome and purpose.

---

## Principle: Every Page Should Teach Before It Asks

A natural principle emerges from Living Pages:

> **"Before a page asks someone to submit data, upload evidence, record a story, or begin a ceremony, it first teaches why that action matters."**

This principle makes the platform welcoming to first-time stewards and reinforces the Constitution through everyday use.

### What This Looks Like

| Page State | What Happens First | What Happens Next |
|---|---|---|
| **READY** | The page teaches the philosophy of this space | Then offers the action (submit, record, etc.) |
| **PRESERVED** | The page teaches why this space will matter | Then shows the work in progress |
| **IMPLEMENTING** | The page teaches the constitutional principle | Then shows what is being built |
| **UNDER_REVIEW** | The page teaches how to test faithfully | Then invites steward participation |

Every feature teaches the Constitution in miniature before it asks for a commitment.

### Examples

- **Ceremony pages** teach the ceremony's purpose before the form
- **Journal submission** explains why evidence matters before asking "what happened?"
- **Archive import** explains continuity before asking "upload your file"
- **Meaning dashboard** explains how confidence is calculated before showing results
- **Migration timeline** teaches the story of journeys before inviting data entry

---

## The Six-Step Sequence: From Roots to Preservation

Impande's philosophy unfolds in a beautiful sequence:

```
1. npm run water
   └─ Calibration Engine tends the roots
      (Check integrity, verify schema, validate paths)

2. Living Pages welcome the steward
   └─ Every unfinished space offers purpose and hope
      (Learn, explore, understand the Constitution)

3. Ceremonies guide faithful action
   └─ Step by step, the steward records with care
      (Learn why → collect → confirm → preserve)

4. Truth Engine preserves evidence
   └─ Every submission becomes immutable history
      (Append-only, provenance tracked, never deleted)

5. Meaning Engine derives understanding
   └─ Connections emerge, patterns become visible
      (Confidence calculated, explanations grounded in evidence)

6. Preservation Engine carries everything forward
   └─ Archives export, can be restored, continuity proven
      (Layered ZIP, checksums verified, provenance complete)
```

This sequence is not just technical—it reflects the philosophy:

- **Care comes before growth** (calibrate before launching)
- **Understanding comes before judgment** (teach before asking)
- **Preservation comes before expansion** (verify before growing)

Each step honors the previous one and prepares the next. The platform continues to grow faithfully.

---

## Measuring Platform Health: Continuity Report

The Calibration Engine eventually generates this:

```
🧭 Platform Continuity Report — 2026-07-06

Living Pages Status:
  READY ................ 18 features
  UNDER_REVIEW ........ 3 features
  IMPLEMENTING ........ 5 features
  PRESERVED ........... 12 features
  PLANNED ............. 7 features
  DISCOVERED .......... 2 features
  ARCHIVED ............ 1 feature

Validation:
  ✅ Every public feature answers all four questions
  ✅ No intentional page is accidentally empty
  ✅ All state transitions are valid
  ✅ All transitions logged with commit hashes

Summary:
  This metric measures stewardship, not velocity.
  The platform continues to grow faithfully.
  Incomplete work is preserved with dignity.
  Stewards are never abandoned at a dead end.
```

This is not code coverage. This is **continuity**. This is how you measure whether a platform keeps its promises.
