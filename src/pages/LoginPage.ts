import { Page } from 'playwright';

export class LoginPage {
  constructor(private page: Page) { }

  async waitForUsernameField() {
    await this.page.waitForSelector('input[data-test="username"]');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[data-test="username"]', username);
    await this.page.fill('input[data-test="password"]', password);
    await this.page.click('input[data-test="login-button"]');
  }

  async isOnInventoryPage(): Promise<boolean> {
    return this.page.url().includes('inventory.html');
  }

  async getErrorMessage(): Promise<string | null> {
    const errorElement = this.page.locator('[data-test="error"]');
    return errorElement.textContent();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    const errorElement = this.page.locator('[data-test="error"]');
    return errorElement.isVisible();
  }
}
