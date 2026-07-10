import styles from "../institute.module.css";

export default function OpenSciencePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Open Science</p>
        <h1>Transparent, Reusable, Community-Oriented Research</h1>
        <p className={styles.lead}>
          We support open science by publishing methods, software, and evidence structures
          that can be reviewed, reused, and improved collaboratively.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Open Science Commitments</h2>
        <ul className={styles.list}>
          <li>Method transparency and reproducibility-first documentation.</li>
          <li>Versioned software and publication artifacts.</li>
          <li>Collaborative knowledge sharing across institutions.</li>
          <li>Ethical, context-aware application of computational systems.</li>
        </ul>
      </section>
    </main>
  );
}
