/**
 * Impande Constitutional Calibration Engine — Terminal Renderer
 *
 * Consumes a CalibrationReport and renders it to the terminal using ANSI colors.
 * This renderer is intentionally decoupled from all check logic.
 *
 * To add a new renderer (JSON, web, VS Code extension), implement the same
 * interface using CalibrationReport and ElementReport from engine/types.ts.
 */

import type { CalibrationReport, ElementReport, CalibrationElement, CalibrationLevel } from '../engine/types';

// ─── ANSI Color Palette ───────────────────────────────────────────────────────
// No external dependencies. The archive travels light.

const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  italic:  '\x1b[3m',
  gold:    '\x1b[38;5;178m',
  green:   '\x1b[38;5;114m',
  red:     '\x1b[38;5;167m',
  yellow:  '\x1b[38;5;221m',
  ochre:   '\x1b[38;5;136m',
  muted:   '\x1b[38;5;245m',
};

const W = 54; // Line width for dividers

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hr(): void {
  console.log(`  ${C.muted}${'─'.repeat(W)}${C.reset}`);
}

function blank(): void {
  console.log();
}

function statusIcon(level: CalibrationLevel): string {
  switch (level) {
    case 'FLOURISHING': return `${C.green}✓${C.reset}`;
    case 'WOUNDED':     return `${C.yellow}⚠${C.reset}`;
    case 'MISSING':     return `${C.red}✗${C.reset}`;
  }
}

function levelColor(level: CalibrationLevel): string {
  switch (level) {
    case 'FLOURISHING': return C.green;
    case 'WOUNDED':     return C.yellow;
    case 'MISSING':     return C.red;
  }
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

export class TerminalRenderer {

  /** The opening invocation — displayed once before all elements. */
  renderOpening(): void {
    blank();
    console.log(`  ${C.gold}${C.bold}╔${'═'.repeat(W + 2)}╗${C.reset}`);
    console.log(`  ${C.gold}${C.bold}║${' '.repeat(W + 2)}║${C.reset}`);
    console.log(`  ${C.gold}${C.bold}║   🌱  Watering the roots of Impande...${' '.repeat(W - 36)}║${C.reset}`);
    console.log(`  ${C.gold}${C.bold}║${' '.repeat(W + 2)}║${C.reset}`);
    console.log(`  ${C.gold}${C.bold}╚${'═'.repeat(W + 2)}╝${C.reset}`);
    blank();
  }

  /** The element header — symbol, name, engine, quote. Displayed before the check runs. */
  renderElementHeader(element: CalibrationElement): void {
    hr();
    blank();
    console.log(
      `  ${element.symbol}  ${C.bold}${element.name}${C.reset}` +
      `  ${C.muted}—  ${element.engine}${C.reset}`
    );
    blank();
    console.log(`  ${C.italic}${C.muted}${element.quote}${C.reset}`);
    blank();
  }

  /** Shows the animated "Checking..." indicator. Call clearChecking() after. */
  startChecking(): void {
    process.stdout.write(`  ${C.muted}Checking...${C.reset}`);
  }

  /** Clears the "Checking..." indicator so the result can be printed on the same line. */
  clearChecking(): void {
    process.stdout.write('\r' + ' '.repeat(20) + '\r');
  }

  /** The element result — status, poem, remedy, responsibility. */
  renderElementResult(report: ElementReport): void {

    // ── Remembrance variant (Heart element) ────────────────────────────────
    if (report.variant === 'remembrance') {
      console.log(`  ${C.muted}Today's remembrance${C.reset}`);
      blank();
      // Indent each line of the multi-line quote
      const lines = report.message.split('\n');
      for (const line of lines) {
        console.log(`  ${C.italic}${C.ochre}${line}${C.reset}`);
      }
      if (report.poem) {
        blank();
        console.log(`  ${C.muted}${C.dim}${report.poem}${C.reset}`);
      }
      blank();
      console.log(`  ${C.muted}Responsibility:${C.reset}`);
      console.log(`  ${C.italic}${report.responsibility}${C.reset}`);
      blank();
      return;
    }

    // ── Standard check variant ─────────────────────────────────────────────
    const icon  = statusIcon(report.level);
    const color = levelColor(report.level);

    console.log(`  ${icon}  ${color}${report.message}${C.reset}`);

    if (report.poem) {
      blank();
      console.log(`     ${C.italic}${C.muted}${report.poem}${C.reset}`);
    }

    if (report.level === 'MISSING') {
      blank();
      console.log(`     ${C.red}${C.bold}A root has been lost.${C.reset}`);
    }

    if (report.remedy) {
      blank();
      console.log(`  ${C.muted}Remedy:${C.reset}`);
      console.log(`  ${C.dim}${report.remedy}${C.reset}`);
    }

    blank();
    console.log(`  ${C.muted}Responsibility:${C.reset}`);
    console.log(`  ${C.italic}${report.responsibility}${C.reset}`);
    blank();

    if (report.level === 'MISSING') {
      console.log(`  ${C.red}${C.bold}Startup halted.${C.reset}`);
      blank();
    }
  }

  /** The closing ceremony — displayed once after all elements. Never congratulates. */
  renderClosing(report: CalibrationReport): void {
    hr();
    blank();

    if (report.overall === 'MISSING') {
      console.log(`  ${C.red}${C.bold}The roots require restoration.${C.reset}`);
      blank();
      console.log(`  ${C.muted}One or more essential roots are absent.${C.reset}`);
      console.log(`  ${C.muted}The archive cannot grow on hollow ground.${C.reset}`);
      blank();
      console.log(`  ${C.italic}${C.muted}Restore what is missing. Then return.${C.reset}`);
    } else {
      console.log(`  ${C.gold}${C.bold}The roots have received water.${C.reset}`);
      blank();
      console.log(`  ${C.italic}Truth is remembered.${C.reset}`);
      console.log(`  ${C.italic}Memory is preserved.${C.reset}`);
      console.log(`  ${C.italic}Future generations are welcomed.${C.reset}`);
      blank();
      console.log(`  ${C.muted}${C.italic}Go in humility.${C.reset}`);
    }

    blank();
    hr();

    // ── History footer ───────────────────────────────────────────────────────
    blank();
    console.log(`  ${C.dim}─ Calibration Report ─────────────────────────────────────────${C.reset}`);
    blank();
    console.log(`  ${C.muted}ID         ${C.reset}${C.dim}${report.fingerprint.id}${C.reset}`);
    console.log(`  ${C.muted}Git        ${C.reset}${C.dim}${report.fingerprint.gitCommit}${C.reset}`);
    console.log(`  ${C.muted}SHA-256    ${C.reset}${C.dim}${report.fingerprint.sha256.slice(0, 16)}...${report.fingerprint.sha256.slice(-8)}${C.reset}`);
    console.log(`  ${C.muted}Engine     ${C.reset}${C.dim}v${report.engineVersion}${C.reset}`);
    console.log(`  ${C.muted}Project    ${C.reset}${C.dim}${report.project} v${report.projectVersion}${C.reset}`);
    blank();
    console.log(`  ${C.dim}Report saved to docs/calibration/${C.reset}`);
    blank();
  }
}
