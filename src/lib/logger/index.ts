import pino from 'pino';
import { env } from '../env';

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    }
  } : undefined,
});

// Create child loggers for specific domains
export const registryLogger = logger.child({ service: 'registry' });
export const intelligenceLogger = logger.child({ service: 'intelligence' });
export const apiLogger = logger.child({ service: 'api' });
export const requestLogger = logger.child({ service: 'request' });
