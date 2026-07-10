'use client';

/**
 * PagePurpose Component
 * 
 * Answers Question 1: What is this place?
 */

import styles from './LivingPage.module.css';

interface PagePurposeProps {
  purpose: string;
}

export default function PagePurpose({ purpose }: PagePurposeProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>🌍 What Is This Place?</h2>
      <p className={styles.sectionContent}>{purpose}</p>
    </section>
  );
}
