export interface LogContext {
  requestId?: string;
  correlationId?: string;
  collectionId?: string;
  operation?: string;
  durationMs?: number;
  [key: string]: any;
}

export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

class ConsoleLogger implements Logger {
  private format(level: string, message: string, context?: LogContext, error?: Error) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      errorMsg: error?.message,
      stack: error?.stack,
      ...context
    });
  }

  info(message: string, context?: LogContext) {
    console.log(this.format('INFO', message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.format('WARN', message, context));
  }

  error(message: string, error?: Error, context?: LogContext) {
    console.error(this.format('ERROR', message, context, error));
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.format('DEBUG', message, context));
    }
  }
}

// Export a singleton instance. In the future, this could be backed by Pino or Winston.
export const logger: Logger = new ConsoleLogger();
