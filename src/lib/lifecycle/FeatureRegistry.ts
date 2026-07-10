/**
 * Feature Registry
 * 
 * Single source of truth for all feature lifecycle states.
 * Every route, page, and ceremony in Impande should register here.
 * 
 * The Calibration Engine, Navigation, Middleware, and Deployment
 * all read from this one place.
 */

import { FeatureMetadata, FeatureStateType } from './FeatureLifecycle';
import { isValidTransition } from './FeatureStates';

class FeatureRegistryImpl {
  private features: Map<string, FeatureMetadata> = new Map();
  private transitions: Array<{
    featureId: string;
    from: FeatureStateType;
    to: FeatureStateType;
    timestamp: string;
    commitHash?: string;
  }> = [];

  /**
   * Register a feature and its lifecycle metadata
   */
  register(feature: FeatureMetadata): void {
    if (this.features.has(feature.id)) {
      throw new Error(`Feature '${feature.id}' is already registered. Use update() instead.`);
    }
    this.features.set(feature.id, feature);
  }

  /**
   * Update a feature's lifecycle state
   * Validates that the transition is allowed
   */
  updateState(
    featureId: string,
    newState: FeatureStateType,
    commitHash?: string
  ): void {
    const feature = this.features.get(featureId);
    if (!feature) {
      throw new Error(`Feature '${featureId}' not found in registry.`);
    }

    if (!isValidTransition(feature.state, newState)) {
      throw new Error(
        `Invalid state transition for '${featureId}': ${feature.state} -> ${newState}`
      );
    }

    // Record transition
    this.transitions.push({
      featureId,
      from: feature.state,
      to: newState,
      timestamp: new Date().toISOString(),
      commitHash
    });

    // Update feature
    feature.state = newState;
  }

  /**
   * Get a feature by ID
   */
  get(featureId: string): FeatureMetadata | undefined {
    return this.features.get(featureId);
  }

  /**
   * Get all features
   */
  getAll(): FeatureMetadata[] {
    return Array.from(this.features.values());
  }

  /**
   * Get all public features (those that should appear in navigation)
   */
  getPublic(): FeatureMetadata[] {
    const { isPubliclyVisible } = require('./FeatureStates');
    return this.getAll().filter((f) => isPubliclyVisible(f.state));
  }

  /**
   * Get all navigable features
   */
  getNavigable(): FeatureMetadata[] {
    const { isNavigable } = require('./FeatureStates');
    return this.getAll().filter((f) => isNavigable(f.state));
  }

  /**
   * Get features by state
   */
  getByState(state: FeatureStateType): FeatureMetadata[] {
    return this.getAll().filter((f) => f.state === state);
  }

  /**
   * Count features by state (for Calibration Engine)
   */
  countByState(): Record<FeatureStateType, number> {
    const counts = {
      DISCOVERED: 0,
      PLANNED: 0,
      PRESERVED: 0,
      IMPLEMENTING: 0,
      UNDER_REVIEW: 0,
      READY: 0,
      ARCHIVED: 0
    };

    for (const feature of this.features.values()) {
      counts[feature.state]++;
    }

    return counts;
  }

  /**
   * Get all transitions (audit trail)
   */
  getTransitions() {
    return this.transitions;
  }

  /**
   * Get transition history for a specific feature
   */
  getTransitionHistory(featureId: string) {
    return this.transitions.filter((t) => t.featureId === featureId);
  }

  /**
   * Check for blocked features (IMPLEMENTING/PRESERVED with blockages)
   */
  getBlockedFeatures(): FeatureMetadata[] {
    return this.getAll().filter((f) => f.timeline?.blockages?.length);
  }

  /**
   * Validate that no public feature is accidentally empty
   * (every feature must answer the four questions)
   */
  validateLivingPages(): Array<{
    featureId: string;
    issues: string[];
  }> {
    const { isPubliclyVisible } = require('./FeatureStates');
    const issues: Array<{ featureId: string; issues: string[] }> = [];

    for (const feature of this.getAll()) {
      if (!isPubliclyVisible(feature.state)) continue;

      const featureIssues: string[] = [];

      if (!feature.purpose) featureIssues.push('Missing purpose (Q1: What is this place?)');
      if (!feature.whyMatters) featureIssues.push('Missing whyMatters (Q2: Why does it matter?)');
      if (!feature.currentStatus)
        featureIssues.push('Missing currentStatus (Q3: What is happening now?)');
      if (!feature.participationOptions?.length)
        featureIssues.push('Missing participationOptions (Q4: How can I participate?)');

      if (featureIssues.length) {
        issues.push({ featureId: feature.id, issues: featureIssues });
      }
    }

    return issues;
  }

  /**
   * Clear the registry (mainly for testing)
   */
  clear(): void {
    this.features.clear();
    this.transitions = [];
  }
}

// Singleton instance
export const FeatureRegistry = new FeatureRegistryImpl();

/**
 * Helper to register multiple features at once
 */
export function registerFeatures(features: FeatureMetadata[]): void {
  for (const feature of features) {
    FeatureRegistry.register(feature);
  }
}
