import { EventBus, DomainEvent } from '../events/EventBus';
import { revalidateTag } from 'next/cache';

export class CacheInvalidationService {
  static initialize() {
    EventBus.subscribe('JournalRevisionCreatedEvent', this.handleRevisionCreated);
    console.log('[CacheInvalidationService] Subscribed to EventBus.');
  }

  private static async handleRevisionCreated(event: DomainEvent) {
    const { journalEntryId } = event.payload;
    if (journalEntryId) {
      console.log(`[CacheInvalidationService] Invalidating caches for entry: ${journalEntryId}`);
      revalidateTag(`journal-entry-explain-${journalEntryId}`);
      revalidateTag(`journal-entry-${journalEntryId}`);
    }
  }
}
