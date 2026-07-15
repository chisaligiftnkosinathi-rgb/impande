import { RegistryData } from "./types";

export const mockRegistry: RegistryData = {
  objects: [
    {
      id: "AX-SW-0004",
      type: "Software",
      title: "ChemIS",
      summary: "Computational Chemistry Intelligence System for material property prediction.",
      status: "Operational",
      lifecycle: "Production",
      repository: "axionyx-software",
      tags: ["chemistry", "intelligence"],
      createdAt: "2025-11-10T00:00:00Z",
      updatedAt: "2026-06-15T00:00:00Z",
      version: "2.4.1",
      license: "MIT"
    },
    {
      id: "AX-PUB-0019",
      type: "Publication",
      title: "Coal Washability Study",
      summary: "Comprehensive evidence-based analysis of modern coal washability curves.",
      status: "Verified",
      lifecycle: "Released",
      repository: "axionyx-publications",
      tags: ["coal", "mining", "analysis"],
      createdAt: "2026-01-20T00:00:00Z",
      updatedAt: "2026-07-15T00:00:00Z",
      authors: ["Dr. Evelyn Vance"],
      doi: "10.1234/axionyx.2026.0019"
    },
    {
      id: "AX-EV-0021",
      type: "EvidencePackage",
      title: "WashCurve Validation Dataset",
      summary: "Cryptographic evidence package verifying the computational outputs of CoalAssist.",
      status: "Verified",
      lifecycle: "Archived",
      repository: "axionyx-evidence",
      tags: ["validation", "dataset"],
      createdAt: "2026-07-14T00:00:00Z",
      updatedAt: "2026-07-14T00:00:00Z",
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
      id: "ISO-17025",
      type: "Standard",
      title: "ISO/IEC 17025",
      summary: "General requirements for the competence of testing and calibration laboratories.",
      status: "Operational",
      lifecycle: "Active",
      repository: "external-standards",
      tags: ["compliance", "laboratory"],
      createdAt: "2017-11-01T00:00:00Z",
      updatedAt: "2017-11-01T00:00:00Z",
      issuer: "ISO"
    },
    {
      id: "PROD-COALASSIST",
      type: "Product",
      title: "CoalAssist",
      summary: "Industrial analytics suite for coal preparation plant optimization.",
      status: "Operational",
      lifecycle: "Production",
      repository: "axionyx-products",
      tags: ["software", "mining", "analytics"],
      createdAt: "2026-02-10T00:00:00Z",
      updatedAt: "2026-07-10T00:00:00Z",
      manufacturer: "AXIONYX Solutions"
    }
  ],
  edges: [
    { from: "AX-SW-0004", to: "ISO-17025", relation: "implements" },
    { from: "AX-PUB-0019", to: "AX-SW-0004", relation: "validates" },
    { from: "AX-EV-0021", to: "PROD-COALASSIST", relation: "supports" },
    { from: "PROD-COALASSIST", to: "AX-SW-0004", relation: "uses" }
  ]
};
