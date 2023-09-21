import { test, expect } from "../fixtures";
import i18next from '../i18n';

test("紀錄導覽列中可用餘額，再點擊右上角profile。", async ({ page }) => {
  const navAvailable = await page.locator("##__next > div > div.w-full.text-center.lg\:text-start > nav > div > div > div.flex.items-center > div > div > div:nth-child(6) > div > div:nth-child(1) > div.text-sm.xl\:text-base").textContent();
  await page.locator("#__next > div > div.w-full.text-center.lg\:text-start > nav > div > div > div.hidden.pt-3.lg\:flex > div.mr-5.inline-flex > div > button").click();
  await page.locator("#userDropdown > ul > li:nth-child(1) > button > a").click();
  await expect(page).toHaveURL(/https:\/\/tidebit-defi.com\/my-assets/);
  await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div.absolute.left-1\/2.top-300px.-translate-x-1\/2.-translate-y-3\/5.space-y-6.dark\:bg-transparent > div.flex.items-center.justify-center.space-x-2.text-center > button").click();
  await expect(page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div.absolute.left-1\/2.top-300px.-translate-x-1\/2.-translate-y-3\/5.space-y-6.dark\:bg-transparent > div.flex.justify-center.text-3xl.font-extrabold")).toContainText(navAvailable);
});

// test("點擊入金", async ({ page }) => {
  
// });

// test("確認按鈕連結跳轉網頁正確。", async ({ page }) => {
  
// });
// test("確認各語系網頁上述事項正確", async ({ page }) => {
//   // const landingPage = new LandingPage(page);
//   // landingPage.goto();
//   // landingPage.clickAnncmnt();
//   console.log(i18next.t('NAV_BAR.TRADE'));
//   i18next.changeLanguage('cn');
//   console.log(i18next.t('NAV_BAR.TRADE'));
//   // await page.getByRole("link", { name: i18next.t('en:NAV_BAR.TRADE') }).first().click();
//   /* 
//   need to think about file structure
//   1. extend the origin page class to add the language switch function
//   2. create a new page class for each language
//   3. create a json text to change the language content
//    */
// });
