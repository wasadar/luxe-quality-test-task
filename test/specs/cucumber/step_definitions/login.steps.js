import LoginPage from '../../../pageobjects/login.page.js';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@wdio/globals';

Given('User is located on the main page of saucedemo website', async () => {
    await LoginPage.open();
});

When('User clicks the "Login" button', async () => {
    await LoginPage.loginButton.click();
});

Then('User should see the "Epic sadface: Username is required" error message', async () => {
    const errorMessage = await LoginPage.errorMessage.getText();
    expect(errorMessage).toEqual('Epic sadface: Username is required');
});