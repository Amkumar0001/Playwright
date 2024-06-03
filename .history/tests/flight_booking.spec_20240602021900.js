const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields and click on search without triggering validation or other actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location
    await page.fill('input#depart-from', 'Auckland');

    // Fill in the arrival location
    await page.fill('input#depart-to', 'Wellington');

    // Fill in the departure date
    await page.fill('input#leaveDate', '2024-06-15');

    // Fill in the return date
    await page.fill('input#returnDate', 'Sat, 22 June 2024');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');

    // Wait for the submit button to disappear
    await page.waitForSelector('button[data-gatrack*="Search for flight"]', { state: 'hidden' });

    // You can add further assertions here to verify that the search button click is successful if needed
  });aa
});
