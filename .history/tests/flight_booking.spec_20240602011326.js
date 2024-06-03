const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling', () => {

  test('Test Case 1: Fill in input fields without clicking suggestions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location
    await page.fill('input#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    // Wait for suggestions to appear (optional)
    await page.waitForSelector('.suggestion-list', { state: 'visible' });

    // Fill in the arrival location
    await page.fill('input#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    // Wait for suggestions to appear (optional)
    await page.waitForSelector('.suggestion-list', { state: 'visible' });

    // Fill in the departure date
    await page.fill('input#leaveDate', '2024-06-15'); 
    // Fill in the return date
    await page.fill('input#returnDate', '2024-06-22');  // Adjust selector to match actual field ID

    // Perform the search by clicking on the search button
    await page.click('button[data-gatrack*="Search for flight"]');  

    // Wait for the search results to appear
    await page.waitForSelector('.search-results');  

    // You can add further assertions or actions here to verify the search results or perform additional actions after the search
  });
});
