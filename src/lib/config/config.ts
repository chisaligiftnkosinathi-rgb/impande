import { envSchema } from './schema';

/**
 * Validates the environment variables against the Zod schema.
 * Throws an explicit error on startup if any required variable is missing or malformed.
 */
function validateConfig() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    // Fail fast on invalid config
    throw new Error('Invalid environment configuration');
  }

  return parsed.data;
}

export const config = validateConfig();
