import { test as setup, expect } from "../fixtures";
import metamask from "../.auth/metamask.json";
import { type Locator, type Page, type BrowserContext } from "@playwright/test";
import test from "node:test";

export class WalletConnect {
  readonly page: Page;
  // readonly getAnncmnt : Locator;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    // this.getAnncmnt = page.getByRole('button', { name: 'OK' })
  }

  async connectMetamask() {
    await this.page.waitForTimeout(3000);
    await this.page.goto(
      "chrome-extension://epeaoodlijfnfhkcdeomldjapknliknd/home.html"
    );
    await this.page.locator("#onboarding__terms-checkbox").click();
    await expect
      .soft(
        this.page.locator(
          "#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(3) > button"
        )
      )
      .toHaveText("Import an existing wallet");
    await this.page
      .locator(
        "#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(3) > button"
      )
      .click();
    await this.page.getByRole("button", { name: "I agree" }).click();
    for (let i = 0; i < 12; i++) {
      await this.page
        .locator("#import-srp__srp-word-" + i)
        .fill(metamask["srp-word"][i]);
    }
    await this.page
      .getByRole("button", { name: "Confirm Secret Recovery Phrase" })
      .click();
    await this.page
      .getByTestId("create-password-new")
      .fill(metamask["new-password"]);
    await this.page
      .getByTestId("create-password-confirm")
      .fill(metamask["new-password"]);
    await this.page.getByTestId("create-password-terms").click();
    await this.page.getByRole("button", { name: "Import My wallet" }).click();
    await this.page.getByRole("button", { name: "Got it" }).click();
    await this.page.getByTestId("pin-extension-next").click();
    await this.page.getByTestId("pin-extension-done").click();
    await this.page.waitForTimeout(2000);
    await this.page.getByTestId("popover-close").click();
  }
  async connectWallet() {
    await this.page.goto("https://tidebit-defi.com/");
    this.page.getByRole("button", { name: "OK" }).click();
    const pagePromise = this.context.newPage();
    await this.page.getByRole("button", { name: "Wallet Connect" }).click();
    await this.page.waitForTimeout(2000);
    await this.page
      .locator("div")
      .filter({ hasText: /^MetaMask$/ })
      .nth(1)
      .click();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://epeaoodlijfnfhkcdeomldjapknliknd/popup.html"
    );
    await newPage.getByTestId("page-container-footer-next").click();
    await newPage.getByTestId("page-container-footer-next").click();
    
  }
  async sendRequest() {
    const pagePromise = this.context.newPage();
    await this.page.getByRole("button", { name: "send request" }).click();
    const newPage = await pagePromise;
    await newPage.goto(
      "chrome-extension://epeaoodlijfnfhkcdeomldjapknliknd/popup.html"
    );
    await newPage.getByTestId("signature-request-scroll-button").click();
    await newPage.getByTestId("page-container-footer-next").click();
    await this.page.getByRole("button", { name: "done" }).click();
  }
}
