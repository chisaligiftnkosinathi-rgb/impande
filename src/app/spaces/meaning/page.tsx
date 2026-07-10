import React from 'react';
import { MeaningEngine } from '../../../lib/meaning/MeaningEngine';
import { ThemeCard } from './components/ThemeCard';
import { FamilyNarrative } from './components/FamilyNarrative';
import { LanguageDistribution } from './components/LanguageDistribution';
import { ResearchOpportunities } from './components/ResearchOpportunities';

export const dynamic = 'force-dynamic';

export default async function MeaningEngineDashboard() {
  // In a real implementation, we would get the spaceId from the session/route
  const spaceId = "default-space";
  
  const { themes, narrative, researchOpportunities, languageDistribution } = await MeaningEngine.analyzeSpace(spaceId);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ color: '#3A2E1F', fontSize: '2.5rem', marginBottom: '16px' }}>The Meaning Engine</h1>
        <p style={{ color: '#6C5434', fontSize: '1.25rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
          "Truth tells us what happened. Meaning helps us understand why it mattered."
        </p>
      </header>

      <FamilyNarrative narrative={narrative} />

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ borderBottom: '2px solid #6C5434', paddingBottom: '8px', color: '#3A2E1F', marginBottom: '24px' }}>
          Generational Themes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
          {themes.map((theme, idx) => (
            <ThemeCard key={idx} theme={theme} />
          ))}
        </div>
      </section>

      <LanguageDistribution distribution={languageDistribution} />

      <ResearchOpportunities opportunities={researchOpportunities} />
    </div>
  );
}
