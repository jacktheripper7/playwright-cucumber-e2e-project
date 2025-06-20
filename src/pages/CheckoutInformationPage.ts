// src/pages/CheckoutInformationPage.ts
import { Page, Locator } from 'playwright';

export class CheckoutInformationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  firstNameField(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  lastNameField(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  postalCodeField(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  continueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  // Actions
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameField().fill(firstName);
    await this.lastNameField().fill(lastName);
    await this.postalCodeField().fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton().click();
  }

  // Assertions/Checks
  async isOnCheckoutInformationPage(): Promise<boolean> {
    return this.page.url().includes('checkout-step-one.html');
  }
}