# AXIONYX Observatory (impande)

**Impande** is the primary public-facing Observatory web platform for the AXIONYX Research Institute. It is built as a Next.js application that provides the interactive user interface, dashboards, knowledge graph explorer, and intelligence API for the institution.

## Role in the GitHub Organization

AXIONYX maintains a strict separation of concerns across its institutional assets:

*   **impande** (This Repository): The Observatory UI and Presentation Layer. Contains the App Shell, Dashboard, Object Explorer, Admin UI, and Intelligence Layer (scoring, search, lineage). It is deployed to Vercel.
*   **iphande**: The backend platform (FastAPI, Authentication, Business Logic, Continuity).
*   **phanda**: The client/mobile app that consumes `iphande`.
*   **ChemIS**: The governed research operating environment and evidence laboratory.
*   **axionyx-data**: Canonical datasets, reference datasets, and registry exports.
*   **axionyx-standards**: Institutional standards (e.g., AX-ST-0001).
*   **axionyx-publications**: Published outputs (Reports, Papers).
*   **axionyx-engine**: Reusable logic engines without UI.
*   **axionyx-intelligence-engine**: AI, reasoning, planning, and inference logic.

## Architecture Layers

Impande operates with the following logical layers:

1.  **Presentation Layer:** React Server Components, App Shell, Command Bar, Dashboard, Visual Graph.
2.  **Intelligence Layer:** Analytics, scoring, lineage, search (Fuse.js), health checks.
3.  **Domain Layer:** Knowledge Objects, Sub-object types (Software, Publications, Programmes).
4.  **Storage Layer:** Currently implemented via an abstracted JSON `RegistryRepository`.

*(For a full architectural diagram, see `ARCHITECTURE.md`)*

## Development Workflow

We use a strict branching strategy to protect production:

1.  **main**: Production-only code deployed to Vercel.
2.  **develop**: Primary integration branch.
3.  **feature/*** : Feature branches for active work (e.g., `feature/dashboard`, `feature/postgres`).

### Local Setup & Verification

```bash
# 1. Install dependencies
npm install

# 2. Run typechecks and linter
npm run lint

# 3. Run integration tests
npm run test

# 4. Build application (verifies Next.js Turbopack)
npm run build

# 5. Start development server
npm run dev
```

All pushes and pull requests to `main` and `develop` must pass the GitHub Actions CI pipeline (`npm install`, `lint`, `test`, `build`) before merging.
