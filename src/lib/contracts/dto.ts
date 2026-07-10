// ----------------------------------------
// 1. COMMANDS (Intent)
// ----------------------------------------

export interface SubmitJournalEntryCommand {
  collectionId: string;
  contributorId: string;
  journalEntryId?: string; // Optional: If updating an existing entry
  
  // The proposed claim payload
  claim: string;
  evidenceStrength?: "strong" | "moderate" | "weak" | "unverified";
  location?: string;
  approximateDate?: string;
  exactDate?: string;
  tags?: string[];
  notes?: string;

  // Attached evidence references
  sourceReferences?: Array<{
    type: string;
    description: string;
    origin?: string;
    dateCaptured?: string;
  }>;
}

export interface AcceptSubmissionCommand {
  stewardId: string;
  notes?: string;
  // Allows the steward to make final adjustments to the payload before committing
  adjustedClaimPayload?: Partial<SubmitJournalEntryCommand>;
}

export interface RejectSubmissionCommand {
  stewardId: string;
  reason: string;
}

// ----------------------------------------
// 2. QUERIES (Read State)
// ----------------------------------------

export interface GetJournalEntryQuery {
  id: string;
}

export interface ExplainJournalEntryQuery {
  id: string;
}

export interface ListCollectionsQuery {
  limit?: number;
  cursor?: string;
}

export interface SearchQuery {
  collectionId?: string;
  personId?: string;
  sourceTypes?: string[];
  minConfidence?: number;
  hasContradictions?: boolean;
  tags?: string[];
  cursor?: string;
  limit?: number;
}

// ----------------------------------------
// 3. RESPONSES (Views)
// ----------------------------------------

export interface ExplanationResponse {
  explanationVersion: string;
  engine: string;
  generatedAt: string;
  evidenceSummary: string;
  confidenceBreakdown: {
    evidence: number;
    corroboration: number;
    consistency: number;
    completeness: number;
  };
  provenanceChain: Array<{
    revisionId: string;
    stewardId: string;
    timestamp: string;
  }>;
  supportingRelationships: Array<{ relatedEntryId: string; claim: string }>;
  contradictingRelationships: Array<{ relatedEntryId: string; claim: string }>;
  recommendations: string[];
}

export interface SearchResponse<T> {
  totalMatches: number;
  returned: number;
  queryTimeMs: number;
  results: T[];
  facets: {
    evidenceStrength?: Record<string, number>;
    tags?: Record<string, number>;
  };
}
