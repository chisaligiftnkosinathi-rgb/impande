# Architecture: AXIONYX Observatory (impande)

The AXIONYX Observatory serves as the public-facing presentation and intelligence layer for the institute's research operations. It is intentionally decoupled from core business backend (`iphande`), the research laboratory environment (`ChemIS`), and the raw data repositories. 

## Architectural Layers

The architecture of `impande` is divided into strict logical layers to separate persistence from presentation.

```text
Presentation Layer (Next.js App Router)
────────────────────────────────────
App Shell (Navigation, Footer, Global state)
Dashboard (Aggregated insights)
Knowledge Objects (Individual entity pages)
Interactive Graph Explorer
Command Palette (Global Search)
Admin Interface

↓ consumes

Intelligence Layer (Business Logic & Analytics)
────────────────────────────────────
Analytics (System-wide metrics)
Health (System status reporting)
Scoring (Derivation of knowledge object confidence)
Recommendations (Content linking strategies)
Lineage (Graph traversal for provenance)
Search (Fuse.js index)

↓ consumes

Registry Layer (Domain Core)
────────────────────────────────────
Repository Interface (`IRegistryStore`)
Graph (`RegistryGraph`)
Domain Types (`KnowledgeObject`, `Edge`)

↓ consumes

Storage Layer (Persistence)
────────────────────────────────────
JSON Adapter (`src/lib/registry/data/`) 
(Designed to be cleanly swapped for PostgreSQL via Prisma in Phase 8.3)
```

## Production Excellence (Phase 8.1 standards)

The application adheres to enterprise production standards:

1. **Logging**: Structured JSON logging via `Pino`, injecting correlation IDs (`x-request-id`) per request via Next.js `middleware.ts`.
2. **Error Boundary**: Typed application exceptions (`AppError`, `NotFoundError`, `IntelligenceError`) map to standardized API response shapes (`{ success, data, error }`).
3. **Environment**: `zod` strictly validates `.env` variables at runtime startup to fail-fast.
4. **Resilience**: `error.tsx` and `loading.tsx` intercept failures and boundary pauses, providing elegant UX instead of standard Next.js stack traces.
5. **Security**: Strict HTTP security headers (`Content-Security-Policy`, `HSTS`, `X-Frame-Options`) are injected in `next.config.ts`.
6. **Testing**: `Vitest` drives integration and domain-logic testing (Registry and Intelligence layers) while running cleanly in a Node environment without heavy DOM overhead. E2E verification is planned via Playwright.

## Testing Strategy (The Pyramid)

We enforce a strict testing split:
- **Vitest**: (Unit/Integration) Tests the pure functions inside the Intelligence layer and the data fetching logic inside the Repository. Run via `npm run test` automatically in CI.
- **Playwright**: (End-to-End) *(Future)* Tests user navigation, Ctrl+K search workflows, and the visual rendering of the Graph explorer against actual DOM outputs.
