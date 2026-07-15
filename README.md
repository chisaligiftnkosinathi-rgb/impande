# AXIONYX Research Portal (Impande)

## Purpose
The public face of the institute. Exposes programmes, publications, software, datasets, evidence packages, partnerships, and releases.

## Role in the Institute
Impande is an application that dynamically consumes the AXIONYX GitHub Ecosystem infrastructure. It does **not** manually duplicate research information; it serves as a research observatory.

## Dependency Direction
```text
GitHub Ecosystem
        ↓
     Impande
        ↓
Public Research Portal
```

---

# Impande: AXIONYX Site and Reference Demonstrator

This repository currently serves two linked but distinct purposes:

1. The public-facing AXIONYX web presence for the research institute and company initiatives.
2. The Impande reference demonstrator used to explore continuity, evidence, and institutional memory concepts.

It should not be treated as the final commercial Impande SaaS product. That future product can evolve separately while this repository remains the public institute site plus research/reference implementation.

## Ecosystem Progression

```text
                     ChemIS
                        │
                        ▼
     Computational Continuity Framework
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
    AXIONYX / AXIS                  iPhande
Institutional Layer           Community Layer
        │                               │
        └───────────────┬───────────────┘
                        ▼
              Evidence Passports
                        │
                        ▼
          Trusted Digital Ecosystems
```

```text
Preserve.
Don't Assume.

Attribute.
Don't Rewrite.

Continue.
Don't Forget.
```

## Current Repository Role

At the moment, this codebase combines:

1. AXIONYX Research Institute pages: institute profile, programmes, publications, software, partnerships, and open-science positioning.
2. Impande Demonstrator pages: continuity spaces, stewardship flows, meaning views, and evidence/passport experiments.
3. Shared research and governance documentation: standards, constitutional material, architectural roadmaps, and preservation logic.

The intended long-term portfolio separation is documented in [docs/PORTFOLIO_ARCHITECTURE.md](docs/PORTFOLIO_ARCHITECTURE.md).

## The Architecture of Inheritance

This repository contains the Reference Implementation v1.0 of the **Impande Standard**.

Impande is not just an application; it is an operating system for human memory, built upon four immutable conceptual pillars:
1. **The Vision**: Why Impande exists.
2. **The Constitution**: The ethical and philosophical principles.
3. **The Standard**: The technical definitions and interoperability rules.
4. **The Reference Implementation**: This very codebase (Next.js + Prisma).

Any future iteration or fork must adhere to the definitions of the Standard to remain a part of the Continuity Ecosystem.

***

## The Origin Story

*This standard wasn't invented in a boardroom. It grew from a family asking honest questions about their grandparents, their surnames, their migrations, and their memories.*

Impande began when a son wanted to know why his father's surname was different from his grandfather's, and a grandson wanted to preserve the legacy of the traditional healer who raised him. The Chisali and Nkambule families served as the very first **Reference Continuity Space**.

Their honest attempt to preserve their history with humility, acknowledging uncertainty and oral tradition alongside documented fact, became the seed for a system capable of preserving human continuity for anyone.
