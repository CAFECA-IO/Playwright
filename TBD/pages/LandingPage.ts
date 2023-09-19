import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly getAnncmnt : Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAnncmnt = page.getByRole('button', { name: 'OK' })
  }

  async goto() {
    await this.page.goto('https://tidebit-defi.com/');
    await expect.soft(this.page).toHaveURL('https://tidebit-defi.com/');
  }

  async clickAnncmnt() {
    if (this.getAnncmnt) {
        await this.getAnncmnt.click();
      }
  }
}