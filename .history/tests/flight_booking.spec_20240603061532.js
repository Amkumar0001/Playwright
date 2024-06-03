const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('./flightSearchPage');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {

  test('Test Case 1: Complete flight booking process', async ({ page }) => {
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

   
    // Select the first available flight option
    await flightSearchPage.radio(0);

    // Continue to the passenger details page
    await flightSearchPage.continueToPassengerDetails();

    // Further assertions can be added here to verify the next step in the booking process
  });

});
