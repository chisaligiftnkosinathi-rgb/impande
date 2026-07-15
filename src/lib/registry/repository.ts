import { KnowledgeObject, RegistryEdge } from "./types"
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
    if (existing) throw new Error(`Object ${object.id} already exists`)
    
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
    if (!existing) throw new Error(`Object ${id} not found`)

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
    if (!existing) throw new Error(`Object ${id} not found`)
    
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
