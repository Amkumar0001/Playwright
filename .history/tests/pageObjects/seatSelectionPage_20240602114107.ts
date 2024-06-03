// tests/pageObjects/seatSelectionPage.ts
import { Page } from '@playwright/test';

export class SeatSelectionPage {
  private page: Page;
  private availableSeat = this.page.locator('.seat.available');
  private unavailableSeat = this.page.locator('.seat.unavailable');

  constructor(page: Page) {
    this.page = page;
  }

  async selectAvailableSeat() {
    await this.availableSeat.first().click();
    await expect(this.availableSeat.first()).toHaveClass(/selected/);
  }

  async verifyUnavailableSeat() {
    await expect(this.unavailableSeat.first()).toBeDisabled();
  }
}
