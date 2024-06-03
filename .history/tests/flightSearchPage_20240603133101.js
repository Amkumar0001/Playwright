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
    this.firstPriceSelector = page.locator('input[type="radio"][name^="legOptionCost"]'); // Adjust if necessary
    this.continueButton = page.locator('div.vui-submission-actions > button[type="submit"]');
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
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 1000000000 });
    await expect(this.page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);
  }

  async selectFirstPrice() {
    const firstPriceElement = this.firstPriceSelector.first();
    await firstPriceElement.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = { FlightSearchPage };
