import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
// import path from 'path';
dotenv.config(
  { path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : './env-files/.env.demo' }
);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/ui-test',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['html', { open: 'always' }]], // For Local RUn
  reporter: [['html', { open: 'never' }]],  //For The Ci Pipeline Run
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect:
  {
    timeout: 60000
  },
  timeout: 90000,
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    /* baseURL: process.env.API_BASE_URL ,
    extraHTTPHeaders:
    {
      'Accept': 'application/json' ,
      "Content-Type" : "application/json" ,
      "Authorization" : "Basic YWRtaW46cGFzc3dvcmQxMjM="
    }, */

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: "Setup",
      testMatch: 'global.setup.ts'
    },
    {
      name: 'chromium',
      dependencies: ['Setup'],
      use: { ...devices['Desktop Chrome'], storageState: './Playwright/.auth/auth1.json' },
    },

    {
      name: 'firefox',
      dependencies: ['Setup'],
      use: { ...devices['Desktop Firefox'], storageState: './Playwright/.auth/auth1.json' }, //Load The Auth State
    },

    {
      name: 'webkit',
      dependencies: ['Setup'],
      use: { ...devices['Desktop Safari'], storageState: './Playwright/.auth/auth1.json' },
    },

    {
      name: 'apiTesting',
      testDir: './tests/api-test',
      use:
      {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders:
        {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        },
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
