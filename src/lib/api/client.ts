/**
 * The base API client. React components should never use `fetch` directly.
 */

import { config } from '../config/config';
import { Tracer } from '../observability/tracer';

export interface ApiEnvelope<T> {
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
    apiVersion: string;
  };
  links?: Record<string, string>;
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
  meta: {
    requestId: string;
    timestamp: string;
    apiVersion: string;
  };
}

export class ApiError extends Error {
  public code: string;
  public details?: string[];

  constructor(env: ApiErrorEnvelope) {
    super(env.error.message);
    this.name = "ApiError";
    this.code = env.error.code;
    this.details = env.error.details;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiEnvelope<T>> {
  const url = endpoint.startsWith("http") ? endpoint : `${config.API_BASE_URL}/api/v1${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  return Tracer.trace('ApiClient.request', async () => {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data as ApiErrorEnvelope);
    }

    return data as ApiEnvelope<T>;
  }, { url, method: options.method || 'GET' });
}
