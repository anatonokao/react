/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

/// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        ...configDefaults.exclude,
        'src/contexts/**',
        'src/components/ErrorsHandle/**',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
    exclude: [
      ...configDefaults.exclude,
      'src/contexts/**',
      'src/components/ErrorsHandle/**',
    ],
    reporters: 'verbose',
  },
});
