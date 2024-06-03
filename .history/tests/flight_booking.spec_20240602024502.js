const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Click on input fields, fill them, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Click on the departure location input field
    await page.click('input#depart-from');

    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');
    await page.press('input#depart-from', 'Enter');

    // Click on the arrival location input field
    await page.click('input#depart-to');

    // Fill in the arrival location and press Enter
    await page.fill('input#depart-to', 'Wellington');
    await page.press('input#depart-to', 'Enter');

    // Click on the departure date input field
    await page.click('input#leaveDate');

    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15');
    await page.press('input#leaveDate', 'Enter');

    // Click on the return date input field
    await page.click('input#returnDate');

    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');
    await page.press('input#returnDate', 'Enter');

    // Hover over the search button
    await page.hover('button[data-gatrack*="Search for flight"]');

    // Press Enter to click on the search button
    await page.keyboard.press('Enter');

    // You can add further assertions here to verify that the search button click is successful if needed
  });
});
a