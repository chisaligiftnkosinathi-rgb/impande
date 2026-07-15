# Portfolio Architecture

This document defines the intended identity boundaries across the AXIONYX ecosystem.

## Core Principle

There are three distinct identities that should remain conceptually separate even when they temporarily share code or infrastructure.

1. AXIONYX Research Institute: the research and publication identity.
2. Impande Demonstrator: the reference implementation and research demonstrator.
3. Future Impande Platform: the commercial product line, which can evolve independently.

These should not be collapsed into a single brand experience.

## Identity 1: AXIONYX Research Institute

Primary domain:

`axionyx.co.za`

Purpose:

1. Public face of the institute.
2. Scientific credibility.
3. Research programmes.
4. Publications.
5. Standards and governance.
6. Open science.
7. Partnerships and institutional news.

Expected navigation shape:

1. Home
2. Institute
3. Research Programmes
4. Publications
5. Software
6. Open Science
7. Partners
8. News
9. Contact

This identity should feel like a research institute or university-facing site, not like an application dashboard.

## Identity 2: Impande Demonstrator

Current role:

The Impande experience inside this repository should be framed as a research demonstrator or reference implementation, not as the institute itself.

Suggested positioning copy:

`Impande is the AXIONYX reference implementation for continuity-preserving knowledge systems.`

User path:

`axionyx.co.za -> Software -> Impande -> Demonstrator experience`

This allows the institute site to remain academically focused while still exposing a working system.

Demonstrator concepts that belong here:

1. Spaces
2. Journeys
3. Stewardship
4. Meaning
5. Passport Demo
6. Continuity and evidence interfaces

These concepts should be entered deliberately by users, not mixed into the institute's primary public navigation.

## Identity 3: Future Impande Platform

Future production candidates:

1. `impande.co.za`
2. `app.impande.co.za`
3. `impande.axionyx.co.za`

This future platform is not the current demonstrator. It is the eventual customer-facing product.

Expected commercial platform characteristics:

1. Login
2. CRM
3. Leads
4. Businesses
5. Customers
6. Analytics
7. Continuity workflows
8. Automation
9. Billing, subscriptions, or messaging

That audience and information architecture are distinct from the institute site.

## Business Ownership Model

Legal owner:

`Global IT and Business Solutions (Pty) Ltd`

Sibling offerings under that owner:

1. AXIONYX Research Institute
2. Impande
3. Future products
4. Professional services

This is cleaner than forcing Impande to sit underneath the institute as if it were only a section of the institute.

## Recommended Repository Model

### `axionyx-research`

Purpose:

1. Theory
2. Methodology
3. Research papers
4. Standards
5. Governance

### `impande`

Purpose:

1. Public AXIONYX institute website
2. Software catalogue
3. Impande demonstrator/reference implementation

### `phanda`

Purpose:

1. Commercial continuity platform
2. Leads
3. Businesses
4. Customers
5. CRM
6. Automation
7. Subscriptions

### `axionyx-platform`

Purpose:

1. Shared SDKs
2. Shared APIs
3. Identity
4. Authentication
5. Common libraries and packages

### `axionyx-intelligence-engine`

Purpose:

1. Scientific reasoning engine
2. Replay and evidence logic
3. Inference and meaning systems
4. Confidence and interpretive capabilities

## Long-Term Relationship Model

```text
                     AXIONYX
                        │
        ┌───────────────┼───────────────┐
        │               │               │
 Research Institute   Intelligence   Platform
                        Engine         SDK
        │
        │
   Software Catalogue
        │
   ┌────┴─────────┐
   │              │
ChemIST      Impande Demonstrator
                   │
             (reference system)
                   │
          inspires commercial product
                   │
             impande.co.za
          (formerly Phanda)
```

## Practical Interpretation for This Repository

Right now, this repository should be interpreted as:

1. The AXIONYX public/research website.
2. A software catalogue that includes Impande.
3. A host for the Impande demonstrator/reference implementation.

It should not be treated as the final commercial Impande application.

## Architectural Guidance

When implementing navigation and route structure in this repository:

1. Keep institute-facing navigation academic and corporate.
2. Keep demonstrator navigation product-specific.
3. Enter the demonstrator intentionally from Software or Impande landing pages.
4. Preserve the legal owner statement in the footer.
5. Avoid mixing product dashboard language into the institute's top-level identity.

## Future Refactor Direction

As the ecosystem grows, a stronger split would be:

1. `axionyx.co.za` for institute/corporate presence.
2. `impande.axionyx.co.za` or `impande.co.za` for the product/demonstrator experience.
3. Shared packages extracted into `axionyx-platform`.
4. Reasoning and evidence engines extracted into `axionyx-intelligence-engine`.

This document is the conceptual reference for those future moves.
