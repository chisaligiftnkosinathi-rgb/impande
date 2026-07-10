import { PrismaClient } from '@prisma/client';
import { ListCollectionsQuery } from '../contracts/dto';

const prisma = new PrismaClient();

export class CollectionService {
  /**
   * Retrieves paginated collections and calculates operational metrics.
   */
  static async listCollections(query: ListCollectionsQuery) {
    const limit = query.limit || 20;

    const collections = await prisma.collection.findMany({
      take: limit,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            entities: true,
            entries: true
          }
        }
      }
    });

    // In a mature system, this health mapping would be cached.
    const decorated = collections.map(col => ({
      id: col.id,
      name: col.name,
      description: col.description,
      metrics: {
        totalEntities: col._count.entities,
        totalEntries: col._count.entries
      },
      createdAt: col.createdAt.toISOString(),
      updatedAt: col.updatedAt.toISOString()
    }));

    return {
      results: decorated,
      nextCursor: decorated.length === limit ? decorated[decorated.length - 1].id : null
    };
  }

  static async getCollectionHealth(collectionId: string) {
    // A domain-specific feature that queries how many entries have contradictions or lack evidence.
    const totalEntries = await prisma.journalEntry.count({ where: { collectionId } });
    
    const contradictedEntries = await prisma.journalEntryRevision.count({
      where: {
        journalEntry: { collectionId },
        conflictStatus: { in: ['contradicted', 'disputed'] }
      }
    });

    return {
      totalEntries,
      unresolvedContradictions: contradictedEntries,
      healthScore: totalEntries > 0 ? (totalEntries - contradictedEntries) / totalEntries : 1.0
    };
  }
}
