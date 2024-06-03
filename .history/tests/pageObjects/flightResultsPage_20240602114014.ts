// tests/pageObjects/flightResultsPage.ts
import { Page } from '@playwright/test';

export class FlightResultsPage {
  private page: Page;
  private flightResults = this.page.locator('.flight-result');

  constructor(page: Page) {
    this.page = page;
  }

  async selectFirstFlight() {
    await this.flightResults.first().click();
  }

  async expectResults() {
    await expect(this.flightResults).toHaveCountGreaterThan(0);
  }
}
