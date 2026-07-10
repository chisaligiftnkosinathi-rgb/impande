/**
 * Feature Lifecycle Metadata
 *
 * Every feature in Impande declares its lifecycle state and answers
 * the four questions that make it a Living Page:
 * 1. What is this place?
 * 2. Why does it matter?
 * 3. What is happening now?
 * 4. How can I participate today?
 */

import { FeatureStateType } from './FeatureStates';

/**
 * How a steward can participate in an unfinished feature
 */
export interface ParticipationOption {
  label: string;
  description?: string;
  action?: () => void;
  href?: string;
}

/**
 * Timeline for an unfinished feature
 */
export interface FeatureTimeline {
  currentPhase: string;
  nextMilestone?: string;
  estimatedReadyDate?: string;
  blockages?: string[];
}

/**
 * Core metadata for a feature
 * This is what every feature must declare
 */
export interface FeatureMetadata {
  // Identity
  id: string;
  title: string;
  state: FeatureStateType;

  // Living Page: The Four Questions
  /** Q1: What is this place? */
  purpose: string;

  /** Q2: Why does it matter? */
  whyMatters: string;

  /** Q3: What is happening now? */
  currentStatus: string;

  /** Q4: How can I participate today? */
  participationOptions: ParticipationOption[];

  // Additional metadata
  route?: string;
  description?: string;
  timeline?: FeatureTimeline;
  discoveredDate?: string;
  plannedDate?: string;
  implementationPhase?: string;
  approvalGates?: string[];
  links?: {
    issue?: string;
    discussion?: string;
    documentation?: string;
    relatedFeatures?: string[];
  };
}

/**
 * Response for a Living Page
 * Combines feature metadata with utility methods
 */
export class LivingPageResponse {
  constructor(public feature: FeatureMetadata) {}

  /**
   * Get the symbol for this feature's state
   */
  getStateSymbol(): string {
    const { StateMetadata } = require('./FeatureStates');
    return StateMetadata[this.feature.state].symbol;
  }

  /**
   * Get the label for this feature's state
   */
  getStateLabel(): string {
    const { StateMetadata } = require('./FeatureStates');
    return StateMetadata[this.feature.state].label;
  }

  /**
   * Check if this feature is navigable
   */
  isNavigable(): boolean {
    const { isNavigable } = require('./FeatureStates');
    return isNavigable(this.feature.state);
  }

  /**
   * Check if this feature should appear in public navigation
   */
  isPublic(): boolean {
    const { isPubliclyVisible } = require('./FeatureStates');
    return isPubliclyVisible(this.feature.state);
  }

  /**
   * Get participation options appropriate for this state
   */
  getParticipationOptions(): ParticipationOption[] {
    return this.feature.participationOptions;
  }

  /**
   * Check if this feature has blockages
   */
  hasBlockages(): boolean {
    return !!(this.feature.timeline?.blockages?.length);
  }

  /**
   * Get blockage descriptions
   */
  getBlockages(): string[] {
    return this.feature.timeline?.blockages || [];
  }
}

/**
 * Middleware response for non-READY routes
 * Prevents 404 by returning graceful feature status page
 */
export interface RouteLifecycleResponse {
  statusCode: 200;
  feature: FeatureMetadata;
  message: string;
  timestamp: string;
}

/**
 * For API routes that are not yet READY
 */
export function createRouteLifecycleResponse(feature: FeatureMetadata): RouteLifecycleResponse {
  return {
    statusCode: 200,
    feature,
    message: `This feature (${feature.title}) is currently in ${feature.state} state.`,
    timestamp: new Date().toISOString()
  };
}
