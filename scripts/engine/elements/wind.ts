import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

const SACRED_DOCUMENTS = [
  { file: 'docs/IMPANDE_MANIFESTO.md',    name: 'Manifesto'    },
  { file: 'docs/IMPANDE_CONSTITUTION.md', name: 'Constitution' },
  { file: 'docs/IMPANDE_STANDARD.md',     name: 'Standard'     },
  { file: 'docs/IMPANDE_GOVERNANCE.md',   name: 'Governance'   },
];

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const missing = SACRED_DOCUMENTS.filter(
    d => !fs.existsSync(path.join(ROOT, d.file))
  );

  if (missing.length > 0) {
    const names = missing.map(d => d.name).join(', ');
    return {
      level: 'MISSING',
      message: `${names} ${missing.length === 1 ? 'is' : 'are'} absent from the archive.`,
      poem: 'A root has been lost.',
      remedy: 'Sacred documents must be restored before the archive can continue.',
    };
  }

  return {
    level: 'FLOURISHING',
    message: 'All sacred documents are present. The covenant is whole.',
  };
}
