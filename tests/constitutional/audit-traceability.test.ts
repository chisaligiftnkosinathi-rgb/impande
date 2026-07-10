import { describe, it, expect } from 'vitest';
import { JournalService } from '../../src/lib/services/JournalService';

describe('Constitutional Principle: Audit Traceability', () => {
  it('should mandate that every accepted state change emits an audit event', async () => {
    const service = new JournalService();
    
    // We mock appending a new piece of evidence
    const result = await service.appendRevision({
      collectionId: 'col-1',
      authorId: 'user-1',
      claim: 'Born in 1912',
      sourceId: 'source-123'
    });
    
    // The architecture demands that the domain service returns the Domain Event
    // representing the mutation, which the Operations layer can then persist to the audit log.
    expect(result).toHaveProperty('event');
    expect(result.event.type).toBe('JOURNAL_REVISION_APPENDED');
    expect(result.event.payload).toBeDefined();
    expect(result.event.timestamp).toBeDefined();
  });
});
