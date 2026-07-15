import { apiLogger } from './index';

export function logRequest(req: Request, requestId: string) {
  apiLogger.info({
    operation: 'request_start',
    requestId,
    method: req.method,
    url: req.url,
  }, 'Incoming request');
}

export function logResponse(requestId: string, statusCode: number, durationMs: number) {
  apiLogger.info({
    operation: 'request_end',
    requestId,
    statusCode,
    durationMs,
  }, 'Request completed');
}

export function logError(requestId: string, error: Error) {
  apiLogger.error({
    operation: 'request_error',
    requestId,
    error: {
      message: error.message,
      stack: error.stack,
    },
  }, 'Request failed');
}
