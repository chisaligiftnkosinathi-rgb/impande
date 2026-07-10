'use client';

/**
 * LivingPage Component
 * 
 * Renders a feature page that answers the four questions,
 * regardless of the feature's lifecycle state.
 * 
 * Never shows a blank page. Never shows a 404.
 * Every page teaches before it asks.
 */

import { FeatureMetadata } from '@/lib/lifecycle/FeatureLifecycle';
import { StateMetadata } from '@/lib/lifecycle/FeatureStates';
import PagePurpose from './PagePurpose';
import PageStatus from './PageStatus';
import PageTimeline from './PageTimeline';
import PageParticipation from './PageParticipation';
import styles from './LivingPage.module.css';

interface LivingPageProps {
  feature: FeatureMetadata;
  children?: React.ReactNode;
}

/**
 * Main Living Page component
 * This is what a steward sees when they reach a feature
 * that is not yet READY.
 */
export default function LivingPage({ feature, children }: LivingPageProps) {
  const state = StateMetadata[feature.state];

  return (
    <div className={styles.livingPage}>
      {/* State Badge */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.symbol}>{state.symbol}</span>
          <span className={styles.label}>{state.label}</span>
        </div>
        <h1 className={styles.title}>{feature.title}</h1>
        {feature.description && <p className={styles.description}>{feature.description}</p>}
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Question 1: What is this place? */}
        <PagePurpose purpose={feature.purpose} />

        {/* Question 2: Why does it matter? */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🤔 Why This Matters</h2>
          <p className={styles.sectionContent}>{feature.whyMatters}</p>
        </section>

        {/* Question 3: What is happening now? */}
        <PageStatus feature={feature} />

        {/* Timeline (if applicable) */}
        {feature.timeline && <PageTimeline timeline={feature.timeline} />}

        {/* Children content (for full READY pages) */}
        {children && feature.state === 'READY' && (
          <div className={styles.featureContent}>{children}</div>
        )}

        {/* Question 4: How can I participate today? */}
        <PageParticipation options={feature.participationOptions} state={feature.state} />
      </div>

      {/* Links */}
      {feature.links && (
        <footer className={styles.footer}>
          <div className={styles.links}>
            {feature.links.issue && (
              <a href={feature.links.issue} className={styles.link}>
                Report an Issue
              </a>
            )}
            {feature.links.discussion && (
              <a href={feature.links.discussion} className={styles.link}>
                Join Discussion
              </a>
            )}
            {feature.links.documentation && (
              <a href={feature.links.documentation} className={styles.link}>
                Learn More
              </a>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
