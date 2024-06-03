const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'load' });

    // Verify the page loaded correctly
    await expect(page).toHaveURL('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
    await page.waitForSelector('#origin');  // Adjust selector if needed

    await page.fill('#origin', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('#destination', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('#departure_date', '2024-06-15');  // Adjust selector to match actual field ID

    await page.click('#search_button');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results');  // Adjust selector to match actual search results

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  test('Test Case 3: Verify flight selection', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'load' });

    // Ensure search is performed first
    await page.fill('#origin', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('#destination', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('#departure_date', '2024-06-15');  // Adjust selector to match actual field ID
    await page.click('#search_button');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results');  // Adjust selector to match actual search results

    await page.click('.select-flight');  // Adjust selector to match actual flight select button
    await page.waitForSelector('#passenger_details');  // Adjust selector to match actual passenger details section
  });

 aaa    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'load' });

    // Ensure search and flight selection are performed first
    await page.fill('#origin', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('#destination', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('#departure_date', '2024-06-15');  // Adjust selector to match actual field ID
    await page.click('#search_button');  // Adjust selector to match actual search button
    await page.waitForSelector('.search-results');  // Adjust selector to match actual search results
    await page.click('.select-flight');  // Adjust selector to match actual flight select button
    await page.waitForSelector('#passenger_details');  // Adjust selector to match actual passenger details section

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
