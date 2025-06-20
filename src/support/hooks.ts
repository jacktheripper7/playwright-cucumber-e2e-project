import { Before, After } from '@cucumber/cucumber';
import { initBrowser, closeBrowser, getPage } from './browserManager';
import { env } from '../utils/validateEnv';

Before(async function () {
  await initBrowser();
  await getPage().goto(env.BASE_URL);
});

After(async function () {
  await closeBrowser();
});