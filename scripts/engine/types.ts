/**
 * Impande Constitutional Calibration Engine — v1.0
 * Core type definitions.
 *
 * Contract: The Engine produces CalibrationReport. Renderers consume it.
 * Check functions are pure: they take history, return CheckResult.
 * No rendering concerns belong inside check functions.
 *
 * Supported renderers (current and future):
 *   - Terminal (ANSI)
 *   - JSON (stdout, for CI)
 *   - Web dashboard
 *   - VS Code extension
 *   - Mobile steward app
 */

export type CalibrationLevel = 'FLOURISHING' | 'WOUNDED' | 'MISSING';

/** What an element check function returns — pure data, no presentation. */
export interface CheckResult {
  level: CalibrationLevel;
  /** A factual description of what was found. */
  message: string;
  /** Optional poetic line naming the wound or health in Impande language. */
  poem?: string;
  /** A concrete action the steward can take to restore the root. */
  remedy?: string;
}

/**
 * The complete record for a single element after a calibration run.
 * Combines the static element metadata with the dynamic check result.
 * This is what gets saved to history and passed to renderers.
 */
export interface ElementReport {
  symbol:         string;
  element:        string;
  engine:         string;
  quote:          string;
  responsibility: string;
  variant?:       'check' | 'remembrance';
  interactive?:   boolean;
  // Check result fields (dynamic)
  level:    CalibrationLevel;
  message:  string;
  poem?:    string;
  remedy?:  string;
}

/**
 * A cryptographic fingerprint attached to every calibration report.
 * Makes each report a verifiable historical artifact.
 * Someone reading this in 2050 or 2126 can know exactly which version
 * of which system, at which commit, produced this record.
 */
export interface CalibrationFingerprint {
  /** Unique report ID — ISO timestamp at time of run. */
  id:            string;
  /** SHA-256 hash of the report content (all fields except this fingerprint). */
  sha256:        string;
  /** Short git commit hash at time of run. 'untracked' if outside a repository. */
  gitCommit:     string;
  /** Full git commit hash for unambiguous archival reference. */
  gitCommitFull: string;
}

/** The full calibration report produced by the engine for one run. */
export interface CalibrationReport {
  fingerprint:    CalibrationFingerprint;
  timestamp:      string;   // ISO 8601
  engineVersion:  string;   // Calibration Engine version
  project:        string;   // Package name
  projectVersion: string;   // Package version
  overall:        CalibrationLevel;
  elements:       ElementReport[];
}


/** Definition of a single calibration element — the static declaration. */
export interface CalibrationElement {
  symbol:         string;
  name:           string;
  engine:         string;
  quote:          string;
  responsibility: string;
  /**
   * 'check'       (default) — animated "Checking..." indicator, result with status icon.
   * 'remembrance' — no animation, message displayed as a centered quotation.
   */
  variant?:     'check' | 'remembrance';
  /** True for elements that interact with stdin (Steward). */
  interactive?: boolean;
  /**
   * The check function. Receives prior calibration history for pattern detection.
   * Pure function: reads only. No rendering, no writing, no side effects.
   * Exception: the Steward element may print reflection prompts directly to stdout.
   */
  check: (history: CalibrationReport[]) => Promise<CheckResult>;
}
