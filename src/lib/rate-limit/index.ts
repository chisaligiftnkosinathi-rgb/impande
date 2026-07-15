export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimiter {
  /**
   * Check if a given identifier (e.g. IP address) is allowed to make a request.
   */
  check(identifier: string): Promise<RateLimitResult>;
}
