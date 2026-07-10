import { PrismaClient } from '@prisma/client';
import { SearchQuery, SearchResponse } from '../contracts/dto';

const prisma = new PrismaClient();

export class SearchService {
  /**
   * Universal search engine for the Truth Engine.
   * Supports cursor pagination and faceted metadata responses.
   */
  static async searchJournalEntries(query: SearchQuery): Promise<SearchResponse<any>> {
    const start = Date.now();

    const whereClause: any = {};

    if (query.collectionId) {
      whereClause.collectionId = query.collectionId;
    }

    if (query.personId) {
      whereClause.linkedEntities = {
        some: { entityId: query.personId }
      };
    }

    // We build the query targeting the Current Accepted Revision
    const revisionFilters: any = {};

    if (query.minConfidence !== undefined) {
      revisionFilters.confidenceSeed = { gte: query.minConfidence };
    }

    if (query.hasContradictions) {
      revisionFilters.conflictStatus = { in: ['contradicted', 'disputed'] };
    }

    if (Object.keys(revisionFilters).length > 0) {
      // Must cast because Prisma handles 'is' queries uniquely
      whereClause.revisions = { some: { revisionNumber: { gte: 1 }, ...revisionFilters } };
    }

    const limit = query.limit || 50;

    // 1. Execute Data Query
    const results = await prisma.journalEntry.findMany({
      where: whereClause,
      take: limit + 1, // Fetch +1 to determine if there's a next page
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        revisions: {
          orderBy: { revisionNumber: 'desc' },
          take: 1
        }
      }
    });

    // 2. Fetch Facets concurrently (In a production system, this would be heavily cached/Elasticsearch)
    const [strongCount, moderateCount, weakCount] = await Promise.all([
      prisma.journalEntryRevision.count({ where: { evidenceStrength: 'strong' } }),
      prisma.journalEntryRevision.count({ where: { evidenceStrength: 'moderate' } }),
      prisma.journalEntryRevision.count({ where: { evidenceStrength: 'weak' } }),
    ]);

    const queryTimeMs = Date.now() - start;

    return {
      totalMatches: await prisma.journalEntry.count({ where: whereClause }),
      returned: Math.min(results.length, limit),
      queryTimeMs,
      results: results.slice(0, limit),
      facets: {
        evidenceStrength: {
          strong: strongCount,
          moderate: moderateCount,
          weak: weakCount
        }
      }
    };
  }
}
