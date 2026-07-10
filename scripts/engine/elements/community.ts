import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const constitutionalDir = path.join(ROOT, 'tests', 'constitutional');

  if (!fs.existsSync(constitutionalDir)) {
    return {
      level: 'WOUNDED',
      message: 'Constitutional test directory not found.',
      poem: 'The gathering could not be convened.',
      remedy: 'Ensure tests/constitutional/ exists and contains the covenant tests.',
    };
  }

  try {
    const result = execSync(
      // --root anchors vitest to this project, preventing it from walking up
      // to a stray vite.config.js in a parent directory.
      'npx vitest run tests/constitutional/ --reporter=verbose --root .',
      { encoding: 'utf8', stdio: 'pipe', cwd: ROOT }
    );

    const passMatch = result.match(/(\d+)\s+passed/);
    const passed = passMatch ? parseInt(passMatch[1], 10) : 0;

    return {
      level: 'FLOURISHING',
      message: `${passed} constitutional test${passed === 1 ? '' : 's'} passed. The covenant holds.`,
    };
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string };
    const output = (err.stdout ?? '') + (err.stderr ?? '');
    const failMatch = output.match(/(\d+)\s+failed/);
    const passMatch = output.match(/(\d+)\s+passed/);
    const failed = failMatch ? parseInt(failMatch[1], 10) : 0;
    const passed = passMatch ? parseInt(passMatch[1], 10) : 0;

    if (failed > 0) {
      return {
        level: 'WOUNDED',
        message: `${failed} constitutional test${failed === 1 ? '' : 's'} failing. ${passed} passing.`,
        poem: 'The covenant is strained.',
        remedy: 'Review the failing principles. The community depends on their integrity.',
      };
    }

    return {
      level: 'WOUNDED',
      message: 'Constitutional tests could not be run.',
      poem: 'The gathering could not be convened.',
      remedy: 'Add vitest.config.ts at the project root and ensure tests/constitutional/ is reachable.',
    };
  }
}
