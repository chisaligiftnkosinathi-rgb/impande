import { RateLimiter, RateLimitResult } from './index';

interface Bucket {
  tokens: number;
  lastRefill: number;
}

export class MemoryRateLimiter implements RateLimiter {
  private buckets = new Map<string, Bucket>();
  private readonly capacity: number;
  private readonly refillRatePerSec: number;

  constructor(capacity = 100, refillRatePerSec = 10) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
  }

  async check(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    let bucket = this.buckets.get(identifier);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
    } else {
      const timePassed = (now - bucket.lastRefill) / 1000;
      const refillAmount = timePassed * this.refillRatePerSec;
      
      bucket.tokens = Math.min(this.capacity, bucket.tokens + refillAmount);
      bucket.lastRefill = now;
    }

    const success = bucket.tokens >= 1;
    if (success) {
      bucket.tokens -= 1;
    }

    this.buckets.set(identifier, bucket);

    // Calculate when they will get 1 token back (if they are empty)
    const reset = success ? now : now + (1000 / this.refillRatePerSec);

    return {
      success,
      limit: this.capacity,
      remaining: Math.floor(bucket.tokens),
      reset,
    };
  }
}

// Global singleton for Version 1
export const globalRateLimiter = new MemoryRateLimiter();
