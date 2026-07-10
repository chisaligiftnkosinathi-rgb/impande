import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthorizationService {
  /**
   * Retrieves a user's active membership status for a given collection.
   */
  private static async getActiveMembership(userId: string, collectionId: string) {
    const membership = await prisma.collectionMembership.findUnique({
      where: { userId_collectionId: { userId, collectionId } }
    });

    if (!membership || membership.status !== 'ACTIVE') {
      return null;
    }
    return membership;
  }

  static async canViewCollection(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    // Assuming collections might be public eventually, but for now, any active member can view
    return !!membership;
  }

  static async canReadJournalEntry(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    return !!membership;
  }

  static async canCreateSubmission(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    if (!membership) return false;
    
    return ['OWNER', 'STEWARD', 'CONTRIBUTOR'].includes(membership.role);
  }

  static async canReviewSubmission(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    if (!membership) return false;
    
    return ['OWNER', 'STEWARD'].includes(membership.role);
  }

  static async canAcceptSubmission(userId: string, collectionId: string): Promise<boolean> {
    return this.canReviewSubmission(userId, collectionId);
  }

  static async canManageMembership(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    if (!membership) return false;
    
    // Only Owners or Stewards can manage memberships (invite, remove)
    return ['OWNER', 'STEWARD'].includes(membership.role);
  }

  static async canManageCollection(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    if (!membership) return false;
    
    // Only Owners can manage collection metadata (transfer ownership, delete)
    return membership.role === 'OWNER';
  }

  static async canViewPrivateEvidence(userId: string, collectionId: string): Promise<boolean> {
    const membership = await this.getActiveMembership(userId, collectionId);
    if (!membership) return false;
    
    // Contributors can submit, but only Stewards/Owners can view highly restricted private evidence layers
    return ['OWNER', 'STEWARD'].includes(membership.role);
  }
}
