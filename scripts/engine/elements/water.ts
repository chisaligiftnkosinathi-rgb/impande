import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const exportFile = path.join(ROOT, 'test-export.impande');

  if (!fs.existsSync(exportFile)) {
    return {
      level: 'WOUNDED',
      message: 'No archive export found. Preservation has not been tested.',
      poem: 'The vessel is empty.',
      remedy: 'Run `tsx test-exporter.ts` to generate a test archive.',
    };
  }

  const stats = fs.statSync(exportFile);
  if (stats.size < 100) {
    return {
      level: 'WOUNDED',
      message: `Archive export exists but appears too small (${stats.size} bytes). It may be corrupted.`,
      poem: 'The vessel holds only echoes.',
      remedy: 'Regenerate the test archive by running `tsx test-exporter.ts`.',
    };
  }

  return {
    level: 'FLOURISHING',
    message: `Archive integrity verified. ${(stats.size / 1024).toFixed(1)} KB preserved.`,
  };
}
