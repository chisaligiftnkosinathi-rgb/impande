import styles from "../institute.module.css";

export default function NewsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>News</p>
        <h1>Institute Updates and Research Announcements</h1>
        <p className={styles.lead}>
          Follow milestones, publication announcements, releases, and collaboration updates.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Launch Timeline</h2>
        <ul className={styles.list}>
          <li>Week 1: Core site launch and navigation baseline.</li>
          <li>Week 2: Programme pages and publication index structure.</li>
          <li>Week 3: Research and software content population.</li>
          <li>Week 4: Accessibility, SEO, and public launch readiness review.</li>
        </ul>
      </section>
    </main>
  );
}
