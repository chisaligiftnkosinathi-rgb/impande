import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const schemaPath = path.join(ROOT, 'prisma', 'schema.prisma');

  if (!fs.existsSync(schemaPath)) {
    return {
      level: 'MISSING',
      message: 'prisma/schema.prisma is absent from the archive.',
      poem: 'Without fire, truth cannot be found.',
      remedy: 'Restore the Prisma schema before the Truth Engine can run.',
    };
  }

  try {
    execSync('npx prisma validate', {
      encoding: 'utf8', stdio: 'pipe', cwd: ROOT,
    });
  } catch {
    return {
      level: 'MISSING',
      message: 'Prisma schema failed validation.',
      poem: 'The fire reveals a fracture in the foundation.',
      remedy: 'Fix the schema errors in prisma/schema.prisma before continuing.',
    };
  }

  try {
    const migrateOut = execSync('npx prisma migrate status', {
      encoding: 'utf8', stdio: 'pipe', cwd: ROOT,
    });

    if (migrateOut.toLowerCase().includes('up to date')) {
      return {
        level: 'FLOURISHING',
        message: 'Schema validated. Migrations current. Truth is aligned.',
      };
    }

    return {
      level: 'WOUNDED',
      message: 'Pending migrations detected. Schema drift found.',
      poem: 'The root still lives, but it requires tending.',
      remedy: 'Run `npx prisma migrate dev` to restore truth alignment.',
    };
  } catch {
    return {
      level: 'WOUNDED',
      message: 'Schema is valid, but migration status could not be confirmed.',
      poem: 'The fire burns, but its edges are unclear.',
      remedy: 'Ensure the database is accessible and run `npx prisma migrate status`.',
    };
  }
}
