const fs = require('fs');
const path = require('path');

// 1. Move mock-data.ts to data/registry.json
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Read existing mock data (since we know it's there and can convert to JSON)
const mockDataContent = fs.readFileSync(path.join(__dirname, '../src/lib/registry/mock-data.ts'), 'utf8');

// Quick and dirty extraction of the JSON object inside mockRegistry
// We can just define the initial state manually since it's small.
const initialRegistry = {
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
      createdBy: "system",
      revision: 1,
      lifecycleStatus: "active",
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
      createdBy: "system",
      revision: 1,
      lifecycleStatus: "active",
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
      createdBy: "system",
      revision: 1,
      lifecycleStatus: "archived",
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
      createdBy: "system",
      revision: 1,
      lifecycleStatus: "active",
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
      createdBy: "system",
      revision: 1,
      lifecycleStatus: "active",
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

fs.writeFileSync(path.join(dataDir, 'registry.json'), JSON.stringify(initialRegistry, null, 2));

// Delete mock-data.ts
try {
  fs.unlinkSync(path.join(__dirname, '../src/lib/registry/mock-data.ts'));
} catch(e) {}

// 2. Scaffold Store Interface and Adapters
const registryDir = path.join(__dirname, '../src/lib/registry');

const storeTs = `import { KnowledgeObject, RegistryEdge } from "./types"

export interface RegistryStore {
  getAll(): Promise<KnowledgeObject[]>
  getById(id: string): Promise<KnowledgeObject | null>
  
  create(object: KnowledgeObject): Promise<void>
  update(id: string, patch: Partial<KnowledgeObject>): Promise<void>
  delete(id: string): Promise<void>
  
  getAllEdges(): Promise<RegistryEdge[]>
  getEdgesByNode(nodeId: string): Promise<RegistryEdge[]>
  addEdge(edge: RegistryEdge): Promise<void>
  removeEdge(edge: RegistryEdge): Promise<void>
}
`;
fs.writeFileSync(path.join(registryDir, 'store.ts'), storeTs);

const jsonAdapterTs = `import fs from 'fs'
import path from 'path'
import { RegistryStore } from './store'
import { KnowledgeObject, RegistryEdge, RegistryData } from './types'

export class JSONAdapter implements RegistryStore {
  private filePath: string

  constructor() {
    this.filePath = path.join(process.cwd(), 'data', 'registry.json')
  }

  private async readData(): Promise<RegistryData> {
    if (!fs.existsSync(this.filePath)) {
      return { objects: [], edges: [] }
    }
    const raw = await fs.promises.readFile(this.filePath, 'utf-8')
    return JSON.parse(raw) as RegistryData
  }

  private async writeData(data: RegistryData): Promise<void> {
    // In local dev, we write to disk. In Vercel Edge, this throws, but we accept this constraint for Option C.
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2))
  }

  async getAll(): Promise<KnowledgeObject[]> {
    const data = await this.readData()
    return data.objects
  }

  async getById(id: string): Promise<KnowledgeObject | null> {
    const data = await this.readData()
    return data.objects.find(o => o.id === id) || null
  }

  async create(object: KnowledgeObject): Promise<void> {
    const data = await this.readData()
    data.objects.push(object)
    await this.writeData(data)
  }

  async update(id: string, patch: Partial<KnowledgeObject>): Promise<void> {
    const data = await this.readData()
    const index = data.objects.findIndex(o => o.id === id)
    if (index !== -1) {
      data.objects[index] = { ...data.objects[index], ...patch } as KnowledgeObject
      await this.writeData(data)
    }
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData()
    data.objects = data.objects.filter(o => o.id !== id)
    data.edges = data.edges.filter(e => e.from !== id && e.to !== id)
    await this.writeData(data)
  }

  async getAllEdges(): Promise<RegistryEdge[]> {
    const data = await this.readData()
    return data.edges
  }

  async getEdgesByNode(nodeId: string): Promise<RegistryEdge[]> {
    const data = await this.readData()
    return data.edges.filter(e => e.from === nodeId || e.to === nodeId)
  }

  async addEdge(edge: RegistryEdge): Promise<void> {
    const data = await this.readData()
    // prevent duplicates
    if (!data.edges.find(e => e.from === edge.from && e.to === edge.to && e.relation === edge.relation)) {
      data.edges.push(edge)
      await this.writeData(data)
    }
  }

  async removeEdge(edge: RegistryEdge): Promise<void> {
    const data = await this.readData()
    data.edges = data.edges.filter(e => !(e.from === edge.from && e.to === edge.to && e.relation === edge.relation))
    await this.writeData(data)
  }
}
`;
fs.writeFileSync(path.join(registryDir, 'json-adapter.ts'), jsonAdapterTs);

// Update Types
const typesContent = fs.readFileSync(path.join(registryDir, 'types.ts'), 'utf8');
const newTypesContent = typesContent.replace(
  '  updatedAt: string;',
  `  updatedAt: string;
  createdBy: string;
  revision: number;
  lifecycleStatus: string;
  version?: string;`
);
fs.writeFileSync(path.join(registryDir, 'types.ts'), newTypesContent);

// Update Repository
const repositoryTs = `import { KnowledgeObject, RegistryEdge } from "./types";
import { RegistryStore } from "./store";
import { JSONAdapter } from "./json-adapter";

// The unified repository now delegates to the adapter
// We can switch this to PostgresAdapter in the future.
export class RegistryRepository {
  constructor(private store: RegistryStore) {}

  async getAllObjects(): Promise<KnowledgeObject[]> {
    return this.store.getAll();
  }

  async getObjectById(id: string): Promise<KnowledgeObject | null> {
    return this.store.getById(id);
  }

  async getAllEdges(): Promise<RegistryEdge[]> {
    return this.store.getAllEdges();
  }

  async getEdgesByNode(nodeId: string): Promise<RegistryEdge[]> {
    return this.store.getEdgesByNode(nodeId);
  }

  // Admin Mutations with Validation
  async createObject(object: KnowledgeObject): Promise<void> {
    if (!object.id) throw new Error("Object ID is required");
    const existing = await this.store.getById(object.id);
    if (existing) throw new Error(\`Object \${object.id} already exists\`);
    
    // Enforce immutable fields
    object.createdAt = new Date().toISOString();
    object.updatedAt = object.createdAt;
    object.revision = 1;
    if (!object.createdBy) object.createdBy = "admin";
    if (!object.lifecycleStatus) object.lifecycleStatus = "draft";

    await this.store.create(object);
  }

  async updateObject(id: string, patch: Partial<KnowledgeObject>): Promise<void> {
    const existing = await this.store.getById(id);
    if (!existing) throw new Error(\`Object \${id} not found\`);

    // Protect immutable metadata
    delete patch.id;
    delete patch.createdAt;
    delete patch.createdBy;

    patch.updatedAt = new Date().toISOString();
    patch.revision = (existing.revision || 1) + 1;

    await this.store.update(id, patch);
  }

  async addEdge(edge: RegistryEdge): Promise<void> {
    if (edge.from === edge.to) throw new Error("Circular reference on self not allowed");
    const fromExists = await this.store.getById(edge.from);
    const toExists = await this.store.getById(edge.to);
    if (!fromExists || !toExists) throw new Error("Invalid edge reference: missing node");
    
    await this.store.addEdge(edge);
  }

  async removeEdge(edge: RegistryEdge): Promise<void> {
    await this.store.removeEdge(edge);
  }
}

// Global Singleton
export const registryRepo = new RegistryRepository(new JSONAdapter());
`;
fs.writeFileSync(path.join(registryDir, 'repository.ts'), repositoryTs);

console.log('Storage Layer Scaffolded successfully.');
