import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import i18next from "../i18n";

test.beforeEach(async ({ context, page }) => {
  const lang = await page.evaluate("window.navigator.language;");
  i18next.changeLanguage(String(lang));
});

test("進入 TideBit-DeFi 首頁，檢查登入狀態為未登入，切換語言為英文", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect
    .soft(
      page.getByRole("button", { name: i18next.t("NAV_BAR.WALLET_CONNECT") })
    )
    .toHaveText(i18next.t("NAV_BAR.WALLET_CONNECT"));
});

test("點擊導覽列的上全部按鈕", async ({ page }) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await page
    //need to check the site version
    .getByRole("link", { name: "TideBit_logo beta v0.8.0" })
    .click();
  await expect.soft(page).toHaveTitle(/TideBit DeFi/);
  await page
    .getByRole("link", { name: i18next.t("NAV_BAR.TRADE") })
    .first()
    .click();
  //check URL jump to trade page
  await expect.soft(page).toHaveURL(/.*trade/);
  //click the notice popup
  landingPage.clickAnncmnt();
  await page
    .getByRole("link", { name: i18next.t("NAV_BAR.LEADERBOARD") })
    .click();
  landingPage.clickAnncmnt();
  await page.getByRole("link", { name: i18next.t("NAV_BAR.SUPPORT") }).click();
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
  await page
    .getByRole("button", { name: i18next.t("HOME_PAGE.CTA_BUTTON") })
    .click();
  await expect.soft(page).toHaveURL(/.*trade/);
  landingPage.goto();
  landingPage.clickAnncmnt();
  const filesLink = [
    i18next.t("HOME_PAGE.WHITEPAPER"),
    i18next.t("HOME_PAGE.DOWNLOAD_REPORT"),
    i18next.t("HOME_PAGE.COMPREHENSIVE_INCOME_STATEMENT"),
    i18next.t("HOME_PAGE.BALANCE_SHEET"),
    i18next.t("HOME_PAGE.CASH_FLOW_STATEMENT"),
    i18next.t("HOME_PAGE.RED_FLAG_ANALYSIS"),
  ];
  const checkfiles = [
    i18next.t("HOME_PAGE.WHITEPAPER_LINK"),
    i18next.t("HOME_PAGE.REPORTS_LINK"),
    i18next.t("HOME_PAGE.COMPREHENSIVE_INCOME_STATEMENT_LINK"),
    i18next.t("HOME_PAGE.BALANCE_SHEET_LINK"),
    i18next.t("HOME_PAGE.CASH_FLOW_STATEMENT_LINK"),
    i18next.t("HOME_PAGE.RED_FLAG_ANALYSIS_LINK"),
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
        "download file " +
          i +
          download.suggestedFilename() +
          "and" +
          checkfiles[i] +
          " is not correct."
      );
    }
  }
});

test("確認按鈕連結跳轉網頁正確。", async ({ page }) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await expect
    .soft(
      page
        .getByRole("link", {
          name: i18next.t("HOME_PAGE.RESERVE_RATIO_BLOCK_CARD_2"),
        })
        .nth(0)
    )
    .toHaveAttribute("href", /.*baifa.io/);
  await expect
    .soft(page.getByRole("link", { name: "BAIFA" }))
    .toHaveAttribute("href", /.*baifa.io/);
  await expect
    .soft(page.getByRole("link", { name: "Ethereum ETH" }))
    .toHaveAttribute("href", /.*trade\/cfd\/eth-usdt/);
  await expect
    .soft(page.getByRole("link", { name: "Bitcoin BTC" }))
    .toHaveAttribute("href", /.*trade\/cfd\/btc-usdt/);
  await expect
    .soft(page.getByRole("link", {name: i18next.t("HOME_PAGE.ISUNONE_PROMOTION_DESCRIPTION")}))
    .toHaveAttribute("href", /https:\/\/www.isun1.com*/);
  await expect
    .soft(page.getByRole("button", { name: "app-store" }))
    .toHaveAttribute("href", /.*coming-soon/);
  // click to open new tab has problem to check
  // await page.getByRole('button', { name: 'app-store' }).click();
  // await expect.soft(page).toHaveURL("https://tidebit-defi.com/coming-soon");

  // wait for fix
  // await expect
  //   .soft(page.getByRole("button", { name: "google play" }))
  //   .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: "Facebook" }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: "instagram" }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: "twitter" }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: "reddit" }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(
      page
        .getByRole("contentinfo")
        .getByRole("link", { name: i18next.t("NAV_BAR.TRADE") })
    )
    .toHaveAttribute("href", /.*trade/);
  await expect
    .soft(
      page.getByRole("link", { name: i18next.t("NAV_BAR.TIDEBIT_UNIVERSITY") })
    )
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: i18next.t("NAV_BAR.HELP_CENTER") }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: i18next.t("FOOTER.HIRING") }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: i18next.t("FOOTER.SERVICE_POLICY") }))
    .toHaveAttribute("href", /.*coming-soon/);
  await expect
    .soft(page.getByRole("link", { name: i18next.t("FOOTER.PRIVACY_POLICY") }))
    .toHaveAttribute("href", /.*coming-soon/);
});
