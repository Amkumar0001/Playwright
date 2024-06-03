const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('./flightSearchPage');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Fill in input fields, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // Navigate to the flight booking page
    await flightSearchPage.goto();

    // Set departure location
    await flightSearchPage.setDepartureLocation('Auckland');

    // Set arrival location
    await flightSearchPage.setArrivalLocation('Wellington');

    // Set departure date
    await flightSearchPage.setDepartureDate('2024-06-15');

    // Set return date
    await flightSearchPage.setReturnDate('2024-10-15');

    // Click search button and wait for navigation
    await flightSearchPage.searchFlights();
  });
  test('Test Case 2: Verify that the user can select a flight from the search results', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // Perform flight search
    await flightSearchPage.goto();
    await flightSearchPage.setDepartureLocation('Auckland');
    await flightSearchPage.setArrivalLocation('Wellington');
    await flightSearchPage.setDepartureDate('2024-06-15');
    await flightSearchPage.setReturnDate('2024-10-15');
    await flightSearchPage.searchFlights();

    // Select a flight from the search results
    const flightOption = page.locator('selector-for-flight-option'); // Replace with actual selector
    await flightOption.click();
    await expect(flightOption).toHaveClass(/selected/);
  });

});
