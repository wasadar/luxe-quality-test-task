import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/login.page.js'
import MainPage from '../../pageobjects/main.page.js'

describe('Test Task Part 1', () => {
    it('0001', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');

        const inventory = await MainPage.inventory.isExisting();
        const cart = await MainPage.backpack.isExisting();

        expect(inventory && cart).toEqual(true);
    });

    it('0002', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'qwerty');

        const errorMessage = await LoginPage.errorMessage.getText();

        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service');
    });

    it('0003', async () => {
        await LoginPage.open();

        await LoginPage.login('qwerty', 'secret_sauce');

        const errorMessage = await LoginPage.errorMessage.getText();

        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service');
    });

    it('0004', async () => {
        await MainPage.open();

        await browser.pause(1000);

        const inventory = await MainPage.inventory.isExisting();
        const cart = await MainPage.backpack.isExisting();

        expect(inventory && cart).toEqual(true);

        await MainPage.logout();

        const loginContainer = await MainPage.loginContainer.isExisting();

        expect(loginContainer).toEqual(true);
    });

    it('0005', async () => {
        await MainPage.open();

        // await MainPage.addBackpackToCartButton.click();
        await MainPage.clickItemButton(0);

        await browser.pause(1000);

        const itemsNumber1 = await MainPage.getCartItemsNumber();

        await MainPage.logout();

        await MainPage.login('standard_user', 'secret_sauce');

        await browser.pause(1000);

        const itemsnumber2 = await MainPage.getCartItemsNumber();
        
        expect(itemsNumber1).toEqual(itemsnumber2);

        // await MainPage.removeBackpackFromCartButton.click();
        await MainPage.clickItemButton(0);
    });

    it('0006', async () => {
        await MainPage.open()

        await MainPage.changeSortOrder('lohi');

        await browser.pause(1000);

        let check = await MainPage.checkSort('ascending','price')

        expect(check).toEqual(true);

        await MainPage.changeSortOrder('hilo');

        await browser.pause(1000);

        check = await MainPage.checkSort('descending','price')

        expect(check).toEqual(true);

        await MainPage.changeSortOrder('az');

        await browser.pause(1000);

        check = await MainPage.checkSort('ascending','name')

        expect(check).toEqual(true);

        await MainPage.changeSortOrder('za');

        await browser.pause(1000);

        check = await MainPage.checkSort('descending','name')

        expect(check).toEqual(true);
    });

    it('0007', async () => {
        await MainPage.open()

        await MainPage.twitterLink.click();
        let windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[1]);
        await expect(browser).toHaveUrlContaining('twitter.com');
        await browser.closeWindow(); 
        await browser.switchToWindow(windows[0]);

        await MainPage.facebookLink.click();
        windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[1]);
        await expect(browser).toHaveUrlContaining('facebook.com');
        await browser.closeWindow(); 
        await browser.switchToWindow(windows[0]);

        await MainPage.linkedinLink.click();
        windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[1]);
        await expect(browser).toHaveUrlContaining('linkedin.com');
        await browser.closeWindow(); 
        await browser.switchToWindow(windows[0]);
    });

    it('0008', async () => {
        await MainPage.open();

        // await MainPage.addBackpackToCartButton.click();
        await MainPage.clickItemButton(0);

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await MainPage.inputFirstName.setValue('FirstName');
        await MainPage.inputLastName.setValue('LastName');
        await MainPage.inputPostalCode.setValue('606060');

        await MainPage.continueButton.click();
        await MainPage.finishButton.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        const message = await MainPage.checkoutCompleteMessage.getText();
        expect(message).toEqual('Thank you for your order!');

        await MainPage.backHomeButton.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        const itemsNumber = await MainPage.getCartItemsNumber();
        expect(itemsNumber).toEqual(0);
    });

    // Is it normal that the error described in the test case does not appear?
    it('0009', async () => {
        await MainPage.open();

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await browser.pause(1000);

        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        let error = await MainPage.errorMessage.isExisting();

        expect(error).toEqual(true);

        error = await MainPage.errorMessage.getText();

        expect(error).toEqual('Cart is empty');
    });

    it('0010', async () => {
        await MainPage.open();

        await MainPage.clickItemButton(0);

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await MainPage.inputLastName.setValue('LastName');
        await MainPage.inputPostalCode.setValue('606060');

        await MainPage.continueButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        const message = await MainPage.errorMessage.getText();
        expect(message).toEqual('Error: First Name is required');
    });

    it('0011', async () => {
        await MainPage.open();

        await MainPage.clickItemButton(0);

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await MainPage.inputFirstName.setValue('FirstName');
        await MainPage.inputPostalCode.setValue('606060');

        await MainPage.continueButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        const message = await MainPage.errorMessage.getText();
        expect(message).toEqual('Error: Last Name is required');
    });

    it('0012', async () => {
        await MainPage.open();

        await MainPage.clickItemButton(0);

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await MainPage.inputFirstName.setValue('FirstName');
        await MainPage.inputLastName.setValue('LastName');

        await MainPage.continueButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        const message = await MainPage.errorMessage.getText();
        expect(message).toEqual('Error: Postal Code is required');
    });

    // There is no such validation on the site.
    it('0013', async () => {
        await MainPage.open();

        await MainPage.clickItemButton(0);

        await MainPage.backpack.click();
        await MainPage.checkoutButton.click();

        await MainPage.inputFirstName.setValue('FirstName');
        await MainPage.inputLastName.setValue('LastName');
        await MainPage.inputPostalCode.setValue('NotPostalCode');

        await MainPage.continueButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        const message = await MainPage.errorMessage.getText();
        expect(message).toEqual('Error: Postal Code is invalid');
    });

    it('0014', async () => {
        await MainPage.open();

        await browser.pause(1000);

        await MainPage.clickItemLink(0);

        await expect(browser).toHaveUrlContaining('https://www.saucedemo.com/inventory-item.html');
    });
});
