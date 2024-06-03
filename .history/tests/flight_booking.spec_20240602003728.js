const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    await page.fill('#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('#Leave ond', '2024-06-15');  // Adjust selector to match actual field ID

    await page.click('#submitSearch');  // Adjust selector to match actual search button

    await page.waitForSelector('.search-results');  // Adjust selector to match actual search results

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  test('Test Case 3: Verify flight selection', async ({ page }) => {
    // Assumes search functionality test has run and search results are displayed

    await page.click('.select-flight');  // Adjust selector to match actual flight select button
    await page.waitForSelector('#passenger_details');  // Adjust selector to match actual passenger details section
  });

  test('Test Case 6: Verify seat selection if available', async ({ page }) => {
    // Assumes passenger details have been entered and continued

    try {
      await page.click('#select_seats');  // Adjust selector to match actual seat selection button
      const seatSelectionText = await page.textContent('body');
      expect(seatSelectionText).toContain('Select your seat');
    } catch (error) {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Seat selection not available');
    }
  });
});
