// src/pages/CartPage.ts
import { Page, Locator } from 'playwright';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  cartItem(productName: string): Locator {
    return this.page.locator(`.cart_item:has-text("${productName}")`);
  }

  checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  // Actions
  async clickCheckout() {
    await this.checkoutButton().click();
  }

  // Assertions/Checks
  async isCartItemVisible(productName: string): Promise<boolean> {
    return this.cartItem(productName).isVisible();
  }

  async isOnCartPage(): Promise<boolean> {
    return this.page.url().includes('cart.html');
  }
}