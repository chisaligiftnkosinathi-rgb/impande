import {
    findSoftware,
    getProgrammeLabel,
    publications,
} from "@/lib/axionyx/researchCatalog";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../institute.module.css";

export const metadata: Metadata = {
    title: "Publications",
    description:
        "AXIONYX publication archive with structured metadata, citations, programme linkage, and related research software outputs.",
};

export default function PublicationsPage() {
    const scholarlyArticles = publications.map((publication) => ({
        "@type": "ScholarlyArticle",
        headline: publication.title,
        author: publication.authors.map((name) => ({
            "@type": "Person",
            name,
        })),
        abstract: publication.abstract,
        keywords: publication.keywords,
        datePublished: publication.date,
        version: publication.version,
        citation: publication.citation,
        url: `https://axionyx.co.za/publications#${publication.id}`,
    }));

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AXIONYX Publication Archive",
        itemListElement: scholarlyArticles,
    };

    return (
        <main className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <section className={styles.hero}>
                <p className={styles.kicker}>Publications</p>
                <h1>Research Papers, Reports, and Working Notes</h1>
                <p className={styles.lead}>
                    This section houses formal publications and method notes produced by AXIONYX
                    Research Institute.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Publication Archive</h2>
                <div className={styles.grid}>
                    {publications.map((publication) => {
                        const software = findSoftware(publication.relatedSoftwareId);

                        return (
                            <article id={publication.id} key={publication.id} className={styles.card}>
                                <h3>{publication.title}</h3>
                                <div className={styles.metaGrid}>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Authors</span>
                                        <span className={styles.metaValue}>{publication.authors.join(", ")}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Date</span>
                                        <span className={styles.metaValue}>{publication.date}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Version</span>
                                        <span className={styles.metaValue}>{publication.version}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Programme</span>
                                        <span className={styles.metaValue}>
                                            {getProgrammeLabel(publication.relatedProgramme)}
                                        </span>
                                    </div>
                                </div>

                                <p className={styles.abstract}>{publication.abstract}</p>

                                <div className={styles.metaGrid}>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Keywords</span>
                                        <span className={styles.metaValue}>{publication.keywords.join(", ")}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Citation</span>
                                        <span className={styles.metaValue}>{publication.citation}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Related Software</span>
                                        <span className={styles.metaValue}>{software?.name ?? "Pending"}</span>
                                    </div>
                                </div>

                                <div className={styles.buttonRow}>
                                    <a className={styles.secondaryButton} href={publication.pdfHref}>
                                        PDF
                                    </a>
                                    {software && (
                                        <Link className={styles.secondaryButton} href={`/software#${software.id}`}>
                                            Related Software
                                        </Link>
                                    )}
                                    <Link className={styles.secondaryButton} href={`/research/${publication.relatedProgramme}`}>
                                        Related Programme
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <p className={styles.notice}>
                DOI registration and canonical scholarly indexing will be added as publications progress
                from working-paper to final release states.
            </p>
        </main>
    );
}
