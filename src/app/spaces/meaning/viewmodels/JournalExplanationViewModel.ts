import { ExplanationResponse } from '../../../../lib/contracts/dto';

/**
 * The View Model tailored specifically for the React Presentation Layer.
 * It removes domain logic terminology and flattens structures for easy rendering.
 */
export interface JournalExplanationViewModel {
  engineVersion: string;
  generatedAtFormatted: string;
  
  // High-level summary
  summaryText: string;
  
  // Display Badge Logic
  overallConfidenceLabel: 'High' | 'Moderate' | 'Low' | 'Unverified';
  overallConfidenceColor: string;
  
  // Flattened percentages for progress bars
  metrics: {
    evidencePercent: number;
    corroborationPercent: number;
    consistencyPercent: number;
    completenessPercent: number;
  };

  // Structured Timeline/Provenance
  timeline: Array<{
    date: string;
    description: string;
    stewardName: string;
  }>;

  // Grouped Evidence
  evidence: {
    supportingCount: number;
    contradictingCount: number;
    supportingClaims: string[];
    contradictingClaims: string[];
  };

  actionableAdvice: string[];
}

export function mapExplanationToViewModel(response: ExplanationResponse): JournalExplanationViewModel {
  const { confidenceBreakdown: cb, provenanceChain, supportingRelationships, contradictingRelationships } = response;
  
  // 1. Calculate an aggregate score (presentation logic only)
  const aggregateScore = (cb.evidence * 0.4) + (cb.corroboration * 0.3) + (cb.consistency * 0.2) + (cb.completeness * 0.1);
  
  let label: JournalExplanationViewModel['overallConfidenceLabel'] = 'Unverified';
  let color = '#757575'; // Grey

  if (aggregateScore >= 0.8) {
    label = 'High';
    color = '#2E7D32'; // Green
  } else if (aggregateScore >= 0.5) {
    label = 'Moderate';
    color = '#F57F17'; // Orange
  } else if (aggregateScore > 0) {
    label = 'Low';
    color = '#C62828'; // Red
  }

  // 2. Map timeline
  const timeline = provenanceChain.map(p => ({
    date: new Date(p.timestamp).toLocaleDateString(),
    description: `Revision ${p.revisionId.substring(0, 8)} accepted`,
    stewardName: p.stewardId
  }));

  return {
    engineVersion: `${response.engine} (v${response.explanationVersion})`,
    generatedAtFormatted: new Date(response.generatedAt).toLocaleString(),
    summaryText: response.evidenceSummary,
    overallConfidenceLabel: label,
    overallConfidenceColor: color,
    metrics: {
      evidencePercent: Math.round(cb.evidence * 100),
      corroborationPercent: Math.round(cb.corroboration * 100),
      consistencyPercent: Math.round(cb.consistency * 100),
      completenessPercent: Math.round(cb.completeness * 100)
    },
    timeline,
    evidence: {
      supportingCount: supportingRelationships.length,
      contradictingCount: contradictingRelationships.length,
      supportingClaims: supportingRelationships.map(r => r.claim),
      contradictingClaims: contradictingRelationships.map(r => r.claim)
    },
    actionableAdvice: response.recommendations
  };
}
