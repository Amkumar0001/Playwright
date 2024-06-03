const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Click on input fields, fill them, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Click on the departure location input field
    await page.click('input#depart-from');

    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');
    await page.press('input#depart-from', 'Enter');
    await page.waitForNavigation(); // Wait for navigation to complete

    // Click on the arrival location input field
    await page.click('input#depart-to');

    // Fill in the arrival location and press Enter
    await page.fill('input#depart-to', 'Wellington');
    await page.press('input#depart-to', 'Enter');
    await page.waitForNavigation(); // Wait for navigation to complete

    // Click on the departure date input field
    await page.click('input#leaveDate');

    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15');
    await page.press('input#leaveDate', 'Enter');
    await page.waitForNavigation(); // Wait for navigation to complete

    // Click on the return date input field
    await page.click('input#returnDate');

    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');
    await page.press('input#returnDate', 'Enter');
    await page.waitForNavigation(); // Wait for navigation to complete

    // Wait for the search button to appear and be clickable
    await page.waitForSelector('button[data-gatrack*="Search for flight"]');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');
    await page.waitForNavigation(); // Wait for navigation to complete

    // Add an assertion to verify the URL of the redirected page
    const redirectedUrl = page.url();
    expect(redirectedUrl).toContain('selectitinerary'); // Assert that the URL contains 'selectitinerary'
  });
});
