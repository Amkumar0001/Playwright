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
    this.firstPriceSelector = page.locator('input[type="radio"][name^="legOptionCost"]');
    this.continueButton = page.locator('div.vui-submission-actions > button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
  }

  async setDepartureLocation(location) {
    await this.departFromInput.type(location);
    await this.departFromInput.press('Enter');
    await expect(this.departFromInput).toHaveValue(location);
  }

  async setArrivalLocation(location) {
    await this.arriveToInput.type(location);
    await this.arriveToInput.press('Enter');
    await expect(this.arriveToInput).toHaveValue(location);
  }

  async setDepartureDate(date) {
    await this.leaveDateInput.type(date);
    await this.leaveDateInput.press('Enter');
    await expect(this.leaveDateInput).toHaveValue(date);
  }

  async setReturnDate(date) {
    try {
      await this.returnDateInput.type(date);
      await this.returnDateInput.press('Enter');
      await expect(this.returnDateInput).toHaveValue(date);
    } catch (error) {
      console.error('Error setting the return date:', error);
      throw error; // Re-throw the error to ensure it's handled or logged by the calling function
    }
  }

  async searchFlights() {
    await this.searchButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 100000000 });
    await expect(this.page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);
  }

  async selectFirstPrice() {
    const firstPriceElement = this.firstPriceSelector.first();
    await firstPriceElement.click();
  }

  async clickContinue() {
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.waitFor({ state: 'visible', timeout: 100000000 }); // Wait until the button is visible
    await this.continueButton.waitFor({ state: 'enabled', timeout: 10000000000 }); // Wait until the button is enabled
    await this.continueButton.click();
  }
}

module.exports = { FlightSearchPage };
