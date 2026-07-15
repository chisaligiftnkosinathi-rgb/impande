"use server"

import { registryRepo } from '@/lib/registry/repository';
import { searchIntelligence } from '@/lib/intelligence/search';

export async function searchRegistryAction(query: string) {
  const objects = await registryRepo.getAllObjects();
  return searchIntelligence(objects, query);
}
