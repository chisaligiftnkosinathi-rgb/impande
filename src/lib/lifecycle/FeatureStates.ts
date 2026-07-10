/**
 * Feature Lifecycle States
 *
 * Every feature in Impande progresses through these states.
 * Each state reflects the platform's honest communication about what is ready
 * and what is being faithfully preserved.
 */

export const FeatureState = {
  DISCOVERED: 'DISCOVERED',
  PLANNED: 'PLANNED',
  PRESERVED: 'PRESERVED',
  IMPLEMENTING: 'IMPLEMENTING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  READY: 'READY',
  ARCHIVED: 'ARCHIVED'
} as const;

export type FeatureStateType = typeof FeatureState[keyof typeof FeatureState];

/**
 * State metadata for UI rendering and behavior
 */
export const StateMetadata: Record<FeatureStateType, {
  symbol: string;
  label: string;
  description: string;
  allowNavigation: boolean;
  isPublic: boolean;
}> = {
  DISCOVERED: {
    symbol: '🔦',
    label: 'Newly Discovered',
    description: 'Emerged through the work; now recognized as a feature',
    allowNavigation: true,
    isPublic: true
  },
  PLANNED: {
    symbol: '🗺️',
    label: 'Planned',
    description: 'Designed but not yet implemented',
    allowNavigation: false,
    isPublic: false
  },
  PRESERVED: {
    symbol: '🌱',
    label: 'Being Tended',
    description: 'Work is underway with care',
    allowNavigation: true,
    isPublic: true
  },
  IMPLEMENTING: {
    symbol: '🧪',
    label: 'Under Development',
    description: 'Active development, subject to change',
    allowNavigation: true,
    isPublic: true
  },
  UNDER_REVIEW: {
    symbol: '🔍',
    label: 'Under Review',
    description: 'Awaiting steward verification',
    allowNavigation: true,
    isPublic: true
  },
  READY: {
    symbol: '✅',
    label: 'Ready',
    description: 'Available to all stewards',
    allowNavigation: true,
    isPublic: true
  },
  ARCHIVED: {
    symbol: '📚',
    label: 'Archived',
    description: 'Historical, preserved for reference',
    allowNavigation: true,
    isPublic: true
  }
};

/**
 * State progression rules
 * Defines valid transitions between states
 */
export const ValidTransitions: Record<FeatureStateType, FeatureStateType[]> = {
  DISCOVERED: [FeatureState.PLANNED, FeatureState.PRESERVED],
  PLANNED: [FeatureState.PRESERVED],
  PRESERVED: [FeatureState.IMPLEMENTING, FeatureState.ARCHIVED],
  IMPLEMENTING: [FeatureState.UNDER_REVIEW, FeatureState.PRESERVED],
  UNDER_REVIEW: [FeatureState.READY, FeatureState.PRESERVED],
  READY: [FeatureState.ARCHIVED],
  ARCHIVED: []
};

/**
 * Utility to check if a state transition is valid
 */
export function isValidTransition(from: FeatureStateType, to: FeatureStateType): boolean {
  return ValidTransitions[from].includes(to);
}

/**
 * Get all features that should be visible in public navigation
 */
export function isPubliclyVisible(state: FeatureStateType): boolean {
  return StateMetadata[state].isPublic;
}

/**
 * Get all features that should be navigable
 */
export function isNavigable(state: FeatureStateType): boolean {
  return StateMetadata[state].allowNavigation;
}
