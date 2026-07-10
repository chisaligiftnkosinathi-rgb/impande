import { describe, it, expect } from 'vitest';
import { MeaningService } from '../../src/lib/services/MeaningService';

describe('Constitutional Principle: Meaning is Read-Only', () => {
  it('should not expose any write methods on the MeaningService', () => {
    const service = new MeaningService();
    const prototype = Object.getPrototypeOf(service);
    
    // The meaning layer translates data, it never creates it.
    const writeMethods = Object.getOwnPropertyNames(prototype).filter(
      method => method.startsWith('create') || method.startsWith('update') || method.startsWith('delete') || method.startsWith('mutate')
    );

    expect(writeMethods).toHaveLength(0);
  });
});
