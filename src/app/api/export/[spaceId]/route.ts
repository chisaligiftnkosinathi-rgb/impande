import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ spaceId: string }> }) {
  try {
    const { spaceId } = await params;
    const space = await prisma.continuitySpace.findUnique({
      where: { id: spaceId },
      include: {
        entities: {
          include: {
            names: true,
            aliases: true,
            lifespans: true,
            claims: {
              include: {
                evidence: true,
                versions: true,
                sourceClaimRelations: true,
                targetClaimRelations: true
              }
            },
            sourceRelations: true,
            targetRelations: true,
            memoryArtifacts: true,
            continuityBooks: true,
            events: true,
          }
        },
        guardians: true
      }
    });

    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }

    // Assemble the .impande archive structure
    const archive = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      space: {
        id: space.id,
        name: space.name,
        description: space.description,
        createdAt: space.createdAt,
        updatedAt: space.updatedAt,
      },
      entities: space.entities,
      guardians: space.guardians,
    };

    // Serialize to JSON and return as downloadable file
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Disposition', `attachment; filename="${space.name.replace(/\s+/g, '_')}.impande"`);

    return new NextResponse(JSON.stringify(archive, null, 2), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export Continuity Space' }, { status: 500 });
  }
}
