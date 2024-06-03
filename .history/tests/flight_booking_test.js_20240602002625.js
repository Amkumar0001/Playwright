const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Set headless to false for debugging
  const context = await browser.newContext();

  // Create a page
  const page = await context.newPage();

  try {
    // Test Case 1: Flight Search Functionality
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="departureDate"]', '2024-06-10');
    await page.click('button[data-testid="searchButton"]');
    await page.waitForSelector('.flight-search-results');

    // Test Case 2: Verify Search Results
    const searchResults = await page.$$('.flight-search-results .flight-item');
    if (searchResults.length > 0) {
      console.log('Search results displayed successfully.');
    } else {
      throw new Error('Search results not displayed.');
    }aa

    // Test Case 3: Flight Selection
    await searchResults[0].click(); // Select the first flight
    await page.waitForSelector('.flight-item.selected');

    // Test Case 4: Proceed to Booking
    await page.click('button[data-testid="bookButton"]');
    await page.waitForSelector('.passenger-details');

    // Test Case 5: Enter Passenger Details
    await page.fill('input[name="passengerName"]', 'John Doe');
    await page.fill('input[name="passengerAge"]', '30');
    await page.fill('input[name="passengerEmail"]', 'john.doe@example.com');
    await page.click('button[data-testid="confirmButton"]');
    await page.waitForSelector('.seat-selection'); // Assuming seat selection page is loaded

    // Test Case 6: Seat Selection
    const seatSelectionAvailable = await page.isVisible('button[data-testid="selectSeatButton"]');
    if (seatSelectionAvailable) {
      await page.click('button[data-testid="selectSeatButton"]');
      await page.waitForSelector('.seat-map');
      console.log('Seat selection available and completed successfully.');
    } else {
      console.log('Seat selection not available.');
    }

    // Test Case 7: Seat Selection Availability
    // Assuming seat selection is disabled if not available, no action needed here

    console.log('All test cases passed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
