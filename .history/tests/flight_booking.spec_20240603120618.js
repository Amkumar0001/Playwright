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

    // Wait for the navigation to the itinerary selection page
    await page.waitForURL('https://flightbookings.airnewzealand.co.nz/vbook/actions/selectitinerary');

    // Locate and select the desired flight option
    await page.click('text="Thursday 06 June 2024"');

    // Click on the "seat" option
    await page.click('text="seat"');

    // Click the "Continue" button to proceed
    await page.click('button:has-text("Continue")');
  });

});
