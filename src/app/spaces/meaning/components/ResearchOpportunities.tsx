import React from 'react';
import { ResearchOpportunity } from '../../../lib/meaning/types';

export function ResearchOpportunities({ opportunities }: { opportunities: ResearchOpportunity[] }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <h3 style={{ borderBottom: '2px solid #6C5434', paddingBottom: '8px', color: '#3A2E1F' }}>Research Opportunities</h3>
      <p style={{ color: '#5C4A3D', marginBottom: '16px' }}>The Meaning Engine helps preserve the future by identifying where the archive is silent.</p>
      
      {opportunities.map((opp, idx) => (
        <div key={idx} style={{ backgroundColor: '#F9F6F0', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #E6DBC8' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#6C5434' }}>{opp.entityName}</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <strong style={{ display: 'block', marginBottom: '8px', color: '#8D6E63' }}>Unknown:</strong>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#5C4A3D' }}>
                {opp.unknowns.map((u, i) => <li key={i}>{u}</li>)}
              </ul>
            </div>
            
            <div>
              <strong style={{ display: 'block', marginBottom: '8px', color: '#8D6E63' }}>Possible Sources:</strong>
              <ul style={{ listStyleType: 'none', margin: 0, padding: 0, color: '#5C4A3D' }}>
                {opp.possibleSources.map((s, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <span style={{ color: '#2E7D32', marginRight: '8px' }}>✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
