import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { globalRateLimiter } from './lib/rate-limit/memory';

export async function middleware(request: NextRequest) {
  // 1. Generate Request ID
  const requestId = uuidv4();

  // We clone the headers to inject the Request-Id
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  // Apply API-specific middleware
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // 2. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const rateLimit = await globalRateLimiter.check(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests',
            requestId
          }
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
            'x-request-id': requestId
          }
        }
      );
    }
    
    // We can't log here perfectly because Pino may not run in Edge runtime correctly, 
    // or we'd just use console.log or defer to route handlers.
    // For now we just pass the modified request.
  }

  // 3. Return response with headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  response.headers.set('x-request-id', requestId);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
