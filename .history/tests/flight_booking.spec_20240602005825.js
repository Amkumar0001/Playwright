// Import the necessary modules
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

// Set up the test configuration
test.beforeAll(async ({ browserName }) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  global.context = context;
});

test.afterAll(async () => {
  await global.context.close();
  await global.browser.close();
});

// Write test cases
test('Search for flights', async () => {
  await global.context.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

  // Fill in the departure and arrival fields
  await global.context.fill('[name="departure"]', 'Auckland');
  await global.context.fill('[name="arrival"]', 'Wellington');

  // Click the search button
  await global.context.click('[data-track="td-search-flights|submit"]');

  // Verify the search results page is displayed
  await expect(global.context.page()).toHaveURL(/\/vbook\/actions\/search\/results/);
});