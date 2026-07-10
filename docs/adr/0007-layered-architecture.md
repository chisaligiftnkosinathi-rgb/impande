# ADR 0007: Layered Architecture Based on Principles

**Date:** 2026-07-06
**Status:** Accepted

## Context
Standard web application architectures often organize code around features (e.g., `Users/`, `Posts/`, `Comments/`) or standard MVC patterns (`Models/`, `Views/`, `Controllers/`). For Impande, this approach risks blurring the lines between storing historical evidence, evaluating it, and interpreting it. If the boundary between a historical fact and a generated narrative breaks down, the platform loses its trustworthiness as an archive.

## Decision
We adopted a strict, principle-driven layered architecture:

1. **Constitution:** The governing philosophy.
2. **Truth Layer:** Immutable storage of claims and sources.
3. **Confidence Layer:** Mathematical evaluation of evidence strength.
4. **Meaning Layer:** Human-readable interpretation of the evaluated truth.
5. **Stewardship Layer:** Curation and maintenance tools.
6. **Authorization Layer:** Capability-based access control.
7. **API Layer:** Canonical resource contracts.
8. **Presentation Layer:** User interface.

We also adopted **Operations** as a cross-cutting layer supporting all of the above.

## Consequences
**Positive:**
- **Clarity of Intent:** Developers know exactly where a piece of logic belongs. If code generates a narrative, it belongs in Meaning. If it calculates provenance, it belongs in Confidence.
- **Trust:** Readers can explicitly ask "How was this derived?", and the platform can trace the data directly down the stack from Meaning -> Confidence -> Truth.
- **Maintainability:** We can overhaul the presentation or API layers entirely without touching the core Truth engine.

**Negative/Trade-offs:**
- **Vertical Overhead:** Implementing a simple feature sometimes requires touching multiple layers (e.g., adding a new type of source requires Truth schema updates, Confidence evaluation updates, and Meaning translation updates).
- **Steeper Learning Curve:** New contributors must understand the philosophical distinction between Truth and Meaning before writing code.

## Constitutional Alignment
This structure is the literal embodiment of the entire Constitution. It physically separates the immutable preservation of history from the subjective interpretation of it.
