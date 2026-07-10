import { PrismaClient } from '@prisma/client';
import AdmZip from 'adm-zip';
import crypto from 'crypto';
import { DerivedViewsGenerator } from './derived-views';

const prisma = new PrismaClient();

export interface ExportOptions {
  spaceId: string;
  exportingApplication?: string;
}

export class ImpandeExporter {
  
  static async exportSpace(options: ExportOptions): Promise<Buffer> {
    const space = await prisma.continuitySpace.findUnique({
      where: { id: options.spaceId },
      include: {
        entities: {
          include: {
            names: true,
            aliases: true,
            lifespans: true,
            sourceRelations: true,
            targetRelations: true,
            claims: {
              include: {
                evidence: true,
                attestations: true,
                versions: true
              }
            },
            memoryArtifacts: true,
            continuityBooks: true,
            events: true,
          }
        },
        guardians: {
          include: {
            user: true
          }
        },
        openQuestions: true
      }
    });

    if (!space) {
      throw new Error(`Continuity Space ${options.spaceId} not found.`);
    }

    const zip = new AdmZip();
    const manifest = this.generateManifest(space.id, options.exportingApplication);
    
    // Create folders
    zip.addFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2)));
    zip.addFile('constitution.json', Buffer.from(JSON.stringify({ note: "Standard Constitution Reference" }, null, 2)));

    // Extract engines
    const continuity = this.extractContinuity(space);
    zip.addFile('continuity/spaces.json', Buffer.from(JSON.stringify([continuity.space], null, 2)));
    zip.addFile('continuity/entities.json', Buffer.from(JSON.stringify(continuity.entities, null, 2)));
    zip.addFile('continuity/relationships.json', Buffer.from(JSON.stringify(continuity.relationships, null, 2)));

    const truth = this.extractTruth(space);
    zip.addFile('truth/claims.json', Buffer.from(JSON.stringify(truth.claims, null, 2)));
    zip.addFile('truth/evidence.json', Buffer.from(JSON.stringify(truth.evidence, null, 2)));
    zip.addFile('truth/attestations.json', Buffer.from(JSON.stringify(truth.attestations, null, 2)));
    zip.addFile('truth/open-questions.json', Buffer.from(JSON.stringify(space.openQuestions, null, 2)));

    const timeline = this.extractTimeline(space);
    zip.addFile('timeline/events.json', Buffer.from(JSON.stringify(timeline.events, null, 2)));
    zip.addFile('timeline/versions.json', Buffer.from(JSON.stringify(timeline.versions, null, 2)));

    const memory = this.extractMemory(space);
    zip.addFile('memory/books.json', Buffer.from(JSON.stringify(memory.books, null, 2)));
    zip.addFile('memory/artifacts.json', Buffer.from(JSON.stringify(memory.artifacts, null, 2)));

    const stewardship = this.extractStewardship(space);
    zip.addFile('stewardship/users.json', Buffer.from(JSON.stringify(stewardship.users, null, 2)));
    zip.addFile('stewardship/roles.json', Buffer.from(JSON.stringify(stewardship.guardians, null, 2)));

    // Derived Views
    zip.addFile('derived-views/mermaid/combined-family-tree.mmd', Buffer.from(DerivedViewsGenerator.generateMermaid({ ...space, ...continuity })));
    zip.addFile('derived-views/ascii-tree/tree.txt', Buffer.from(DerivedViewsGenerator.generateAsciiTree({ ...space, ...continuity })));
    zip.addFile('derived-views/reports/narrative.md', Buffer.from(DerivedViewsGenerator.generateNarrativeReport({ ...space, ...continuity })));
    zip.addFile('derived-views/timeline.csv', Buffer.from(DerivedViewsGenerator.generateCSVTimeline({ ...space, ...continuity })));

    // Generate Canonical Digest (Semantic Equivalence)
    const canonicalString = JSON.stringify({
      manifestVersion: manifest.version,
      canonicalOrdering: manifest.canonicalOrdering,
      continuity,
      truth,
      timeline,
      memory,
      stewardship
    });
    const canonicalDigest = crypto.createHash('sha256').update(canonicalString).digest('hex');
    manifest.canonicalDigest = canonicalDigest;
    
    // Re-write manifest with canonical digest included
    zip.updateFile('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2)));

    // Generate File Checksums
    const entries = zip.getEntries();
    const checksums: Record<string, string> = {};
    for (const entry of entries) {
      if (!entry.isDirectory && entry.entryName !== 'checksums.json') {
        const hash = crypto.createHash('sha256').update(entry.getData()).digest('hex');
        checksums[entry.entryName] = hash;
      }
    }
    zip.addFile('checksums.json', Buffer.from(JSON.stringify(checksums, null, 2)));

    return zip.toBuffer();
  }

  private static generateManifest(spaceId: string, exportingApplication?: string): any {
    return {
      version: "1.0",
      standard: "Impande Standard 1.0",
      archiveId: crypto.randomUUID(),
      spaces: [spaceId],
      defaultLanguage: "English",
      mediaCount: 0,
      canonicalOrdering: "Impande Canonical Ordering v1",
      integrityAlgorithm: "SHA-256",
      derivedViewsVersion: "1.0",
      validationRulesVersion: "1.0",
      extensions: ["derived-views", "validation"],
      provenance: {
        exportedBy: exportingApplication || "Impande Next.js Reference Implementation v1.0",
        exportTimestamp: new Date().toISOString(),
        referenceDatasetVersion: "v1.0",
        previousArchiveId: null,
        digitalSignature: null
      }
    };
  }

  // Ensure Canonical Ordering (sort by ID, timestamp, etc.)
  private static extractContinuity(space: any) {
    const spaceData = {
      id: space.id,
      name: space.name,
      description: space.description,
      createdAt: space.createdAt.toISOString(),
      updatedAt: space.updatedAt.toISOString(),
    };

    const entities = space.entities.map((e: any) => ({
      id: e.id,
      type: e.type,
      names: e.names.sort((a: any, b: any) => a.id.localeCompare(b.id)),
      aliases: e.aliases.sort((a: any, b: any) => a.id.localeCompare(b.id)),
      lifespans: e.lifespans.sort((a: any, b: any) => a.id.localeCompare(b.id)),
      createdAt: e.createdAt.toISOString(),
    })).sort((a: any, b: any) => a.id.localeCompare(b.id));

    const relationships: any[] = [];
    space.entities.forEach((e: any) => {
      e.sourceRelations.forEach((r: any) => relationships.push(r));
    });
    relationships.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return { space: spaceData, entities, relationships };
  }

  private static extractTruth(space: any) {
    const claims: any[] = [];
    const evidence: any[] = [];
    const attestations: any[] = [];

    space.entities.forEach((e: any) => {
      e.claims.forEach((c: any) => {
        claims.push({
          id: c.id,
          entityId: c.entityId,
          statement: c.statement,
          createdAt: c.createdAt.toISOString()
        });
        c.evidence.forEach((ev: any) => evidence.push(ev));
        c.attestations.forEach((at: any) => attestations.push(at));
      });
    });

    claims.sort((a: any, b: any) => a.id.localeCompare(b.id));
    evidence.sort((a: any, b: any) => a.id.localeCompare(b.id));
    attestations.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return { claims, evidence, attestations };
  }

  private static extractTimeline(space: any) {
    const events: any[] = [];
    const versions: any[] = [];

    space.entities.forEach((e: any) => {
      e.events.forEach((ev: any) => events.push(ev));
      e.claims.forEach((c: any) => {
        c.versions.forEach((v: any) => versions.push(v));
      });
    });

    events.sort((a: any, b: any) => a.id.localeCompare(b.id));
    versions.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return { events, versions };
  }

  private static extractMemory(space: any) {
    const artifacts: any[] = [];
    const books: any[] = [];

    space.entities.forEach((e: any) => {
      e.memoryArtifacts.forEach((ma: any) => artifacts.push(ma));
      e.continuityBooks.forEach((cb: any) => books.push(cb));
    });

    artifacts.sort((a: any, b: any) => a.id.localeCompare(b.id));
    books.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return { artifacts, books };
  }

  private static extractStewardship(space: any) {
    const users = new Map<string, any>();
    const guardians: any[] = [];

    space.guardians.forEach((g: any) => {
      guardians.push({
        id: g.id,
        role: g.role,
        userId: g.userId,
        spaceId: g.spaceId
      });
      users.set(g.user.id, g.user);
    });

    const userList = Array.from(users.values()).sort((a: any, b: any) => a.id.localeCompare(b.id));
    guardians.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return { users: userList, guardians };
  }
}
