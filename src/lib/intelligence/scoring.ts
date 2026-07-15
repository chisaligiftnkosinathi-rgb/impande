import { KnowledgeObject, RegistryEdge } from "../registry/types";
import { getImpactRadius } from "./lineage";

export interface ObjectScores {
  trust: number;
  integrity: number;
  evidence: number;
  connectivity: number;
  completeness: number;
}

export function computeScores(
  object: KnowledgeObject,
  allObjects: KnowledgeObject[],
  allEdges: RegistryEdge[]
): ObjectScores {
  // 1. Completeness Score
  let completeness = 50;
  if (object.metadata?.tags && object.metadata.tags.length > 0) completeness += 20;
  if (object.metadata?.repository) completeness += 10;
  if (object.metadata?.url) completeness += 20;

  // 2. Connectivity Score
  const incoming = allEdges.filter(e => e.targetId === object.id).length;
  const outgoing = allEdges.filter(e => e.sourceId === object.id).length;
  const degree = incoming + outgoing;
  // Non-linear scale, 5+ edges is 100%
  const connectivity = Math.min(100, Math.round((degree / 5) * 100));

  // 3. Evidence Score
  let evidence = 0;
  const supportsEdges = allEdges.filter(e => e.targetId === object.id && e.type === "Supports");
  if (supportsEdges.length > 0) evidence = 100;
  else if (object.type !== "Software" && object.type !== "Publication") evidence = 100; // N/A for others

  // 4. Integrity Score
  // Checks if edges actually point to valid objects (no dangling pointers)
  const connectedNodes = allEdges.filter(e => e.sourceId === object.id || e.targetId === object.id);
  const validEdges = connectedNodes.filter(e => {
    const otherId = e.sourceId === object.id ? e.targetId : e.sourceId;
    return allObjects.find(o => o.id === otherId) !== undefined;
  });
  const integrity = connectedNodes.length === 0 ? 100 : Math.round((validEdges.length / connectedNodes.length) * 100);

  // 5. Trust Score (Composite)
  const trust = Math.round((completeness + connectivity + evidence + integrity) / 4);

  return { trust, integrity, evidence, connectivity, completeness };
}
