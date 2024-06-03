const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  // Set a longer timeout for the entire test suite if needed
  test.setTimeout(1200000); // 120 seconds for each test

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Check for session initialization or authentication
    try {
      console.log("Waiting for the origin input to be visible...");
      await page.waitForSelector('input[name="origin"]', { timeout: 600000 });
      console.log('Origin input is visible.');
    } catch (error) {
      console.error('Session initialization is taking too long or failed.', error);
      if (!page.isClosed()) {
        await page.screenshot({ path: 'session_initialization_error.png' });
      }
      throw error;
    }

    // Proceed with the rest of the test after session initialization
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  test('Test Case 3: Verify flight selection', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search is performed first
    try {
      console.log("Waiting for the origin input to be visible...");
      await page.waitForSelector('input[name="origin"]', { timeout: 600000 });
    } catch (error) {
      console.error('Session initialization is taking too long or failed.', error);
      if (!page.isClosed()) {
        await page.screenshot({ path: 'session_initialization_error.png' });
      }
      throw error;
    }

    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });

    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });
  });

  test('Test Case 6: Verify seat selection if available', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search and flight selection are performed first
    try {
      console.log("Waiting for the origin input to be visible...");
      await page.waitForSelector('input[name="origin"]', { timeout: 600000 });
    } catch (error) {
      console.error('Session initialization is taking too long or failed.', error);
      if (!page.isClosed()) {
        await page.screenshot({ path: 'session_initialization_error.png' });
      }
      throw error;
    }

    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 60000 });
    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 60000 });

    try {
      await page.waitForSelector('#select_seats', { timeout: 60000 });
      await page.click('#select_seats');
      const seatSelectionText = await page.textContent('body');
      expect(seatSelectionText).toContain('Select your seat');
    } catch (error) {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Seat selection not available');
    }
  });

});
