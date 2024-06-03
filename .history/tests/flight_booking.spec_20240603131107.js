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

    // Select the first flight price
    await flightSearchPage.selectFirstPrice();
  });

});
