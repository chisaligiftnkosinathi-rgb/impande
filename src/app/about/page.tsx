import type { Metadata } from "next";
import styles from "../institute.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "AXIONYX Research Institute mission, governance, research philosophy, and institutional timeline.",
};

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: "AXIONYX Research Institute",
    url: "https://axionyx.co.za",
    legalName: "Global IT and Business Solutions (Pty) Ltd",
    description:
      "Research institute focused on computational methods, evidence stewardship, and reproducible science.",
    email: "info@axionyx.co.za",
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className={styles.hero}>
        <p className={styles.kicker}>About AXIONYX</p>
        <h1>Building Durable Research Infrastructure for High-Trust Science</h1>
        <p className={styles.lead}>
          AXIONYX Research Institute combines methodological research, software engineering,
          and open publication practice to improve how scientific knowledge is produced and
          maintained over time.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Mission</h2>
        <p>
          Advance scientific discovery through computational research systems that preserve
          evidence lineage, reproducibility, and institutional memory.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Vision</h2>
        <p>
          A research ecosystem where methods and evidence are as reusable and transparent as
          the claims they support.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Governance</h2>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Constitutional Research Principles</h3>
            <p>
              Work is guided by evidence stewardship, methodological transparency, and public
              accountability.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Open, Inspectable Workflows</h3>
            <p>
              Where possible, methods and software are published to support external review and
              reproducibility.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Institutional Continuity</h3>
            <p>
              Research outputs are curated for long-term access and future reuse by stewards,
              researchers, and collaborators.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Research Philosophy</h2>
        <div className={styles.pairGrid}>
          <article className={styles.card}>
            <h3>Open Science Policy</h3>
            <p>
              Methods, software, and publication artefacts are documented to support external
              review and collaboration wherever constraints permit.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Reproducibility Statement</h3>
            <p>
              Claims should be traceable to evidence, and outputs should be reproducible from
              inspectable workflows, versions, and assumptions.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Scientific Integrity</h3>
            <p>
              AXIONYX emphasizes methodological transparency, explicit uncertainty handling, and
              correction-friendly publication practices.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Organizational Structure</h3>
            <p>
              Work is coordinated through programme-led research groups and software tracks,
              aligned to institute governance and legal oversight.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>History</h2>
        <p>
          The institute grows from ongoing work across continuity science, evidence
          governance, and software systems initially developed under the iPhande and AXIS
          research ecosystem.
        </p>

        <div className={styles.timeline}>
          <article className={styles.timelineItem}>
            <p className={styles.timelineYear}>2021</p>
            <p className={styles.timelineText}>Global IT and Business Solutions (Pty) Ltd founded.</p>
          </article>
          <article className={styles.timelineItem}>
            <p className={styles.timelineYear}>2026</p>
            <p className={styles.timelineText}>AXIONYX Research Institute public identity established.</p>
          </article>
          <article className={styles.timelineItem}>
            <p className={styles.timelineYear}>2026</p>
            <p className={styles.timelineText}>ENRM formalization and methodological pilot cycles begin.</p>
          </article>
          <article className={styles.timelineItem}>
            <p className={styles.timelineYear}>2026</p>
            <p className={styles.timelineText}>ChemIST architecture validation and programme linkage.</p>
          </article>
          <article className={styles.timelineItem}>
            <p className={styles.timelineYear}>Next</p>
            <p className={styles.timelineText}>Future programmes, collaborative pilots, and open publication expansion.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
