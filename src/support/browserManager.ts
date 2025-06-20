// src/support/browserManager.ts
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

export async function initBrowser(): Promise<void> {
    // Determine if running in CI based on environment variable (GitHub Actions sets CI to 'true')
    const isCI = process.env.CI === 'true';

    // Launch browser in headless mode for CI, or headed for local development (optional)
    browser = await chromium.launch({
        headless: isCI // Set headless to true if in CI, false otherwise (or always true if preferred)
        // You can add other browser options here if needed, e.g., args: ['--start-maximized']
    });
    context = await browser.newContext();
    page = await context.newPage();
}

export function getPage(): Page {
    if (!page) {
        throw new Error('Page has not been initialized. Call initBrowser() first.');
    }
    return page;
}

export async function closeBrowser(): Promise<void> {
    if (browser) {
        await browser.close();
    }
}
