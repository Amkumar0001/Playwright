// tests/pageObjects/flightSearchPage.ts
import { Page } from '@playwright/test';

export class FlightSearchPage {
  private page: Page;
  private originInput = this.page.locator('input[name="origin"]');
  private destinationInput = this.page.locator('input[name="destination"]');
  private departureDateInput = this.page.locator('input[name="departureDate"]');
  private searchButton = this.page.locator('button[type="submit"]');

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://flightbookings.airnewzealand.co.nz/vbook/actions/search');
  }

  async searchFlights(origin: string, destination: string, departureDate: string) {
    await this.originInput.fill(origin);
    await this.destinationInput.fill(destination);
    await this.departureDateInput.fill(departureDate);
    await this.searchButton.click();
  }
}
