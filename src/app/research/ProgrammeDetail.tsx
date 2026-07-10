import {
    findPublication,
    findSoftware,
    getProgramme,
    getProgrammeLabel,
    ProgrammeSlug,
} from "@/lib/axionyx/researchCatalog";
import Link from "next/link";
import styles from "../institute.module.css";

interface ProgrammeDetailProps {
    slug: ProgrammeSlug;
}

export default function ProgrammeDetail({ slug }: ProgrammeDetailProps) {
    const programme = getProgramme(slug);

    if (!programme) {
        return (
            <main className={styles.page}>
                <section className={styles.hero}>
                    <p className={styles.kicker}>Programme</p>
                    <h1>Programme Not Found</h1>
                </section>
            </main>
        );
    }

    const linkedPublications = programme.publicationIds
        .map((id) => findPublication(id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const linkedSoftware = programme.softwareIds
        .map((id) => findSoftware(id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.kicker}>Programme</p>
                <h1>{programme.name}</h1>
                <p className={styles.lead}>{programme.purpose}</p>
                <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Maturity</span>
                        <span className={styles.metaValue}>{programme.maturity}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Current Status</span>
                        <span className={styles.metaValue}>{programme.currentStatus}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Contact</span>
                        <span className={styles.metaValue}>{programme.contact}</span>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Scientific Question</h2>
                <p>{programme.scientificQuestion}</p>
            </section>

            <section className={styles.section}>
                <h2>Related Publications</h2>
                <ul className={styles.linkList}>
                    {linkedPublications.map((publication) => (
                        <li key={publication.id}>
                            <Link href={`/publications#${publication.id}`}>{publication.title}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.section}>
                <h2>Related Software</h2>
                <ul className={styles.linkList}>
                    {linkedSoftware.map((project) => (
                        <li key={project.id}>
                            <Link href={`/software#${project.id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            <p className={styles.chain}>
                <strong>Traceability Chain</strong>
                <br />
                Research -&gt; Programme -&gt; Publication -&gt; Software -&gt; Evidence -&gt; Citation
            </p>

            <p className={styles.notice}>
                Related outputs are connected so collaborators can follow how methods, software, and
                claims support each other.
            </p>

            <p className={styles.notice}>
                Programme group: {getProgrammeLabel(slug)}.
            </p>
        </main>
    );
}
