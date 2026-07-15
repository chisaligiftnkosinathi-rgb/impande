"use server"

import { searchRegistry as internalSearch } from '@/lib/registry/api';

export async function searchRegistryAction(query: string) {
  return await internalSearch(query);
}
