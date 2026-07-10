import { PrismaClient } from '@prisma/client';
import { MeaningService } from './MeaningService';

const prisma = new PrismaClient();

export class ResearchQueueService {
  /**
   * Translates an Insight from the Meaning layer into a concrete Stewardship Decision (Task).
   * This bridges the gap between descriptive meaning and prescriptive action.
   */
  static async evaluateClaimForResearch(journalEntryId: string, collectionId: string): Promise<void> {
    
    // We fetch the current revision to check the Meaning Engine's analysis
    const entry = await prisma.journalEntry.findUnique({
      where: { id: journalEntryId },
      include: {
        revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 }
      }
    });

    if (!entry || entry.revisions.length === 0) return;

    // This would actually call MeaningService.explain() and parse the recommendations.
    // For this example, we'll check primary source missingness directly.
    const revision = entry.revisions[0];

    // Example Rule: If evidence is weak, create a task.
    if (revision.evidenceStrength === 'weak' || revision.evidenceStrength === 'unverified') {
      
      // Check if task already exists
      const existingTask = await prisma.researchTask.findFirst({
        where: { 
          linkedClaimId: journalEntryId, 
          createdFromMetric: 'missingPrimarySources',
          status: { not: 'RESOLVED' } 
        }
      });

      if (!existingTask) {
        await prisma.researchTask.create({
          data: {
            collectionId,
            linkedClaimId: journalEntryId,
            origin: 'SYSTEM',
            priority: 'HIGH',
            status: 'OPEN',
            createdFromMetric: 'missingPrimarySources',
            description: `The claim "${revision.claim.substring(0, 50)}..." lacks strong primary evidence. Investigate to strengthen this assertion.`,
          }
        });
        console.log(`[ResearchQueue] Generated SYSTEM task for missing primary evidence on claim ${journalEntryId}`);
      }
    }
  }

  /**
   * Retrieves pending research tasks for the Steward Workspace
   */
  static async getPendingTasks(collectionId: string) {
    return prisma.researchTask.findMany({
      where: {
        collectionId,
        status: { in: ['OPEN', 'IN_PROGRESS'] }
      },
      orderBy: [
        { priority: 'asc' }, // Assuming enum maps HIGH first
        { createdAt: 'desc' }
      ]
    });
  }
}
