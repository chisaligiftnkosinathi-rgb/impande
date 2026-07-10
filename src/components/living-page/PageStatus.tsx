'use client';

/**
 * PageStatus Component
 * 
 * Answers Question 3: What is happening now?
 * Explains the current work and any blockages.
 */

import { FeatureMetadata } from '@/lib/lifecycle/FeatureLifecycle';
import styles from './LivingPage.module.css';

interface PageStatusProps {
  feature: FeatureMetadata;
}

export default function PageStatus({ feature }: PageStatusProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>⚙️ What Is Happening Now?</h2>
      <p className={styles.sectionContent}>{feature.currentStatus}</p>

      {feature.timeline?.blockages && feature.timeline.blockages.length > 0 && (
        <div className={styles.blockages}>
          <h3 className={styles.blockagesTitle}>Currently Being Tended</h3>
          <ul className={styles.blockagesList}>
            {feature.timeline.blockages.map((blockage, idx) => (
              <li key={idx}>{blockage}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
