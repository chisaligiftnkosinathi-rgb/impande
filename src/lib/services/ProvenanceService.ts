import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProvenanceNode {
  id: string;
  type: 'claim' | 'source';
  label: string;
  confidence?: string;
}

export interface ProvenanceEdge {
  sourceId: string;
  targetId: string;
  relationshipType: 'supports' | 'contradicts' | 'derives_from';
}

export interface ProvenanceGraph {
  nodes: ProvenanceNode[];
  edges: ProvenanceEdge[];
}

export class ProvenanceService {
  /**
   * Explores the full provenance graph for a given claim.
   * Traverses both supporting and contradicting chains.
   */
  static async buildProvenanceGraph(journalEntryId: string): Promise<ProvenanceGraph> {
    const nodes: ProvenanceNode[] = [];
    const edges: ProvenanceEdge[] = [];

    // 1. Fetch Root Claim
    const entry = await prisma.journalEntry.findUnique({
      where: { id: journalEntryId },
      include: {
        revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 }
      }
    });

    if (!entry || entry.revisions.length === 0) {
      throw new Error("ENTRY_NOT_FOUND");
    }

    const rootRevision = entry.revisions[0];
    nodes.push({
      id: entry.id,
      type: 'claim',
      label: rootRevision.claim.substring(0, 50) + '...',
      confidence: rootRevision.evidenceStrength
    });

    // 2. Fetch Directed Relationships
    const relationships = await prisma.claimRelationship.findMany({
      where: {
        OR: [
          { targetClaimId: entry.id },
          { sourceClaimId: entry.id }
        ]
      },
      include: {
        sourceClaim: { include: { revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 } } },
        targetClaim: { include: { revisions: { orderBy: { revisionNumber: 'desc' }, take: 1 } } }
      }
    });

    for (const rel of relationships) {
      // Add edges
      edges.push({
        sourceId: rel.sourceClaimId,
        targetId: rel.targetClaimId,
        relationshipType: rel.relationshipType as any
      });

      // Add related nodes if not already present
      if (!nodes.some(n => n.id === rel.sourceClaimId)) {
        nodes.push({
          id: rel.sourceClaimId,
          type: 'claim',
          label: rel.sourceClaim.revisions[0]?.claim?.substring(0, 50) + '...' || 'Unknown',
          confidence: rel.sourceClaim.revisions[0]?.evidenceStrength
        });
      }

      if (!nodes.some(n => n.id === rel.targetClaimId)) {
        nodes.push({
          id: rel.targetClaimId,
          type: 'claim',
          label: rel.targetClaim.revisions[0]?.claim?.substring(0, 50) + '...' || 'Unknown',
          confidence: rel.targetClaim.revisions[0]?.evidenceStrength
        });
      }
    }

    return { nodes, edges };
  }
}
