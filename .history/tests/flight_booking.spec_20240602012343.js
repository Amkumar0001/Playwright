const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling', () => {

  test('Test Case 1: Fill in input fields and handle manual input', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.keyboard.press('Enter');

    // Fill in the arrival location and press Enter
    await page.fill('input#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.keyboard.press('Enter');

    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15'); 
    await page.keyboard.press('Enter');

    // Fill in the return date (prompt for manual input)
    console.log("Please fill out the return date field manually.");
    await page.waitForSelector('input#returnDate');
    await page.waitForTimeout(20000); // Adjust timeout as needed for manual input

    // You can add assertions here to verify that the fields have been filled correctly if needed
  });
});
