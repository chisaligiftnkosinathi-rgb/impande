import { SearchQuery, SearchResponse } from '../contracts/dto';
import { apiClient } from './client';

export const search = {
  /**
   * Universal search endpoint.
   * Converts the typed query object into URL query parameters.
   */
  async query(filters: SearchQuery): Promise<SearchResponse<any>> {
    const params = new URLSearchParams();
    
    if (filters.collectionId) params.append('collection', filters.collectionId);
    if (filters.personId) params.append('person', filters.personId);
    if (filters.minConfidence !== undefined) params.append('minConfidence', filters.minConfidence.toString());
    if (filters.hasContradictions) params.append('hasContradictions', 'true');
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.cursor) params.append('cursor', filters.cursor);

    if (filters.sourceTypes && filters.sourceTypes.length > 0) {
      params.append('sourceTypes', filters.sourceTypes.join(','));
    }
    
    if (filters.tags && filters.tags.length > 0) {
      params.append('tags', filters.tags.join(','));
    }

    const response = await apiClient<SearchResponse<any>>(`/search?${params.toString()}`);
    return response.data;
  }
};
