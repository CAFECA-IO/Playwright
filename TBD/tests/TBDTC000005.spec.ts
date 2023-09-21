import { BrowserContext, Page } from "@playwright/test";
import { test, expect } from "../fixtures";
import i18next from "../i18n";
import { WalletConnect } from "../pages/WalletConnect";
import { LandingPage } from "../pages/LandingPage";

test("1. 進入 TideBit-DeFi 首頁，確定語言為英文，點擊錢包連接", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  landingPage.goto();
  landingPage.clickAnncmnt();
  await page.getByRole("button", { name: "Wallet Connect" }).click();
  await expect(page.getByRole("img", { name: "MetaMask" })).toHaveAttribute(
    "alt",
    "MetaMask"
  );
  await page.getByRole("img", { name: "MetaMask" }).click();
  await expect(page.getByRole("button", { name: "Send Requests" })).toHaveText("Send Requests")
});


test("2. 至metamask切換到ETH以外的鏈上後，發送確認身份與API授權簽名請求。", async ({ page, extensionId, context }) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  landingPage.clickAnncmnt();
  await page.getByRole("button", { name: "Wallet Connect" }).click();
  await expect(page.getByRole("img", { name: "MetaMask" })).toHaveAttribute(
    "alt",
    "MetaMask"
  );
  await page.getByRole("img", { name: "MetaMask" }).click();
  const pagePromise1 = context.newPage();
  const newPage1 = await pagePromise1;
  await newPage1.goto(
    "chrome-extension://epeaoodlijfnfhkcdeomldjapknliknd/home.html"
  );
  await newPage1.getByTestId("network-display").click();
  //locator can be improved
  await newPage1
    .locator(
      "body > div.mm-modal > div:nth-child(3) > div > section > div.mm-box.multichain-network-list-menu > div.mm-box.multichain-network-list-item.mm-box--padding-4.mm-box--display-flex.mm-box--gap-2.mm-box--justify-content-space-between.mm-box--align-items-center.mm-box--width-full.mm-box--background-color-transparent > div.mm-box.multichain-network-list-item__network-name > button"
    )
    .click();
  await page.getByRole("button", { name: "send request" }).click();
  await expect(
    page.locator(
      "#connectModal > div.flex.flex-auto.flex-col.items-center.py-5 > div > div > div.space-y-12.flex.flex-col.px-4.pt-16 > div:nth-child(2) > div.-mb-5.mt-7.w-271px.space-y-1.text-lightWhite > div.text-sm.text-lightRed3"
    )
  ).toContainText(/Please agree to the terms and conditions./);
});

test("3. 至metamask切換到ETH主鏈上，重新發送請求。", async ({
  page,
  extensionId,
  context,
}) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  await expect(page).toHaveURL(/https:\/\/tidebit-defi.com\//);
  
});

test("4. 紀錄導覽列中可用餘額後，在右上角profile點擊入金後於我的資產確認。", async ({
  page,
  extensionId,
  context,
}) => {
  const walletConnect = new WalletConnect(page, context);
  await walletConnect.connectMetamask();
  await walletConnect.connectWallet();
  await walletConnect.sendRequest();
  await expect(page).toHaveURL(/https:\/\/tidebit-defi.com\//);
  // Next.js css cant be read.
  // const navAvailable = await page.locator("#__next > div > div:nth-child(17) > div.w-full.text-center.lg\:text-start > nav > div > div > div.flex.items-center > div > div > div:nth-child(6) > div > div > div:nth-child(2) ").textContent();
  // profile button
  await page.locator("#__next > div > div.w-full.text-center> nav > div > div > div> div.mr-5.inline-flex > div > button").click();
  await page.locator("#userDropdown > ul > li:nth-child(1) > button > a").click();

  // Next.js css cant be read.

  await expect(page).toHaveURL(/https:\/\/tidebit-defi.com\/my-assets/);
  await page.getByRole("button", { name: "OK" }).click();
  const navAvailable = await page.locator("#__next > div > div:nth-child(17) > div.w-full.text-center> nav > div > div > div.flex.items-center > div > div > div:nth-child(6) > div > div:nth-child(1) > div:nth-child(2)").textContent();
  const navAvailableNum = Number(navAvailable.substring(0,navAvailable.length-4));
  console.log(navAvailableNum);
  await page
    .locator(
      "#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div.flex.justify-center.space-x-5 > div:nth-child(1) > button"
    )
    .click();
  await page.getByRole("button", { name: "MAX" }).click();
  await page
    .locator(
      "#depositModal > div.relative.flex-auto.pt-0 > div > div > div:nth-child(4) > div > button"
    )
    .click();
  await page.reload();
  await page.getByRole("button", { name: "OK" }).click();
  // click the eye
  await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div > div.flex.items-center.justify-center.space-x-2.text-center > button").click();
  const assetsAvailable = await page.locator("#__next > div > div:nth-child(17) > main > div > div > div.pt-10 > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(3) > div > span:nth-child(1)").textContent();
  console.log(assetsAvailable);
  const expectedNavAvailable = Number(assetsAvailable)-100;
  expect(navAvailableNum).toBe(expectedNavAvailable);
});



// test("5. 重複上述步驟並將語言切換至繁體中文以及簡體中文。", async ({ page }) => {

// });
