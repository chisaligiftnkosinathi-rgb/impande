import { PrismaClient } from '@prisma/client';
import { AcceptSubmissionCommand, RejectSubmissionCommand, SubmitJournalEntryCommand } from '../contracts/dto';
import { EventBus } from '../events/EventBus';
import { AuthorizationService } from './AuthorizationService';

const prisma = new PrismaClient();

export class ReviewService {
  /**
   * Proposes a new Journal Entry or an update to an existing one.
   * This does NOT modify the Truth Engine directly.
   */
  static async submitEntry(command: SubmitJournalEntryCommand) {
    // 1. Evaluate capability via AuthorizationService
    const canSubmit = await AuthorizationService.canCreateSubmission(command.contributorId, command.collectionId);
    if (!canSubmit) {
      throw new Error("UNAUTHORIZED_CONTRIBUTOR");
    }

    // 2. Create the Submission
    const submission = await prisma.submission.create({
      data: {
        contributorId: command.contributorId,
        journalEntryId: command.journalEntryId || null,
        proposedClaim: JSON.stringify(command),
        status: "PENDING"
      }
    });

    // 3. Emit intent event
    await EventBus.publish(
      "SubmissionCreatedEvent", 
      command.contributorId, 
      submission.id, 
      { journalEntryId: command.journalEntryId }
    );

    return submission;
  }

  /**
   * Accepts a submission and mints a new immutable JournalEntryRevision.
   */
  static async acceptSubmission(submissionId: string, command: AcceptSubmissionCommand) {
    // 1. Fetch submission to determine collection boundaries
    const submission = await prisma.submission.findUnique({ 
      where: { id: submissionId },
      include: { journalEntry: true } 
    });
    
    if (!submission || submission.status !== 'PENDING') {
      throw new Error("INVALID_SUBMISSION");
    }

    const parsedClaim = JSON.parse(submission.proposedClaim) as SubmitJournalEntryCommand;
    const collectionId = submission.journalEntry?.collectionId || parsedClaim.collectionId;

    if (!collectionId) {
      throw new Error("MISSING_COLLECTION_BOUNDARY");
    }

    // 2. Evaluate capability via AuthorizationService
    const canAccept = await AuthorizationService.canAcceptSubmission(command.stewardId, collectionId);
    if (!canAccept) {
      throw new Error("UNAUTHORIZED_STEWARD");
    }

    // 3. Process the acceptance within a transaction
    const finalPayloadStr = command.adjustedClaimPayload 
      ? JSON.stringify({ ...JSON.parse(submission.proposedClaim), ...command.adjustedClaimPayload })
      : submission.proposedClaim;

    const parsedClaim = JSON.parse(finalPayloadStr) as SubmitJournalEntryCommand;

    const result = await prisma.$transaction(async (tx) => {
      // 3a. Update Review Workflow
      await tx.review.create({
        data: {
          submissionId: submission.id,
          stewardId: command.stewardId,
          decision: "ACCEPTED",
          notes: command.notes
        }
      });

      await tx.submission.update({
        where: { id: submission.id },
        data: { status: "ACCEPTED" }
      });

      // 3b. Find or create the Journal Entry Container
      let journalEntryId = submission.journalEntryId;
      if (!journalEntryId) {
        const newEntry = await tx.journalEntry.create({
          data: { collectionId: parsedClaim.collectionId }
        });
        journalEntryId = newEntry.id;
      }

      // 3c. Get latest revision number
      const prevRevisions = await tx.journalEntryRevision.findMany({
        where: { journalEntryId },
        orderBy: { revisionNumber: 'desc' },
        take: 1
      });
      const nextRevNum = prevRevisions.length > 0 ? prevRevisions[0].revisionNumber + 1 : 1;

      // 3d. Mint immutable Revision
      const revision = await tx.journalEntryRevision.create({
        data: {
          journalEntryId,
          revisionNumber: nextRevNum,
          stewardId: command.stewardId,
          claim: parsedClaim.claim,
          evidenceStrength: parsedClaim.evidenceStrength || "unverified",
          location: parsedClaim.location,
          approximateDate: parsedClaim.approximateDate,
          exactDate: parsedClaim.exactDate ? new Date(parsedClaim.exactDate) : null,
          tags: parsedClaim.tags ? JSON.stringify(parsedClaim.tags) : null,
          notes: parsedClaim.notes
        }
      });

      // 3e. Update Journal Entry Pointer
      await tx.journalEntry.update({
        where: { id: journalEntryId },
        data: { currentRevisionId: revision.id }
      });

      return { journalEntryId, revision };
    });

    // 4. Emit outcome events
    await EventBus.publish(
      "SubmissionAcceptedEvent", 
      command.stewardId, 
      submission.id, 
      { journalEntryId: result.journalEntryId, revisionId: result.revision.id }
    );

    await EventBus.publish(
      "JournalRevisionCreatedEvent", 
      command.stewardId, 
      result.revision.id, 
      { journalEntryId: result.journalEntryId, revisionNumber: result.revision.revisionNumber }
    );

    return result.revision;
  }
}
