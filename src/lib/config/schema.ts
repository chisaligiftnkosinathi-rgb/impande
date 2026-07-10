import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  API_BASE_URL: z.string().url('API_BASE_URL must be a valid URL').default('http://localhost:3000'),
  // Add other required secrets here (e.g., S3 buckets, Auth keys)
});

export type EnvSchema = z.infer<typeof envSchema>;
