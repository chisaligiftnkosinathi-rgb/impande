'use client';

/**
 * PageTimeline Component
 * 
 * Shows when a feature is expected to reach the next state.
 * Provides hope and a sense of continuity.
 */

import { FeatureTimeline } from '@/lib/lifecycle/FeatureLifecycle';
import styles from './LivingPage.module.css';

interface PageTimelineProps {
  timeline: FeatureTimeline;
}

export default function PageTimeline({ timeline }: PageTimelineProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>📅 Timeline</h2>

      <div className={styles.timelineBox}>
        <div className={styles.timelineItem}>
          <strong>Current Phase:</strong>
          <p>{timeline.currentPhase}</p>
        </div>

        {timeline.nextMilestone && (
          <div className={styles.timelineItem}>
            <strong>Next Milestone:</strong>
            <p>{timeline.nextMilestone}</p>
          </div>
        )}

        {timeline.estimatedReadyDate && (
          <div className={styles.timelineItem}>
            <strong>Estimated Ready:</strong>
            <p>{timeline.estimatedReadyDate}</p>
          </div>
        )}
      </div>

      <p className={styles.timelineNote}>
        This work is being tended with care. Dates may shift as we learn what is needed.
      </p>
    </section>
  );
}
