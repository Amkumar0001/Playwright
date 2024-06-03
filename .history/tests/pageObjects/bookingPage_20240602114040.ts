// tests/pageObjects/bookingPage.ts
import { Page } from '@playwright/test';

export class BookingPage {
  private page: Page;
  private firstNameInput = this.page.locator('input[name="firstName"]');
  private lastNameInput = this.page.locator('input[name="lastName"]');
  private emailInput = this.page.locator('input[name="email"]');
  private phoneInput = this.page.locator('input[name="phone"]');
  private submitButton = this.page.locator('button.submit-passenger-details');

  constructor(page: Page) {
    this.page = page;
  }

  async enterPassengerDetails(firstName: string, lastName: string, email: string, phone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.submitButton.click();
  }
}
