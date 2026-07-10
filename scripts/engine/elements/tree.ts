import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

const REQUIRED = [
  { dir: 'docs',     label: 'docs/'     },
  { dir: 'releases', label: 'releases/' },
  { dir: 'prisma',   label: 'prisma/'   },
  { dir: 'src',      label: 'src/'      },
  { dir: 'public',   label: 'public/'   },
  { dir: 'tests',    label: 'tests/'    },
];

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const missing = REQUIRED.filter(r => !fs.existsSync(path.join(ROOT, r.dir)));

  if (missing.length > 0) {
    return {
      level: 'MISSING',
      message: `A root appears to be missing: ${missing.map(r => r.label).join(', ')}`,
      poem: 'The archive may be incomplete.',
      remedy: 'Restore the missing directories before the tree can stand.',
    };
  }

  return {
    level: 'FLOURISHING',
    message: 'All roots are in place. The tree stands.',
  };
}
