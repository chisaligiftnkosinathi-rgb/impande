import * as readline from 'readline';
import type { CheckResult, CalibrationReport } from '../types';

// Colors — minimal, only what this element needs for its interactive prompts.
const DIM    = '\x1b[2m';
const ITALIC = '\x1b[3m';
const GOLD   = '\x1b[38;5;178m';
const MUTED  = '\x1b[38;5;245m';
const RESET  = '\x1b[0m';

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  // In non-interactive environments (CI, piped output), defer gracefully.
  if (!process.stdin.isTTY) {
    return {
      level: 'WOUNDED',
      message: 'Steward reflection deferred. No interactive terminal detected.',
      poem: 'The reflection awaits a human presence.',
      remedy: 'Run `npm run calibrate` in your terminal to observe the reflection.',
    };
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const pause = (prompt: string): Promise<void> =>
    new Promise(resolve => rl.question(prompt, () => resolve()));

  console.log();
  console.log(`  ${MUTED}You are entering a sacred responsibility.${RESET}`);
  console.log(`  ${MUTED}Not merely a coding session.${RESET}`);
  console.log();

  await pause(
    `  ${DIM}Does today's work preserve truth?${RESET}\n\n` +
    `  ${MUTED}[Enter to reflect]${RESET} `
  );
  console.log();

  await pause(
    `  ${DIM}Does today's work increase transparency?${RESET}\n\n` +
    `  ${MUTED}[Enter to reflect]${RESET} `
  );
  console.log();

  await pause(
    `  ${DIM}Does today's work better serve people?${RESET}\n\n` +
    `  ${MUTED}[Enter to reflect]${RESET} `
  );
  console.log();

  rl.close();

  console.log(`  ${ITALIC}${GOLD}Thank you, Steward.${RESET}`);
  console.log();

  return {
    level: 'FLOURISHING',
    message: 'A moment of intention has been observed.',
  };
}
