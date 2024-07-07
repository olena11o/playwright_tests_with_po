export async function currentOrderOnPage(sortingType, inventoryPage) {
    let orderOnPage = [];
    if (sortingType == 'az' || sortingType == 'za') {
        orderOnPage = await inventoryPage.inventoryItemsNames();
    } else if (sortingType == 'lohi' || sortingType == 'hilo') {
        const pricesWithCurrency = await inventoryPage.inventoryItemsPrices();
        orderOnPage = pricesWithCurrency.map((element) => element.substring(1));
    }
    return orderOnPage;
};

export function sortArray(sortType, arrayToSort) {
    let sortedArray = [];
    switch (sortType) {
        case 'az':
            sortedArray = arrayToSort.toSorted();
            break;
        case 'za':
            sortedArray = arrayToSort.toSorted().reverse();
            break;
        case 'lohi':
            sortedArray = arrayToSort.toSorted((a, b) => a - b);
            break;
        case 'hilo':
            sortedArray = arrayToSort.toSorted((a, b) => b - a);
            break;
    };
    return sortedArray;
};

export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function randomKeys(numberOfProducts) {
    let productKeys = [];
    let productKey;

    const numberOfProductsToSelect = getRndInteger(1, numberOfProducts);
    for (let i = 1; i <= numberOfProductsToSelect;) {
        productKey = getRndInteger(0, numberOfProducts - 1);
        if (productKeys.includes(productKey) == false) {
            productKeys.push(productKey);
            i++;
        } else i = i;
    };
    return productKeys
}