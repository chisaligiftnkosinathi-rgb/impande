# Repository Inventory

This document records what currently lives in this repository, how the major folders are used, and how they relate to the repository's present role.

## Repository Role

This repository currently combines three practical layers:

1. The AXIONYX public-facing website and institute presence.
2. The Impande reference demonstrator and related product-facing flows.
3. Shared standards, governance, architectural documents, and continuity-system logic.

It is therefore broader than a single-purpose website and broader than a single-purpose product application.

## Top-Level Files

### Project and package management

- `package.json`: npm metadata, scripts, dependencies, and Prisma seed command.
- `package-lock.json`: exact npm dependency lockfile.
- `tsconfig.json`: TypeScript compiler configuration.
- `eslint.config.mjs`: ESLint configuration.
- `vitest.config.ts`: Vitest configuration.
- `next.config.ts`: Next.js configuration.
- `next-env.d.ts`: Next.js TypeScript environment declarations.

### Governance and repository identity

- `README.md`: repository purpose and current positioning.
- `CHANGELOG.md`: project milestone and release notes.
- `LICENSE`: repository license statement.
- `CITATION.cff`: citation metadata.
- `CODE_OF_CONDUCT.md`: contributor conduct expectations.
- `SECURITY.md`: security policy and reporting guidance.
- `GOVERNANCE.md`: top-level governance statement.
- `PILOT_EVIDENCE_TEMPLATE.md`: template for pilot evidence documentation.

### Environment and local state

- `.env`: local environment variables.
- `.gitignore`: ignore rules for generated and local-only files.
- `dev.db`: root-level local database artifact.
- `test-export.impande`: generated archive artifact used in preservation testing.
- `test-exporter.ts`: export test script.
- `railway.toml`: Railway deployment configuration.

### Local tooling or agent files

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`

These support local agent/tool workflows rather than application behavior.

## Major Directories

### `docs/`

This is the written architectural and governance spine of the repository.

Contains:

1. Core philosophical and standards documents.
2. Architecture and system description files.
3. Alignment and implementation roadmaps.
4. Calibration reports.
5. ADRs.
6. Research notes and field documentation.
7. Steward, operator, developer, and tutorial guides.

Important files:

- `docs/ARCHITECTURE.md`
- `docs/ARCHITECTURAL_SPINE.md`
- `docs/CODEX_ALIGNMENT.md`
- `docs/FEATURE_LIFECYCLE.md`
- `docs/IMPLEMENTATION_ALIGNMENT_ROADMAP.md`
- `docs/INTEGRATION_ROADMAP.md`
- `docs/PORTFOLIO_ARCHITECTURE.md`

Important subfolders:

- `docs/adr/`: architecture decision records.
- `docs/api/`: API policy documents.
- `docs/calibration/`: saved calibration reports.
- `docs/constitution/`: constitutional standards and audit material.
- `docs/developers/`: developer/contributor documentation.
- `docs/operators/`: operational guidance.
- `docs/playbooks/`: production and verification checklists.
- `docs/research/`: active research notes and name studies.
- `docs/stewards/`: steward-focused documentation.
- `docs/tutorials/`: onboarding and sample collection material.

### `prisma/`

This is the database schema and seeding layer.

Contains:

- `schema.prisma`: main Prisma schema.
- `schema.prisma.append`: appended schema fragment.
- `seed.ts`: seed logic for demonstration data.
- `dev.db`: local Prisma database artifact.

Current role:

The Prisma layer reflects the deeper continuity/truth/review model, which is broader than the public website alone.

### `public/`

Static assets served by the Next.js app.

Contains:

- generic static SVGs
- uploaded file storage area
- artwork and branding assets

Important subfolder:

- `public/artwork/`: visual identity assets, including Africa map assets and design references.

### `releases/`

Versioned archival snapshots of major foundational documents.

Current content:

- `releases/v1.0/`: frozen release copies of key Impande documents.

### `scripts/`

Operational scripts, especially the calibration engine.

Contains:

- `calibrate.ts`: main calibration entry point.
- `engine/`: core calibration logic and individual checks.
- `renderer/`: terminal output rendering.

Current role:

The calibration layer acts as a meta-system that evaluates repository health, preservation posture, and constitutional integrity.

### `tests/`

Automated tests.

Contains:

- `services.test.ts`: broader service test coverage.
- `constitutional/`: tests around architecture, truth, authorization, explainability, and alignment principles.

### `src/`

Main application and library code.

Subfolders:

- `src/app/`: Next.js App Router pages and API routes.
- `src/ceremonies/`: ceremony engine and ceremony definitions.
- `src/components/`: shared UI components.
- `src/lib/`: architecture layers, business logic, services, and utilities.
- `src/reference/`: reference datasets and conformance tests.

## `src/app/` Inventory

The `src/app/` folder currently mixes corporate site pages, demonstrator/product pages, and API routes.

### Corporate / institute pages

- `about/`
- `contact/`
- `news/`
- `open-science/`
- `partners/`
- `publications/`
- `research/`
- `software/`
- root `page.tsx`

These support the AXIONYX public presence.

### Product / demonstrator pages

- `impande/`: Impande landing page as a separate offering.
- `spaces/`: continuity spaces and demonstrator workflows.
- `passport-demo/`: evidence passport demonstration.
- `ecosystem/`: ecosystem/CCF-oriented page.
- `constitution/`: constitutional presentation page.
- `service/`: tree-of-service page.

These support the Impande reference demonstrator or related product-facing concepts.

### App Router APIs

- `api/export/`
- `api/media/`
- `api/preservation/`
- `api/v1/`

These expose product/platform behaviors, not just institute content.

### Shared app-level support files

- `layout.tsx`
- `globals.css`
- `layout.module.css`
- `institute.module.css`
- `sitemap.ts`
- `robots.ts`
- `seasons.css`

## `src/components/` Inventory

This folder contains shared UI building blocks used across institute pages and product pages.

Examples:

- `SiteHeader.tsx`: institute/corporate shell header.
- `SymbolicNav.tsx`: product-side navigation.
- `ArchivalCard.tsx`: shared card shell.
- `JourneyRibbon.tsx`: breadcrumb/journey display.
- `PoeticToast.tsx`: toast provider and UI.
- `StoryWall.tsx`: narrative/event feed.
- `SeedLoader.tsx`: animated entry/loader.
- `SeasonsProvider.tsx`: seasonal theme wrapper.
- `StewardJournal.tsx`: product-side journal widget.
- `living-page/`: lifecycle-based page components.

## `src/ceremonies/` Inventory

This folder powers the ceremony-based interaction model.

Contains:

- `CeremonyEngine.tsx`
- `CeremonyLayout.tsx`
- `ceremony-types.ts`
- `definitions/`: individual ceremony implementations like remember-name, record-story, preserve-question, and related flows.

Current role:

This is demonstrator/platform behavior, not institute-site behavior.

## `src/lib/` Inventory

This is the deepest logic layer in the repository.

### `src/lib/api/`

Typed API client wrappers used by frontend code.

### `src/lib/axionyx/`

Catalog/content models for programmes, publications, software outputs, and product positioning.

### `src/lib/config/`

Environment schema and runtime configuration loading.

### `src/lib/contracts/`

DTOs and contract types.

### `src/lib/events/`

Domain event bus abstractions.

### `src/lib/lifecycle/`

Feature lifecycle framework and registry.

### `src/lib/meaning/`

Meaning, narrative, and confidence derivation logic.

### `src/lib/observability/`

Logging, metrics, and tracing helpers.

### `src/lib/preservation/`

Archive export/import/validation and derived-view generation.

### `src/lib/security/`

Security middleware/helpers.

### `src/lib/services/`

Core domain services such as authorization, journal, review, provenance, search, and stewardship.

### `src/lib/storage/`

Storage adapters and media storage logic.

### `src/lib/truth/`

Reference journals and truth-layer type definitions.

## `src/reference/`

Reference datasets and conformance tests.

Contains:

- synthetic and sample datasets
- archive conformance tests
- reference README

Current role:

This is reference-implementation and standards-oriented material, not corporate web content.

## Summary Classification

At a high level, the repository currently contains:

1. Corporate and institute site code.
2. Impande demonstrator/product code.
3. Shared platform and domain services.
4. Standards, governance, and reference-implementation documentation.
5. Preservation and conformance tooling.

That mixed state is acceptable for the current milestone, but it is the reason a reorganization plan is needed for future evolution.

## Related Documents

- `README.md`: defines current repository purpose.
- `docs/PORTFOLIO_ARCHITECTURE.md`: defines long-term identity boundaries.
- `docs/REORGANIZATION_PLAN.md`: planned evolution path for separating concerns over time.
