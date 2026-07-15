import { KnowledgeObject, RegistryEdge } from "../registry/types";

export function getObjectsMissingEvidence(
  objects: KnowledgeObject[],
  edges: RegistryEdge[]
): KnowledgeObject[] {
  // Return objects that do not have any incoming "Supports" edges.
  // Generally, this applies to Publications or Software.
  const supportedObjectIds = new Set(
    edges.filter((e) => e.type === "Supports").map((e) => e.targetId)
  );
  return objects.filter((o) => !supportedObjectIds.has(o.id));
}

export function getUnvalidatedSoftware(
  objects: KnowledgeObject[],
  edges: RegistryEdge[]
): KnowledgeObject[] {
  // Software objects without an incoming "Validates" edge
  const software = objects.filter((o) => o.type === "Software");
  const validatedIds = new Set(
    edges.filter((e) => e.type === "Validates").map((e) => e.targetId)
  );
  return software.filter((s) => !validatedIds.has(s.id));
}

export function getOrphanedObjects(
  objects: KnowledgeObject[],
  edges: RegistryEdge[]
): KnowledgeObject[] {
  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.sourceId);
    connectedIds.add(e.targetId);
  });
  return objects.filter((o) => !connectedIds.has(o.id));
}

export function getMostConnectedObjects(
  objects: KnowledgeObject[],
  edges: RegistryEdge[],
  limit: number = 5
): (KnowledgeObject & { degree: number })[] {
  const degreeMap = new Map<string, number>();
  
  objects.forEach(o => degreeMap.set(o.id, 0));
  
  edges.forEach((e) => {
    if (degreeMap.has(e.sourceId)) {
      degreeMap.set(e.sourceId, degreeMap.get(e.sourceId)! + 1);
    }
    if (degreeMap.has(e.targetId)) {
      degreeMap.set(e.targetId, degreeMap.get(e.targetId)! + 1);
    }
  });

  return objects
    .map(o => ({ ...o, degree: degreeMap.get(o.id) || 0 }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, limit);
}

export function getGraphHealthScore(
  objects: KnowledgeObject[],
  edges: RegistryEdge[]
): number {
  if (objects.length === 0) return 100;
  
  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.sourceId);
    connectedIds.add(e.targetId);
  });

  const connectedCount = objects.filter((o) => connectedIds.has(o.id)).length;
  return Math.round((connectedCount / objects.length) * 100);
}
