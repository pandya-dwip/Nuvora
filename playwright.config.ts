import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration for Nuvora E-Commerce QA Automation (TypeScript)
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Global timeout for each test in milliseconds */
  timeout: 30000,

  /* Expect assertions timeout */
  expect: {
    timeout: 5000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only was left in code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Parallel workers */
  workers: process.env.CI ? 1 : undefined,

  /* HTML Test Reporter */
  reporter: 'html',

  /* Shared test execution options */
  use: {
    /* Configurable Base URL (defaults to Vite local server http://localhost:5180) */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5180',

    /* Action & Navigation Timeouts */
    actionTimeout: 10000,
    navigationTimeout: 15000,

    /* Capture screenshot automatically on test failure */
    screenshot: 'only-on-failure',

    /* Record video only on test failure */
    video: 'retain-on-failure',

    /* Collect trace files on first retry for debugging */
    trace: 'on-first-retry',
  },

  /* Browser Projects - Initially Chromium only */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Automatically start Vite development server before running tests */
  webServer: {
    command: 'npm run dev -- --port 5180 --strictPort',
    url: 'http://localhost:5180',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
