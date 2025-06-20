import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { env } from '../utils/validateEnv';
import { getPage } from '../support/browserManager';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I navigate to the login page', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  await loginPage.waitForUsernameField();
});

When('I login with valid credentials', async function () {
  await loginPage.login(env.APP_USERNAME, env.APP_PASSWORD);
});

Then('I should be redirected to the inventory page', async function () {
  const isRedirected = await loginPage.isOnInventoryPage();
  expect(isRedirected).toBeTruthy();
});

When('I attempt to login with {string} and {string}', async function (username: string, password: string) {
  let actualPassword = password;
  // If the placeholder 'correct_password' is used, fetch the actual password from environment variables
  if (password === 'correct_password') {
    actualPassword = env.APP_PASSWORD;
  }
  // If the placeholder 'correct_username' is used (for future scenarios), fetch from env
  let actualUsername = username;
  if (username === 'correct_username') { // Added for completeness if you decide to do this for username too
    actualUsername = env.APP_USERNAME;
  }
  await loginPage.login(actualUsername, actualPassword);
});

Then('I should see a login error message with text {string}', async function (expectedErrorMessage:string) {
  const errorMessage = await loginPage.getErrorMessage();
  expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  expect(errorMessage).toEqual(expectedErrorMessage);  
  
})