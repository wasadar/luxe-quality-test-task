import { $ } from '@wdio/globals'
import {LoginPage} from './login.page.js';


function isAscending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function isDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends LoginPage {
    /**
     * define selectors using getter methods
     */
    
    get menuButton () {
        return $('.bm-burger-button');
    }

    get logoutButton () {
        return $('#logout_sidebar_link');
    }

    get addBackpackToCartButton () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get removeBackpackFromCartButton () {
        return $('#remove-sauce-labs-backpack');
    }

    get cartItemsNumber () {
        return $('.shopping_cart_link .shopping_cart_badge');
    }

    get twitterLink () {
        return $('li.social_twitter a');
    }

    get facebookLink () {
        return $('li.social_facebook a');
    }

    get linkedinLink () {
        return $('li.social_linkedin a');
    }

    get checkoutButton () {
        return $('#checkout');
    }

    get inputFirstName () {
        return $('#first-name');
    }

    get inputLastName () {
        return $('#last-name');
    }

    get inputPostalCode () {
        return $('#postal-code');
    }

    get continueButton () {
        return $('#continue');
    }

    get finishButton () {
        return $('#finish');
    }

    get backHomeButton () {
        return $('#back-to-products');
    }

    get inventory () {
        return $('#inventory_container');
    }

    get backpack () {
        return $('#shopping_cart_container');
    }

    get loginContainer () {
        return $('.login_container');
    }

    get checkoutCompleteMessage () {
        return $('.complete-header');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async changeSortOrder (order) {
        await $('select.product_sort_container').click();
        await $(`select.product_sort_container option[value="${order}"]`).click();
    }

    getItemName (index) {
        return $$('.inventory_item_name')[index].getText();
    }

    getItemPrice (index) {
        return $$('.inventory_item_price')[index].getText();
    }

    async logout () {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async getCartItemsNumber () {
        const cartBadge = this.cartItemsNumber;

        if (await cartBadge.isExisting()) {
            return Number(cartBadge.getText());
        } else {
            return 0;
        }
    }

    async checkSort (order, sortValue) {
        const values = [];
        for (let i = 0; i < 6; i++) {
            const value = sortValue === 'price' ?
                Number((await this.getItemPrice(i)).slice(1)) :
                await this.getItemName(i);
            values.push(value);
        }

        return order === "ascending" ? isAscending(values) : isDescending(values);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        super.open('');
        super.login('standard_user','secret_sauce');
    }
}

export default new MainPage();
