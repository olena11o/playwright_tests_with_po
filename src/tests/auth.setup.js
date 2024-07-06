//import { test as setup } from '@playwright/test';
import { test as setup } from '../fixture';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ loginPage, inventoryPage }) => {
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.navigate();
  await loginPage.performLogin('standard_user', 'secret_sauce');

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await inventoryPage.waitForInventoryURL();

  // End of authentication steps.

   await inventoryPage.inventoryStorageState(authFile);

//-------------------------------------------------------------------//

//    // Perform authentication steps. Replace these actions with your own.
//    await page.goto('');
//    await page.locator('#user-name').fill('standard_user');
//    await page.locator('#password').fill('secret_sauce');
//    await page.locator('#login-button').click();

//    // Wait until the page receives the cookies.
//    //
//    // Sometimes login flow sets cookies in the process of several redirects.
//    // Wait for the final URL to ensure that the cookies are actually set.
//   await page.waitForURL('inventory.html');


//    // End of authentication steps.

//    await page.context().storageState({ path: authFile });
});