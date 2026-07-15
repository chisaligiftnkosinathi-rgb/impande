import { KnowledgeObject, RegistryEdge } from "../registry/types";

export interface LineageChain {
  path: KnowledgeObject[];
}

/**
 * Traverse graph starting from rootId following a specific direction and edge types.
 * Pure breadth-first search.
 */
function traverse(
  rootId: string,
  objects: Map<string, KnowledgeObject>,
  edges: RegistryEdge[],
  direction: "incoming" | "outgoing",
  allowedEdgeTypes?: string[]
): LineageChain[] {
  const root = objects.get(rootId);
  if (!root) return [];

  const paths: LineageChain[] = [];
  const queue: { currentId: string; path: KnowledgeObject[] }[] = [];
  
  queue.push({ currentId: rootId, path: [root] });
  
  while (queue.length > 0) {
    const { currentId, path } = queue.shift()!;
    let added = false;
    
    // Find neighbors
    const neighbors = edges.filter(e => {
      if (allowedEdgeTypes && !allowedEdgeTypes.includes(e.type)) return false;
      return direction === "outgoing" ? e.sourceId === currentId : e.targetId === currentId;
    });

    for (const edge of neighbors) {
      const nextId = direction === "outgoing" ? edge.targetId : edge.sourceId;
      // Avoid cycles
      if (!path.find(p => p.id === nextId)) {
        const nextObj = objects.get(nextId);
        if (nextObj) {
          queue.push({ currentId: nextId, path: [...path, nextObj] });
          added = true;
        }
      }
    }

    if (!added) {
      // Leaf node for this path
      paths.push({ path });
    }
  }

  return paths;
}

export function getLineage(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  id: string
): { upstream: LineageChain[], downstream: LineageChain[] } {
  const objectMap = new Map(objects.map(o => [o.id, o]));
  return {
    upstream: traverse(id, objectMap, edges, "incoming"),
    downstream: traverse(id, objectMap, edges, "outgoing")
  };
}

export function getEvidenceChain(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  id: string
): LineageChain[] {
  const objectMap = new Map(objects.map(o => [o.id, o]));
  return traverse(id, objectMap, edges, "incoming", ["Supports"]);
}

export function getValidationChain(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  id: string
): LineageChain[] {
  const objectMap = new Map(objects.map(o => [o.id, o]));
  // A standard or software is validated by publications
  return traverse(id, objectMap, edges, "incoming", ["Validates"]);
}

export function getDependencyTree(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  id: string
): LineageChain[] {
  const objectMap = new Map(objects.map(o => [o.id, o]));
  return traverse(id, objectMap, edges, "outgoing", ["Implements", "DerivedFrom"]);
}

export function getImpactRadius(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  id: string
): number {
  const { upstream, downstream } = getLineage(objects, edges, id);
  const uniqueImpacted = new Set<string>();
  
  [...upstream, ...downstream].forEach(chain => {
    chain.path.forEach(obj => uniqueImpacted.add(obj.id));
  });
  
  return uniqueImpacted.size;
}
