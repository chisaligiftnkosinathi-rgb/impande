import Link from "next/link";
import styles from "../institute.module.css";
import { programmes } from "@/lib/axionyx/researchCatalog";

export default function ResearchPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Research</p>
        <h1>Programmes, Methods, and Open Research Outputs</h1>
        <p className={styles.lead}>
          Our research combines theory, method engineering, and deployable software to
          strengthen reproducibility and trust in scientific systems.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Core Programmes</h2>
        <div className={styles.grid}>
          {programmes.map((programme) => (
            <article key={programme.slug} className={styles.card}>
              <h3>{programme.name}</h3>
              <p>{programme.purpose}</p>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Maturity</span>
                  <span className={styles.metaValue}>{programme.maturity}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Status</span>
                  <span className={styles.metaValue}>{programme.currentStatus}</span>
                </div>
              </div>
              <div className={styles.buttonRow}>
                <Link className={styles.secondaryButton} href={`/research/${programme.slug}`}>
                  Open Programme
                </Link>
                <Link className={styles.secondaryButton} href="/publications">
                  Publications
                </Link>
                <Link className={styles.secondaryButton} href="/software">
                  Software
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Current Focus Areas</h2>
        <ul className={styles.list}>
          <li>Reproducible method design and execution protocols.</li>
          <li>Evidence lineage and verification across institutional systems.</li>
          <li>Open publication and research software lifecycle practices.</li>
          <li>Collaborative pilots with academic and industry partners.</li>
        </ul>
      </section>

      <p className={styles.chain}>
        <strong>Connected Research Structure</strong>
        <br />
        Research -&gt; Programme -&gt; Publication -&gt; Software -&gt; Evidence -&gt; Citation
      </p>
    </main>
  );
}
