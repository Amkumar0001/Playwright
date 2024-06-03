// tests/pageObjects/flightSearchPage.js
const { expect } = require('@playwright/test');

class FlightSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.originInput = page.locator('input#depart-from');
    this.destinationInput = page.locator('input#depart-to');
    this.departureDateInput = page.locator('input#leaveDate');
    this.returnDateInput = page.locator('input#returnDate');
    this.searchButton = page.locator('button[type="submit"]'); // Adjust selector based on HTML
  }

  async goto() {
    await this.page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
  }

  async fillOrigin(origin) {
    await this.originInput.fill(origin);
    await this.originInput.press('Enter');
  }

  async fillDestination(destination) {
    await this.destinationInput.fill(destination);
    await this.destinationInput.press('Enter');
  }

  async fillDepartureDate(departureDate) {
    await this.departureDateInput.fill(departureDate);
    await this.departureDateInput.press('Enter');
  }

  async fillReturnDate(returnDate) {
    await this.returnDateInput.fill(returnDate);
    await this.returnDateInput.press('Enter');
  }

  async search() {
    await this.searchButton.click();
    await this.page.waitForNavigation({ timeout: 90000 });
  }

  async verifyInputValues(expectedValues) {
    const originValue = await this.originInput.inputValue();
    expect(originValue).toBe(expectedValues.origin);

    const destinationValue = await this.destinationInput.inputValue();
    expect(destinationValue).toBe(expectedValues.destination);

    const departureDateValue = await this.departureDateInput.inputValue();
    expect(departureDateValue).toBe(expectedValues.departureDate);

    const returnDateValue = await this.returnDateInput.inputValue();
    expect(returnDateValue).toBe(expectedValues.returnDate);
  }
}

module.exports = { FlightSearchPage };
