import { expect } from '@playwright/test';
import { Page, Locator } from 'playwright';

export class InventoryPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    productItem(name: string): Locator {
        return this.page.locator(`.inventory_item_name:has-text("${name}")`);
    }

    productItemByImg(name: string): Locator {
        return this.page.locator(`img[alt="${name}"]`);
    }

    async clickOnProductItem(name: string) {
        const productLocator = this.productItem(name);
        await productLocator.click();
    }

    async clickOnProductItemImg(name: string) {
        const productLocator = this.productItemByImg(name);
        await productLocator.click();
    }

    async isProductVisible(name: string) {
        const productLocator = this.productItem(name);
        const productLocatorImg = this.productItemByImg(name);
        expect(productLocator).toBeVisible();

        if (!(await productLocator.isVisible())) {
            throw new Error(`Product name "${name}" is not visible on the page.`);
        }

        if (!(await productLocatorImg.isVisible())) {
            throw new Error(`Product image with alt text "${name}" is not visible on the page.`);
        }
    }

    // New Locator: Add to cart button for a specific product
    addToCartButton(productName: string): Locator {
        // This finds the button for a product. Adjust selector if needed.
        // Assuming the "Add to cart" button is a sibling or child of the item name/container
        return this.page.locator(`.inventory_item:has-text("${productName}") >> button:has-text("Add to cart")`);
    }

    // New Locator: Shopping cart icon
    shoppingCartIcon(): Locator {
        return this.page.locator('.shopping_cart_link');
    }

    // New Locator: Shopping cart badge (for item count)
    shoppingCartBadge(): Locator {
        return this.page.locator('.shopping_cart_badge');
    }


    // Actions
    async addItemToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    // New Action: Navigate to cart
    async navigateToCart() {
        await this.shoppingCartIcon().click();
    }



    // New Check: Get cart item count
    async getCartItemCount(): Promise<string | null> {
        // Check if the badge is visible first, as it might not be if cart is empty
        if (await this.shoppingCartBadge().isVisible()) {
            return this.shoppingCartBadge().textContent();
        }
        return '0'; // Return '0' if badge is not visible (empty cart)
    }
}
