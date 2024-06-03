const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, and click on search', async ({ page }) => {
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

    // Fill in the return date and press Enter
    await page.fill('input#returnDate', 'Sat, 22 June 2024');  // Adjust selector to match actual field ID
    await page.keyboard.press('Enter');

    // Click on the search button
    await page.click('button[data-gatrack*="Search for flight"]');  

    // Wait for the alert to appear
    await page.waitForTimeout(1000); // Adjust timeout as needed
    const alert = await page.$('.alert'); // Adjust selector based on the alert structure

    // If an alert is detected, handle it
    if (alert) {
        const alertText = await alert.textContent();
        console.log("Alert message:", alertText);
        // You can dismiss the alert here or handle it based on your requirements
        await page.keyboard.press('Escape'); // Dismiss the alert by pressing Escape key
    }

    // Wait for the search results to appear

    // You can add further assertions or actions here to verify the search results or perform additional actions after the search
  });
});
aa