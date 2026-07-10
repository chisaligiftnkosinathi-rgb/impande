import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '../observability/logger';

export class SecurityMiddleware {
  /**
   * Applies standard security headers to outgoing responses.
   * - Strict-Transport-Security (HSTS)
   * - Content-Security-Policy (CSP)
   * - X-Frame-Options
   */
  static applySecurityHeaders(response: NextResponse) {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
    return response;
  }

  /**
   * A mock rate limiter for the API boundary.
   * In production, this would be backed by Redis or an API Gateway.
   */
  static checkRateLimit(request: NextRequest): boolean {
    const ip = request.ip || 'unknown';
    // Simplified logic: If the rate limit is exceeded, return false.
    // We log the enforcement for observability.
    const isLimited = false; // Mocked

    if (isLimited) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`, { operation: 'RateLimit', ip });
    }

    return !isLimited;
  }
}
