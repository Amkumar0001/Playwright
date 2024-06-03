const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    await page.fill('input#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input#leaveDate', '2024-06-15'); 
    await page.fill('input#returnDate', '2024-06-22');  // Adjust selector to match actual field ID

   
  });
});
