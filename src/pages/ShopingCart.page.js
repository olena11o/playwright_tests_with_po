const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    getCartItemsNames() {
        return this.cartItems.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    async productInfoByID(id) {
        const product = {name: null, description: null, price: null};
        
        product.name = await this.cartItems.nth(id)
        .locator('[data-test="inventory-item-name"]')
        .innerText();
    
        product.description = await this.cartItems.nth(id)
        .locator('[data-test="inventory-item-desc"]')
        .innerText();
    
        product.price = await this.cartItems.nth(id)
        .locator('[data-test="inventory-item-price"]')
        .innerText();
    
        return product;
    }
}
