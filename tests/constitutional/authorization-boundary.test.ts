import { describe, it, expect } from 'vitest';
import { AuthorizationService } from '../../src/lib/services/AuthorizationService';

describe('Constitutional Principle: Authorization Boundary', () => {
  it('should mandate capability-based checks rather than global role checks', async () => {
    const authService = new AuthorizationService();

    // Passing a CollectionId is strictly required to check any permission.
    // A platform admin does not automatically get collection rights.
    await expect(
      // @ts-expect-error - testing the boundary violation
      authService.checkCapability({ userId: 'platform-admin', capability: 'canRead' })
    ).rejects.toThrow('collectionId is required for authorization');
  });
});
