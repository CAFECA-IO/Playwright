import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import i18next from '../i18n';

test("進入 TideBit-DeFi 首頁，檢查登入狀態為未登入，切換語言為英文", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await expect
    .soft(page.getByRole("button", { name: "Wallet Connect" }))
    .toHaveText("Wallet Connect");
    page.waitForTimeout(2000);
});

test("點擊導覽列的上全部按鈕", async ({ page }) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await page
    //need to check the site version
    .getByRole("link", { name: "TideBit_logo beta v0.8.0+46.2" })
    .click();
  await expect.soft(page).toHaveTitle(/TideBit DeFi/);
  await page.getByRole("link", { name: "Trade" }).first().click();
  //check URL jump to trade page
  await expect.soft(page).toHaveURL(/(https:\/\/tidebit-defi.com\/).*trade/);
  //click the notice popup
  landingPage.clickAnncmnt();
  await page.getByRole("link", { name: "Leaderboard" }).click();
  landingPage.clickAnncmnt();
  await page.getByRole("link", { name: "Support" }).click();
  landingPage.clickAnncmnt();
  await page.locator("#globe").click();
  await page.getByRole("link", { name: "繁體中文" }).click();
  await expect.soft(page).toHaveURL(/.*tw/);
  await page.locator("#globe").click();
  await page.getByRole("link", { name: "简体中文" }).click();
  await expect.soft(page).toHaveURL(/.*cn/);
  await page.locator("#globe").click();
  await page.getByRole("link", { name: "English" }).click();
  await expect.soft(page).toHaveURL(/https:\/\/tidebit-defi.com\/./);
  await page.getByRole("button", { name: "2 notification icon" }).click();
  await page.locator(".translate-x-0 > div > div").first().click();
  await expect
    .soft(page.getByRole("heading", { name: "Happy Birthday to TideBit" }))
    .toHaveText("Happy Birthday to TideBit");
});

test("點擊首圖上的開始和信箱聯絡按鈕、白皮書和 AI 報告按鈕下載", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  //click first banner button
  landingPage.goto();
  landingPage.clickAnncmnt();
  await expect
    .soft(page.getByRole("link", { name: "contact@tidebit-defi.com" }))
    .toHaveAttribute("href", "mailto:contact@tidebit-defi.com");
  await page.getByRole("button", { name: "GET STARTED" }).click();
  await expect.soft(page).toHaveURL(/(https:\/\/tidebit-defi.com\/).*trade/);
  landingPage.goto();
  landingPage.clickAnncmnt();
  const filesLink = [
    "Whitepaper",
    "Download Report",
    "Income Statement Comprehensive ",
    "Balance Sheet ",
    "Cash Flow Statement ",
    "Red Flag Analysis",
  ];
  const checkfiles = [
    "tidebit_tech_whitepaper_v2.0.4_en.pdf",
    "tidebit_tech_whitepaper_v2.0.4_en.pdf",
    "comprehensive_income_statements.pdf",
    "balance_sheets.pdf",
    "cash_flows_statements.pdf",
    "red_flag_analysis.pdf",
  ];
  // can be improved to parallel download
  for (let i = 0; i < filesLink.length; i++) {
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: filesLink[i] }).click();
    const download = await downloadPromise;
    //no need to download?
    // await download.saveAs("download/" + download.suggestedFilename());
    if (download.suggestedFilename() != checkfiles[i]) {
      console.log(
        download.suggestedFilename() + checkfiles[i] + " is not correct."
      );
      throw new Error("Downloaded file " + checkfiles[i] + " is not correct.");
    }
  }
});

test("確認按鈕連結跳轉網頁正確。", async ({ page }) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await expect.soft(page.getByRole("link", { name: "Blockchain" }).nth(0)).toHaveAttribute("href", /.*baifa.io/);
  await expect
    .soft(page.getByRole("link", { name: "BAIFA" }))
    .toHaveAttribute("href", /.*baifa.io/);
  await expect
    .soft(page.getByRole("link", { name: "Ethereum ETH" }))
    .toHaveAttribute("href", "/trade/cfd/eth-usdt");
  await expect
    .soft(page.getByRole("link", { name: "Bitcoin BTC" }))
    .toHaveAttribute("href", "/trade/cfd/btc-usdt");
  await expect
    .soft(page.getByRole("link", { name: "iSunOne Visa Card" }))
    .toHaveAttribute("href", "https://www.isun1.com/");
  await expect
    .soft(page.getByRole("button", { name: "app-store" }))
    .toHaveAttribute("href", "/coming-soon");
  // click to open new tab has problem to check
  // await page.getByRole('button', { name: 'app-store' }).click();
  // await expect.soft(page).toHaveURL("https://tidebit-defi.com/coming-soon");

  // wait for fix
  // await expect
  //   .soft(page.getByRole("button", { name: "google play" }))
  //   .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('link', { name: 'Facebook' }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole("link", { name: "instagram" }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole("link", { name: "twitter" }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole("link", { name: "reddit" }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('contentinfo').getByRole('link', { name: 'Trade' }))
    .toHaveAttribute("href", /.*trade/);
  await expect
    .soft(page.getByRole('link', { name: 'TideBit University' }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('link', { name: 'Help Center' }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('link', { name: 'Hiring' }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('link', { name: 'Service policy' }))
    .toHaveAttribute("href", "/coming-soon");
  await expect
    .soft(page.getByRole('link', { name: 'Privacy Policy' }))
    .toHaveAttribute("href", "/coming-soon");
});
test("確認各語系網頁上述事項正確", async ({ page }) => {
  // const landingPage = new LandingPage(page);
  // landingPage.goto();
  // landingPage.clickAnncmnt();
  console.log(i18next.t('NAV_BAR.TRADE'));
  i18next.changeLanguage('cn');
  console.log(i18next.t('NAV_BAR.TRADE'));
  // await page.getByRole("link", { name: i18next.t('en:NAV_BAR.TRADE') }).first().click();
  /* 
  need to think about file structure
  1. extend the origin page class to add the language switch function
  2. create a new page class for each language
  3. create a json text to change the language content
   */
});
