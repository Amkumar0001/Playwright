const { test, expect } = require('@playwright/test');
const { FlightSearchPage } = require('./flightSearchPage');

test.describe('Air New Zealand Flight Booking', () => {

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

  test('Test Case 2: Verify that the search results display relevant flights based on the user\'s input', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // Navigate to the flight booking page and search for flights
    await flightSearchPage.goto();
    await flightSearchPage.setDepartureLocation('Auckland');
    await flightSearchPage.setArrivalLocation('Wellington');
    await flightSearchPage.setDepartureDate('2024-06-15');
    await flightSearchPage.setReturnDate('2024-10-15');
    await flightSearchPage.searchFlights();

    // Verify search results are displayed
    const searchResults = page.locator('.search-results');
    await expect(searchResults).toBeVisible();
    
  });

  test('Test Case 3: Verify that the user can select a flight from the search results', async ({ page }) => {
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

  test('Test Case 4: Verify that the user can proceed to booking after selecting a flight', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // Perform flight search and select a flight
    await flightSearchPage.goto();
    await flightSearchPage.setDepartureLocation('Auckland');
    await flightSearchPage.setArrivalLocation('Wellington');
    await flightSearchPage.setDepartureDate('2024-06-15');
    await flightSearchPage.setReturnDate('2024-10-15');
    await flightSearchPage.searchFlights();
    const flightOption = page.locator('selector-for-flight-option'); // Replace with actual selector
    await flightOption.click();

    // Proceed to booking
    const proceedButton = page.locator('selector-for-proceed-button'); // Replace with actual selector
    await proceedButton.click();
    await expect(page).toHaveURL(/.*\/booking\/passenger-details/);
  });

  test('Test Case 5: Verify that the user can enter the passenger details', async ({ page }) => {
    const flightSearchPage = new FlightSearchPage(page);

    // Perform flight search, select a flight, and proceed to booking
    await flightSearchPage.goto();
    await flightSearchPage.setDepartureLocation('Auckland');
    await flightSearchPage.setArrivalLocation('Wellington');
    await flightSearchPage.setDepartureDate('2024-06-15');
    await flightSearchPage.setReturnDate('2024-10-15');
    await flightSearchPage.searchFlights();
    const flightOption = page.locator('selector-for-flight-option'); // Replace with actual selector
    await flightOption.click();
    const proceedButton = page.locator('selector-for-proceed-button'); // Replace with actual selector
    await proceedButton.click();

    // Enter passenger details
    const firstNameInput = page.locator('input#first-name'); // Replace with actual selector
    const lastNameInput = page.locator('input#last-name'); // Replace with actual selector
    await firstNameInput.fill('John');
    await lastNameInput.fill('Doe');
    await expect(firstNameInput).toHaveValue('John');
    await expect(lastNameInput).toHaveValue('Doe');
  });

  test('Test Case 6: Verify that the user can select seats for the booked flight if seat selection is available', async ({ page }) => {
    // Assuming the seat selection page is reached after entering passenger details

    const seatOption = page.locator('selector-for-available-seat'); // Replace with actual selector
    await seatOption.click();
    await expect(seatOption).toHaveClass(/selected/);
  });

  test('Test Case 7: Verify that the user cannot select seats for the booked flight if seat selection is not available', async ({ page }) => {
    // Assuming a scenario where seat selection is not available

    const seatOption = page.locator('selector-for-unavailable-seat'); // Replace with actual selector
    await expect(seatOption).toBeDisabled();
  });

});
