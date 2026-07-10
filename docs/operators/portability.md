# Portability & Migration Strategy

Impande is an engine for preserving history. Because institutions, families, and archives will store highly sensitive and irreplaceable data here, the platform must never become a "data silo." Portability is a constitutional requirement.

## 1. Export Formats
Impande supports exporting a Collection in standard, open formats to ensure that if the platform ceases to exist, the history does not.
- **Truth Data:** All `JournalEntryRevisions` and `MediaAttachments` metadata can be exported as raw JSON Lines (`.jsonl`).
- **Media Files:** The actual binary files of the `MediaAttachments` (images, PDFs, audio) can be exported directly from the Object Storage bucket retaining their original cryptographic hashes.
- **Provenance Graph:** The connections between entries, sources, and entities can be exported as an RDF (Resource Description Framework) or standard CSV edge-list, allowing researchers to import the graph into tools like Gephi or Neo4j.

## 2. Backup Portability
Database backups (PostgreSQL `pg_dump`) must be taken nightly. These backups are portable by default, meaning an institution can take a backup of an Impande database and restore it locally on their own hardware using standard PostgreSQL tooling, without requiring Impande proprietary software.

## 3. Version Migration
When upgrading the Impande platform across major versions, the platform guarantees **forward-only migrations**. Prisma schema migrations will be provided that deterministically transform the `v1` schema to `v2` without any loss of historical `JournalEntryRevisions`.
