import React from 'react';
import { DerivedTheme } from '../../../lib/meaning/types';
import { ConfidenceFlags } from '../../../lib/meaning/ConfidenceCalculator';

export function EvidenceStrength({ theme }: { theme: DerivedTheme }) {
  const { confidence } = theme;
  const { breakdown, rating, reasons, warnings, flags } = confidence;

  // Rule-based recommendations
  const getRecommendations = (f: ConfidenceFlags): string[] => {
    const recs: string[] = [];
    if (f.missingPrimaryDocument) recs.push("Search archival or public records.");
    if (f.missingDate) recs.push("Interview relatives about approximate dates.");
    if (f.needsIndependentSource) recs.push("Find independent family branches to corroborate.");
    if (f.hasContradictions) recs.push("Document both sides of the contradiction without forcing consensus.");
    return recs;
  };

  const recommendations = getRecommendations(flags);

  return (
    <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#5C4A3D' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0EBE1', padding: '8px', borderRadius: '4px', marginBottom: '12px' }}>
        <span>Confidence</span>
        <strong style={{ 
          color: rating === 'High' ? '#2E7D32' : rating === 'Moderate' ? '#F57F17' : '#C62828' 
        }}>
          {rating} ({Math.round(confidence.score * 100)}%)
        </strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', fontSize: '0.8rem' }}>
        <div>Evidence: {Math.round(breakdown.evidence * 100)}%</div>
        <div>Corroboration: {Math.round(breakdown.corroboration * 100)}%</div>
        <div>Consistency: {Math.round(breakdown.consistency * 100)}%</div>
        <div>Completeness: {Math.round(breakdown.completeness * 100)}%</div>
      </div>

      <strong style={{ display: 'block', marginBottom: '8px', borderBottom: '1px solid #D9CBB6', paddingBottom: '4px' }}>
        Analysis
      </strong>
      
      {reasons.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 8px 0' }}>
          {reasons.map((r, idx) => (
            <li key={idx} style={{ marginBottom: '4px' }}>
              <span style={{ color: '#2E7D32', marginRight: '8px' }}>✓</span>{r}
            </li>
          ))}
        </ul>
      )}

      {warnings.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 12px 0', color: '#D32F2F' }}>
          {warnings.map((w, idx) => (
            <li key={idx} style={{ marginBottom: '4px' }}>
              <span style={{ marginRight: '8px' }}>⚠</span>{w}
            </li>
          ))}
        </ul>
      )}

      {recommendations.length > 0 && (
        <div style={{ backgroundColor: '#F9F6F0', padding: '8px', borderRadius: '4px', borderLeft: '2px solid #6C5434' }}>
          <strong style={{ display: 'block', color: '#6C5434', marginBottom: '4px' }}>Recommendations</strong>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {recommendations.map((rec, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
