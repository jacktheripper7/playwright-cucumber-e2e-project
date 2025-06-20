// src/pages/ProductDetailsPage.ts
import { Page, Locator } from 'playwright';

export class ProductDetailsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  productNameHeader(): Locator {
    return this.page.locator('.inventory_details_name');
  }

  productDescription(): Locator {
    return this.page.locator('.inventory_details_desc');
  }

  productPrice(): Locator {
    return this.page.locator('.inventory_details_price');
  }

  productImage(): Locator {
    return this.page.locator('.inventory_details_img');
  }

  // Assertions/Checks
  async isProductDetailsPageLoaded(productName: string): Promise<boolean> {
    await this.page.waitForSelector('.inventory_details_name'); // Wait for product name to be visible
    const actualProductName = await this.productNameHeader().textContent();
    // Use .includes for more flexible matching, in case of extra spaces or characters
    return actualProductName?.includes(productName) ?? false;
  }

  async getProductDescription(): Promise<string | null> {
    return this.productDescription().textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return this.productPrice().textContent();
  }
}