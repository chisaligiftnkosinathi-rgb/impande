export type ProgrammeSlug = "enrm" | "chemist" | "ecoist" | "future-programmes";

export interface Programme {
    slug: ProgrammeSlug;
    name: string;
    purpose: string;
    scientificQuestion: string;
    maturity: "Concept" | "Pilot" | "Scaling";
    currentStatus: string;
    contact: string;
    publicationIds: string[];
    softwareIds: string[];
}

export interface Publication {
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    keywords: string[];
    date: string;
    version: string;
    citation: string;
    pdfHref: string;
    relatedSoftwareId: string;
    relatedProgramme: ProgrammeSlug;
}

export interface SoftwareProject {
    id: string;
    name: string;
    status: "Production" | "Pilot" | "Research";
    purpose: string;
    documentationHref: string;
    sourceCodeHref: string;
    releaseNotesHref: string;
    researchProgramme: ProgrammeSlug;
    license: string;
}

export const programmes: Programme[] = [
    {
        slug: "enrm",
        name: "ENRM",
        purpose:
            "Provide a disciplined evidence-native methodology for end-to-end reproducible computational research.",
        scientificQuestion:
            "How can we formalize observation-to-publication workflows so that claims remain inspectable and repeatable over time?",
        maturity: "Pilot",
        currentStatus:
            "Protocol pack and implementation templates are being validated across continuity and governance use-cases.",
        contact: "research@axionyx.co.za",
        publicationIds: ["pub-enrm-001"],
        softwareIds: ["sw-enrm-kit"],
    },
    {
        slug: "chemist",
        name: "ChemIST",
        purpose:
            "Combine chemistry-grade chain-of-custody thinking with information systems engineering for robust digital evidence governance.",
        scientificQuestion:
            "Which evidence-governance patterns from laboratory and accreditation practice transfer effectively into software systems?",
        maturity: "Pilot",
        currentStatus:
            "Method constraints and validation pathways are being tested against real institutional record lifecycles.",
        contact: "research@axionyx.co.za",
        publicationIds: ["pub-chemist-001"],
        softwareIds: ["sw-axis-core"],
    },
    {
        slug: "ecoist",
        name: "EcoIST",
        purpose:
            "Support ecological reasoning and sustainability monitoring through transparent computational pipelines.",
        scientificQuestion:
            "How can environmental evidence, modelling assumptions, and policy-relevant outputs remain reproducible and auditable?",
        maturity: "Concept",
        currentStatus:
            "Problem framing and baseline model architecture are in active formulation with planned pilot datasets.",
        contact: "research@axionyx.co.za",
        publicationIds: ["pub-ecoist-001"],
        softwareIds: ["sw-eco-pipeline"],
    },
    {
        slug: "future-programmes",
        name: "Future Programmes",
        purpose:
            "Incubate emerging lines of inquiry in AI-assisted method execution, cross-institution interoperability, and open research infrastructure.",
        scientificQuestion:
            "What governance and technical controls are required for high-trust, machine-assisted research systems?",
        maturity: "Concept",
        currentStatus:
            "Programme definition underway with staged shortlists for potential pilots and collaborative calls.",
        contact: "partnerships@axionyx.co.za",
        publicationIds: ["pub-future-001"],
        softwareIds: ["sw-registry-lab"],
    },
];

export const publications: Publication[] = [
    {
        id: "pub-enrm-001",
        title: "Evidence-Native Research Methodology: A Reproducibility Framework for Continuity-Grade Systems",
        authors: ["G. Chisali", "AXIONYX Method Group"],
        abstract:
            "This working paper defines ENRM as a structured protocol for preserving evidence lineage from observation through interpretation, review, patching, and verification.",
        keywords: ["ENRM", "reproducibility", "evidence lineage", "research methods"],
        date: "2026-07-01",
        version: "v0.3",
        citation:
            "Chisali, G., AXIONYX Method Group (2026). Evidence-Native Research Methodology. AXIONYX Working Paper v0.3.",
        pdfHref: "/docs/working-papers/enrm-methodology-v0-3.pdf",
        relatedSoftwareId: "sw-enrm-kit",
        relatedProgramme: "enrm",
    },
    {
        id: "pub-chemist-001",
        title: "ChemIST: Translating Chain-of-Custody Principles into Digital Evidence Architecture",
        authors: ["AXIONYX ChemIST Team"],
        abstract:
            "ChemIST proposes architecture-level constraints and validation routines inspired by laboratory quality systems to strengthen software evidence governance.",
        keywords: ["ChemIST", "chain-of-custody", "evidence governance", "digital integrity"],
        date: "2026-06-20",
        version: "v0.2",
        citation:
            "AXIONYX ChemIST Team (2026). ChemIST: Translating Chain-of-Custody Principles into Digital Evidence Architecture. Technical White Paper v0.2.",
        pdfHref: "/docs/working-papers/chemist-white-paper-v0-2.pdf",
        relatedSoftwareId: "sw-axis-core",
        relatedProgramme: "chemist",
    },
    {
        id: "pub-ecoist-001",
        title: "EcoIST Foundations: Transparent Environmental Intelligence for Policy and Practice",
        authors: ["AXIONYX EcoIST Working Group"],
        abstract:
            "This note establishes the first EcoIST design principles for reproducible environmental data preparation, modelling, and interpretation.",
        keywords: ["EcoIST", "environmental modelling", "open science", "transparent pipelines"],
        date: "2026-07-05",
        version: "v0.1",
        citation:
            "AXIONYX EcoIST Working Group (2026). EcoIST Foundations: Transparent Environmental Intelligence. Concept Note v0.1.",
        pdfHref: "/docs/working-papers/ecoist-foundations-v0-1.pdf",
        relatedSoftwareId: "sw-eco-pipeline",
        relatedProgramme: "ecoist",
    },
    {
        id: "pub-future-001",
        title: "Institutional Research Infrastructure Roadmap: Future Programmes 2026-2028",
        authors: ["AXIONYX Strategy and Research Office"],
        abstract:
            "A strategic roadmap covering candidate programmes, readiness gates, and governance criteria for future research expansion.",
        keywords: ["research infrastructure", "roadmap", "governance", "future programmes"],
        date: "2026-07-08",
        version: "v0.1",
        citation:
            "AXIONYX Strategy and Research Office (2026). Institutional Research Infrastructure Roadmap 2026-2028. Strategy Document v0.1.",
        pdfHref: "/docs/roadmaps/research-infrastructure-roadmap-v0-1.pdf",
        relatedSoftwareId: "sw-registry-lab",
        relatedProgramme: "future-programmes",
    },
];

export const softwareProjects: SoftwareProject[] = [
    {
        id: "sw-axis-core",
        name: "AXIS Core",
        status: "Pilot",
        purpose:
            "Evidence governance core for high-integrity institutional workflows and verification checkpoints.",
        documentationHref: "https://github.com/axionyx/axis-core#readme",
        sourceCodeHref: "https://github.com/axionyx/axis-core",
        releaseNotesHref: "https://github.com/axionyx/axis-core/releases",
        researchProgramme: "chemist",
        license: "MIT",
    },
    {
        id: "sw-enrm-kit",
        name: "ENRM Toolkit",
        status: "Research",
        purpose:
            "Reference templates and utilities for evidence-native method execution and audit-ready research packaging.",
        documentationHref: "https://github.com/axionyx/enrm-toolkit#readme",
        sourceCodeHref: "https://github.com/axionyx/enrm-toolkit",
        releaseNotesHref: "https://github.com/axionyx/enrm-toolkit/releases",
        researchProgramme: "enrm",
        license: "Apache-2.0",
    },
    {
        id: "sw-eco-pipeline",
        name: "Eco Pipeline",
        status: "Research",
        purpose:
            "Reproducible environmental data workflow scaffolding for EcoIST pilot studies.",
        documentationHref: "https://github.com/axionyx/eco-pipeline#readme",
        sourceCodeHref: "https://github.com/axionyx/eco-pipeline",
        releaseNotesHref: "https://github.com/axionyx/eco-pipeline/releases",
        researchProgramme: "ecoist",
        license: "MIT",
    },
    {
        id: "sw-registry-lab",
        name: "Registry Lab",
        status: "Pilot",
        purpose:
            "Experimental registry for linking programme artefacts, evidence pointers, and citation trails across projects.",
        documentationHref: "https://github.com/axionyx/registry-lab#readme",
        sourceCodeHref: "https://github.com/axionyx/registry-lab",
        releaseNotesHref: "https://github.com/axionyx/registry-lab/releases",
        researchProgramme: "future-programmes",
        license: "MIT",
    },
];

export function getProgramme(slug: ProgrammeSlug) {
    return programmes.find((programme) => programme.slug === slug);
}

export function getProgrammeLabel(slug: ProgrammeSlug) {
    return programmes.find((programme) => programme.slug === slug)?.name ?? slug;
}

export function findPublication(id: string) {
    return publications.find((publication) => publication.id === id);
}

export function findSoftware(id: string) {
    return softwareProjects.find((project) => project.id === id);
}
