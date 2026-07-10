import { getProgrammeLabel, softwareProjects } from "@/lib/axionyx/researchCatalog";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../institute.module.css";

export const metadata: Metadata = {
    title: "Software",
    description:
        "AXIONYX research software catalogue linking methods, programmes, documentation, source code, and release history.",
};

export default function SoftwarePage() {
    const softwareSchemas = softwareProjects.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.name,
        codeRepository: project.sourceCodeHref,
        license: project.license,
        url: `https://axionyx.co.za/software#${project.id}`,
        softwareHelp: project.documentationHref,
        releaseNotes: project.releaseNotesHref,
        applicationCategory: "Scientific",
        softwareVersion: project.status,
    }));

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AXIONYX Research Software",
        itemListElement: softwareSchemas,
    };

    return (
        <main className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <section className={styles.hero}>
                <p className={styles.kicker}>Software</p>
                <h1>Research Software and Open Tooling</h1>
                <p className={styles.lead}>
                    AXIONYX software converts theory into practical systems for continuity, evidence
                    stewardship, and reproducible analysis.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Software as Research Output</h2>
                <div className={styles.grid}>
                    {softwareProjects.map((project) => (
                        <article id={project.id} key={project.id} className={styles.card}>
                            <h3>{project.name}</h3>
                            <p>
                                <span className={styles.metaLabel}>Status</span>
                                <span className={styles.statusBadge}>{project.status}</span>
                            </p>
                            <p>{project.purpose}</p>

                            <div className={styles.metaGrid}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Research Programme</span>
                                    <span className={styles.metaValue}>{getProgrammeLabel(project.researchProgramme)}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>License</span>
                                    <span className={styles.metaValue}>{project.license}</span>
                                </div>
                            </div>

                            <div className={styles.buttonRow}>
                                <a className={styles.secondaryButton} href={project.documentationHref}>
                                    Documentation
                                </a>
                                <a className={styles.secondaryButton} href={project.sourceCodeHref}>
                                    Source Code
                                </a>
                                <a className={styles.secondaryButton} href={project.releaseNotesHref}>
                                    Release Notes
                                </a>
                                <Link className={styles.secondaryButton} href={`/research/${project.researchProgramme}`}>
                                    Programme
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <p className={styles.chain}>
                <strong>Output Linkage</strong>
                <br />
                Programme -&gt; Method -&gt; Paper -&gt; Software -&gt; Results -&gt; Citation
            </p>
        </main>
    );
}
