import { KnowledgeObject, RegistryEdge } from "./types";
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
