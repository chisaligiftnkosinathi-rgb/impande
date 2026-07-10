/**
 * Impande Constitutional Calibration Engine — History Module
 *
 * Saves each calibration run to docs/calibration/ as a timestamped JSON file.
 * Loads prior runs so the engine can detect patterns across time.
 *
 * "Impande remembers its own health."
 */

import * as fs from 'fs';
import * as path from 'path';
import type { CalibrationReport, CalibrationLevel } from './types';

const ROOT = process.cwd();
export const HISTORY_DIR = path.join(ROOT, 'docs', 'calibration');

// ─── Read ─────────────────────────────────────────────────────────────────────

/** Load the most recent N calibration reports from disk, oldest first. */
export function loadHistory(limit = 90): CalibrationReport[] {
  if (!fs.existsSync(HISTORY_DIR)) return [];

  try {
    const files = fs.readdirSync(HISTORY_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()          // ISO-based filenames sort chronologically
      .slice(-limit);

    return files.flatMap(f => {
      try {
        const raw = fs.readFileSync(path.join(HISTORY_DIR, f), 'utf8');
        return [JSON.parse(raw) as CalibrationReport];
      } catch {
        return [];
      }
    });
  } catch {
    return [];
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

/**
 * Persist a calibration report to the history directory.
 * Failures are silently swallowed — history saving must never halt the ceremony.
 */
export function saveReport(report: CalibrationReport): void {
  try {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
    // Replace colons and dots for Windows filename compatibility
    const filename = report.timestamp.replace(/[:.]/g, '-') + '.json';
    fs.writeFileSync(
      path.join(HISTORY_DIR, filename),
      JSON.stringify(report, null, 2),
      'utf8'
    );
  } catch {
    // Non-blocking — the ceremony continues
  }
}

// ─── Pattern Analysis ─────────────────────────────────────────────────────────

/**
 * Returns the number of consecutive runs (ending with the latest) where
 * the named element was at the given level.
 */
export function consecutiveLevel(
  history: CalibrationReport[],
  elementName: string,
  level: CalibrationLevel
): number {
  let count = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    const el = history[i].elements.find(e => e.element === elementName);
    if (el?.level === level) count++;
    else break;
  }
  return count;
}

/**
 * Returns how many calendar days have passed since the current consecutive
 * wound streak began for the named element.
 * Returns 0 if the element is not currently in a streak at that level.
 */
export function daysSinceStreakBegan(
  history: CalibrationReport[],
  elementName: string,
  level: CalibrationLevel
): number {
  // Walk backwards through history to find the start of the current streak
  let streakStart: string | null = null;
  for (let i = history.length - 1; i >= 0; i--) {
    const el = history[i].elements.find(e => e.element === elementName);
    if (el?.level === level) {
      streakStart = history[i].timestamp;
    } else {
      break;
    }
  }
  if (!streakStart) return 0;
  return Math.floor(
    (Date.now() - new Date(streakStart).getTime()) / (1000 * 60 * 60 * 24)
  );
}
