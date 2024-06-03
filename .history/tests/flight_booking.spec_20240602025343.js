const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');
    await page.press('input#depart-from', 'Enter');

    // Fill in the arrival location and press Enter
    await page.fill('input#depart-to', 'Wellington');
    await page.press('input#depart-to', 'Enter');

    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15');
    await page.press('input#leaveDate', 'Enter');

    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');
    await page.press('input#returnDate', 'Enter');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');
    
    // Wait for navigation to complete after clicking the search button
    await page.waitForNavigation();

    // You can add further assertions here to verify that the navigation to the new page is successful if needed
  });
});
