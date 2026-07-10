import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for Impande.
 *
 * This file exists to prevent vitest from walking up the directory tree
 * and finding a stray vite.config.js in a parent directory. By placing
 * this config at the project root, vitest is anchored here.
 */
export default defineConfig({
  test: {
    root:        '.',
    environment: 'node',
    include:     ['tests/**/*.test.ts'],
    exclude:     ['node_modules', '.next'],
  },
});
