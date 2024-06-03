const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling', () => {

  test('Test Case 1: Fill in input fields without triggering validation or actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location
    await page.fill('input#depart-from', 'Auckland');

    // Fill in the arrival location
    await page.fill('input#depart-to', 'Wellington');

    // Fill in the departure date
    await page.fill('input#leaveDate', '2024-06-15');

    // Fill in the return date
    await page.fill('input#returnDate', 'Sat, 22 June 2024');

    // You can add further assertions here to verify that the fields have been filled correctly if needed
  });
});
