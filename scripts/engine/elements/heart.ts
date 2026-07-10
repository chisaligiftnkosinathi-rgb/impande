import type { CheckResult, CalibrationReport } from '../types';

/**
 * Remembrances drawn from the Impande sacred documents.
 * One is selected each day by day-of-year — the same remembrance
 * for every steward on the same day, different every day of the year.
 */
const REMEMBRANCES: Array<{ text: string; source: string }> = [
  {
    text: 'Before there were books, there were voices.\nBefore there were archives, there were elders.\nBefore there were records, there was remembrance.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'An elder was not just a person.\nAn elder was a living library.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'When an elder spoke,\nthe roots of the community drank water.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'We do not forget because our minds are weak.\nWe forget because the chain of stewardship breaks.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'Impande exists to return a soul to the archive.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'Identity is permanent.\nUnderstanding evolves.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'A Steward is a caretaker of the past,\nworking in service to the future.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'To remember faithfully.\nTo seek truth humbly.\nTo preserve both for those who come after.\n\nThis is the path of continuity. This is the root.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'The work of a Steward is to listen without judgment,\nto record without altering,\nand to preserve without deleting.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'We preserve conflicting memories faithfully,\nseeking truth humbly\nrather than erasing the uncertainty.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'Impande is not a genealogy application.\nIt is a Human Continuity Operating System.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'The memories entrusted to Impande\nbelong entirely to the descendants of those who lived them.',
    source: 'The Impande Manifesto',
  },
  {
    text: 'Every person is born into a story\nthat began long before their first breath.\nNo one should inherit a silence where a history ought to be.',
    source: 'The Impande Constitution, Article I',
  },
  {
    text: 'Truth is not owned. It is sought.\nEvery generation receives only a portion of it\nand bears the responsibility to leave a clearer path for those who follow.',
    source: 'The Impande Constitution, Article II',
  },
  {
    text: 'We do not fear unanswered questions.\nThey are not failures of remembrance\nbut invitations for future generations to continue the journey.',
    source: 'The Impande Constitution, Article III',
  },
  {
    text: 'Memory is the vessel.\nService is the act of filling it.',
    source: 'The Impande Constitution, Article IV',
  },
  {
    text: 'We are because those before us remembered.\nWe endure because we choose to remember.\nWe preserve so that those yet unborn may know where they come from.',
    source: 'The Impande Constitution, Preamble',
  },
  {
    text: 'Before preserving history,\nverify its integrity.',
    source: 'The Calibration Engine',
  },
  {
    text: 'Living things do not merely start.\nThey are watered.',
    source: 'A Steward\'s Vision',
  },
  {
    text: 'The software would not merely compile—\nit would first remember what it exists to preserve.',
    source: 'A Steward\'s Vision',
  },
  {
    text: 'No one remembers alone.',
    source: 'The Community Principle',
  },
  {
    text: 'Legacy is not what we leave behind.\nIt is what we refuse to destroy.',
    source: 'The Legacy Principle',
  },
  {
    text: 'The soil remembers every seed.',
    source: 'The Earth Element',
  },
  {
    text: 'Water finds every crack,\nand carries memory through it.',
    source: 'The Water Element',
  },
  {
    text: 'Fire reveals what shadow conceals.',
    source: 'The Fire Element',
  },
  {
    text: 'The wind carries the voice of the ancestors.',
    source: 'The Wind Element',
  },
  {
    text: 'A tree without roots\ncannot shelter those who come after.',
    source: 'The Tree Element',
  },
  {
    text: 'Light makes visible\nwhat was always there.',
    source: 'The Light Element',
  },
  {
    text: 'Truth cannot stand\nif its structure is compromised.',
    source: 'The Fire Principle',
  },
  {
    text: 'Memory survives\nbecause preservation remains faithful.',
    source: 'The Water Principle',
  },
];

export async function check(_history: CalibrationReport[]): Promise<CheckResult> {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const remembrance = REMEMBRANCES[dayOfYear % REMEMBRANCES.length];

  return {
    level: 'FLOURISHING',
    message: remembrance.text,
    poem: `— ${remembrance.source}`,
  };
}
