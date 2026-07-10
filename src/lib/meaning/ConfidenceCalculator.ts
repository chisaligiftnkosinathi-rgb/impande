import { JournalEntry, SourceType, EvidenceStrength, ConflictStatus } from "../truth/journals/types";

export interface ConfidenceBreakdown {
  evidence: number;      
  corroboration: number; 
  consistency: number;   
  completeness: number;  
}

export interface ConfidenceFlags {
  missingDate: boolean;
  missingLocation: boolean;
  needsIndependentSource: boolean;
  hasContradictions: boolean;
  onlyOralEvidence: boolean;
  missingPrimaryDocument: boolean;
}

export interface ConfidenceResult {
  score: number;
  rating: "High" | "Moderate" | "Low" | "Very Low";
  breakdown: ConfidenceBreakdown;
  reasons: string[];
  warnings: string[];
  flags: ConfidenceFlags;
}

export class ConfidenceCalculator {
  
  static evaluateClaim(entries: JournalEntry[]): ConfidenceResult {
    if (entries.length === 0) {
      return this.emptyResult();
    }

    const breakdown = {
      evidence: this.calculateEvidenceScore(entries),
      corroboration: this.calculateCorroborationScore(entries),
      consistency: this.calculateConsistencyScore(entries),
      completeness: this.calculateCompletenessScore(entries)
    };

    // Calculate final score
    let score = 
      (0.40 * breakdown.evidence) + 
      (0.25 * breakdown.corroboration) + 
      (0.20 * breakdown.consistency) + 
      (0.15 * breakdown.completeness);
    
    score = Math.max(0, Math.min(1, score)); // Clamp 0-1

    const rating = this.classifyScore(score);
    const flags = this.generateFlags(entries);
    const { reasons, warnings } = this.generateReasonsAndWarnings(breakdown, flags);

    return {
      score,
      rating,
      breakdown,
      reasons,
      warnings,
      flags
    };
  }

  private static emptyResult(): ConfidenceResult {
    return {
      score: 0,
      rating: "Very Low",
      breakdown: { evidence: 0, corroboration: 0, consistency: 0, completeness: 0 },
      reasons: [],
      warnings: ["No evidence provided"],
      flags: {
        missingDate: true, missingLocation: true, needsIndependentSource: true,
        hasContradictions: false, onlyOralEvidence: false, missingPrimaryDocument: true
      }
    };
  }

  private static calculateEvidenceScore(entries: JournalEntry[]): number {
    // Find the highest evidence score among the entries for this claim
    let highest = 0;
    
    const sourceWeights: Record<SourceType, number> = {
      "archival_record": 1.00,
      "public_record": 0.95,
      "document": 0.90,
      "family_record": 0.75,
      "oral_history": 0.60,
      "inference": 0.30,
      "unknown": 0.10
    };

    const strengthModifiers: Record<EvidenceStrength, number> = {
      "strong": 1.00,
      "moderate": 0.80,
      "weak": 0.55,
      "unverified": 0.25
    };

    for (const entry of entries) {
      const base = sourceWeights[entry.source.type] || 0.10;
      const mod = strengthModifiers[entry.evidenceStrength] || 0.25;
      const val = base * mod;
      if (val > highest) highest = val;
    }
    return highest;
  }

  private static calculateCorroborationScore(entries: JournalEntry[]): number {
    // Count unique evidenceLineageIds to determine independent corroboration
    const uniqueLineages = new Set<string>();
    for (const entry of entries) {
      if (entry.source.evidenceLineageId) {
        uniqueLineages.add(entry.source.evidenceLineageId);
      } else {
        // If no lineage ID, treat it as its own unique lineage for now
        uniqueLineages.add(entry.source.id);
      }
    }

    const count = uniqueLineages.size;
    if (count <= 1) return 0.0; // No independent corroboration
    if (count === 2) return 0.60;
    if (count === 3) return 0.85;
    return 1.0;
  }

  private static calculateConsistencyScore(entries: JournalEntry[]): number {
    // Look for the worst conflict status among the entries
    let score = 1.0;
    const statusScores: Record<ConflictStatus, number> = {
      "none": 1.00,
      "resolved": 1.00,
      "uncertain": 0.85,
      "disputed": 0.70,
      "contradicted": 0.50
    };

    for (const entry of entries) {
      const val = statusScores[entry.conflictStatus];
      if (val < score) score = val;
    }
    return score;
  }

  private static calculateCompletenessScore(entries: JournalEntry[]): number {
    // Aggregate knowns across all entries for the claim
    let hasLocation = false;
    let hasTime = false;
    let hasEntities = false;

    for (const entry of entries) {
      if (entry.location) hasLocation = true;
      if (entry.timeReference?.exactDate || entry.timeReference?.approximate) hasTime = true;
      if (entry.linkedEntities && entry.linkedEntities.length > 0) hasEntities = true;
    }

    let completeness = 0;
    if (hasEntities) completeness += 0.50; // Knowing WHO is half the battle
    if (hasLocation) completeness += 0.25;
    if (hasTime) completeness += 0.25;
    
    return completeness;
  }

  private static classifyScore(score: number): "High" | "Moderate" | "Low" | "Very Low" {
    if (score >= 0.85) return "High";
    if (score >= 0.65) return "Moderate";
    if (score >= 0.40) return "Low";
    return "Very Low";
  }

  private static generateFlags(entries: JournalEntry[]): ConfidenceFlags {
    let hasTime = false;
    let hasLoc = false;
    let hasContradictions = false;
    let hasDocs = false;
    let allOral = true;

    const docTypes = ["archival_record", "public_record", "document", "family_record"];

    const uniqueLineages = new Set<string>();

    for (const entry of entries) {
      if (entry.timeReference?.exactDate || entry.timeReference?.approximate) hasTime = true;
      if (entry.location) hasLoc = true;
      if (entry.conflictStatus === 'contradicted' || entry.conflictStatus === 'disputed') hasContradictions = true;
      
      if (docTypes.includes(entry.source.type)) {
        hasDocs = true;
        allOral = false;
      }
      if (entry.source.type !== 'oral_history') {
        allOral = false;
      }

      uniqueLineages.add(entry.source.evidenceLineageId || entry.source.id);
    }

    return {
      missingDate: !hasTime,
      missingLocation: !hasLoc,
      needsIndependentSource: uniqueLineages.size <= 1,
      hasContradictions,
      onlyOralEvidence: allOral && entries.length > 0,
      missingPrimaryDocument: !hasDocs
    };
  }

  private static generateReasonsAndWarnings(breakdown: ConfidenceBreakdown, flags: ConfidenceFlags) {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (breakdown.evidence > 0.8) reasons.push("Supported by strong primary evidence");
    else if (breakdown.evidence > 0.5) reasons.push("Supported by moderate evidence");

    if (breakdown.corroboration > 0.5) reasons.push("Corroborated by independent sources");
    if (breakdown.consistency === 1.0) reasons.push("Internally consistent");

    if (flags.hasContradictions) warnings.push("There are contradictions or active disputes in the record");
    if (flags.onlyOralEvidence) warnings.push("Relies entirely on oral evidence");
    if (flags.missingDate) warnings.push("Missing exact or approximate dates");
    if (flags.needsIndependentSource) warnings.push("Lacks independent corroboration");

    return { reasons, warnings };
  }
}
