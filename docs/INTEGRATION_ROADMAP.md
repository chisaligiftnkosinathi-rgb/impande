# Integration Roadmap: Connecting the Constitutional Spine

> "The platform now has a common language. The next phase is connecting every part to that language."

---

## The Constitutional Spine

```
Constitution (Why)
      ↓
Feature Lifecycle (How)
      ↓
Feature Registry (What)
      ↓
Living Page Component (Display)
      ↓
Navigation / Middleware / Calibration
      ↓
Steward Experience (Felt)
```

Every layer can now ask: "What is the state of this feature?"

Every layer receives the same answer from a single source of truth.

---

## Phase 1: Foundation (Completed)

✅ Constitutional Principle established (Living Pages in Principle #6)
✅ Lifecycle states defined (7 states with metadata and transitions)
✅ Registry pattern implemented (FeatureRegistry singleton)
✅ Living Page component built (answers four questions)
✅ Type system complete (FeatureMetadata, FeatureTimeline, etc.)

---

## Phase 2: Integration (Next)

### 2.1 Navigation Integration

**Current State:**
Navigation is hardcoded in component:

```typescript
const navigationItems = [
  { path: '/continuity-spaces', label: 'Continuity Spaces', lifecycle: 'READY' },
  { path: '/journeys', label: 'Journeys', lifecycle: 'PRESERVED' },
  // ...hardcoded
];
```

**Future State:**
Navigation reads from registry:

```typescript
// src/components/MainNav.tsx

import { FeatureRegistry } from '@/lib/lifecycle';

export function MainNav() {
  // Ask the registry, not hardcoding
  const visibleFeatures = FeatureRegistry.getPublic();

  return (
    <nav>
      {visibleFeatures.map(feature => (
        <NavItem
          key={feature.id}
          href={feature.route || `/${feature.id}`}
          label={feature.title}
          state={feature.state}
          badge={StateMetadata[feature.state].symbol}
        />
      ))}
    </nav>
  );
}
```

**Benefits:**
- Menu always reflects reality
- No manual synchronization needed
- Badges show lifecycle state automatically
- New features auto-appear when registered

**Work Required:**
1. Create NavItem component that shows state symbol
2. Update MainNav to use FeatureRegistry.getPublic()
3. Add `route` field to FeatureMetadata (optional, defaults to `/${id}`)
4. Verify all features are registered before nav renders

---

### 2.2 Route Page Integration

**Current State:**
Each page implements its own layout:

```typescript
// src/app/journeys/page.tsx
export default function JourneysPage() {
  return (
    <div>
      {/* Custom layout */}
    </div>
  );
}
```

**Future State:**
Every page wraps with LivingPage:

```typescript
// src/app/journeys/page.tsx

import { LivingPage } from '@/components/living-page';

export const featureMetadata: FeatureMetadata = {
  id: 'journeys',
  title: 'Journeys',
  state: 'PRESERVED',
  purpose: 'This space will preserve community journeys...',
  whyMatters: 'Journeys help future generations understand...',
  currentStatus: 'Database schema for journey phases under construction',
  participationOptions: [
    { label: 'Read a family story', href: '/stories/migration-example' },
    { label: 'Explore connected memories', href: '/archive/tag/journey' }
  ],
  timeline: {
    currentPhase: 'Schema design',
    estimatedReadyDate: '2026-09-01',
    blockages: ['Place name verification', 'Timeline UI component']
  }
};

export default function JourneysPage() {
  return (
    <LivingPage feature={featureMetadata}>
      {/* Full implementation renders here only when state === READY */}
      <JourneysContent />
    </LivingPage>
  );
}
```

**Benefits:**
- Every page answers the four questions
- No blank pages or 404s
- PRESERVED pages still teach and welcome
- Consistent UX across all states

**Work Required:**
1. Define featureMetadata for each page/route
2. Wrap page content with `<LivingPage>`
3. Update CSS Module imports
4. Test at each state (PRESERVED, IMPLEMENTING, UNDER_REVIEW, READY)

**Implementation Order:**
1. Core pages (Spaces, Home, Archive)
2. Ceremony pages
3. Meaning Engine pages
4. Admin/Developer pages

---

### 2.3 Middleware Integration

**Current State:**
No middleware intercepts unfinished routes.

**Future State:**
Middleware shows graceful LivingPage instead of errors:

```typescript
// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FeatureRegistry } from '@/lib/lifecycle';
import { isNavigable } from '@/lib/lifecycle/FeatureStates';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Try to find this route in the registry
  const feature = FeatureRegistry.getByRoute(pathname);

  // If feature exists but is not navigable, show graceful page
  if (feature && !isNavigable(feature.state)) {
    // Render the LivingPage directly instead of 404
    request.nextUrl.pathname = '/_feature-status';
    request.nextUrl.searchParams.set('featureId', feature.id);
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static/api
    '/((?!_next/static|_next/image|api|favicon.ico).*)'
  ]
};
```

New route: `src/app/_feature-status/page.tsx`:

```typescript
import { FeatureRegistry } from '@/lib/lifecycle';
import { LivingPage } from '@/components/living-page';

export default function FeatureStatusPage({
  searchParams
}: {
  searchParams: { featureId: string };
}) {
  const feature = FeatureRegistry.get(searchParams.featureId);

  if (!feature) {
    return (
      <div className="error">
        <p>Feature not found.</p>
        <a href="/">← Return home</a>
      </div>
    );
  }

  return <LivingPage feature={feature} />;
}
```

**Benefits:**
- No 404 errors for intentional features
- Stewards always see why a feature isn't ready
- Middleware enforces the "Living Pages" principle

**Work Required:**
1. Add `getByRoute()` method to FeatureRegistry
2. Create middleware.ts with logic
3. Create _feature-status page
4. Test with PRESERVED and IMPLEMENTING routes

---

### 2.4 Calibration Engine Integration

**Current State:**
Calibration Engine reports technical health:

```
✓ Schema valid
✓ Services running
✓ API responding
```

**Future State:**
Calibration reports constitutional maturity:

```typescript
// scripts/calibrate.ts

import { FeatureRegistry } from '@/lib/lifecycle';

export async function reportLivingPages() {
  const counts = FeatureRegistry.countByState();
  const issues = FeatureRegistry.validateLivingPages();

  console.log('\n🌱 Living Pages Report\n');
  console.log(`DISCOVERED .......... ${counts.DISCOVERED}`);
  console.log(`PLANNED ............. ${counts.PLANNED}`);
  console.log(`PRESERVED ........... ${counts.PRESERVED}`);
  console.log(`IMPLEMENTING ........ ${counts.IMPLEMENTING}`);
  console.log(`UNDER_REVIEW ........ ${counts.UNDER_REVIEW}`);
  console.log(`READY ............... ${counts.READY}`);
  console.log(`ARCHIVED ............ ${counts.ARCHIVED}`);

  if (issues.length === 0) {
    console.log('\n✅ Every intentional page has purpose.');
    console.log('✅ No intentional feature is empty.');
  } else {
    console.log('\n⚠️ Missing purpose:');
    issues.forEach(({ featureId, issues: featureIssues }) => {
      console.log(`\n  ${featureId}:`);
      featureIssues.forEach(issue => console.log(`    • ${issue}`));
    });
  }

  return { counts, issues };
}

// Integrate into main calibration
export async function calibrate() {
  // ... existing checks ...

  // New: Living Pages check
  const { counts, issues } = await reportLivingPages();

  if (issues.length > 0) {
    console.error('\n❌ Calibration FAILED: Living Pages incomplete');
    process.exit(1);
  }

  console.log('\n✅ All systems aligned.');
  process.exit(0);
}
```

Output example:

```
🌱 Living Pages Report

DISCOVERED .......... 2
PLANNED ............. 7
PRESERVED ........... 12
IMPLEMENTING ........ 5
UNDER_REVIEW ........ 3
READY ............... 18
ARCHIVED ............ 1

✅ Every intentional page has purpose.
✅ No intentional feature is empty.
```

**Benefits:**
- `npm run water` now measures continuity
- Validates constitutional promises before startup
- Early warning if a feature becomes empty

**Work Required:**
1. Update scripts/calibrate.ts
2. Call `FeatureRegistry.countByState()`
3. Call `FeatureRegistry.validateLivingPages()`
4. Add to main calibration output

---

### 2.5 Deployment Gate Integration

**Current State:**
Deployment has no constitutional checks.

**Future State:**
Pre-deployment verification:

```typescript
// scripts/pre-deploy.ts

import { FeatureRegistry } from '@/lib/lifecycle';

export async function deploymentGate(): Promise<void> {
  console.log('🚪 Deployment Gate: Constitutional Verification\n');

  const allFeatures = FeatureRegistry.getAll();
  const issues: string[] = [];

  // Check 1: Every feature has a title
  for (const feature of allFeatures) {
    if (!feature.title) {
      issues.push(`${feature.id}: Missing title`);
    }
  }

  // Check 2: Every feature has purpose
  for (const feature of allFeatures) {
    if (!feature.purpose) {
      issues.push(`${feature.id}: Missing purpose (Q1)`);
    }
  }

  // Check 3: Every feature explains why it matters
  for (const feature of allFeatures) {
    if (!feature.whyMatters) {
      issues.push(`${feature.id}: Missing whyMatters (Q2)`);
    }
  }

  // Check 4: Every feature has participation options
  for (const feature of allFeatures) {
    if (!feature.participationOptions?.length) {
      issues.push(`${feature.id}: Missing participationOptions (Q4)`);
    }
  }

  // Check 5: Every feature has a valid state
  for (const feature of allFeatures) {
    if (!Object.values(FeatureState).includes(feature.state)) {
      issues.push(`${feature.id}: Invalid state '${feature.state}'`);
    }
  }

  // Check 6: No intentional feature is empty
  const emptyFeatures = FeatureRegistry.validateLivingPages();
  for (const { featureId, issues: featureIssues } of emptyFeatures) {
    featureIssues.forEach(issue => {
      issues.push(`${featureId}: ${issue}`);
    });
  }

  if (issues.length > 0) {
    console.error('❌ DEPLOYMENT BLOCKED\n');
    console.error('The following constitutional promises are not yet fulfilled:\n');
    issues.forEach(issue => console.error(`  • ${issue}`));
    process.exit(1);
  }

  console.log('✅ All constitutional promises are fulfilled.');
  console.log('✅ Ready for deployment.\n');
}

// Run before deploy
if (require.main === module) {
  deploymentGate();
}
```

**Benefits:**
- Prevents deploying incomplete work
- Explains **why** deployment failed (not just "error")
- Makes constitutional promises testable

**Work Required:**
1. Create scripts/pre-deploy.ts
2. Add to CI/CD pipeline (before docker build, before push)
3. Test with intentionally incomplete feature

---

## Phase 3: Registry Pattern Extension

As the integration work stabilizes, additional registries follow the same pattern:

### Collection Registry

```typescript
// src/lib/registries/CollectionRegistry.ts

export interface CollectionMetadata {
  id: string;
  name: string;
  description: string;
  stewardId: string;
  createdDate: string;
  purpose: string; // Why this family/community matters
  state: 'PRIVATE' | 'LIMITED' | 'PUBLIC' | 'ARCHIVED';
  participationOptions: ParticipationOption[];
  links?: {
    homepage?: string;
    documentation?: string;
  };
}

export class CollectionRegistry {
  register(collection: CollectionMetadata): void
  get(collectionId: string): CollectionMetadata | undefined
  getByState(state: string): CollectionMetadata[]
  countByState(): Record<string, number>
  validateCollections(): ValidationIssue[]
  // ... similar to FeatureRegistry
}
```

### Ceremony Registry

```typescript
// src/lib/registries/CeremonyRegistry.ts

export interface CeremonyMetadata {
  id: string;
  title: string;
  state: FeatureStateType; // Ceremonies also have lifecycle
  purpose: string; // Why this ceremony matters
  steps: CeremonyStep[];
  onComplete: (data: unknown) => Promise<void>;
  // ... ceremony-specific fields
}

export class CeremonyRegistry {
  register(ceremony: CeremonyMetadata): void
  get(ceremonyId: string): CeremonyMetadata | undefined
  getForCollection(collectionId: string): CeremonyMetadata[]
  // ... similar to FeatureRegistry
}
```

### Calibration Registry

```typescript
// src/lib/registries/CalibrationRegistry.ts

export interface CalibrationCheckpoint {
  name: string;
  description: string;
  verify: () => Promise<boolean>;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

export class CalibrationRegistry {
  register(checkpoint: CalibrationCheckpoint): void
  runAll(): Promise<CalibrationReport>
  // ... manages all calibration checks
}
```

**Pattern:**
All registries:
- Provide single source of truth for their domain
- Expose consistent query methods (get, getAll, getByState, countByState)
- Validate their content
- Support audit trails
- Integrate with Calibration Engine

---

## Integration Dependencies

```
1. Navigation Integration
   ├─ Requires: FeatureRegistry complete ✓
   └─ Enables: Menu reflects reality

2. Route Page Integration
   ├─ Requires: LivingPage component ✓
   ├─ Requires: Navigation integration (optional)
   └─ Enables: All pages participate in framework

3. Middleware Integration
   ├─ Requires: Route page integration (mostly)
   ├─ Requires: _feature-status page
   └─ Enables: No dead-end pages

4. Calibration Integration
   ├─ Requires: All above for full effect
   ├─ Can work in: Feature Registry only (partial)
   └─ Enables: Continuity measurement

5. Deployment Gate
   ├─ Requires: All above + CI/CD setup
   └─ Enables: Constitutional verification as blocker

6. Registry Pattern Extension
   ├─ Requires: Feature Registry stable
   ├─ Optional: Not blocking other work
   └─ Enables: Broader platform ecosystem
```

**Recommended Order:**
1. Navigation Integration (quick win, high visibility)
2. Route Page Integration (enables all features)
3. Middleware Integration (polishes UX)
4. Calibration Integration (validates promise)
5. Deployment Gate (enforces promise)
6. Registry Extensions (future scalability)

---

## The Platform as Continuity Operating System

When all integrations are complete:

```
Constitution
    ↓
Features (Registry)
Collections (Registry)
Ceremonies (Registry)
Calibration (Registry)
    ↓
Navigation / Middleware / Deployment
    ↓
Steward Experience
    ↓
Preserved Memory
```

Every part of Impande will:
- Know its own state
- Report to the Calibration Engine
- Participate in the constitutional framework
- Contribute to continuity measurement

The platform becomes an **operating system for continuity**—where the principles are not just words but the architecture itself.

---

## Success Criteria

The integration is complete when:

✅ Navigation shows all registered features
✅ Every page answers the four questions
✅ No steward reaches a dead end
✅ `npm run water` reports constitutional maturity
✅ Deployment requires constitutional compliance
✅ New registries follow the same pattern

At that point, the platform **speaks with one voice** from code to steward experience.

🌱
