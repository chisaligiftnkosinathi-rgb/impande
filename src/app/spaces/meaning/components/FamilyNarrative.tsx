import React from 'react';
import { DerivedNarrative } from '../../../lib/meaning/types';
import { DerivedViewBanner } from './DerivedViewBanner';

export function FamilyNarrative({ narrative }: { narrative: DerivedNarrative }) {
  return (
    <section style={{ marginTop: '48px', marginBottom: '48px' }}>
      <DerivedViewBanner />
      
      <div style={{ padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid #D9CBB6', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', color: '#3A2E1F', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {narrative.title}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <h4 style={{ color: '#8D6E63', borderBottom: '1px solid #E6DBC8', paddingBottom: '8px' }}>The Voice of the Fathers</h4>
            <ul style={{ color: '#5C4A3D', lineHeight: '1.8' }}>
              <li>Faith</li>
              <li>Strength</li>
              <li>Hope</li>
              <li>Wisdom</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#8D6E63', borderBottom: '1px solid #E6DBC8', paddingBottom: '8px' }}>The Voice of the Mothers</h4>
            <ul style={{ color: '#5C4A3D', lineHeight: '1.8' }}>
              <li>Beauty</li>
              <li>Gratitude</li>
              <li>Belonging</li>
              <li>Fulfillment</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '2px dashed #E6DBC8', paddingTop: '24px' }}>
          <h4 style={{ color: '#8D6E63', marginBottom: '16px' }}>Together</h4>
          <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#6C5434', margin: 0, lineHeight: '1.6' }}>
            "{narrative.synthesis}"
          </blockquote>
        </div>
      </div>
    </section>
  );
}
