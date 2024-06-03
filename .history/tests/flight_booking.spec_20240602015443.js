const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, click on search, and verify return date field', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');  
    await page.keyboard.press('Enter');

    // Fill in the arrival location and press Enter
    await page.fill('input#depart-to', 'Wellington');  
    await page.keyboard.press('Enter');

    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15'); 
    await page.keyboard.press('Enter');

    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');  
    await page.keyboard.press('Enter');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');  

    // Wait for the search results to appear
    await page.waitForSelector('.search-results');

    // Verify the return date field
    const returnDateValue = await page.$eval('input#returnDate', input => input.value);
    expect(returnDateValue).toBe('Sat, 22 June 2024');
  });
});
