// src/pages/OrderConfirmationPage.ts
import { Page, Locator } from 'playwright';

export class OrderConfirmationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  thankYouHeader(): Locator {
    return this.page.locator('.complete-header');
  }

  backHomeButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }

  // Actions
  async clickBackHome() {
    await this.backHomeButton().click();
  }

  // Assertions/Checks
  async isThankYouMessageVisible(): Promise<boolean> {
    return this.thankYouHeader().isVisible();
  }

  async isBackHomeButtonVisible(): Promise<boolean> {
    return this.backHomeButton().isVisible();
  }

  async isOnOrderConfirmationPage(): Promise<boolean> {
    return this.page.url().includes('checkout-complete.html');
  }
}