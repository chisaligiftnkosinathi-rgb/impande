const fs = require('fs');
const path = require('path');

const registryDir = path.join(__dirname, '../src/lib/registry');
if (!fs.existsSync(registryDir)) fs.mkdirSync(registryDir, { recursive: true });

const files = {
  'types.ts': `export type ObjectType = 
  | "Programme"
  | "Publication"
  | "Software"
  | "Dataset"
  | "EvidencePackage"
  | "Standard"
  | "Product"
  | "Researcher";

export type ObjectStatus = "Verified" | "Pending" | "Deprecated" | "Operational" | "Archived";

export interface BaseKnowledgeObject {
  id: string;
  type: ObjectType;
  title: string;
  summary: string;
  status: ObjectStatus;
  lifecycle: string;
  repository: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Programme extends BaseKnowledgeObject {
  type: "Programme";
  leadOrganization: string;
}

export interface Publication extends BaseKnowledgeObject {
  type: "Publication";
  doi?: string;
  authors: string[];
}

export interface Software extends BaseKnowledgeObject {
  type: "Software";
  version: string;
  license: string;
}

export interface Dataset extends BaseKnowledgeObject {
  type: "Dataset";
  format: string;
  sizeBytes: number;
}

export interface EvidencePackage extends BaseKnowledgeObject {
  type: "EvidencePackage";
  hash: string;
}

export interface Standard extends BaseKnowledgeObject {
  type: "Standard";
  issuer: string;
}

export interface Product extends BaseKnowledgeObject {
  type: "Product";
  manufacturer: string;
}

export interface Researcher extends BaseKnowledgeObject {
  type: "Researcher";
  affiliation: string;
}

export type KnowledgeObject =
  | Programme
  | Publication
  | Software
  | Dataset
  | EvidencePackage
  | Standard
  | Product
  | Researcher;

export type EdgeRelation = 
  | "implements"
  | "supports"
  | "validates"
  | "publishes"
  | "derived-from"
  | "uses"
  | "authored-by";

export interface RegistryEdge {
  from: string;
  to: string;
  relation: EdgeRelation;
}

export interface RegistryData {
  objects: KnowledgeObject[];
  edges: RegistryEdge[];
}
`,

  'mock-data.ts': `import { RegistryData } from "./types";

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
`,

  'repository.ts': `import { KnowledgeObject, RegistryEdge } from "./types";
import { mockRegistry } from "./mock-data";

/**
 * The Repository acts as the Data Access Layer.
 * Currently uses mockRegistry. Will be swapped to SQL/API in the future.
 */
export class RegistryRepository {
  async getAllObjects(): Promise<KnowledgeObject[]> {
    return Promise.resolve(mockRegistry.objects);
  }

  async getObjectById(id: string): Promise<KnowledgeObject | null> {
    const obj = mockRegistry.objects.find((o) => o.id === id);
    return Promise.resolve(obj || null);
  }

  async getAllEdges(): Promise<RegistryEdge[]> {
    return Promise.resolve(mockRegistry.edges);
  }

  async getEdgesByNode(nodeId: string): Promise<RegistryEdge[]> {
    const edges = mockRegistry.edges.filter(
      (e) => e.from === nodeId || e.to === nodeId
    );
    return Promise.resolve(edges);
  }
}

export const registryRepo = new RegistryRepository();
`,

  'graph.ts': `import { KnowledgeObject, RegistryEdge } from "./types";
import { registryRepo } from "./repository";

export interface GraphNode extends KnowledgeObject {
  incomingEdges: RegistryEdge[];
  outgoingEdges: RegistryEdge[];
}

export async function buildKnowledgeGraph(rootId: string): Promise<GraphNode | null> {
  const rootObj = await registryRepo.getObjectById(rootId);
  if (!rootObj) return null;

  const edges = await registryRepo.getEdgesByNode(rootId);
  
  const incomingEdges = edges.filter(e => e.to === rootId);
  const outgoingEdges = edges.filter(e => e.from === rootId);

  return {
    ...rootObj,
    incomingEdges,
    outgoingEdges
  };
}
`,

  'metrics.ts': `import { registryRepo } from "./repository";

export interface ObservatoryMetrics {
  repositories: number;
  publications: number;
  software: number;
  evidencePackages: number;
  researchers: number;
  standards: number;
  products: number;
  totalObjects: number;
}

export async function getObservatoryMetrics(): Promise<ObservatoryMetrics> {
  const objects = await registryRepo.getAllObjects();
  
  // Extract unique repositories
  const uniqueRepos = new Set(objects.map(o => o.repository)).size;

  return {
    repositories: uniqueRepos,
    publications: objects.filter(o => o.type === "Publication").length,
    software: objects.filter(o => o.type === "Software").length,
    evidencePackages: objects.filter(o => o.type === "EvidencePackage").length,
    researchers: objects.filter(o => o.type === "Researcher").length,
    standards: objects.filter(o => o.type === "Standard").length,
    products: objects.filter(o => o.type === "Product").length,
    totalObjects: objects.length,
  };
}
`,

  'api.ts': `import { registryRepo } from "./repository";
import { buildKnowledgeGraph } from "./graph";
import { getObservatoryMetrics } from "./metrics";
import { KnowledgeObject } from "./types";

/**
 * Public API for UI consumption. 
 * All UI components should import from here, NOT the repository directly.
 */

export async function getKnowledgeObject(id: string) {
  return registryRepo.getObjectById(id);
}

export async function getRecentResearch(limit: number = 5): Promise<KnowledgeObject[]> {
  const objects = await registryRepo.getAllObjects();
  // Sort by updatedAt descending
  return objects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

export async function searchRegistry(query: string): Promise<KnowledgeObject[]> {
  const objects = await registryRepo.getAllObjects();
  const q = query.toLowerCase();
  return objects.filter(o => 
    o.id.toLowerCase().includes(q) || 
    o.title.toLowerCase().includes(q) || 
    o.summary.toLowerCase().includes(q)
  );
}

export async function getObjectGraph(id: string) {
  return buildKnowledgeGraph(id);
}

export { getObservatoryMetrics };
`,

  'index.ts': `export * from "./types";
export * from "./api";
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(registryDir, filename), content);
}

console.log('Registry Layer generated.');
