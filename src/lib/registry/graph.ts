import { KnowledgeObject, RegistryEdge } from "./types";
import { registryRepo } from "./repository";

export interface GraphNode extends KnowledgeObject {
  incomingEdges: RegistryEdge[];
  outgoingEdges: RegistryEdge[];
}

export async function buildKnowledgeGraph(rootId: string, options: { depth?: number } = {}): Promise<GraphNode | null> {
  const depth = options.depth ?? 1;
  const rootObj = await registryRepo.getObjectById(rootId);
  if (!rootObj) return null;

  // For now, implement simple depth 1 traversal since the mock data is small.
  // In a real graph DB, this would be a recursive recursive query.
  // This acts as the facade.
  const allEdges = await registryRepo.getAllEdges();
  const incomingEdges = allEdges.filter(e => e.to === rootId);
  const outgoingEdges = allEdges.filter(e => e.from === rootId);

  return {
    ...rootObj,
    incomingEdges,
    outgoingEdges
  };
}
