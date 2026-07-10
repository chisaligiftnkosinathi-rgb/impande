import { execSync } from 'child_process';
import { daysSinceStreakBegan } from '../history';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

export async function check(history: CalibrationReport[]): Promise<CheckResult> {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8', stdio: 'pipe', cwd: ROOT,
    }).trim();

    const status = execSync('git status --porcelain', {
      encoding: 'utf8', stdio: 'pipe', cwd: ROOT,
    }).trim();

    if (status) {
      const changeCount = status.split('\n').filter(Boolean).length;
      const days = daysSinceStreakBegan(history, 'Earth', 'WOUNDED');

      if (days >= 7) {
        return {
          level: 'WOUNDED',
          message: `Branch: ${branch}. ${changeCount} uncommitted change${changeCount === 1 ? '' : 's'}. This wound has persisted for ${days} day${days === 1 ? '' : 's'}.`,
          poem: `The soil has been unsettled for ${days} days. Consider preserving your work.`,
          remedy: 'Commit or stash your changes. A seed planted in unsettled soil may not take root.',
        };
      }

      return {
        level: 'WOUNDED',
        message: `Branch: ${branch}. ${changeCount} uncommitted change${changeCount === 1 ? '' : 's'} detected.`,
        poem: 'The root still lives, but it requires tending.',
        remedy: 'Consider committing your work before planting something new.',
      };
    }

    return {
      level: 'FLOURISHING',
      message: `Repository clean. On branch: ${branch}.`,
    };
  } catch {
    return {
      level: 'WOUNDED',
      message: 'Git status could not be read.',
      poem: 'The soil speaks, but its voice is unclear.',
      remedy: 'Ensure you are inside a git repository.',
    };
  }
}
