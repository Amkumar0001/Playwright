const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {
  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    try {
      await page.goto('https://www.airnewzealand.co.nz/', { waitUntil: 'networkidle' });

      // Log the current URL to ensure we are on the correct page
      console.log('Current URL:', page.url());

      // Wait for the page to load and display the search form
      await page.waitForSelector('input[name="origin"]', { timeout: 60000 });

      // Fill the flight search form
      await page.fill('input[name="origin"]', 'Auckland');
      await page.fill('input[name="destination"]', 'Wellington');
      await page.fill('input[name="leaveOn"]', '15/06/2024');  // Adjust the date format if necessary
      await page.fill('input[name="returnOn"]', '20/06/2024');  // Adjust the date format if necessary

      // Select the number of adults, children, and infants
      await page.selectOption('select[name="adults"]', '1');
      await page.selectOption('select[name="children"]', '0');
      await page.selectOption('select[name="infants"]', '0');

      // Choose service class if necessary
      await page.selectOption('select[name="serviceClass"]', 'Economy - lowest');

      // Submit the search form
      await page.click('button[type="submit"]');

      // Wait for the search results to load
      await page.waitForSelector('.search-results', { timeout: 60000 });

      // Verify that the search results contain the expected text
      const resultsText = await page.textContent('.search-results');
      expect(resultsText).toContain('Wellington');

    } catch (error) {
      // Capture full page screenshot on failure
      await page.screenshot({ path: 'error_screenshot.png', fullPage: true });

      // Log the error message and stack trace
      console.error('Error:', error.message);
      console.error('Stack trace:', error.stack);

      throw error;
    }
  });

  test('Test Case 6: Verify seat selection if available', async ({ page }) => {
    try {
      await page.goto('https://www.airnewzealand.co.nz/', { waitUntil: 'networkidle' });

      // Log the current URL to ensure we are on the correct page
      console.log('Current URL:', page.url());

      // Wait for the page to load and display the search form
      await page.waitForSelector('input[name="origin"]', { timeout: 60000 });

      // Fill the flight search form
      await page.fill('input[name="origin"]', 'Auckland');
      await page.fill('input[name="destination"]', 'Wellington');
      await page.fill('input[name="leaveOn"]', '15/06/2024');  // Adjust the date format if necessary

      // Submit the search form
      await page.click('button[type="submit"]');

      // Wait for the search results to load
      await page.waitForSelector('.search-results', { timeout: 60000 });

      // Select a flight from the search results
      await page.click('.flight-select-button');

      // Wait for seat selection page to load
      await page.waitForSelector('.seat-selection', { timeout: 60000 });

      // Verify seat selection options are available
      const seatOptions = await page.textContent('.seat-selection');
      expect(seatOptions).toContain('Select your seat');

    } catch (error) {
      // Capture full page screenshot on failure
      await page.screenshot({ path: 'error_screenshot.png', fullPage: true });

      // Log the error message and stack trace
      console.error('Error:', error.message);
      console.error('Stack trace:', error.stack);

      throw error;
    }aa
  });
});
