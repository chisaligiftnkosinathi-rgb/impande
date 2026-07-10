import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { ImpandeExporter } from '../lib/preservation/exporter';
import { ImpandeImporter } from '../lib/preservation/importer';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

describe('Phase 5.1: Archive Conformance', () => {
  let spaceId: string;
  let archiveBuffer: Buffer;

  beforeAll(async () => {
    const space = await prisma.continuitySpace.findFirst();
    if (!space) throw new Error("No Continuity Space found. Seed db first.");
    spaceId = space.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Determinism: Exporting the same database twice produces identical canonical JSON and derived views', async () => {
    const archive1 = await ImpandeExporter.exportSpace({ spaceId });
    const archive2 = await ImpandeExporter.exportSpace({ spaceId });
    
    // We can't compare the raw buffer directly because the ZIP timestamps or random UUID in manifest might differ.
    // Instead we test that the integrity hashes of the canonical files inside the zip are identical.
    const import1 = new ImpandeImporter(archive1);
    const import2 = new ImpandeImporter(archive2);
    
    const hashes1 = import1.getChecksums();
    const hashes2 = import2.getChecksums();

    // Remove manifest.json hash because it contains exportTimestamp and new archiveId
    delete hashes1['manifest.json'];
    delete hashes2['manifest.json'];

    expect(hashes1).toEqual(hashes2);
  });

  test('Corrupted Checksum: Import fails with integrity error', async () => {
    // Generate a valid archive
    const archive = await ImpandeExporter.exportSpace({ spaceId });
    
    // Maliciously modify the buffer (this is hard to do directly in zip buffer without adm-zip, so we'll simulate by asking Importer to test a manipulated internal structure)
    // We will do this by throwing an error in Importer if checksum fails.
    const importer = new ImpandeImporter(archive);
    
    // Modify a file in the importer's memory
    importer.corruptFileForTest('continuity/entities.json');

    await expect(importer.verifyIntegrity()).rejects.toThrow(/Checksum mismatch/);
  });

  test('Forward Compatibility: Unknown extensions are ignored but preserved', async () => {
    // We'll simulate this by adding a fake file to the archive and ensuring the importer doesn't crash
    const archive = await ImpandeExporter.exportSpace({ spaceId });
    const importer = new ImpandeImporter(archive);
    
    importer.addUnknownExtensionForTest('future-wisdom.json', '{}');
    
    // Should not throw
    const result = await importer.dryRun();
    expect(result.success).toBe(true);
    expect(result.unknownExtensionsFound).toContain('future-wisdom.json');
  });

  test('End-to-End: Export -> Import -> Export', async () => {
    // This is the big one.
    // We export a space.
    const originalArchive = await ImpandeExporter.exportSpace({ spaceId });
    
    // We import it into a NEW space
    const importer = new ImpandeImporter(originalArchive);
    const newSpaceId = await importer.importToDatabase({ targetSpaceName: "Cloned Space" });

    // We export the NEW space
    const clonedArchive = await ImpandeExporter.exportSpace({ spaceId: newSpaceId });
    
    const origImporter = new ImpandeImporter(originalArchive);
    const cloneImporter = new ImpandeImporter(clonedArchive);

    const origEntities = JSON.parse(origImporter.readFile('continuity/entities.json'));
    const cloneEntities = JSON.parse(cloneImporter.readFile('continuity/entities.json'));

    // They should have the same number of entities with same data (IDs might be different depending on import strategy, but ImpandeIDs should ideally be preserved!)
    // The Standard says ImpandeID is immutable. So the new space MUST retain the original ImpandeIDs!
    expect(cloneEntities.length).toBe(origEntities.length);
    expect(cloneEntities[0].id).toBe(origEntities[0].id);

    // Clean up
    await prisma.continuitySpace.delete({ where: { id: newSpaceId }});
  });
});
