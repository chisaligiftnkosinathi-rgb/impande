'use client';

/**
 * PageParticipation Component
 * 
 * Answers Question 4: How can I participate today?
 * Gives stewards a meaningful path forward, even when a feature is unfinished.
 * 
 * Every page teaches before it asks.
 * This component shows what a steward can do *now*, not just what they'll do *later*.
 */

import { ParticipationOption } from '@/lib/lifecycle/FeatureLifecycle';
import { FeatureStateType } from '@/lib/lifecycle/FeatureStates';
import styles from './LivingPage.module.css';

interface PageParticipationProps {
  options: ParticipationOption[];
  state: FeatureStateType;
}

export default function PageParticipation({ options, state }: PageParticipationProps) {
  const getParticipationMessage = (): string => {
    switch (state) {
      case 'DISCOVERED':
        return 'Learn how this discovery emerged from real need.';
      case 'PLANNED':
        return 'Explore the vision and constitutional principles guiding this feature.';
      case 'PRESERVED':
        return 'See what is being tended, and understand why this work matters.';
      case 'IMPLEMENTING':
        return 'Observe the development process and share early feedback.';
      case 'UNDER_REVIEW':
        return 'Help verify this feature by testing and providing steward feedback.';
      case 'READY':
        return 'Use this feature fully and share your experience.';
      case 'ARCHIVED':
        return 'Learn from what came before and understand the continuity.';
      default:
        return 'Find a way to engage with this feature.';
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>🤝 How Can I Participate Today?</h2>
      <p className={styles.sectionIntro}>{getParticipationMessage()}</p>

      {options && options.length > 0 ? (
        <div className={styles.participationOptions}>
          {options.map((option, idx) => (
            <div key={idx} className={styles.participationOption}>
              {option.href ? (
                <a href={option.href} className={styles.participationLink}>
                  <strong>{option.label}</strong>
                </a>
              ) : (
                <strong>{option.label}</strong>
              )}
              {option.description && <p>{option.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noParticipation}>
          Return later when this feature is ready for your participation.
        </p>
      )}
    </section>
  );
}
