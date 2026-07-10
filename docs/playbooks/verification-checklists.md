# Impande Verification & Quality Gates

Before launching or promoting any major feature to production, the platform must pass these rigorous quality and architectural gates. We verify not just the code, but the principles of the Constitution.

## 1. Architectural Boundary Checks
- [ ] `MeaningService` performs NO write operations to the Truth Layer.
- [ ] `StewardshipService` utilizes `AuthorizationService` for every state change.
- [ ] React UI Components (ViewModels) **never** access Prisma models directly.
- [ ] Domain services **never** read `process.env` directly; they use `src/lib/config/config.ts`.
- [ ] Domain services **never** perform HTTP operations directly; they use abstract clients.

## 2. Quality Gates
- [ ] **Unit Tests:** Coverage for domain logic, especially confidence calculations and meaning derivation.
- [ ] **Integration Tests:** End-to-end tests validating the API envelopes and `apiClient` contracts.
- [ ] **Authorization Tests:** Security tests confirming that cross-collection boundaries (`collectionId`) cannot be breached.
- [ ] **Migration Tests:** Prisma schema changes apply cleanly forward and backward.
- [ ] **Performance Benchmarks:** Standard load tests for the `/explain` endpoint (the heaviest read path).
- [ ] **Backup Restoration:** A successful, verified restoration of the production database dump into a staging environment within the last 30 days.

## 3. Launch Readiness Review
Instead of asking "Is the code finished?", we ask:
- [ ] **Steward Experience:** Can a steward reasonably review, resolve contradictions, and assign research tasks using the UI?
- [ ] **Contributor Onboarding:** Can a new contributor successfully submit a claim with attached evidence?
- [ ] **Operator Recovery:** Does an operator have the Playbooks necessary to recover from a bad deployment or database outage?
- [ ] **Developer Extension:** Are the ADRs and Architecture documentation sufficient for a new engineer to add a feature to the Meaning layer without violating the Truth layer?
- [ ] **Institutional Trust:** Does the federation logic (CollectionMemberships) cleanly isolate institutional archives?
