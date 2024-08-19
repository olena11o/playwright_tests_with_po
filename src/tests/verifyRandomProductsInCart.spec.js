const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { randomKeys } = require('../utils/utils');

test.describe('Basic tests', () => {
    test('Verify random products in a cart', async ({inventoryPage, shopingCartPage}) => {
        await inventoryPage.navigate();

        // Get random keys
        const numberOfProducts = (await inventoryPage.inventoryItemsNames()).length;
        const productKeys = randomKeys(numberOfProducts);

        // Add products to cart with random keys
        let productsToSelect = [];        

        for (const el of productKeys) {
            const productOnPage = await inventoryPage.productInfoByID(el);
            await inventoryPage.addItemToCartByItemId(el);

            productsToSelect.push(productOnPage);
        }

        // Go to shopping cart
        await shopingCartPage.navigate();
        const cartItems = await shopingCartPage.getCartItemsNames();

        // Verify number of products in Cart 
        expect(cartItems.length).toEqual(productsToSelect.length);

        // Get info about products in Cart
        let productsInCart = [];

        for (let i = 0; i <= productsToSelect.length-1; i++ ) {
            const productOnPage = await shopingCartPage.productInfoByID(i);

            productsInCart.push(productOnPage);
        };

        // Verify products in Cart are same as selected in Inventory page
        expect(productsInCart).toEqual(productsToSelect);
    });
});