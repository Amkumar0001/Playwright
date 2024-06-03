const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields and click on search without triggering validation or other actions', async ({ page }) => {
    try {
      await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle' });

      // Fill in the departure location with a space
      await page.fill('input#depart-from', 'Auckland ');

      // Fill in the arrival location with a space
      await page.fill('input#depart-to', 'Wellington ');

      // Fill in the departure date with a space
      await page.fill('input#leaveDate', '2024-06-15 ');

      // Fill in the return date with a space
      await page.fill('input#returnDate', 'Sat, 22 June 2024 ');

      // Click on the search button
      await page.click('button[data-gatrack*="Search for flight"]');

      // Verify if navigation is successful
      await page.waitForNavigation({ waitUntil: 'networkidle' });

      // Verify the current URL after navigation
      console.log('Current URL after search:', page.url());

      // Add further assertions here if needed
      
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to fail the test
    }
  });
});
