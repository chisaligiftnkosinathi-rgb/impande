'use client';

import React from 'react';

// In a real app, this is populated via StewardshipService.calculateTrustMetrics
const MOCK_TRUST_METRICS = {
  evidenceQuality: { primarySourceCoveragePercent: 45.2 },
  provenance: { completeProvenancePercent: 88.5 },
  reviewHealth: { pendingReviews: 12 },
  contradictions: { unresolvedCount: 3 },
  completeness: { missingDatesCount: 14, missingLocationsCount: 22 },
  evidenceLineageDiversity: { averageLineagesPerClaim: 1.8, singleLineagePercent: 30.5 }
};

export default function HealthDashboard() {
  const metrics = MOCK_TRUST_METRICS;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#2C3E50', margin: 0 }}>Collection Health & Trust Metrics</h1>
        <p style={{ color: '#7F8C8D', fontSize: '1rem', marginTop: '8px' }}>
          Evaluate the structural trustworthiness and evidence coverage of the collection.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        
        {/* Evidence Quality */}
        <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', borderTop: '4px solid #27AE60' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2C3E50' }}>Evidence Quality</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27AE60' }}>{metrics.evidenceQuality.primarySourceCoveragePercent}%</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Claims with Primary Sources</div>
        </div>

        {/* Lineage Diversity */}
        <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', borderTop: '4px solid #8E44AD' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2C3E50' }}>Lineage Diversity</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8E44AD' }}>{metrics.evidenceLineageDiversity.averageLineagesPerClaim}</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Avg. Independent Lineages</div>
          
          <div style={{ marginTop: '16px', fontSize: '1.2rem', fontWeight: 'bold', color: '#E67E22' }}>{metrics.evidenceLineageDiversity.singleLineagePercent}%</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Single-Lineage Claims (Risk)</div>
        </div>

        {/* Provenance */}
        <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', borderTop: '4px solid #2980B9' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2C3E50' }}>Provenance</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2980B9' }}>{metrics.provenance.completeProvenancePercent}%</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Complete Provenance Chain</div>
        </div>

        {/* Contradictions */}
        <div style={{ padding: '24px', backgroundColor: '#FFF3E0', borderRadius: '8px', borderTop: '4px solid #E67E22' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#D35400' }}>Contradictions</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#D35400' }}>{metrics.contradictions.unresolvedCount}</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Unresolved Conflicts</div>
        </div>

        {/* Review Health */}
        <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', borderTop: '4px solid #34495E' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2C3E50' }}>Review Health</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34495E' }}>{metrics.reviewHealth.pendingReviews}</div>
          <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>Pending Submissions</div>
        </div>

        {/* Completeness */}
        <div style={{ padding: '24px', backgroundColor: '#F8F9FA', borderRadius: '8px', borderTop: '4px solid #95A5A6' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2C3E50' }}>Completeness Gaps</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#7F8C8D' }}>
            <li>{metrics.completeness.missingDatesCount} missing dates</li>
            <li>{metrics.completeness.missingLocationsCount} missing locations</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
