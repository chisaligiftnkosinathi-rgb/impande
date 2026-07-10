export type SourceType =
  | "oral_history"
  | "family_record"
  | "document"
  | "archival_record"
  | "public_record"
  | "inference"
  | "unknown";

export type EvidenceStrength =
  | "strong"
  | "moderate"
  | "weak"
  | "unverified";

export type ConflictStatus =
  | "none"
  | "disputed"
  | "contradicted"
  | "uncertain"
  | "resolved";

export interface LinkedEntity {
  id: string;
  name: string;
  relation?: string; // e.g. "father", "grandmother", "uncle", "location"
}

export interface SourceReference {
  id: string;
  description: string;
  type: SourceType;
  origin?: string; // e.g. "interview", "memory", "record office", "family conversation"
  dateCaptured?: string; // ISO string
  evidenceLineageId?: string; // e.g. "family-oral-tradition-a"
}

export interface ConflictingClaim {
  claim: string;
  sourceId?: string;
  reason?: string;
  strength?: EvidenceStrength;
}

export interface JournalEntry {
  id: string;

  /**
   * The raw, unprocessed statement of reality.
   * Must not be interpreted or rewritten.
   */
  claim: string;

  /**
   * Optional structured breakdown of the claim.
   * Only used if the claim contains multiple facts.
   */
  atomicClaims?: string[];

  linkedEntities: LinkedEntity[];

  source: SourceReference;

  evidenceStrength: EvidenceStrength;

  confidenceSeed: number; 
  // 0–1 initial steward judgment before algorithmic adjustment

  conflictStatus: ConflictStatus;

  conflictingClaims?: ConflictingClaim[];

  location?: string;

  timeReference?: {
    approximate?: string; // "circa 1980s", "early migration period"
    exactDate?: string;
  };

  tags?: string[];

  notes?: string;

  /**
   * Strict rule: MeaningEngine can read this,
   * but NEVER modify it.
   */
  immutable: true;
}
