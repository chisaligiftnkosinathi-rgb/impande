import { registryRepo } from "./repository";
import { buildKnowledgeGraph } from "./graph";
import { getObservatoryMetrics } from "./metrics";
import { KnowledgeObject } from "./types";

/**
 * Public API for UI consumption. 
 * All UI components should import from here, NOT the repository directly.
 */

export async function getKnowledgeObject(id: string) {
  return registryRepo.getObjectById(id);
}

export async function getRecentResearch(limit: number = 5): Promise<KnowledgeObject[]> {
  const objects = await registryRepo.getAllObjects();
  // Sort by updatedAt descending
  return objects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}

export interface SearchOptions {
  query?: string;
  type?: string;
}

export async function searchRegistry(options: SearchOptions | string): Promise<KnowledgeObject[]> {
  if (typeof options === "string") {
    return registryRepo.search({ query: options });
  }
  return registryRepo.search(options);
}

export async function getObjectGraph(id: string) {
  return buildKnowledgeGraph(id);
}

export { getObservatoryMetrics };
