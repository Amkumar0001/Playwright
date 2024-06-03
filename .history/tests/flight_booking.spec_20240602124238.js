const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('./flightSearchPage');

test.describe('Air New Zealand Flight Booking - Input Filling and Search', () => {
  test('Test Case 1: Fill in input fields, press Enter, and click on search without triggering validation or other actions', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    await flightSearchPage.goto();
    await flightSearchPage.setDepartureLocation('Auckland');
    await flightSearchPage.setArrivalLocation('Wellington');
    await flightSearchPage.setDepartureDate('2024-06-15');
    await flightSearchPage.setReturnDate('Sat, 22 June 2024');
    await flightSearchPage.searchFlights();
  });
});
a