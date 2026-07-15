import fs from 'fs'
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
