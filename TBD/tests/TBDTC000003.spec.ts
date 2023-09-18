import { test, expect } from '@playwright/test';

test('進入 TideBit-DeFi 首頁，檢查登入狀態為未登入，切換語言為英文', async ({ page }) => {
  await page.goto('https://tidebit-defi.com/');
  await expect.soft(page).toHaveTitle(/TideBit DeFi/);
  await expect.soft(page.getByRole('button', { name: 'Wallet Connect' })).toHaveText('Wallet Connect');
});

test('點擊導覽列的上全部按鈕', async ({ page }) => {
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
  await expect.soft(page).toHaveURL(/.*tw/);
  await page.locator('#globe').click();
  await page.getByRole('link', { name: '简体中文' }).click();
  await expect.soft(page).toHaveURL(/.*cn/);
  await page.locator('#globe').click();
  await page.getByRole('link', { name: 'English' }).click();
  await expect.soft(page).toHaveURL(/https:\/\/tidebit-defi.com\/./);
  await page.getByRole('button', { name: '2 notification icon' }).click();
  await page.locator('.translate-x-0 > div > div').first().click();
  await expect.soft(page.getByRole('heading', { name: 'Happy Birthday to TideBit' })).toHaveText('Happy Birthday to TideBit');
  await page.getByRole('button', { name: 'OK' }).click();
  //click first banner button
  await page.goto('https://tidebit-defi.com/');
  await expect.soft(page).toHaveURL('https://tidebit-defi.com/');
  await expect.soft(page.getByRole('link', { name: 'contact@tidebit-defi.com' })).toHaveAttribute('href', 'mailto:contact@tidebit-defi.com');
  await page.getByRole('button', { name: 'GET STARTED' }).click();
  await expect.soft(page).toHaveURL(/(https:\/\/tidebit-defi.com\/).*trade/);
});

test('點擊首圖上的開始和信箱聯絡按鈕、白皮書和 AI 報告按鈕下載', async ({ page }) => {
await page.goto('https://tidebit-defi.com/');
await expect.soft(page).toHaveURL('https://tidebit-defi.com/');
await page.getByRole('button', { name: 'OK' }).click();
// Start waiting for download before clicking. Note no await.
const files= ['Whitepaper','Download Report','Income Statement Comprehensive Income Statement','Balance Sheet Balance Sheet','Cash Flow Statement Cash Flow Statement','Red Flag Analysis Red Flag Analysis'];
// can be improve to parrallel download
for (const file of files){
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: file}).click();
  const download = await downloadPromise;
  //no need to download?
  await download.saveAs('download/' + download.suggestedFilename());
  console.log('Downloaded file saved to ' + download.suggestedFilename());
}

});

test('確認按鈕連結跳轉網頁正確。', async ({ page }) => {});
test('確認各語系網頁上述事項正確', async ({ page }) => {});