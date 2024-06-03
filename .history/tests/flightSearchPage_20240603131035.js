class FlightSearchPage {
  constructor(page) {
    this.page = page;
    this.departureInput = '#departure-location'; // Replace with actual selector
    this.arrivalInput = '#arrival-location'; // Replace with actual selector
    this.departureDateInput = '#departure-date'; // Replace with actual selector
    this.returnDateInput = '#return-date'; // Replace with actual selector
    this.searchButton = '#search-button'; // Replace with actual selector
    this.firstPriceSelector = 'input[type="radio"][name^="legOptionCost"]'; // Replace with actual selector if needed
  }

  async goto() {
    await this.page.goto('https://www.airnewzealand.co.nz/'); // Replace with actual URL
  }

  async setDepartureLocation(location) {
    await this.page.fill(this.departureInput, location);
  }

  async setArrivalLocation(location) {
    await this.page.fill(this.arrivalInput, location);
  }

  async setDepartureDate(date) {
    await this.page.fill(this.departureDateInput, date);
  }

  async setReturnDate(date) {
    await this.page.fill(this.returnDateInput, date);
  }

  async searchFlights() {
    await this.page.click(this.searchButton);
    await this.page.waitForNavigation(); // Wait for navigation after clicking search
  }

  async selectFirstPrice() {
    const firstPriceElement = await this.page.$(this.firstPriceSelector);
    await firstPriceElement.click();
  }
}

module.exports = { FlightSearchPage };
