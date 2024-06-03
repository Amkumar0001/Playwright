const { test, expect } = require('@playwright/test');

test.describe('Air New Zealand Flight Booking', () => {

  // Set a longer timeout for the entire test suite if needed
  test.setTimeout(12000000); // 120 seconds for each test

  // Test Case 1: Verify flight search functionality
  test('Verify flight search functionality', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Proceed with the rest of the test after session initialization
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  // Test Case 2: Verify search results display relevant flights
  test('Verify search results display relevant flights', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search is performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });

    const resultsText = await page.textContent('.search-results');
    expect(resultsText).not.toContain('No flights found');
    expect(resultsText).toContain('Auckland');
    expect(resultsText).toContain('Wellington');
  });

  // Test Case 3: Verify flight selection from search results
  test('Verify flight selection from search results', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search is performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });

    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });
  });

  // Test Case 4: Verify booking continuation after flight selection
  test('Verify booking continuation after flight selection', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search and flight selection are performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });
    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });

    // Check for booking continuation elements
    const continueButton = await page.$('button[type="submit"]');
    expect(continueButton).toBeTruthy();
  });

  // Test Case 5: Verify passenger details entry
  test('Verify passenger details entry', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search, flight selection, and booking continuation are performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });
    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });

    // Fill passenger details
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');

    // Check for booking completion elements
    const completeButton = await page.$('button[type="submit"]');
    expect(completeButton).toBeTruthy();
  });

  // Test Case 6: Verify seat selection if available
  test('Verify seat selection if available', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search, flight selection, and booking continuation are performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });
    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });

    try {
      await page.waitForSelector('#select_seats', { timeout: 600000 });
      await page.click('#select_seats');
      const seatSelectionText = await page.textContent('body');
      expect(seatSelectionText).toContain('Select your seat');
    } catch (error) {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Seat selection not available');
    }
  });

  // Test Case 7: Verify seat selection unavailability message
  test('Verify seat selection unavailability message', async ({ page }) => {
    console.log("Navigating to the flight booking page...");
    await page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search', { waitUntil: 'networkidle', timeout: 90000 });

    // Ensure search, flight selection, and booking continuation are performed first
    await page.fill('input[name="origin"]', 'Auckland');
    await page.fill('input[name="destination"]', 'Wellington');
    await page.fill('input[name="leaveOn"]', '2024-06-15');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.search-results', { timeout: 600000 });
    await page.click('.select-flight');
    await page.waitForSelector('#passenger_details', { timeout: 600000 });

    try {
      await page.waitForSelector('#select_seats', { timeout: 600000 });
      await page.click('#select_seats');
      const seatSelectionText = await page.textContent('body');
      expect(seatSelectionText).toContain('Select your seat');
    } catch (error) {
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Seat selection not available');
    }
  });

});
