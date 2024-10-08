const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    get sortDropdown() { return this.page.locator('.product_sort_container'); }

    async waitForInventoryURL() {
        await this.page.waitForURL(this.url);
    }

    async inventoryStorageState(authFile) {
        await this.page.context().storageState({ path: authFile });
    }
    
    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    inventoryItemsNames() {
        return this.inventoryItems.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    inventoryItemsPrices() {
        return this.inventoryItems.locator('div.pricebar > div').allTextContents();
    }

    async addItemToCartByItemId(id) {
        await this.inventoryItems.nth(id)
        .filter({has: this.page.getByRole('button')})
        .locator('[data-test^="add-to-cart"]')
        .click();
    }

    async sortBy(sortLocator) {
        await this.sortDropdown.selectOption(sortLocator);
    }

    async productInfoByID(id) {
        const product = {name: null, description: null, price: null};
        
        product.name = await this.inventoryItems.nth(id)
        .locator('[data-test="inventory-item-name"]')
        .innerText();
    
        product.description = await this.inventoryItems.nth(id)
        .locator('[data-test="inventory-item-desc"]')
        .innerText();
    
        product.price = await this.inventoryItems.nth(id)
        .locator('[data-test="inventory-item-price"]')
        .innerText();
    
        return product;
    }
}
