import { describe, it, expect } from 'vitest';
import { JournalService } from '../../src/lib/services/JournalService';
import { prismaMock } from '../__mocks__/prisma';

describe('Constitutional Principle: Append-Only Truth', () => {
  it('should prevent updating an existing JournalEntryRevision', async () => {
    // Attempting to mutate an existing revision must throw an error.
    // Revisions are mathematically immutable.
    
    const service = new JournalService();
    
    await expect(
      service.updateRevision({ revisionId: 'rev-123', newContent: 'changed' })
    ).rejects.toThrow('Constitutional Violation: JournalEntryRevisions are immutable. Append a new revision instead.');
  });

  it('should prevent deleting a JournalEntry', async () => {
    const service = new JournalService();

    await expect(
      service.deleteEntry('entry-123')
    ).rejects.toThrow('Constitutional Violation: Deletions are not permitted in the Truth Engine. Supersede with a new claim.');
  });
});
