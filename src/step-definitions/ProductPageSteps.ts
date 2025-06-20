// src/step-definitions/ProductPageSteps.ts
import { When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browserManager';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

let inventoryPage: InventoryPage;
let productDetailsPage : ProductDetailsPage;

Before(async function () {
  // Initialize page objects here once per scenario
  inventoryPage = new InventoryPage(getPage());
  productDetailsPage = new ProductDetailsPage(getPage());
});


Then('I should see the product {string}' , async function (name: string) {
  await inventoryPage.isProductVisible(name);
});

When('I click on the product {string}', async function (name: string) {
  await inventoryPage.clickOnProductItem(name);
});

Then('I should see the product details for {string}', async function (productName: string) {
  expect(await productDetailsPage.isProductDetailsPageLoaded(productName)).toBeTruthy();
});

Then('the product description should be {string}', async function (expectedDescription: string) {
  const actualDescription = await productDetailsPage.getProductDescription();
  expect(actualDescription?.trim()).toEqual(expectedDescription.trim());
});

Then('the product price should be {string}', async function (expectedPrice: string) {
  const actualPrice = await productDetailsPage.getProductPrice();
  expect(actualPrice?.trim()).toEqual(expectedPrice.trim());
});

Then('the product image should be visible', async function () {
  await expect(productDetailsPage.productImage()).toBeVisible();
});



