import { Browser, Page, chromium } from 'playwright';

let browser: Browser;
let page: Page;

export async function initBrowser() {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(process.env.BASE_URL!);
  return page;
}

export function getPage(): Page {
  return page;
}

export async function closeBrowser() {
  await page?.close();
  await browser?.close();
}
