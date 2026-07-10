/**
 * Impande Constitutional Calibration Engine — Element Registry
 *
 * To add a new root to the ecosystem, add a CalibrationElement here.
 * Future projects (iPhande, EchoLedger, SANAS, Kingdom Gateway) will
 * register their own elements in a shared registry.
 *
 * Order matters: elements are checked and displayed top-to-bottom.
 * Convention: technical elements first, reflective elements last.
 */

import type { CalibrationElement } from './types';
import { check as checkEarth }     from './elements/earth';
import { check as checkWater }     from './elements/water';
import { check as checkFire }      from './elements/fire';
import { check as checkWind }      from './elements/wind';
import { check as checkTree }      from './elements/tree';
import { check as checkLight }     from './elements/light';
import { check as checkCommunity } from './elements/community';
import { check as checkLegacy }    from './elements/legacy';
import { check as checkSteward }   from './elements/steward';
import { check as checkHeart }     from './elements/heart';

export const ELEMENTS: CalibrationElement[] = [
  {
    symbol:         '🌍',
    name:           'Earth',
    engine:         'Repository',
    quote:          '"The soil remembers every seed."',
    responsibility: 'Protect the foundation before planting something new.',
    check:          checkEarth,
  },
  {
    symbol:         '💧',
    name:           'Water',
    engine:         'Preservation',
    quote:          '"Water finds every crack, and carries memory through it."',
    responsibility: 'Memory survives because preservation remains faithful.',
    check:          checkWater,
  },
  {
    symbol:         '🔥',
    name:           'Fire',
    engine:         'Truth Engine',
    quote:          '"Fire reveals what shadow conceals."',
    responsibility: 'Truth cannot stand if its structure is compromised.',
    check:          checkFire,
  },
  {
    symbol:         '🌬',
    name:           'Wind',
    engine:         'Constitution',
    quote:          '"The wind carries the voice of the ancestors."',
    responsibility: 'The words of the covenant must remain whole.',
    check:          checkWind,
  },
  {
    symbol:         '🌳',
    name:           'Tree',
    engine:         'Continuity',
    quote:          '"A tree without roots cannot shelter those who come after."',
    responsibility: 'Every branch depends on what lies beneath.',
    check:          checkTree,
  },
  {
    symbol:         '☀️',
    name:           'Light',
    engine:         'Heritage',
    quote:          '"Light makes visible what was always there."',
    responsibility: 'Carry the stories forward, without alteration.',
    check:          checkLight,
  },
  {
    symbol:         '🤝',
    name:           'Community',
    engine:         'Stewardship',
    quote:          '"No one remembers alone."',
    responsibility: 'The covenant is only as strong as those who keep it.',
    check:          checkCommunity,
  },
  {
    symbol:         '⭐',
    name:           'Legacy',
    engine:         'Version Freeze',
    quote:          '"Legacy is not what we leave behind. It is what we refuse to destroy."',
    responsibility: 'Freeze what is sacred before the next season begins.',
    check:          checkLegacy,
  },
  {
    symbol:       '🕊',
    name:         'Steward',
    engine:       'Readiness',
    quote:        '"The work of a Steward is to listen without judgment, to record without altering, and to preserve without deleting."',
    responsibility: 'Enter this space as a caretaker of the past, working in service to the future.',
    interactive:  true,
    check:        checkSteward,
  },
  {
    symbol:         '❤️',
    name:           'Heart',
    engine:         "Today's Remembrance",
    quote:          '"Remember why this work was begun. Return to it often."',
    responsibility: 'Begin each session by being reminded why Impande exists.',
    variant:        'remembrance',
    check:          checkHeart,
  },
];
