import { KnowledgeObject, RegistryEdge } from "./types"

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
