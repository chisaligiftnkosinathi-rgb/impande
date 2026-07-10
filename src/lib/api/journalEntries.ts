import { ExplanationResponse } from '../contracts/dto';
import { apiClient } from './client';

export const journalEntries = {
  /**
   * Retrieves the comprehensive explanation of a journal entry's derived meaning,
   * leveraging Next.js fetch caching (revalidated via tags).
   */
  async explain(id: string): Promise<ExplanationResponse> {
    const response = await apiClient<ExplanationResponse>(`/journal-entries/${id}/explain`, {
      next: { tags: [`journal-entry-explain-${id}`] }
    });
    return response.data;
  }
};
