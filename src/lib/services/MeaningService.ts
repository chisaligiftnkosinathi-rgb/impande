import { ExplanationResponse } from '../contracts/dto';
import { ConfidenceCalculator } from '../meaning/ConfidenceCalculator';

export class MeaningService {
  /**
   * Generates a fully formed Explanation Schema for a given revision and its graph edges.
   */
  static generateExplanation(
    revision: any,
    sourceRelations: any[],
    targetRelations: any[]
  ): ExplanationResponse {
    // In a full implementation, we'd pass all sourceReferences into the ConfidenceCalculator.
    // For now, we mock the ConfidenceBreakdown to demonstrate the architecture.
    
    // We map "targetRelations" into contradicting vs supporting based on their type.
    const supporting = targetRelations
      .filter(r => r.relationshipType === 'supports')
      .map(r => ({ relatedEntryId: r.targetClaimId, claim: r.targetClaim.revisions[0]?.claim || "Unknown" }));

    const contradicting = targetRelations
      .filter(r => r.relationshipType === 'contradicts')
      .map(r => ({ relatedEntryId: r.targetClaimId, claim: r.targetClaim.revisions[0]?.claim || "Unknown" }));

    return {
      explanationVersion: "1.0",
      engine: "MeaningEngine-v1",
      generatedAt: new Date().toISOString(),
      evidenceSummary: `This claim relies on ${revision.sourceReferences?.length || 0} primary source references.`,
      confidenceBreakdown: {
        evidence: revision.evidenceStrength === 'strong' ? 0.9 : 0.5,
        corroboration: supporting.length > 0 ? 0.8 : 0.2,
        consistency: contradicting.length > 0 ? 0.3 : 1.0,
        completeness: (revision.exactDate || revision.approximateDate) ? 0.9 : 0.4
      },
      provenanceChain: [
        {
          revisionId: revision.id,
          stewardId: revision.steward.displayName,
          timestamp: revision.createdAt.toISOString()
        }
      ],
      supportingRelationships: supporting,
      contradictingRelationships: contradicting,
      recommendations: contradicting.length > 0 
        ? ["Investigate the contradicting claims to resolve the conflict."] 
        : []
    };
  }
}
