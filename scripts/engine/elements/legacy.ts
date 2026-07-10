import * as fs from 'fs';
import * as path from 'path';
import type { CheckResult, CalibrationReport } from '../types';

const ROOT = process.cwd();

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  let version = '0.0.0';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    version = pkg.version ?? version;
  } catch {
    return {
      level: 'WOUNDED',
      message: 'package.json could not be read.',
      poem: 'The version is unknown.',
      remedy: 'Ensure package.json exists and is valid JSON.',
    };
  }

  const releasesRoot = path.join(ROOT, 'releases');
  let releaseDirs: string[] = [];

  if (fs.existsSync(releasesRoot)) {
    releaseDirs = fs.readdirSync(releasesRoot)
      .filter(name => fs.statSync(path.join(releasesRoot, name)).isDirectory())
      .sort();
  }

  if (releaseDirs.length === 0) {
    return {
      level: 'WOUNDED',
      message: `No release snapshots found. Archive version ${version} has no frozen record.`,
      poem: 'Legacy without a frozen record is memory at risk.',
      remedy: 'Create the first release snapshot in releases/v1.0/ before the archive grows further.',
    };
  }

  const latestRelease = releaseDirs[releaseDirs.length - 1];
  const releaseDir = path.join(releasesRoot, latestRelease);
  const standardPath = path.join(releaseDir, 'IMPANDE_STANDARD.md');

  if (!fs.existsSync(standardPath)) {
    return {
      level: 'WOUNDED',
      message: `Release ${latestRelease} found, but IMPANDE_STANDARD.md is absent from its snapshot.`,
      poem: 'The version is frozen, but the principles were not preserved with it.',
      remedy: 'The Standard must travel with every version freeze.',
    };
  }

  return {
    level: 'FLOURISHING',
    message: `Release ${latestRelease} is frozen and carries its Standard. Legacy is preserved.`,
  };
}
