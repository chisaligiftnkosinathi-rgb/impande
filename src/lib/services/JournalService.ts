import { PrismaClient } from '@prisma/client';
import { GetJournalEntryQuery, ExplainJournalEntryQuery, ExplanationResponse } from '../contracts/dto';
import { MeaningService } from './MeaningService';

const prisma = new PrismaClient();

export class JournalService {
  /**
   * Retrieves the current accepted revision of a Journal Entry.
   */
  static async getCurrentRevision(query: GetJournalEntryQuery) {
    const entry = await prisma.journalEntry.findUnique({
      where: { id: query.id },
      include: {
        revisions: {
          orderBy: { revisionNumber: 'desc' },
          take: 1,
          include: {
            sourceReferences: {
              include: { mediaAttachments: true }
            },
            steward: {
              select: { displayName: true }
            }
          }
        }
      }
    });

    if (!entry) throw new Error("ENTRY_NOT_FOUND");
    if (entry.revisions.length === 0) throw new Error("NO_ACCEPTED_REVISION");

    return entry.revisions[0];
  }

  /**
   * Retrieves the full immutable audit trail for a Journal Entry.
   */
  static async getRevisionHistory(query: GetJournalEntryQuery) {
    const revisions = await prisma.journalEntryRevision.findMany({
      where: { journalEntryId: query.id },
      orderBy: { revisionNumber: 'asc' },
      include: {
        steward: { select: { displayName: true } }
      }
    });

    if (revisions.length === 0) throw new Error("ENTRY_NOT_FOUND");

    return revisions;
  }

  /**
   * Retrieves the Explanation Response by bridging the Truth layer and the Meaning layer.
   */
  static async explain(query: ExplainJournalEntryQuery): Promise<ExplanationResponse> {
    const revision = await this.getCurrentRevision({ id: query.id });

    // Fetch the provenance graph
    const sourceRelations = await prisma.claimRelationship.findMany({
      where: { targetClaimId: query.id },
      include: { sourceClaim: { include: { revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 } } } }
    });

    const targetRelations = await prisma.claimRelationship.findMany({
      where: { sourceClaimId: query.id },
      include: { targetClaim: { include: { revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 } } } }
    });

    // In a real application, MeaningService would parse the raw data and produce the Explanation Schema.
    // We delegate the confidence logic to the MeaningService to maintain architectural boundaries.
    return MeaningService.generateExplanation(revision, sourceRelations, targetRelations);
  }
}
