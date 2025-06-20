// src/step-definitions/PurchaseFlowSteps.ts
import { When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browserManager';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutInformationPage: CheckoutInformationPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let orderConfirmationPage: OrderConfirmationPage;

// Initialize all page objects once per scenario
Before(async function () {
  const page = getPage(); // Get the single Playwright Page instance
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutInformationPage = new CheckoutInformationPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  orderConfirmationPage = new OrderConfirmationPage(page);
});

// Steps for adding items to cart (from Inventory Page)
When('I add {string} to the cart', async function (productName: string) {
  await inventoryPage.addItemToCart(productName);
});

Then('the cart icon should show {string} items', async function (expectedCount: string) {
  const actualCount = await inventoryPage.getCartItemCount();
  expect(actualCount).toEqual(expectedCount);
});

When('I click on the cart icon', async function () {
  await inventoryPage.navigateToCart();
});

// Steps for Cart Page
Then('I should be redirected to the cart page', async function () {
  expect(await cartPage.isOnCartPage()).toBeTruthy();
});

Then('I should see {string} in the cart', async function (productName: string) {
  expect(await cartPage.isCartItemVisible(productName)).toBeTruthy();
});

When('I click on the checkout button', async function () {
  await cartPage.clickCheckout();
});

// Steps for Checkout Information Page
Then('I should be redirected to the checkout information page', async function () {
  expect(await checkoutInformationPage.isOnCheckoutInformationPage()).toBeTruthy();
});

When('I enter first name {string}, last name {string}, and postal code {string}', async function (firstName: string, lastName: string, postalCode: string) {
  await checkoutInformationPage.fillInformation(firstName, lastName, postalCode);
});

When('I click on the continue button', async function () {
  await checkoutInformationPage.clickContinue();
});

// Steps for Checkout Overview Page
Then('I should be redirected to the checkout overview page', async function () {
  expect(await checkoutOverviewPage.isOnCheckoutOverviewPage()).toBeTruthy();
});

Then('I should see {string} in the order summary', async function (productName: string) {
  expect(await checkoutOverviewPage.isOrderSummaryItemVisible(productName)).toBeTruthy();
});

Then('the item total should be {string}', async function (expectedTotal: string) {
  const actualTotalText = await checkoutOverviewPage.getItemTotal();
  // Playwright often returns text like "Item total: $55.97" so we extract just the number
  const actualTotal = actualTotalText?.replace('Item total: ', '').trim();
  expect(actualTotal).toEqual(expectedTotal);
});

When('I click on the finish button', async function () {
  await checkoutOverviewPage.clickFinish();
});

// Steps for Order Confirmation Page
Then('I should be redirected to the order confirmation page', async function () {
  expect(await orderConfirmationPage.isOnOrderConfirmationPage()).toBeTruthy();
});

Then('I should see the "THANK YOU FOR YOUR ORDER" message', async function () {
  expect(await orderConfirmationPage.isThankYouMessageVisible()).toBeTruthy();
  // You might want to also assert the exact text:
  // const thankYouText = await orderConfirmationPage.thankYouHeader().textContent();
  // expect(thankYouText).toEqual('THANK YOU FOR YOUR ORDER');
});

Then('I should see the "Back Home" button', async function () {
  await expect(orderConfirmationPage.backHomeButton()).toBeVisible();
});