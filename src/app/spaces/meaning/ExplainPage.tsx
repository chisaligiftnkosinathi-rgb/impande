'use client';

import React, { useEffect, useState } from 'react';
import { journalEntries } from '../../../../lib/api/journalEntries';
import { StateBoundary } from '../../../components/ui/StateBoundary';
import { JournalExplanationViewModel, mapExplanationToViewModel } from '../../viewmodels/JournalExplanationViewModel';

export default function JournalExplainPage({ params }: { params: { id: string } }) {
  const [viewModel, setViewModel] = useState<JournalExplanationViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadExplanation() {
      try {
        setLoading(true);
        // API Client acts as the typed interface
        const rawResponse = await journalEntries.explain(params.id);
        
        // Mapped to View Model perfectly isolating Domain Logic
        const vm = mapExplanationToViewModel(rawResponse);
        setViewModel(vm);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadExplanation();
  }, [params.id]);

  return (
    <StateBoundary isLoading={loading} error={error} isEmpty={!viewModel && !loading}>
      {viewModel && (
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
          
          <header style={{ marginBottom: '24px', borderBottom: '1px solid #E0E0E0', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ color: '#2C3E50', margin: 0 }}>Journal Entry Insights</h1>
              <span style={{ 
                backgroundColor: viewModel.overallConfidenceColor, 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {viewModel.overallConfidenceLabel} Confidence
              </span>
            </div>
            <p style={{ color: '#7F8C8D', fontSize: '0.9rem', marginTop: '8px' }}>
              Engine: {viewModel.engineVersion} • Generated: {viewModel.generatedAtFormatted}
            </p>
          </header>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ color: '#34495E' }}>Evidence Summary</h2>
            <p style={{ lineHeight: '1.6', color: '#555' }}>{viewModel.summaryText}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
              {Object.entries(viewModel.metrics).map(([key, value]) => (
                <div key={key} style={{ backgroundColor: '#F8F9FA', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2C3E50' }}>{value}%</div>
                  <div style={{ fontSize: '0.8rem', color: '#7F8C8D', textTransform: 'capitalize' }}>
                    {key.replace('Percent', '')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {viewModel.actionableAdvice.length > 0 && (
            <section style={{ marginBottom: '32px', backgroundColor: '#FFF3E0', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #FF9800' }}>
              <h3 style={{ color: '#E65100', marginTop: 0 }}>Recommendations</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#5D4037' }}>
                {viewModel.actionableAdvice.map((advice, idx) => (
                  <li key={idx}>{advice}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 style={{ color: '#34495E' }}>Provenance Chain</h2>
            <div style={{ borderLeft: '2px solid #BDC3C7', paddingLeft: '16px', marginLeft: '8px' }}>
              {viewModel.timeline.map((event, idx) => (
                <div key={idx} style={{ marginBottom: '16px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-21px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3498DB' }} />
                  <strong style={{ display: 'block', color: '#2C3E50' }}>{event.date}</strong>
                  <span style={{ color: '#7F8C8D' }}>{event.description} by {event.stewardName}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}
    </StateBoundary>
  );
}
