import Link from "next/link";
import styles from "./institute.module.css";

const programmes = [
  {
    name: "ENRM",
    description:
      "Evidence-Native Research Methodology for reproducible, accountable scientific workflows.",
    href: "/research/enrm",
  },
  {
    name: "ChemIST",
    description:
      "Chemistry x Information Systems for evidence lineage, governance, and computational continuity.",
    href: "/research/chemist",
  },
  {
    name: "EcoIST",
    description:
      "Environmental and ecological systems intelligence supported by transparent data and repeatable methods.",
    href: "/research/ecoist",
  },
  {
    name: "Future Programmes",
    description:
      "Emerging workstreams in applied AI, digital trust, and institution-scale open science infrastructure.",
    href: "/research/future-programmes",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>AXIONYX Research Institute</p>
        <h1>Advancing Scientific Discovery Through Reproducible Computational Research</h1>
        <p className={styles.lead}>
          AXIONYX develops methods, software, and open knowledge systems that strengthen how
          research is produced, verified, and shared across institutions and communities.
        </p>
        <div className={styles.buttonRow}>
          <Link className={styles.primaryButton} href="/research">
            Explore Research
          </Link>
          <Link className={styles.secondaryButton} href="/publications">
            Publications
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Mission</h2>
        <p>
          The institute exists to build trustworthy research systems where evidence, methods,
          and results remain inspectable, reproducible, and useful over time. We align
          computational rigor with social purpose to accelerate science that serves people.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Research Programmes</h2>
        <div className={styles.grid}>
          {programmes.map((programme) => (
            <article key={programme.name} className={styles.card}>
              <h3>{programme.name}</h3>
              <p>{programme.description}</p>
              <div className={styles.buttonRow}>
                <Link className={styles.secondaryButton} href={programme.href}>
                  View Programme
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.split}`}>
        <article className={styles.card}>
          <h3>Latest Publications</h3>
          <ul className={styles.list}>
            <li>Computational continuity and evidence lineage patterns (working paper).</li>
            <li>Research governance architecture for open science institutions.</li>
            <li>Field calibration reports and emerging methodology notes.</li>
          </ul>
          <div className={styles.buttonRow}>
            <Link className={styles.secondaryButton} href="/publications">
              Browse Publications
            </Link>
          </div>
        </article>

        <article className={styles.card}>
          <h3>Open Source Software</h3>
          <p>
            AXIONYX software translates research frameworks into practical tools for
            governance, traceability, and institutional evidence stewardship.
          </p>
          <div className={styles.buttonRow}>
            <Link className={styles.secondaryButton} href="/software">
              Explore Software
            </Link>
          </div>
        </article>
      </section>

      <section className={styles.section}>
        <h2>Collaborations</h2>
        <p>
          We welcome partnerships with universities, public institutions, laboratories,
          industry, and civil society actors who are committed to high-trust, open, and
          reproducible science.
        </p>
        <div className={styles.buttonRow}>
          <Link className={styles.secondaryButton} href="/partners">
            Partnership Pathways
          </Link>
          <Link className={styles.secondaryButton} href="/contact">
            Contact Institute
          </Link>
        </div>
      </section>

      <p className={styles.notice}>
        Domain note: axionyx.co.za is the institute&apos;s public research platform domain.
      </p>
    </main>
  );
}
