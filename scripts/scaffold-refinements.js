const fs = require('fs');
const path = require('path');

const registryDir = path.join(__dirname, '../src/lib/registry');
const validatorsDir = path.join(registryDir, 'validators');
if (!fs.existsSync(validatorsDir)) fs.mkdirSync(validatorsDir, { recursive: true });

// 1. types.ts
let typesContent = fs.readFileSync(path.join(registryDir, 'types.ts'), 'utf8');
if (!typesContent.includes('updatedBy: string;')) {
  typesContent = typesContent.replace('createdBy: string;', 'createdBy: string;\n  updatedBy: string;');
  fs.writeFileSync(path.join(registryDir, 'types.ts'), typesContent);
}

// 2. validators
const koValidatorTs = `import { KnowledgeObject } from "../types"

export function validateKnowledgeObject(obj: KnowledgeObject): void {
  if (!obj.id || obj.id.trim() === "") throw new Error("Validation Error: Object ID is required")
  if (!obj.type) throw new Error("Validation Error: Object type is required")
  if (!obj.title || obj.title.trim() === "") throw new Error("Validation Error: Object title is required")
  if (!obj.summary || obj.summary.trim() === "") throw new Error("Validation Error: Object summary is required")
  if (!obj.repository) throw new Error("Validation Error: Object repository is required")
}
`;
fs.writeFileSync(path.join(validatorsDir, 'knowledge-object.ts'), koValidatorTs);

const edgeValidatorTs = `import { RegistryEdge } from "../types"

export function validateEdge(edge: RegistryEdge): void {
  if (!edge.from || edge.from.trim() === "") throw new Error("Validation Error: Edge 'from' is required")
  if (!edge.to || edge.to.trim() === "") throw new Error("Validation Error: Edge 'to' is required")
  if (!edge.relation) throw new Error("Validation Error: Edge relation is required")
  if (edge.from === edge.to) throw new Error("Validation Error: Circular reference on self not allowed")
}
`;
fs.writeFileSync(path.join(validatorsDir, 'edge.ts'), edgeValidatorTs);

// 3. store.ts
const storeTs = `import { KnowledgeObject, RegistryEdge } from "./types"

export interface RegistrySearch {
  query?: string;
  type?: string;
}

export interface RegistryStore {
  getAll(): Promise<KnowledgeObject[]>
  getById(id: string): Promise<KnowledgeObject | null>

  create(object: KnowledgeObject): Promise<KnowledgeObject>
  
  update(id: string, patch: Partial<KnowledgeObject>): Promise<KnowledgeObject>
  
  archive(id: string): Promise<void>
  
  delete(id: string): Promise<void>

  getEdges(id: string): Promise<RegistryEdge[]>
  getAllEdges(): Promise<RegistryEdge[]>

  addEdge(edge: RegistryEdge): Promise<void>
  
  removeEdge(edge: RegistryEdge): Promise<void>

  search(query: RegistrySearch): Promise<KnowledgeObject[]>
}
`;
fs.writeFileSync(path.join(registryDir, 'store.ts'), storeTs);

// 4. json-adapter.ts
const jsonAdapterTs = `import fs from 'fs'
import path from 'path'
import { RegistryStore, RegistrySearch } from './store'
import { KnowledgeObject, RegistryEdge, RegistryData } from './types'

export class JSONAdapter implements RegistryStore {
  private filePath: string

  constructor() {
    this.filePath = path.join(process.cwd(), 'data', 'registry.json')
  }

  private async readData(): Promise<RegistryData> {
    if (!fs.existsSync(this.filePath)) return { objects: [], edges: [] }
    const raw = await fs.promises.readFile(this.filePath, 'utf-8')
    return JSON.parse(raw) as RegistryData
  }

  private async writeData(data: RegistryData): Promise<void> {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2))
  }

  async getAll(): Promise<KnowledgeObject[]> {
    const data = await this.readData()
    // By default, maybe we filter out deleted? Actually getAll shouldn't, repository should.
    return data.objects
  }

  async getById(id: string): Promise<KnowledgeObject | null> {
    const data = await this.readData()
    return data.objects.find(o => o.id === id) || null
  }

  async create(object: KnowledgeObject): Promise<KnowledgeObject> {
    const data = await this.readData()
    data.objects.push(object)
    await this.writeData(data)
    return object
  }

  async update(id: string, patch: Partial<KnowledgeObject>): Promise<KnowledgeObject> {
    const data = await this.readData()
    const index = data.objects.findIndex(o => o.id === id)
    if (index === -1) throw new Error("Not found")
    const updated = { ...data.objects[index], ...patch } as KnowledgeObject
    data.objects[index] = updated
    await this.writeData(data)
    return updated
  }

  async archive(id: string): Promise<void> {
    const data = await this.readData()
    const index = data.objects.findIndex(o => o.id === id)
    if (index !== -1) {
      data.objects[index].lifecycleStatus = "archived"
      data.objects[index].status = "Archived"
      await this.writeData(data)
    }
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData()
    data.objects = data.objects.filter(o => o.id !== id)
    data.edges = data.edges.filter(e => e.from !== id && e.to !== id)
    await this.writeData(data)
  }

  async getEdges(id: string): Promise<RegistryEdge[]> {
    const data = await this.readData()
    return data.edges.filter(e => e.from === id || e.to === id)
  }

  async getAllEdges(): Promise<RegistryEdge[]> {
    const data = await this.readData()
    return data.edges
  }

  async addEdge(edge: RegistryEdge): Promise<void> {
    const data = await this.readData()
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

  async search(query: RegistrySearch): Promise<KnowledgeObject[]> {
    const data = await this.readData()
    let results = data.objects
    
    if (query.type) {
      const t = query.type.toLowerCase()
      results = results.filter(o => o.type.toLowerCase() === t)
    }
    if (query.query) {
      const q = query.query.toLowerCase()
      results = results.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.title.toLowerCase().includes(q) || 
        o.summary.toLowerCase().includes(q)
      )
    }
    return results
  }
}
`;
fs.writeFileSync(path.join(registryDir, 'json-adapter.ts'), jsonAdapterTs);

// 5. repository.ts
const repositoryTs = `import { KnowledgeObject, RegistryEdge } from "./types"
import { RegistryStore, RegistrySearch } from "./store"
import { JSONAdapter } from "./json-adapter"
import { validateKnowledgeObject } from "./validators/knowledge-object"
import { validateEdge } from "./validators/edge"

export class RegistryRepository {
  constructor(private store: RegistryStore) {}

  async getAllObjects(): Promise<KnowledgeObject[]> {
    return this.store.getAll()
  }

  async getObjectById(id: string): Promise<KnowledgeObject | null> {
    return this.store.getById(id)
  }

  async getAllEdges(): Promise<RegistryEdge[]> {
    return this.store.getAllEdges()
  }

  async getEdgesByNode(nodeId: string): Promise<RegistryEdge[]> {
    return this.store.getEdges(nodeId)
  }

  async search(query: RegistrySearch): Promise<KnowledgeObject[]> {
    return this.store.search(query)
  }

  // Admin Mutations with Validation and Automation
  async createObject(object: KnowledgeObject, actor: string): Promise<KnowledgeObject> {
    validateKnowledgeObject(object)
    
    const existing = await this.store.getById(object.id)
    if (existing) throw new Error(\`Object \${object.id} already exists\`)
    
    object.createdAt = new Date().toISOString()
    object.updatedAt = object.createdAt
    object.createdBy = actor
    object.updatedBy = actor
    object.revision = 1
    if (!object.lifecycleStatus) object.lifecycleStatus = "draft"
    if (!object.status) object.status = "Pending"

    return this.store.create(object)
  }

  async updateObject(id: string, patch: Partial<KnowledgeObject>, actor: string): Promise<KnowledgeObject> {
    const existing = await this.store.getById(id)
    if (!existing) throw new Error(\`Object \${id} not found\`)

    // Protect immutable metadata
    delete patch.id
    delete patch.createdAt
    delete patch.createdBy

    patch.updatedAt = new Date().toISOString()
    patch.updatedBy = actor
    patch.revision = (existing.revision || 1) + 1

    // If we wanted to run validateKnowledgeObject, we'd merge them first:
    const merged = { ...existing, ...patch } as KnowledgeObject
    validateKnowledgeObject(merged)

    return this.store.update(id, patch)
  }

  async archiveObject(id: string, actor: string): Promise<void> {
    const existing = await this.store.getById(id)
    if (!existing) throw new Error(\`Object \${id} not found\`)
    
    // We update via updateObject to keep versioning consistent, 
    // or rely on store.archive. Let's do update to trigger revision bump.
    await this.updateObject(id, { 
      lifecycleStatus: "archived", 
      status: "Archived" 
    }, actor)
  }

  // Soft delete wrapper
  async deleteObject(id: string, actor: string): Promise<void> {
    await this.archiveObject(id, actor)
  }

  async addEdge(edge: RegistryEdge, actor: string): Promise<void> {
    validateEdge(edge)
    const fromExists = await this.store.getById(edge.from)
    const toExists = await this.store.getById(edge.to)
    if (!fromExists || !toExists) throw new Error("Invalid edge reference: missing node")
    
    await this.store.addEdge(edge)
  }

  async removeEdge(edge: RegistryEdge, actor: string): Promise<void> {
    await this.store.removeEdge(edge)
  }
}

export const registryRepo = new RegistryRepository(new JSONAdapter())
`;
fs.writeFileSync(path.join(registryDir, 'repository.ts'), repositoryTs);

console.log('Refinements scaffolded successfully.');
