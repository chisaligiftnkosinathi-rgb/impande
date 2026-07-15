import { vi } from 'vitest';

// Mock env so Zod doesn't fail during unit tests
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
process.env.LOG_LEVEL = 'error'; // keep logs quiet during tests
process.env.API_VERSION = 'v1';
process.env.REGISTRY_STORAGE = 'json';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));
