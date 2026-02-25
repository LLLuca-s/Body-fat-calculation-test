const { test, expect } = require('@playwright/test');

test('測試體脂分析儀的核心計算功能', async ({ page }) => {
  // 1. 前往網頁 (確保路徑正確)
  await page.goto('file://' + __dirname + '/../index.html');

  // 2. 檢查標題 (使用正則表達式忽略空格問題)
  await expect(page.locator('h1')).toHaveText(/體脂.*分析儀/);


  // 3. 填寫基本資料
  await page.fill('#age', '33');
  await page.fill('#weight', '69.9');
  await page.fill('#height', '159');

  // 4. 點擊計算按鈕 (這時預設是 BMI 估算法)
  await page.click('text=計 算 體 脂 率');

  // 5. 驗證結果是否正確顯示
  const fatPct = page.locator('#fat-pct');
  await expect(fatPct).not.toHaveText('—'); // 確保不再是初始的橫杠
  
  // 獲取數值並檢查是否在合理範圍 (例如 10%~30% 之間)
  const resultValue = parseFloat(await fatPct.innerText());
  console.log(`測試算出的體脂率為: ${resultValue}%`);
  expect(resultValue).toBeGreaterThan(5);
  expect(resultValue).toBeLessThan(50);

  // 6. 測試切換「海軍法」並檢查示意圖
  await page.click('text=海軍法');
  // 加入 500ms 等待，確保 UI 已更新
  await page.waitForTimeout(500);

  const neckPoint = page.locator('#pt-neck');
  await expect(neckPoint).toHaveClass(/active/); // 檢查測量點有沒有亮起
});