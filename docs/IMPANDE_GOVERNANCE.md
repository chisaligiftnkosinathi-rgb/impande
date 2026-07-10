# The Impande Governance Model

This document outlines how the **Impande Standard** evolves over time to meet the needs of future generations while strictly protecting historical integrity.

## I. Versioning the Standard

The Impande Standard uses Semantic Versioning (`MAJOR.MINOR.PATCH`) for its formal specification. 

### 1. Major Version (e.g., 2.0)
A **Major Release** introduces breaking changes to the Standard.
* **Examples:** Changing the Canonical Digest algorithm, restructuring the `.impande` archive folders, or removing an obsolete Engine.
* **Rule:** A Major Release must provide a deterministic migration path from the previous Major Version, guaranteeing zero data loss.

### 2. Minor Version (e.g., 1.1)
A **Minor Release** introduces backward-compatible additions to the Standard.
* **Examples:** Adding a new optional field to `manifest.json`, defining a new official Derived View, or introducing a new `Entity` type.
* **Rule:** Older implementations must be able to read Minor Release archives without crashing, as governed by the Extension Preservation rule.

### 3. Patch Version (e.g., 1.0.1)
A **Patch Release** introduces clarifications, bug fixes to the reference implementation, or editorial improvements to the documentation.
* **Examples:** Fixing a typo in the Constitution, expanding the Conformance Test Suite to catch an edge-case, or updating the Governance document.
* **Rule:** Does not change the `.impande` specification format.

---

## II. Evolution and Deprecation

Because Impande is a continuity standard, removing features is inherently dangerous.

1. **Deprecation Period:** If a structure is deemed obsolete, it must first be marked as `DEPRECATED` in a Minor release. It cannot be fully removed until the next Major release.
2. **The Preservation Promise:** An implementation encountering deprecated or completely unknown data must preserve it intact when re-exporting. Data may be hidden from the UI, but it may **never** be deleted from the archive.

---

## III. Extension Registration

The Impande Standard allows communities to create custom extensions to the `.impande` archive (e.g., specific cultural rites, local legal mappings). 

1. **Experimental Extensions:** Any implementation may inject custom folders into an archive (e.g., `extensions/clan-praise-poems/`). 
2. **Official Registration:** If an extension becomes widely used, it may be formally proposed as an addition to the Standard in the next Minor release.
3. **Mandatory Preservation:** All implementations, regardless of whether they understand an extension, must re-export it flawlessly according to the Extension Preservation rule.

---

## IV. Maintaining Conformance

To claim compliance with the Impande Standard, an implementation must pass the **Archive Conformance Suite**.

The primary test of an implementation is not its UI, but its ability to execute an **End-to-End Round Trip** (`Export → Import → Export`) without corrupting the Canonical Digest, losing Media Integrity, or breaking Canonical Ordering.

Any software that silently discards historical information is, by definition, non-conformant.
