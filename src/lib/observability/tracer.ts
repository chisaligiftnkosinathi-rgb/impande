import { logger } from './logger';
import { Metrics } from './metrics';

export class Tracer {
  /**
   * Wraps an async function with standard observability tracing (Logs + Metrics).
   */
  static async trace<T>(
    operationName: string, 
    fn: () => Promise<T>, 
    context?: Record<string, any>
  ): Promise<T> {
    const start = Date.now();
    logger.debug(`Starting ${operationName}`, { operation: operationName, ...context });
    
    try {
      const result = await fn();
      const durationMs = Date.now() - start;
      
      logger.info(`Completed ${operationName}`, { operation: operationName, durationMs, status: 'success', ...context });
      Metrics.histogram(`${operationName}.duration`, durationMs, { status: 'success', ...context });
      
      return result;
    } catch (error) {
      const durationMs = Date.now() - start;
      
      logger.error(`Failed ${operationName}`, error as Error, { operation: operationName, durationMs, status: 'error', ...context });
      Metrics.histogram(`${operationName}.duration`, durationMs, { status: 'error', ...context });
      Metrics.increment(`${operationName}.errors`, 1, context);
      
      throw error;
    }
  }
}
