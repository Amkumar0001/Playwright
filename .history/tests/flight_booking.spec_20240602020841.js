const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields and click on search without triggering validation or other actions', async ({ page }) => {
    try {
      await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle' });

      // Fill in the departure location
      await page.fill('input#depart-from', 'Auckland');

      // Wait for suggestions to appear (if any)
      await page.waitForSelector('.suggestion-list', { state: 'visible', timeout: 5000 });

      // Click on the first suggestion (if available)
      const suggestions = await page.$$('.suggestion-list li');
      if (suggestions.length > 0) {
        await suggestions[0].click();
      }

      // Fill in the arrival location
      await page.fill('input#depart-to', 'Wellington');

      // Wait for suggestions to appear (if any)
      await page.waitForSelector('.suggestion-list', { state: 'visible', timeout: 5000 });

      // Click on the first suggestion (if available)
      const suggestions = await page.$$('.suggestion-list li');
      if (suggestions.length > 0) {
        await suggestions[0].click();
      }

      // Fill in the departure date
      await page.fill('input#leaveDate', '2024-06-15');

      // Fill in the return date
      await page.fill('input#returnDate', 'Sat, 22 June 2024');

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
