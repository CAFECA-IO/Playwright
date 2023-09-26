import { test, expect } from "../fixtures";
import i18next from "../i18n";
import { WalletConnect } from "../pages/WalletConnect";
import { MyAssetsPage } from "../pages/MyAssetsPage";

test.beforeEach(async ({ context, page }) => {
  const lang = await page.evaluate("window.navigator.language;");
  i18next.changeLanguage(String(lang));
});

test("1. 進入 TideBit-DeFi 首頁，將錢包連接到網站上，完成登入。", async ({
  page,
  context,
}) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.getMetamaskId();
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  const myAssetsPage = new MyAssetsPage(page);
  await myAssetsPage.goto();
  await myAssetsPage.checkBalance();
});

test("2. 點擊右上角profile的icon，再點擊我的資產，點擊總餘額上的眼睛與入金按鈕。", async ({
  page,
  context,
}) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.getMetamaskId();
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  const myAssetsPage = new MyAssetsPage(page);
  await myAssetsPage.goto();
  await myAssetsPage.checkBalance();
  await page
    .locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div:nth-child(3) > div:nth-child(1) > button")
    .click();
  await expect(
    page.getByRole("button", { name: i18next.t("D_W_MODAL.MAX") })
  ).toContainText(i18next.t("D_W_MODAL.MAX"));
});

test("3. 若缺乏從入金 ➡️ 建倉 ➡️ 更新持倉 ➡️ 關倉 ➡️ 出金的完整交易紀錄，則先完成上述流程，否則跳到下一步。", async ({
  page,
  context,
}) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.getMetamaskId();
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  const myAssetsPage = new MyAssetsPage(page);
  await myAssetsPage.goto();
  await myAssetsPage.checkTradeLog();
});

test("4. 查看現有交易紀錄與日期區間", async ({ page, context }) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.getMetamaskId();
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  const myAssetsPage = new MyAssetsPage(page);
  await myAssetsPage.goto();
  const firstLogDate = await page
    .locator(
      "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-child(1)"
    )
    .textContent();
  const lastLogdate = await page
    .locator(
      "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-last-child(1)"
    )
    .textContent();
  const timestamp = new Date().getTime() + 8 * 60 * 60 * 1000;
  const todayDate = String(new Date(timestamp).getDate());
  expect(firstLogDate.substring(0, 2)).toContain(todayDate);
  expect(lastLogdate.substring(0, 2)).toContain(todayDate);
});

test("5. 設定日期區間篩選交易紀錄", async ({ page, context }) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.getMetamaskId();
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  const myAssetsPage = new MyAssetsPage(page);
  await myAssetsPage.goto();
  const timestamp = new Date().getTime() + 8 * 60 * 60 * 1000;
  const todayDate = String(new Date(timestamp).getDate());
  if (Number(todayDate) > 7) {
    console.log(await page
      .locator(
        "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div > div > div:nth-child(2) > div > button > div"
      )
      .textContent());
    await page
      .locator(
        "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(3)"
      )
      .getByText(String(Number(todayDate)-7))
      .click();
    const firstLogDate = await page
      .locator(
        "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-child(1)"
      )
      .textContent();
    const lastLogdate = await page
      .locator(
        "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-last-child(1)"
      )
      .textContent();
    expect(Number(firstLogDate.substring(0, 2))).toBeGreaterThanOrEqual(
      Number(todayDate)
    );
    expect(Number(lastLogdate.substring(0, 2))).toBeGreaterThanOrEqual(Number(todayDate)-7);
  } else {
    //     await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div > div > div:nth-child(2) > div:nth-child(1) > button").click();
    //     await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > > div").click();
    //     await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(3)").getByText("16").click();
    //     const firstLogDate = await page
    //     .locator(
    //       "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-child(1)"
    //     )
    //     .textContent();
    //   const lastLogdate = await page
    //     .locator(
    //       "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(4) > div > div:nth-child(2) > div > div > div > div:nth-last-child(1)"
    //     )
    //     .textContent();
    //     expect(Number(firstLogDate.substring(0, 2))).toContain(todayDate);
    //     expect(Number(lastLogdate.substring(0, 2))).toContain(todayDate);
  }
});
test("6. 點選交易類型切換至入金並點選第一筆紀錄的入金按鈕，再關閉紀錄。", async ({ page, context }) => {
    const walletConnect = new WalletConnect(page, context);
    await walletConnect.getMetamaskId();
    await walletConnect.connectMetamask();
    await walletConnect.connectWallet();
    await walletConnect.sendRequest();
    const myAssetsPage = new MyAssetsPage(page);
    await myAssetsPage.goto();
    await page.getByRole("button", { name: i18next.t("MY_ASSETS_PAGE.RECEIPT_SECTION_TRADING_TYPE_DEPOSIT") }).first().click();
    await expect(page.locator("#depositHistoryModal")).toBeVisible();
});

test("7. 點選交易類型切換至關倉並點選第一筆紀錄的關倉按鈕後，點擊分享至FB，再關閉紀錄。", async ({ page, context }) => {
    const walletConnect = new WalletConnect(page, context);
    await walletConnect.getMetamaskId();
    await walletConnect.connectMetamask();
    await walletConnect.connectWallet();
    await walletConnect.sendRequest();
    const myAssetsPage = new MyAssetsPage(page);
    await myAssetsPage.goto();
    await page.getByRole("button", { name: i18next.t("MY_ASSETS_PAGE.RECEIPT_SECTION_TRADING_TYPE_CFD_CLOSE") }).first().click();
    const pagePromise = context.waitForEvent('page');
    await page.getByRole("img",{name: "FACEBOOK"}).first().click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect.soft(page).toHaveTitle(/Facebook/);
});

test("8. 點選交易類型切換至開倉並點選第一筆紀錄的更新持倉按鈕，點擊分享至X，再關閉紀錄。", async ({ page, context }) => {
    const walletConnect = new WalletConnect(page, context);
    await walletConnect.getMetamaskId();
    await walletConnect.connectMetamask();
    await walletConnect.connectWallet();
    await walletConnect.sendRequest();
    const myAssetsPage = new MyAssetsPage(page);
    await myAssetsPage.goto();
    await page.getByRole("button", { name: i18next.t("MY_ASSETS_PAGE.RECEIPT_SECTION_TRADING_TYPE_CFD_UPDATE") }).first().click();
    const pagePromise = context.waitForEvent('page');
    await page.getByRole("img",{name: "TWITTER"}).first().click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect.soft(newPage).toHaveTitle(/Twitter/);
});