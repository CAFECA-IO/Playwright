import { expect, type Locator, type Page, type BrowserContext } from "@playwright/test";
import i18next from "i18next";

export class TradePage {
  readonly page: Page;
  readonly getAnncmnt: Locator;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.getAnncmnt = page.getByRole("button", { name: i18next.t("ANNOUNCEMENT_MODAL.OK_BUTTON") });
    this.context = context;
  }

  async goto() {
    await this.page.goto("./trade/cfd/eth-usdt");
    await expect.soft(this.page).toHaveTitle(/CFD/);
  }

  async gotoBTC() {
    await this.page.goto("./trade/cfd/btc-usdt");
    await expect.soft(this.page).toHaveTitle(/CFD/);
  }

  async clickAnncmnt() {
    if (this.getAnncmnt) {
      await this.getAnncmnt.click();
    }
  }
  async inputAmount(amount ="0.05") {
    await this.page.getByPlaceholder("amount input").fill(amount);
  }

  async openLongPosition(extensionId) {
    const pagePromise = this.context.newPage();
    await this.page.getByRole('button', { name: i18next.t("TRADE_PAGE.TRADE_TAB_LONG_BUTTON") }).click();
    await this.page.getByRole('button', { name: i18next.t("POSITION_MODAL.CONFIRM_BUTTON") }).click();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://" + extensionId + "/popup.html"
    );
    await newPage.getByTestId("signature-request-scroll-button").click();
    await newPage.getByTestId("page-container-footer-next").click();
    await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div > button > span > svg").click();
    newPage.close();
  }
  async openShortPosition(extensionId) {
    const pagePromise = this.context.newPage();
    await this.page.getByRole('button', { name: i18next.t("TRADE_PAGE.TRADE_TAB_SHORT_BUTTON") }).click();
    await this.page.getByRole('button', { name: i18next.t("POSITION_MODAL.CONFIRM_BUTTON") }).click();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://" + extensionId + "/popup.html"
    );
    await newPage.getByTestId("signature-request-scroll-button").click();
    await newPage.getByTestId("page-container-footer-next").click();
    await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div > button > span > svg").click();
    newPage.close();
  }

  // number="1" means the last position
  async updatePosition(extensionId ,number = "1") {
    await this.page.getByRole('button', { name: i18next.t("TRADE_PAGE.POSITION_TAB") }).click();
    await this.page.locator("#__next > div > main > div > div:nth-child(3) > div > div > div > div > div:nth-last-child("+number+")").click();
    // #__next > div > div:nth-child(11) > div.fixed.inset-0.z-80.flex.items-center.justify-center.overflow-y-auto.overflow-x-hidden.outline-none.backdrop-blur-sm.focus\:outline-none > div > div > div.relative.flex.flex-auto.flex-col.items-center.px-10.pt-0 > div.mx-10.mt-3.flex-col.text-xs.leading-relaxed.text-lightWhite > div.mb-2.h-50px > div.flex.items-center.justify-between > div:nth-child(3) > div > div
    await this.page.locator('.bg-white').first().click();
    // await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > div > div").click();
    await this.page.locator("#__next > div > div:nth-child(11)").locator("div.mb-5.h-70px > div.flex.items-center.justify-between > div:nth-child(3) > div > div").click();
    await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > input").check();
    await this.page.getByRole('button', { name: i18next.t("POSITION_MODAL.UPDATE_POSITION_TITLE") }).click();
    // const pagePromise = this.context.waitForEvent('page');
    await this.page.getByRole('button', { name: i18next.t("POSITION_MODAL.CONFIRM_BUTTON") }).click();
    const pagePromise = this.context.newPage();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://" + extensionId + "/popup.html"
    );
    await newPage.getByTestId("signature-request-scroll-button").click();
    await newPage.getByTestId("page-container-footer-next").click();
    await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div > button > span > svg").click();
    newPage.close();
  }
  async closePosition(extensionId ,number = "1") {
    await this.page.getByRole('button', { name: i18next.t("TRADE_PAGE.POSITION_TAB") }).click();
    await this.page.locator("#__next > div > main > div > div:nth-child(3) > div > div > div > div > div:nth-last-child("+number+") > div > div:nth-child(4) > div:nth-child(3)").click();
    await this.page.getByRole('button', { name: i18next.t("POSITION_MODAL.CONFIRM_BUTTON") }).click();
    await this.page.waitForTimeout(2000);
    const pagePromise = this.context.newPage();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://" + extensionId + "/popup.html"
    );
    await newPage.getByTestId("signature-request-scroll-button").click();
    await newPage.getByTestId("page-container-footer-next").click();
    await this.page.locator("#__next > div > div:nth-child(11) > div > div > div > div > button > span > svg").click();
    newPage.close();
  }
}
