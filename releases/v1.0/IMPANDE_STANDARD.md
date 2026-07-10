# The Impande Standard v1.0

*A universal specification for preserving human continuity.*

> **"The archive is the heritage. The software is only a steward."**
>
> **The Guiding Heuristic:**
> "Will this help future generations understand their roots more faithfully?"
>
> **The Preservation Promise:**
> "A conformant implementation shall never silently discard historical information."

***

## I. Definitions and Conventions

The keywords **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in RFC 2119.

### Glossary
* **Continuity Space**: A bounded, secure context representing a collective that shares a continuous history.
* **Entity**: A distinct, historical subject (person, event, organization) within a Continuity Space. An Entity belongs to exactly one authoritative Continuity Space within a given archive, while references between spaces are permitted through stable identifiers.
* **ImpandeID**: The single, permanent, and immutable identifier for an Entity.
* **Claim**: A definitive statement or assertion made about an Entity. Historical uncertainty belongs in Claims, not in the identity of the Entity itself. Evidence changes our understanding of an entity, not its core identifier.
* **Evidence**: The qualitative foundation attached to a Claim, proving its confidence.
* **Provenance**: The exact origin of the Evidence (e.g., Oral interview, Birth certificate).
* **Witness**: The individual or entity providing the testimony for the Evidence.
* **Recorder**: The Steward who physically entered the information into the system.
* **Steward**: A human contributor entrusted with adding or verifying information under the Constitution.
* **Derived View**: A visualization (e.g., Mermaid graph, PDF) generated deterministically from the canonical data.
* **Validation View**: An automated check of historical quality and structural health.
* **Canonical Digest**: The official cryptographic hash `SHA256(canonical JSON + canonical ordering + manifest version)`.
* **Canonical Ordering**: The strict sorting rules applied to data before hashing or exporting.
* **Open Question**: A formalized unknown or research gap preserved within the system.

***

## II. Normative Specifications

This section defines the absolute requirements for an implementation to be considered conformant to the Impande Standard. Specific normative components (such as Canonical Ordering, Validation Rules, and Derived View Specifications) MAY be versioned individually to allow independent evolution.

### 1. Data Preservation
Data MUST outlive software. Implementations MUST NOT permanently trap information in proprietary database schemas. Implementations MUST support exporting to the `.impande` specification.

### 2. Traceability
Every Fact MUST be traceable. Conclusions MUST be reproducible via the chain:
`Claim → Evidence → Source → Witness → Recorder → Timestamp → Version`

### 3. Derived Views and Visualizations
Visualizations are derived, not authoritative. Derived Views MUST NOT modify canonical data. If the Truth Engine updates, implementations SHOULD rebuild all views automatically. Applications SHOULD expose Validation Views. Implementations MAY add additional derived views.

### 4. Preserving Uncertainty
Unknowns MUST NEVER disappear. Implementations MUST preserve open questions, conflicting testimonies, and research in progress.

### 5. Explainability
Every derived output MUST be explainable. If a derived view makes a statement, it MUST trace back to the Truth Engine.

### 6. Deterministic Generation and Canonical Ordering
Implementations MUST generate the exact same Derived Views and Canonical Digest given the same canonical data. To achieve this, implementations MUST enforce Canonical Ordering:
* Sort entities by ImpandeID.
* Sort claims by creation timestamp then ID.
* Sort evidence by claim then timestamp.
* Normalize dates to ISO 8601 UTC.

### 7. Canonical Hash and Reference Digest
Archives MUST NOT use the ZIP file hash for structural verification. The Canonical Digest MUST be calculated as `SHA256(canonical JSON + canonical ordering + manifest version)`. 
To ensure interoperability, "canonical JSON" MUST be generated using:
* UTF-8 encoding
* Deterministic object key ordering (alphabetical)
* Canonical array ordering (as defined by Canonical Ordering rules)
* Normalized line endings (`\n`)
* Normalized Unicode representation (NFC)
* No insignificant whitespace

Every implementation MUST reproduce the exact same Official Digest for a given Reference Dataset.

### 8. Extension Preservation
Implementations MUST preserve unknown extensions. If a system imports an archive containing extensions it does not understand, it MUST keep them intact and re-export them.

### 9. Validation
Validation checks MUST be Evidence-Aware. Implementations SHOULD expose Validation Views measuring historical quality (e.g., claims without evidence, conflicting witnesses).

***

## III. Informative Specifications

This section provides architectural guidance, examples, and the underlying philosophy of the Impande ecosystem.

### 1. The Architecture of Inheritance
The Impande ecosystem is divided into layers:
1. **Vision**: To preserve humanity's continuity.
2. **Governance**: The Constitution, Covenant, and Governance Rules.
3. **Standard**: The Normative rules defined above.
4. **Implementations**: The Reference Implementation (Next.js), Python, Rust, etc.

### 2. The Eight Engines of Continuity
* **Continuity Engine**: Governs Spaces and Entities.
* **Truth Engine**: Records Claims, Evidence, and Provenance.
* **Memory Engine**: Manages Memory Artifacts (media).
* **Timeline Engine**: Manages chronological version history.
* **Stewardship Engine**: Governs human contributors (Stewards).
* **Discovery Engine**: Provides system-generated Discovery Suggestions. Discovery Suggestions are hypotheses, never historical facts, until supported by Claims and Evidence.
* **Preservation Engine**: Generates `.impande` archives and Derived Views.
* **Wisdom Engine (Future)**: Preserves recurring lessons drawn from verified history.

### 3. The Reference Implementation and Datasets
The Next.js application serves as one informative Reference Implementation of the Standard. Any implementation that satisfies the normative requirements and passes the conformance suite may be considered conformant, regardless of the technology used. The **Chisali-Nkambule Reference Dataset** serves as the official testbed demonstrating multiple generations, migrations, oral histories, and continuity.

***

## IV. Security Considerations

Implementations processing Impande data MUST consider the following security principles, although their implementation details vary by ecosystem:
* **Personally Identifiable Information (PII)**: Living entities require strict consent tracking and redaction before public export.
* **Access Control**: Implementations SHOULD enforce role-based access for Stewards, Witnesses, and Viewers.
* **Archive Authenticity**: Archives MAY include digital signatures in the `manifest.json` provenance block.
* **Tamper Detection**: The Canonical Digest and individual media hashes MUST be used to verify integrity against silent bit rot or malicious modification.

***

## V. Out of Scope

To ensure the Impande Standard remains focused purely on human continuity preservation, the following are intentionally **OUT OF SCOPE**:
* Authentication Systems (e.g., OAuth, Passkeys).
* User Interface Design and Aesthetics.
* Cloud Hosting Providers and Deployment Infrastructure.
* Database Engine specific schemas (e.g., Prisma, PostgreSQL, SQLite).
* Artificial Intelligence behavior (beyond identifying Discovery Suggestions).
* Real-time Synchronization protocols.
