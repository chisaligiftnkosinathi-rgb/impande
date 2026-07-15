import { KnowledgeObject, RegistryEdge } from "./types";
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
