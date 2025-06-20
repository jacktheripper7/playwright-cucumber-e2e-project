// src/pages/CheckoutOverviewPage.ts
import { Page, Locator } from 'playwright';

export class CheckoutOverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  orderSummaryItem(productName: string): Locator {
    return this.page.locator(`.cart_item:has-text("${productName}")`);
  }

  itemTotal(): Locator {
    return this.page.locator('.summary_subtotal_label');
  }

  finishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  // Actions
  async clickFinish() {
    await this.finishButton().click();
  }

  // Assertions/Checks
  async isOrderSummaryItemVisible(productName: string): Promise<boolean> {
    return this.orderSummaryItem(productName).isVisible();
  }

  async getItemTotal(): Promise<string | null> {
    return this.itemTotal().textContent();
  }

  async isOnCheckoutOverviewPage(): Promise<boolean> {
    return this.page.url().includes('checkout-step-two.html');
  }
}