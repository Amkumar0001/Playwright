const { expect } = require('@playwright/test');

class FlightSearchPage {
  constructor(page) {
    this.page = page;
    this.departureInput = page.locator('[name="departure"]');
    this.arrivalInput = page.locator('[name="arrival"]');
    this.departureDateInput = page.locator('[name="departureDate"]');
    this.returnDateInput = page.locator('[name="returnDate"]');
    this.searchButton = page.locator('[data-track="td-search-flights|submit"]');
  }

  async goto() {
    await this.page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
  }

  async setDepartureLocation(location) {
    await this.departureInput.fill(location);
  }

  async setArrivalLocation(location) {
    await this.arrivalInput.fill(location);
  }

  async setDepartureDate(date) {
    await this.departureDateInput.fill(date);
  }

  async setReturnDate(date) {
    await this.returnDateInput.fill(date);
  }

  async searchFlights() {
    await this.searchButton.click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 120000 }); // Increased timeout to 120 seconds
    await expect(this.page).toHaveURL(/.*\/vbook\/actions\/selectitinerary/);
  }
}