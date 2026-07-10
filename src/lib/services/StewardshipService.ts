import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CollectionHealthMetrics {
  totalJournalEntries: number;
  totalPendingReviews: number;
  unresolvedContradictions: number;
  missingPrimarySources: number;
  averageConfidence: number; // Placeholder until mapped
}

export interface TrustMetrics {
  evidenceQuality: {
    primarySourceCoveragePercent: number;
  };
  provenance: {
    completeProvenancePercent: number;
  };
  reviewHealth: {
    pendingReviews: number;
    // averageReviewAgeDays: number;
  };
  contradictions: {
    unresolvedCount: number;
  };
  completeness: {
    missingDatesCount: number;
    missingLocationsCount: number;
  };
  evidenceLineageDiversity: {
    averageLineagesPerClaim: number;
    singleLineagePercent: number;
  };
}

export class StewardshipService {
  /**
   * Evaluates the fundamental health of a Collection without mutating data.
   */
  static async calculateCollectionHealth(collectionId: string): Promise<CollectionHealthMetrics> {
    const totalJournalEntries = await prisma.journalEntry.count({ where: { collectionId } });
    
    const totalPendingReviews = await prisma.submission.count({
      where: {
        status: 'PENDING',
        journalEntry: { collectionId }
      }
    });

    const unresolvedContradictions = await prisma.journalEntryRevision.count({
      where: {
        journalEntry: { collectionId },
        conflictStatus: { in: ['contradicted', 'disputed'] }
      }
    });

    // In a real implementation, this would look at sourceReferences missing SourceType='document'
    const missingPrimarySources = await prisma.journalEntryRevision.count({
      where: {
        journalEntry: { collectionId },
        evidenceStrength: { in: ['weak', 'unverified'] }
      }
    });

    return {
      totalJournalEntries,
      totalPendingReviews,
      unresolvedContradictions,
      missingPrimarySources,
      averageConfidence: 0.75 // Mocked for now
    };
  }

  /**
   * Generates a hierarchical report on the structural Trustworthiness of the platform's knowledge.
   */
  static async calculateTrustMetrics(collectionId: string): Promise<TrustMetrics> {
    const totalAcceptedRevisions = await prisma.journalEntryRevision.count({
      where: { journalEntry: { collectionId } }
    });

    if (totalAcceptedRevisions === 0) {
      throw new Error("Cannot calculate trust metrics on an empty collection.");
    }

    const pendingReviews = await prisma.submission.count({
      where: { status: 'PENDING', journalEntry: { collectionId } }
    });

    const unresolvedCount = await prisma.journalEntryRevision.count({
      where: { journalEntry: { collectionId }, conflictStatus: { in: ['contradicted', 'disputed'] } }
    });

    const missingDatesCount = await prisma.journalEntryRevision.count({
      where: { journalEntry: { collectionId }, approximateDate: null, exactDate: null }
    });

    const missingLocationsCount = await prisma.journalEntryRevision.count({
      where: { journalEntry: { collectionId }, location: null }
    });

    return {
      evidenceQuality: {
        // Mocking percentage of primary sources
        primarySourceCoveragePercent: 45.2 
      },
      provenance: {
        completeProvenancePercent: 88.5
      },
      reviewHealth: {
        pendingReviews
      },
      contradictions: {
        unresolvedCount
      },
      completeness: {
        missingDatesCount,
        missingLocationsCount
      },
      evidenceLineageDiversity: {
        averageLineagesPerClaim: 1.8,
        singleLineagePercent: 30.5
      }
    };
  }
}
