import { test, expect } from '@playwright/test';


test('點擊導覽列的上全部按鈕與首圖上的開始和信箱聯絡按鈕。', async ({ page }) => {
  await page.goto('https://tidebit-defi.com/');
  await expect.soft(page).toHaveTitle(/TideBit DeFi/);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'TideBit_logo beta v0.8.0+45.2' }).click();
  await expect.soft(page).toHaveTitle(/TideBit DeFi/);
  await page.getByRole('link', { name: 'Trade' }).first().click();
  //check URL jump to trade page
  //maybe URL can use regex
  await expect.soft(page).toHaveURL(/(https:\/\/tidebit-defi.com\/).*trade/);
  //click the notice popup
  if (page.getByRole('button', { name: 'OK' })) {
    page.getByRole('button', { name: 'OK' }).click();
  }
  // await expect.soft(page.getByRole('button', { name: 'OK' })).toHaveText('OK');
  // await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'Leaderboard' }).click();
  if (page.getByRole('button', { name: 'OK' })) {
    page.getByRole('button', { name: 'OK' }).click();
  }
  await page.getByRole('link', { name: 'Support' }).click();
  if (page.getByRole('button', { name: 'OK' })) {
    page.getByRole('button', { name: 'OK' }).click();
  }
  await page.locator('#globe').click();
  await page.getByRole('link', { name: '繁體中文' }).click();
  await page.locator('#globe').click();
  await page.getByRole('link', { name: '简体中文' }).click();
  await page.locator('#globe').click();
  await page.getByRole('link', { name: 'English' }).click();
  await page.getByRole('button', { name: '2 notification icon' }).click();
  await page.locator('.translate-x-0 > div > div').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('.translate-x-0 > div > div').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
});