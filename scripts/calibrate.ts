#!/usr/bin/env tsx
/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                                                               ║
 * ║   IMPANDE  —  CONSTITUTIONAL CALIBRATION ENGINE  v1.0         ║
 * ║                                                               ║
 * ║   "Before preserving history, verify its integrity."          ║
 * ║                                                               ║
 * ║   Architecture:                                               ║
 * ║                                                               ║
 * ║   CalibrationEngine (this file)                               ║
 * ║     ├── engine/registry.ts     — Element declarations         ║
 * ║     ├── engine/elements/*.ts   — Pure check functions         ║
 * ║     ├── engine/history.ts      — Persistence & patterns       ║
 * ║     └── renderer/terminal.ts   — ANSI presentation            ║
 * ║                                                               ║
 * ║   Run via:                                                    ║
 * ║     npm run calibrate   — ceremony only                       ║
 * ║     npm run water       — ceremony, then start Next.js        ║
 * ║                                                               ║
 * ║   Exit codes:                                                 ║
 * ║     0 — All roots FLOURISHING or WOUNDED (startup proceeds)   ║
 * ║     1 — One or more roots MISSING (startup halted)            ║
 * ║                                                               ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

import * as fs   from 'fs';
import * as path  from 'path';
import { createHash } from 'crypto';
import { execSync }   from 'child_process';

import { ELEMENTS }                    from './engine/registry';
import { loadHistory, saveReport }     from './engine/history';
import { TerminalRenderer }            from './renderer/terminal';
import type { CalibrationReport, CalibrationFingerprint, ElementReport } from './engine/types';


const ENGINE_VERSION = '1.0.0';
const ROOT = process.cwd();

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function overallLevel(reports: ElementReport[]): 'FLOURISHING' | 'WOUNDED' | 'MISSING' {
  if (reports.some(r => r.level === 'MISSING'))    return 'MISSING';
  if (reports.some(r => r.level === 'WOUNDED'))    return 'WOUNDED';
  return 'FLOURISHING';
}

function readPackage(): { name: string; version: string } {
  try {
    const raw = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
    const pkg = JSON.parse(raw);
    return { name: pkg.name ?? 'unknown', version: pkg.version ?? '0.0.0' };
  } catch {
    return { name: 'unknown', version: '0.0.0' };
  }
}

// ─── Fingerprint ──────────────────────────────────────────────────────────────

/** Read the current git commit hash. Returns 'untracked' if not in a repo. */
function gitCommit(short = false): string {
  try {
    const flag = short ? '--short' : '';
    return execSync(`git rev-parse ${flag} HEAD`, {
      encoding: 'utf8', stdio: 'pipe', cwd: ROOT,
    }).trim();
  } catch {
    return 'untracked';
  }
}

/**
 * Compute a SHA-256 hash of the report content.
 * The fingerprint field itself is excluded from hashing so the hash
 * covers only the content it attests to.
 */
function computeFingerprint(
  content: Omit<CalibrationReport, 'fingerprint'>
): CalibrationFingerprint {
  const sha256 = createHash('sha256')
    .update(JSON.stringify(content))
    .digest('hex');
  return {
    id:            content.timestamp,
    sha256,
    gitCommit:     gitCommit(true),
    gitCommitFull: gitCommit(false),
  };
}

// ─── Engine ───────────────────────────────────────────────────────────────────

async function runCalibration(): Promise<boolean> {
  const history  = loadHistory();
  const renderer = new TerminalRenderer();
  const pkg      = readPackage();

  renderer.renderOpening();

  const elementReports: ElementReport[] = [];

  for (const element of ELEMENTS) {
    // Render the element header (before the check runs — streaming feel)
    renderer.renderElementHeader(element);

    // Animate "Checking..." for non-interactive, non-remembrance elements
    const shouldAnimate = !element.interactive && element.variant !== 'remembrance';
    if (shouldAnimate) {
      renderer.startChecking();
      await sleep(280);
    }

    // Run the check — pure data, no rendering
    const result = await element.check(history);

    // Clear animation before printing result
    if (shouldAnimate) {
      renderer.clearChecking();
    }

    // Build the complete element report
    const report: ElementReport = {
      symbol:         element.symbol,
      element:        element.name,
      engine:         element.engine,
      quote:          element.quote,
      responsibility: element.responsibility,
      variant:        element.variant,
      interactive:    element.interactive,
      ...result,
    };

    elementReports.push(report);

    // Render the result
    renderer.renderElementResult(report);
  }

  // ── Build the full calibration report ─────────────────────────────────────
  const timestamp = new Date().toISOString();
  const content = {
    timestamp,
    engineVersion:  ENGINE_VERSION,
    project:        pkg.name,
    projectVersion: pkg.version,
    overall:        overallLevel(elementReports),
    elements:       elementReports,
  };

  const calibrationReport: CalibrationReport = {
    fingerprint: computeFingerprint(content),
    ...content,
  };

  // ── Render the closing ceremony ────────────────────────────────────────────
  renderer.renderClosing(calibrationReport);

  // ── Persist to history ─────────────────────────────────────────────────────
  saveReport(calibrationReport);

  return calibrationReport.overall !== 'MISSING';
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

runCalibration()
  .then(healthy => process.exit(healthy ? 0 : 1))
  .catch(err => {
    console.error('\n  Calibration Engine encountered an unexpected error:', err);
    process.exit(1);
  });
