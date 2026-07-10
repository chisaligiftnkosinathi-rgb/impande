# Impande Architecture Overview

The Impande platform is built on a strict, layered architecture designed to preserve the integrity of historical evidence while supporting collaboration across institutions. Rather than organizing code strictly by "features," Impande is organized by **principles**.

## The Layered Model

```text
Constitution
      ↓
    Truth
      ↓
  Confidence
      ↓
   Meaning
      ↓
 Stewardship
      ↓
Authorization
      ↓
     API
      ↓
 Presentation
```
*(With **Operations** acting as a cross-cutting concern across all layers)*

### 1. Constitution
The foundational philosophy of the platform. Code is written to serve these principles (e.g., "Preservation does not imply finality"). It governs the 'why' behind all technical decisions.

### 2. Truth Layer (Prisma Domain)
The bedrock of the application. It stores immutable `JournalEntryRevisions` and `MediaAttachments`. It never deletes or overwrites an accepted claim. Its sole purpose is to remember exactly what was said and who said it.

### 3. Confidence Layer
A mathematical and structural evaluation layer. It does not interpret facts; it merely measures the strength of the evidence supporting a claim. It calculates provenance completeness, contradiction detection, and source verification.

### 4. Meaning Layer
The interpretation layer. It takes the Truth and the Confidence calculations and generates explainable, human-readable narratives. This layer serves the **readers** of the archive. It translates the graph of evidence into a story, but must always be able to explain *how* it reached its conclusion.

### 5. Stewardship Layer
The maintenance layer. This serves the **curators** and **stewards** of the archive. It evaluates the health of a collection, exposes Trust Metrics, and generates Research Tasks (e.g., highlighting claims that lack primary evidence). 

### 6. Authorization Layer
The capability layer. It evaluates policies based on `CollectionMembership`. It strictly enforces the logical boundaries between collections, ensuring that no user can mutate or access unpublished truth without explicit capability.

### 7. API Layer
The canonical contract. It defines resources and behaviors explicitly. It parses requests, enforces validation, and delegates directly to the Service layers. It does not contain business rules.

### 8. Presentation Layer (Consumer Experience)
The UI. Built using React ViewModels that strictly map from the API SDK. It never touches Prisma objects directly. It translates the API into an experience.

### Cross-Cutting: Operations Layer
The foundation of platform trust. It includes centralized configuration validation, structured JSON logging, tracing, metrics, and security middleware. It ensures the platform survives and thrives in production.
