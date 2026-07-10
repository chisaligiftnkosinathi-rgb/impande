import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

const HERITAGE_FILES = [
  { file: 'releases/v1.0/HERITAGE_PILOT.md',      name: 'Heritage Pilot'        },
  { file: 'releases/v1.0/IMPANDE_CONSTITUTION.md', name: 'Constitutional Release' },
];

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const missing = HERITAGE_FILES.filter(f => !fs.existsSync(path.join(ROOT, f.file)));

  if (missing.length === HERITAGE_FILES.length) {
    return {
      level: 'WOUNDED',
      message: 'Heritage release records not found in releases/v1.0/.',
      poem: 'Without memory of the past, light cannot guide the present.',
      remedy: 'Ensure releases/v1.0/ contains the heritage documentation.',
    };
  }

  if (missing.length > 0) {
    return {
      level: 'WOUNDED',
      message: `${missing.map(f => f.name).join(', ')} ${missing.length === 1 ? 'is' : 'are'} absent from the release.`,
      poem: 'Some stories have not yet been carried forward.',
      remedy: 'Restore the missing files in releases/v1.0/.',
    };
  }

  return {
    level: 'FLOURISHING',
    message: 'Heritage records found. The stories are carried forward.',
  };
}
