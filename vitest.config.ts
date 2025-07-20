import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',
    },
  },
});
