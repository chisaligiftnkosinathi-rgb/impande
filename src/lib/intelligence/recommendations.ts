import { KnowledgeObject, RegistryEdge } from "../registry/types";
import { computeScores } from "./scoring";

export interface StewardshipRecommendation {
  objectId?: string;
  type: "Warning" | "Action" | "Info";
  message: string;
  priority: "High" | "Medium" | "Low";
}

export function generateRecommendations(
  objects: KnowledgeObject[],
  edges: RegistryEdge[]
): StewardshipRecommendation[] {
  const recommendations: StewardshipRecommendation[] = [];

  // Find orphaned objects
  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.sourceId);
    connectedIds.add(e.targetId);
  });

  objects.forEach(obj => {
    // Isolated check
    if (!connectedIds.has(obj.id)) {
      recommendations.push({
        objectId: obj.id,
        type: "Warning",
        message: `${obj.type} is isolated from the graph`,
        priority: "High"
      });
    }

    // Missing Evidence Check
    if (obj.type === "Publication" || obj.type === "Software") {
      const hasEvidence = edges.some(e => e.targetId === obj.id && e.type === "Supports");
      if (!hasEvidence) {
        recommendations.push({
          objectId: obj.id,
          type: "Action",
          message: `${obj.type} is missing supporting evidence`,
          priority: "High"
        });
      }
    }

    // Low Trust Score Check
    const scores = computeScores(obj, objects, edges);
    if (scores.trust < 60) {
      recommendations.push({
        objectId: obj.id,
        type: "Warning",
        message: `Low trust score (${scores.trust}%) requires review`,
        priority: "Medium"
      });
    }
    
    // Completeness Check
    if (scores.completeness < 80) {
      recommendations.push({
        objectId: obj.id,
        type: "Action",
        message: `Enhance metadata (tags, URL, repository) to improve completeness`,
        priority: "Low"
      });
    }
  });

  // Sort by priority (High -> Medium -> Low)
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  return recommendations.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
}
