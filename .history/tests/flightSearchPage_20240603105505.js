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
    // New selectors for additional test cases
    this.flightOption = page.locator('selector-for-flight-option'); // Replace with actual selector
    this.proceedButton = page.locator('selector-for-proceed-button'); // Replace with actual selector
    this.firstNameInput = page.locator('input#first-name'); // Replace with actual selector
    this.lastNameInput = page.locator('input#last-name'); // Replace with actual selector
    this.seatOption = page.locator('selector-for-available-seat'); // Replace with actual selector
    this.unavailableSeatOption = page.locator('selector-for-unavailable-seat'); // Replace with actual selector
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
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000000 });
    await expect(this.page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);
  }

  // New methods for additional test cases

  async selectFlight() {
    await this.flightOption.click();
    await expect(this.flightOption).toHaveClass(/selected/);
  }

  async proceedToBooking() {
    await this.proceedButton.click();
    await expect(this.page).toHaveURL(/.*\/booking\/passenger-details/);
  }

  async enterPassengerDetails(firstName, lastName) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await expect(this.firstNameInput).toHaveValue(firstName);
    await expect(this.lastNameInput).toHaveValue(lastName);
  }

  async selectSeat() {
    await this.seatOption.click();
    await expect(this.seatOption).toHaveClass(/selected/);
  }

  async verifyNoSeatSelection() {
    await expect(this.unavailableSeatOption).toBeDisabled();
  }
}

module.exports = { FlightSearchPage };
