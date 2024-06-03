const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling', () => {

  test('Test Case 1: Fill in input fields', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    await page.fill('input#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('input#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('input#leaveDate', '2024-06-15'); 
    await page.fill('input#returnDate', '2024-06-22');  // Adjust selector to match actual field ID

    // You can add assertions here to verify that the fields have been filled correctly if needed
  });
});
