'use client';

import React from 'react';

// In a real app, these would be fetched via apiClient
const MOCK_PENDING_SUBMISSIONS = [
  { id: 'sub_1', claim: 'Babe George moved in 1910', contributor: 'Alice', date: '2026-07-01' },
  { id: 'sub_2', claim: 'Died in 1955', contributor: 'Bob', date: '2026-07-02' }
];

export default function StewardWorkspace() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '32px', borderBottom: '2px solid #2C3E50', paddingBottom: '16px' }}>
        <h1 style={{ color: '#2C3E50', margin: 0 }}>Steward Workspace</h1>
        <p style={{ color: '#7F8C8D', fontSize: '1rem', marginTop: '8px' }}>
          Review pending submissions, resolve conflicts, and maintain the Truth Layer.
        </p>
      </header>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495E', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px' }}>Pending Submissions</h2>
        
        {MOCK_PENDING_SUBMISSIONS.length === 0 ? (
          <p style={{ color: '#7F8C8D' }}>No pending submissions to review.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_PENDING_SUBMISSIONS.map(sub => (
              <div key={sub.id} style={{ border: '1px solid #BDC3C7', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2C3E50' }}>"{sub.claim}"</h3>
                  <div style={{ color: '#7F8C8D', fontSize: '0.9rem' }}>
                    Submitted by <strong>{sub.contributor}</strong> on {sub.date}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px 16px', backgroundColor: '#27AE60', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Review</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ color: '#34495E', borderBottom: '1px solid #E0E0E0', paddingBottom: '8px' }}>Provenance Conflicts</h2>
        <div style={{ backgroundColor: '#FFF3E0', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #E67E22' }}>
          <p style={{ margin: 0, color: '#D35400' }}>There are currently <strong>3</strong> unresolved contradictions in this collection.</p>
          <button style={{ marginTop: '12px', padding: '8px 16px', backgroundColor: '#E67E22', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Resolve Conflicts</button>
        </div>
      </section>
    </div>
  );
}
