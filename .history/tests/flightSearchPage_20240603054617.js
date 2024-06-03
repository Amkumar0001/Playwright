const { expect } = require('@playwright/test');

class FlightSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.departFromInput = page.locator('input#depart-from');
    this.arriveToInput = page.locator('input#depart-to');
    this.leaveDateInput = page.locator('input#leaveDate');
    this.returnDateInput = page.locator('input#returnDate');
    this.searchButton = page.locator('button[data-gatrack*="Search for flight"]');
    this.flightResults = page.locator('.flight-results'); // Assuming there's a class for flight results
    this.selectFlightButton = page.locator('.select-flight-button'); // Assuming there's a class for the select flight button
    this.proceedButton = page.locator('.proceed-button'); // Assuming there's a class for the proceed button
    this.flightOptionRadioButtons = page.locator('input[type="radio"]'); // Radio buttons for selecting flight options
    this.nextStepButton = page.locator('button[data-gatrack*="Continue to passenger details"]'); // Button to continue to the next step
  }

  async goto() {
    await this.page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
  }

  async setDepartureLocation(location) {
    await this.departFromInput.click();
    await this.departFromInput.fill(location);
    await this.departFromInput.press('Enter');
    const value = await this.departFromInput.inputValue();
    expect(value).toBe(location);
  }

  async setArrivalLocation(location) {
    await this.arriveToInput.click();
    await this.arriveToInput.fill(location);
    await this.arriveToInput.press('Enter');
    const value = await this.arriveToInput.inputValue();
    expect(value).toBe(location);
  }

  async setDepartureDate(date) {
    await this.leaveDateInput.click();
    await this.leaveDateInput.fill(date);
    await this.leaveDateInput.press('Enter');
    const value = await this.leaveDateInput.inputValue();
    expect(value).toBe(date);
  }

  async setReturnDate(date) {
    try {
      await this.returnDateInput.click();
      await this.returnDateInput.fill(date);
      await this.returnDateInput.press('Enter');
      const value = await this.returnDateInput.inputValue();
      expect(value).toBe(date);
    } catch (error) {
      console.error('Error setting the return date:', error);
      throw error; // Re-throw the error to ensure it's handled or logged by the calling function
    }
  }

  async searchFlights() {
    await this.searchButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 90000 });
    await expect(this.page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);
  }

  async verifySearchResults() {
    await expect(this.flightResults).toBeVisible();
    // Additional assertions to verify search results can be added here
  }

  async selectFlightOption(optionIndex = 0) {
    // Select a specific flight option by its index (default is the first option)
    await this.flightOptionRadioButtons.nth(optionIndex).click();
  }

  async continueToPassengerDetails() {
    await this.nextStepButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 90000 });
    // Add more verifications if needed
  }
}

module.exports = { FlightSearchPage };
