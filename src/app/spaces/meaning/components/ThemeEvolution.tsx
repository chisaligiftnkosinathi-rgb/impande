import React from 'react';
import { ThemeEvolution } from '../../../lib/meaning/types';

export function ThemeEvolutionTimeline({ evolutions }: { evolutions?: ThemeEvolution[] }) {
  if (!evolutions || evolutions.length === 0) return null;

  return (
    <div style={{ marginTop: '24px' }}>
      <h4 style={{ color: '#8D6E63', marginBottom: '16px' }}>Evolution of Meaning</h4>
      <div style={{ borderLeft: '2px solid #D9CBB6', paddingLeft: '16px' }}>
        {evolutions.map((evo, idx) => (
          <div key={idx} style={{ marginBottom: '16px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '-21px',
              top: '4px',
              width: '10px',
              height: '10px',
              backgroundColor: '#6C5434',
              borderRadius: '50%'
            }} />
            <strong style={{ display: 'block', color: '#3A2E1F', fontSize: '0.9rem' }}>{evo.year}</strong>
            <p style={{ margin: '4px 0 0 0', color: '#5C4A3D', fontSize: '0.95rem' }}>{evo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
