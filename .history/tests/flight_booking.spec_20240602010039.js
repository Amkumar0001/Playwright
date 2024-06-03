const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  test('Test Case 1: Verify flight search functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

    await page.fill('#depart-from', 'Auckland');  // Adjust selector to match actual field ID
    await page.fill('#depart-to', 'Wellington');  // Adjust selector to match actual field ID
    await page.fill('#leaveDate', '2024-06-15'); 
    await page.fill('#returnDate', '2024-06-22');  // Adjust selector to match actual field ID

    await page.click('#submitSearch');  // Adjust selector to match actual search button

    await page.waitForSelector('.search-results');  // Adjust selector to match actual search results

    // Corrected line to retrieve the text content of the search results
    const resultsText = await page.$eval('.search-results', el => el.textContent);  
    console.log(resultsText); // Display the results text for verification or further processing
  });
});
