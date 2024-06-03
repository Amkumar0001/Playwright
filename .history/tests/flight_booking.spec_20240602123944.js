const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    // Click on the departure location input field
    await page.click('input#depart-from');
    // Fill in the departure location and press Enter
    await page.fill('input#depart-from', 'Auckland');
    await page.press('input#depart-from', 'Enter');

    // Verify the departure location is filled correctly
    const departFromValue = await page.$eval('input#depart-from', el => el.value);
    expect(departFromValue).toBe('Auckland');

    // Click on the arrival location input field
    await page.click('input#depart-to');
    // Fill in the arrival location and press Entera
    await page.fill('input#depart-to', 'Wellington');
    await page.press('input#depart-to', 'Enter');

    // Verify the arrival location is filled correctly
    const departToValue = await page.$eval('input#depart-to', el => el.value);
    expect(departToValue).toBe('Wellington');

    // Click on the departure date input field
    await page.click('input#leaveDate');
    // Fill in the departure date and press Enter
    await page.fill('input#leaveDate', '2024-06-15');
    await page.press('input#leaveDate', 'Enter');

    // Verify the departure date is filled correctly
    const leaveDateValue = await page.$eval('input#leaveDate', el => el.value);
    expect(leaveDateValue).toBe('2024-06-15');

    // Click on the return date input field
    await page.click('input#returnDate');
    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');
    await page.press('input#returnDate', 'Enter');

    // Verify the return date is filled correctly
    const returnDateValue = await page.$eval('input#returnDate', el => el.value);
    expect(returnDateValue).toBe('Sat, 22 June 2024');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');
    
    // Wait for navigation to complete after clicking the search button
    await page.waitForNavigation({ timeout: 90000 }); // Extend the timeout to 60 seconds

    // Verify that we have navigated to the new page
    await expect(page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);

    // You can add further assertions here to verify that the navigation to the new page is successful if needed
  });
});
