const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields and perform search', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    await page.fill('input#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input#leaveDate', '2024-06-15'); 
    await page.fill('input#returnDate', '2024-06-22');  // Adjust selector to match actual field ID

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');  

    // Wait for the search results to appear
    await page.waitForSelector('.search-results');  

    // You can add further assertions or actions here to verify the search results or perform additional actions after the search
  });
});
aa