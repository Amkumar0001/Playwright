const { test, expect } = require('@playwright/test');

test.describe('Flight Booking Test Suite', () => {
  test('Test Case 1: Flight Search Functionality', async ({ page }) => {
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="departureDate"]', '2024-06-10');
    await page.click('button[data-testid="searchButton"]');
    await page.waitForSelector('.flight-search-results');
  });

  test('Test Case 2: Verify Search Results', async ({ page }) => {
    // Assuming search results are verified after Test Case 1
    const searchResults = await page.$$('.flight-search-results .flight-item');
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('Test Case 3: Flight Selection', async ({ page }) => {
    // Assuming flight selection is verified after Test Case 2
    const flight = await page.$('.flight-item');
    await flight.click();
    await page.waitForSelector('.flight-item.selected');
  });

  test('Test Case 4: Proceed to Booking', async ({ page }) => {
    // Assuming booking process is verified after Test Case 3
    await page.click('button[data-testid="bookButton"]');
    await page.waitForSelector('.passenger-details');
  });

  test('Test Case 5: Enter Passenger Details', async ({ page }) => {
    // Assuming passenger details entry is verified after Test Case 4
    await page.fill('input[name="passengerName"]', 'John Doe');
    await page.fill('input[name="passengerAge"]', '30');
    await page.fill('input[name="passengerEmail"]', 'john.doe@example.com');
    await page.click('button[data-testid="confirmButton"]');
    await page.waitForSelector('.seat-selection');
  });

  test('Test Case 6: Seat Selection', async ({ page }) => {
    // Assuming seat selection process is verified after Test Case 5
    const seatSelectionAvailable = await page.isVisible('button[data-testid="selectSeatButton"]');
    expect(seatSelectionAvailable).toBeTruthy();
  });

  test('Test Case 7: Seat Selection Availability', async ({ page }) => {
    // Assuming seat selection availability is verified after Test Case 6
    const seatSelectionDisabled = await page.isVisible('button[data-testid="selectSeatButton"]:disabled');
    expect(seatSelectionDisabled).toBeTruthy();
  });
});
