import { describe, it, expect } from 'vitest';
import { AuthorizationService } from '../../src/lib/services/AuthorizationService';

describe('Constitutional Principle: Collection Boundaries', () => {
  it('should reject access across collections', async () => {
    const authService = new AuthorizationService();

    // User 1 has ACTIVE membership in Collection A
    const canAccessB = await authService.checkCapability({
      userId: 'user-1',
      collectionId: 'collection-B',
      capability: 'canRead'
    });

    expect(canAccessB).toBe(false);
  });
});
