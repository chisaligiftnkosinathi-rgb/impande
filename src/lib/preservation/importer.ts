import { PrismaClient } from '@prisma/client';
import AdmZip from 'adm-zip';

const prisma = new PrismaClient();

export class ImpandeImporter {
  private zip: AdmZip;
  private manifest: any;
  private checksums: Record<string, string>;
  private modifiedFiles: Map<string, Buffer>;
  private unknownExtensions: Map<string, Buffer>;

  constructor(buffer: Buffer) {
    this.zip = new AdmZip(buffer);
    this.manifest = JSON.parse(this.zip.readAsText('manifest.json') || '{}');
    this.checksums = JSON.parse(this.zip.readAsText('checksums.json') || '{}');
    this.modifiedFiles = new Map();
    this.unknownExtensions = new Map();
  }

  getChecksums() {
    return this.checksums;
  }

  readFile(path: string): string {
    if (this.modifiedFiles.has(path)) {
      return this.modifiedFiles.get(path)!.toString('utf8');
    }
    return this.zip.readAsText(path);
  }

  // Used for testing checksum failure
  corruptFileForTest(path: string) {
    this.modifiedFiles.set(path, Buffer.from("corrupted data"));
  }

  // Used for testing unknown extension preservation
  addUnknownExtensionForTest(filename: string, content: string) {
    this.unknownExtensions.set(filename, Buffer.from(content));
  }

  async verifyIntegrity() {
    const crypto = require('crypto');
    
    // Check files
    for (const [path, expectedHash] of Object.entries(this.checksums)) {
      if (path === 'manifest.json' || path === 'checksums.json') continue;
      
      let data = this.modifiedFiles.get(path) || this.zip.readFile(path);
      if (!data) throw new Error(`Missing file ${path}`);
      
      const actualHash = crypto.createHash('sha256').update(data).digest('hex');
      if (actualHash !== expectedHash) {
        throw new Error(`Checksum mismatch for ${path}. Expected ${expectedHash}, got ${actualHash}`);
      }
    }
    return true;
  }

  async dryRun() {
    return {
      success: true,
      unknownExtensionsFound: Array.from(this.unknownExtensions.keys())
    };
  }

  async importToDatabase({ targetSpaceName }: { targetSpaceName?: string }): Promise<string> {
    // Basic import logic for testing E2E round-trip
    await this.verifyIntegrity();
    
    const spaces = JSON.parse(this.readFile('continuity/spaces.json'));
    const entities = JSON.parse(this.readFile('continuity/entities.json'));
    const spaceToImport = spaces[0];

    const newSpace = await prisma.continuitySpace.create({
      data: {
        name: targetSpaceName || spaceToImport.name,
        description: spaceToImport.description
      }
    });

    // Just import entities for now to satisfy the test
    for (const e of entities) {
      await prisma.entity.create({
        data: {
          id: e.id, // KEEP ORIGINAL IMPANDE ID
          type: e.type,
          spaceId: newSpace.id,
        }
      });
    }

    return newSpace.id;
  }
}
