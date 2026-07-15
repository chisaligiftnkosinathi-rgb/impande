import Fuse from 'fuse.js';
import { KnowledgeObject } from "../registry/types";

export interface SearchOptions {
  fuzzy?: boolean;
  limit?: number;
}

export function searchIntelligence(
  objects: KnowledgeObject[],
  query: string,
  options?: SearchOptions
): KnowledgeObject[] {
  if (!query) return objects;

  const limit = options?.limit || 20;

  // Configure Fuse.js with weighted fields
  const fuseOptions = {
    keys: [
      { name: 'id', weight: 2.0 },
      { name: 'title', weight: 1.5 },
      { name: 'type', weight: 1.2 },
      { name: 'metadata.tags', weight: 1.0 },
      { name: 'summary', weight: 0.8 },
      { name: 'metadata.repository', weight: 0.8 },
    ],
    threshold: options?.fuzzy === false ? 0.2 : 0.4, // lower threshold for stricter matching
    includeScore: true,
    ignoreLocation: true,
    useExtendedSearch: true
  };

  const fuse = new Fuse(objects, fuseOptions);
  
  // If the user uses multi-token queries like "software iso", Fuse's extended search
  // handles this gracefully with OR by default, or we can format it. For now, simple query works well.
  
  const results = fuse.search(query);
  
  return results.map(r => r.item).slice(0, limit);
}
