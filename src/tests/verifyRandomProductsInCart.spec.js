const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { getRndInteger, randomKeys } = require('../utils/utils');

test.describe('Basic tests', () => {
    test('Verify random products in a cart', async ({loginPage, inventoryPage, shopingCartPage}) => {
        await inventoryPage.navigate();

        // Get random keys
        const currentState = await inventoryPage.inventoryItemsNames()
        const numberOfProducts = currentState.length;

        const productKeys = randomKeys(numberOfProducts);

        // Add products to cart with random keys
        let productsToSelect = [];        

        for (let el of productKeys) {
            let productOnPage = await inventoryPage.productInfoByID(el);
            await inventoryPage.addItemToCartByItemId(el);

            productsToSelect.push(productOnPage);
        }

        // Go to shopping cart
        await shopingCartPage.navigate();
        let cartItems = await shopingCartPage.getCartItemsNames();

        // Verify number of products in Cart 
        expect(cartItems.length).toEqual(productsToSelect.length);

        // Get info about products in Cart
        let productsInCart = [];

        for (let i = 0; i <= productsToSelect.length-1; i++ ) {
            let productOnPage = await shopingCartPage.productInfoByID(i);

            productsInCart.push(productOnPage);
        };

        // Verify products in Cart are same as selected in Inventory page
        expect(productsInCart).toEqual(productsToSelect);
    });
});