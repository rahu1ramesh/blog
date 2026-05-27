/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter()].filter(Boolean),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: [
      './**/*.test.ts?',
      './**/*.test.tsx?',
    ],
    exclude: [
      '**/constants',
      '**/styles',
      '**/__mocks__',
      '**/setupTests.ts',
      '**/models',
    ],
    coverage: {
      exclude: [
        '**/constants',
        '**/styles',
        '**/__mocks__',
        '**/setupTests.ts',
        '**/models',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95
      }
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
