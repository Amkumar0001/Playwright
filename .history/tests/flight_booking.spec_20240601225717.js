const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Check for session initialization or authentication
    try {
      await page.waitForSelector('input[name="origin"]', { timeout: 60000 });
      console.log('Origin input is visible.');
    } catch (error) {
      console.error('Session initialization is taking too long or failed.');
      await page.screenshot({ path: 'session_initialization_error.png' });
      throw error;
    }

    // Proceed with the rest of the test after session initialization
    await page.fill('input[name="origin"]', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input[name="destination"]', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input[name="leaveOn"]', '2024-06-15');  // Adjust selector to match actual field ID
    await page.click('button[type="submit"]');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results', { timeout: 60000 });  // Adjust selector to match actual search results

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  test('Test Case 3: Verify flight selection', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search is performed first
    try {
      await page.waitForSelector('input[name="origin"]', { timeout: 60000 });
    } catch (error) {
      console.error('Session initialization is taking too long or failed.');
      await page.screenshot({ path: 'session_initialization_error.png' });
      throw error;
    }

    await page.fill('input[name="origin"]', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input[name="destination"]', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input[name="leaveOn"]', '2024-06-15');  // Adjust selector to match actual field ID
    await page.click('button[type="submit"]');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results', { timeout: 60000 });  // Adjust selector to match actual search results

    await page.click('.select-flight');  // Adjust selector to match actual flight select button
    await page.waitForSelector('#passenger_details', { timeout: 60000 });  // Adjust selector to match actual passenger details section
  });

  test('Test Case 6: Verify seat selection if available', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search and flight selection are performed first
    try {
      await page.waitForSelector('input[name="origin"]', { timeout: 60000 });
    } catch (error) {
      console.error('Session initialization is taking too long or failed.');
      await page.screenshot({ path: 'session_initialization_error.png' });
      throw error;
    }

    await page.fill('input[name="origin"]', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input[name="destination"]', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input[name="leaveOn"]', '2024-06-15');  // Adjust selector to match actual field ID
    await page.click('button[type="submit"]');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results', { timeout: 60000 });  // Adjust selector to match actual search results
    await page.click('.select-flight');  // Adjust selector to match actual flight select button
    await page.waitForSelector('#passenger_details', { timeout: 60000 });  // Adjust selector to match actual passenger details section

    try {
      await page.waitForSelector('#select_seats', { timeout: 60000 });  // Adjust selector if needed
      await page.click('#select_seats');  // Adjust selector to match actual seat selection button
      const seatSelectionText = await page.textContent('body');
      expect(seatSelectionText).toContain('Select your seat');
    } catch (error) {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Seat selection not available');
    }
  });

});
