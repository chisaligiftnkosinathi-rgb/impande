import { PrismaClient } from '@prisma/client';
import { ImpandeExporter } from './src/lib/preservation/exporter';
import fs from 'fs';

const prisma = new PrismaClient();

async function run() {
  const space = await prisma.continuitySpace.findFirst();
  if (!space) {
    console.log("No space found in database.");
    return;
  }
  
  console.log(`Exporting space: ${space.id}`);
  
  const buffer = await ImpandeExporter.exportSpace({ spaceId: space.id });
  
  fs.writeFileSync('test-export.impande', buffer);
  console.log("Successfully generated test-export.impande (" + buffer.length + " bytes)");
}

run().catch(console.error).finally(() => prisma.$disconnect());
