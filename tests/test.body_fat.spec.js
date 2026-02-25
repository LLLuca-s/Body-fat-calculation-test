const { test, expect } = require('@playwright/test');
const path = require('path');

// 網頁路徑（請確認檔案位置正確）
const FILE_PATH = 'file:///Users/bad/Desktop/my-helmet/my-body-fat-project/index.html';

test.describe('體脂計算器測試', () => {

  // 每個測試前先開啟網頁
  test.beforeEach(async ({ page }) => {
    // 加上 waitUntil: 'domcontentloaded'，這會讓測試在字體/圖片還沒載完前就開始，速度更快且更穩定
    await page.goto(FILE_PATH, { waitUntil: 'domcontentloaded' });
  });

  // ✅ 測試 1：確認頁面標題正確載入
  test('頁面標題正確顯示', async ({ page }) => {
    await expect(page).toHaveTitle('體脂分析儀| Body Composition Pro');
    const heading = page.locator('h1');
    await expect(heading).toContainText('體脂');
    await expect(heading).toContainText('分析儀');
  });

  // ✅ 測試 2：確認四個計算方法的頁籤存在
  test('四個計算方法頁籤都存在', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'BMI 估算法' })).toBeVisible();
    await expect(page.getByRole('button', { name: '海軍法' })).toBeVisible();
    await expect(page.getByRole('button', { name: '皮脂厚度法' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'HERITAGE法' })).toBeVisible();
  });

  // ✅ 測試 3：切換性別按鈕
  test('切換性別按鈕正常運作', async ({ page }) => {
    const maleBtn = page.locator('#btn-male');
    const femaleBtn = page.locator('#btn-female');

    // 預設為男性
    await expect(maleBtn).toHaveClass(/active/);

    // 點擊女性
    await femaleBtn.click();
    await expect(femaleBtn).toHaveClass(/active/);
    await expect(maleBtn).not.toHaveClass(/active/);

    // 切回男性
    await maleBtn.click();
    await expect(maleBtn).toHaveClass(/active/);
  });

  // ✅ 測試 4：BMI 估算法 — 正常計算流程（男性）
  test('BMI 估算法：男性正常計算', async ({ page }) => {
    // 填入資料
    await page.fill('#age', '30');
    await page.fill('#weight', '70');
    await page.fill('#height', '175');

    // 點擊計算
    await page.click('.calc-btn');

    // 結果區塊出現
    const result = page.locator('#result');
    await expect(result).toBeVisible();

    // 體脂率有數值（不是 —）
    const fatPct = page.locator('#fat-pct');
    const value = await fatPct.textContent();
    expect(parseFloat(value)).toBeGreaterThan(0);
    expect(parseFloat(value)).toBeLessThan(60);

    // BMI 有值
    const bmi = page.locator('#res-bmi');
    const bmiValue = await bmi.textContent();
    expect(parseFloat(bmiValue)).toBeGreaterThan(10);
  });

  // ✅ 測試 5：BMI 估算法 — 女性計算
  test('BMI 估算法：女性正常計算', async ({ page }) => {
    // 切換為女性
    await page.click('#btn-female');

    await page.fill('#age', '25');
    await page.fill('#weight', '55');
    await page.fill('#height', '160');

    await page.click('.calc-btn');

    const result = page.locator('#result');
    await expect(result).toBeVisible();

    const fatPct = await page.locator('#fat-pct').textContent();
    // 女性體脂通常比男性高
    expect(parseFloat(fatPct)).toBeGreaterThan(15);
  });

  // ✅ 測試 6：未填資料時不應顯示結果
  test('未填資料點擊計算會出現警告', async ({ page }) => {
    // 監聽 alert 對話框
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('請確認');
      await dialog.accept();
    });

    await page.click('.calc-btn');

    // 結果不應出現
    const result = page.locator('#result');
    await expect(result).toBeHidden();
  });

  // ✅ 測試 7：切換到海軍法後，額外欄位出現
  test('切換海軍法後出現圍度測量欄位', async ({ page }) => {
    await page.click('text=海軍法');

    // 海軍法的輸入區塊要出現
    const navySection = page.locator('#method-navy');
    await expect(navySection).toBeVisible();

    // 頸圍欄位要存在
    await expect(page.locator('#neck')).toBeVisible();
  });

  // ✅ 測試 8：海軍法 — 男性完整計算
  test('海軍法：男性完整計算', async ({ page }) => {
    await page.click('text=海軍法');

    await page.fill('#age', '28');
    await page.fill('#weight', '75');
    await page.fill('#height', '178');
    await page.fill('#neck', '38');
    await page.fill('#abdomen', '88');

    await page.click('.calc-btn');

    const result = page.locator('#result');
    await expect(result).toBeVisible();

    const fatPct = await page.locator('#fat-pct').textContent();
    expect(parseFloat(fatPct)).toBeGreaterThan(0);
  });

  // ✅ 測試 9：皮脂厚度法 — 男性計算
  test('皮脂厚度法：男性完整計算', async ({ page }) => {
    await page.click('text=皮脂厚度法');

    await page.fill('#age', '32');
    await page.fill('#weight', '80');
    await page.fill('#height', '180');
    await page.fill('#sf1', '12');
    await page.fill('#sf2', '22');
    await page.fill('#sf3', '16');

    await page.click('.calc-btn');

    const result = page.locator('#result');
    await expect(result).toBeVisible();

    const fatPct = await page.locator('#fat-pct').textContent();
    expect(parseFloat(fatPct)).toBeGreaterThan(0);
  });

  // ✅ 測試 10：HERITAGE 法 — 計算
  test('HERITAGE 法：完整計算', async ({ page }) => {
    await page.click('text=HERITAGE法');

    await page.fill('#age', '35');
    await page.fill('#weight', '72');
    await page.fill('#height', '172');
    await page.fill('#heritage-waist', '82');
    await page.fill('#heritage-hip', '96');

    await page.click('.calc-btn');

    const result = page.locator('#result');
    await expect(result).toBeVisible();
  });

  // ✅ 測試 11：去脂體重 = 體重 - 脂肪重量
  test('去脂體重計算邏輯正確', async ({ page }) => {
    await page.fill('#age', '30');
    await page.fill('#weight', '70');
    await page.fill('#height', '175');

    await page.click('.calc-btn');

    const fatKg = parseFloat(await page.locator('#res-fat-kg').textContent());
    const lbm = parseFloat(await page.locator('#res-lbm').textContent());

    // 脂肪 + 去脂體重 應約等於總體重 70kg（允許 0.5kg 誤差）
    expect(fatKg + lbm).toBeCloseTo(70, 0);
  });

  test('計算完成後截圖', async ({ page }) => {
    await page.fill('#age', '30');
    await page.fill('#weight', '70');
    await page.fill('#height', '175');
    await page.click('.calc-btn');

    await page.locator('#result').waitFor({ state: 'visible' });
    await page.screenshot({ path: 'result-screenshot.png', fullPage: true });
  });

});