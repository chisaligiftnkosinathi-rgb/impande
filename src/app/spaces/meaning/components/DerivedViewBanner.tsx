import React from 'react';

export function DerivedViewBanner() {
  return (
    <div style={{
      backgroundColor: '#f9f6f0',
      borderLeft: '4px solid #6C5434',
      padding: '16px',
      margin: '24px 0',
      color: '#4A3B2C',
      fontStyle: 'italic'
    }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#6C5434' }}>Derived View</h4>
      <p style={{ margin: 0 }}>
        The following narrative is automatically generated from verified claims within the Truth Engine.
        It is an interpretation, not a canonical historical record.
      </p>
    </div>
  );
}
