// test_case_1.js

const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');

  // Enter valid origin, destination, and departure date
  await page.fill('#origin-input', 'Auckland');
  await page.fill('#destination-input', 'Sydney');
  await page.fill('#departure-input', '2024-06-15');

  // Click search button
  await page.click('#search-button');

  // Wait for search results to load
  await page.waitForSelector('.search-result');

  // Verify search results display relevant flights
  const searchResults = await page.$$('.search-result');
  if (searchResults.length > 0) {
    console.log('Test Case 1: Passed - Search results displayed relevant flights.');
  } else {
    console.error('Test Case 1: Failed - No relevant flights found in search results.');
  }

  await browser.close();
})();
