import React from 'react';

export function LanguageDistribution({ distribution }: { distribution: { language: string, count: number }[] }) {
  const total = distribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div style={{ marginTop: '32px', marginBottom: '32px' }}>
      <h3 style={{ borderBottom: '2px solid #6C5434', paddingBottom: '8px', color: '#3A2E1F' }}>Language Heritage</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {distribution.map((item, idx) => {
          const percentage = Math.round((item.count / total) * 100);
          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.95rem', color: '#5C4A3D' }}>
                <span>{item.language}</span>
                <span>{item.count} names ({percentage}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#F0EBE1', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#8D6E63' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
