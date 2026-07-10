import React from 'react';
import { DerivedTheme } from '../../../lib/meaning/types';
import { EvidenceStrength } from './EvidenceStrength';

export function ThemeCard({ theme }: { theme: DerivedTheme }) {
  return (
    <div style={{
      border: '1px solid #D9CBB6',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 4px rgba(108, 84, 52, 0.05)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#6C5434', fontSize: '1.25rem' }}>{theme.theme}</h3>
      <EvidenceStrength theme={theme} />
    </div>
  );
}
