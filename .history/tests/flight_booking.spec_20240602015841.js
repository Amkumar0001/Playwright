const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, click on search, and verify return date field', async ({ page, context }) => {
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

    // Capture the current value of the return date field
    const initialReturnDateValue = await page.$eval('input#returnDate', input => input.value);

    // Listen for network requests
    await page.route('**/*', route => {
      route.continue();
    });

    // Click on the search button
    await Promise.all([
      page.click('button[data-gatrack*="Search for flight"]'),
      page.waitForNavigation(), // Wait for navigation to complete
    ]);

    // Check if the return date field value is modified in any network requests
    const requests = context.requests();
    const modifiedReturnDate = requests.some(request => {
      // Check if the request URL or response contains any modifications to the return date field
      // Modify this condition based on the actual behavior of the website
      return request.url().includes('returnDate') || request.response()?.includes('returnDate');
    });

    // Verify if the return date field is unchanged
    expect(modifiedReturnDate).toBe(false);
  });
});
