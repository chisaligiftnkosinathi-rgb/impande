import { ReviewService } from '../src/lib/services/ReviewService';
import { JournalService } from '../src/lib/services/JournalService';
import { EventBus } from '../src/lib/events/EventBus';
import { SubmitJournalEntryCommand, AcceptSubmissionCommand } from '../src/lib/contracts/dto';

// Mocking Prisma Client
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn()
    },
    submission: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    },
    journalEntry: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn()
    },
    journalEntryRevision: {
      findMany: jest.fn(),
      create: jest.fn()
    },
    review: {
      create: jest.fn()
    },
    $transaction: jest.fn((callback) => callback(mPrismaClient))
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('Impande Service Layer Contracts', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(EventBus, 'publish').mockResolvedValue(undefined);
  });

  it('ReviewService.submitEntry() requires valid contributor role', async () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    prisma.user.findUnique.mockResolvedValue({ id: 'user_1', role: 'GUEST' });

    const cmd: SubmitJournalEntryCommand = {
      collectionId: 'col_1',
      contributorId: 'user_1',
      claim: 'Babe George moved in 1910.'
    };

    await expect(ReviewService.submitEntry(cmd)).rejects.toThrow("UNAUTHORIZED_CONTRIBUTOR");
  });

  it('ReviewService.acceptSubmission() mints a revision and fires events', async () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    prisma.user.findUnique.mockResolvedValue({ id: 'steward_1', role: 'STEWARD' });
    prisma.submission.findUnique.mockResolvedValue({ 
      id: 'sub_1', 
      status: 'PENDING',
      proposedClaim: JSON.stringify({ collectionId: 'col_1', claim: 'Data' })
    });
    
    prisma.journalEntry.create.mockResolvedValue({ id: 'entry_1' });
    prisma.journalEntryRevision.findMany.mockResolvedValue([]);
    prisma.journalEntryRevision.create.mockResolvedValue({ id: 'rev_1', revisionNumber: 1 });

    const cmd: AcceptSubmissionCommand = { stewardId: 'steward_1' };
    
    const revision = await ReviewService.acceptSubmission('sub_1', cmd);

    expect(revision.id).toBe('rev_1');
    expect(EventBus.publish).toHaveBeenCalledWith(
      'SubmissionAcceptedEvent',
      'steward_1',
      'sub_1',
      expect.any(Object)
    );
    expect(EventBus.publish).toHaveBeenCalledWith(
      'JournalRevisionCreatedEvent',
      'steward_1',
      'rev_1',
      expect.any(Object)
    );
  });

  it('JournalService.getCurrentRevision() prevents reads without accepted revisions', async () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    prisma.journalEntry.findUnique.mockResolvedValue({
      id: 'entry_1',
      revisions: [] // Empty revisions array
    });

    await expect(JournalService.getCurrentRevision({ id: 'entry_1' })).rejects.toThrow("NO_ACCEPTED_REVISION");
  });

});
