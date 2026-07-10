import styles from "../institute.module.css";

export default function PartnersPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Partnerships</p>
        <h1>Collaborate with AXIONYX Research Institute</h1>
        <p className={styles.lead}>
          We build partnerships that combine scientific rigor, practical implementation,
          and open knowledge exchange.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Who We Collaborate With</h2>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Universities and Research Labs</h3>
            <p>Joint projects, co-authored outputs, supervision, and shared research infrastructure.</p>
          </article>
          <article className={styles.card}>
            <h3>Industry</h3>
            <p>Applied pilots, method transfer, and deployment of evidence-aware software systems.</p>
          </article>
          <article className={styles.card}>
            <h3>Public Institutions</h3>
            <p>Governance-aligned digital transformation for evidence-heavy service environments.</p>
          </article>
          <article className={styles.card}>
            <h3>Civil Society and Community Networks</h3>
            <p>Collaborative open science programmes with measurable social impact.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Partnership Models</h2>
        <ul className={styles.list}>
          <li>Co-designed research programmes and grant proposals.</li>
          <li>Technical pilot implementations and comparative method studies.</li>
          <li>Publication partnerships and conference submissions.</li>
          <li>Training sessions and capability development workshops.</li>
        </ul>
      </section>
    </main>
  );
}
