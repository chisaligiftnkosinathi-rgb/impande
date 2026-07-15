export type ErrorCode = 
  | 'INTERNAL_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'REGISTRY_ERROR'
  | 'STORAGE_ERROR'
  | 'INTELLIGENCE_ERROR'
  | 'UNAUTHORIZED'
  | 'RATE_LIMITED';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(message: string, code: ErrorCode = 'INTERNAL_ERROR', statusCode: number = 500, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resourceType: string, resourceId: string) {
    super(`${resourceType} '${resourceId}' not found`, 'NOT_FOUND', 404);
  }
}

export class RegistryError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'REGISTRY_ERROR', 500, details);
  }
}

export class StorageError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'STORAGE_ERROR', 500, details);
  }
}

export class IntelligenceError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'INTELLIGENCE_ERROR', 500, details);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMITED', 429);
  }
}
