import { test, expect } from '../pages/WalletConnect';

test('example test', async ({ page, extensionId  }) => {
  await page.goto(`chrome-extension://${extensionId}/home.html`);
  await page.locator("#onboarding__terms-checkbox").click();
  await expect.soft(page.locator("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(3) > button")).toHaveText("Connect");
  await page.locator("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(3) > button").click();
  
});

test('popup page', async ({ page, extensionId }) => {
  await page.goto("chrome-extension://oimbidjhffkibgpbooehfgphglkggckb/home.html");
  // await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await console.log(extensionId);
  await expect.soft(page.locator('body')).toHaveText('my-extension popup');
});