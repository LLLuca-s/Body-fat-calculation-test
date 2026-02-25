# 🌿 體脂分析儀 (Body Composition Analyzer)

這是一個基於 Web 技術開發的輕量化體脂率計算工具，採用莫蘭迪色系設計，提供優雅且直覺的使用者介面。

## ✨ 核心功能
* **多維度計算公式**：支援 BMI 估算法、美國海軍法、皮脂厚度法及 HERITAGE 法。
* **動態人體示意圖**：自動高亮顯示需要測量的部位。
* **健康指標分析**：計算 BMR (Katch-McArdle) 及 TDEE。

## 🧪 自動化測試 (Testing)

本專案使用 [Playwright](https://playwright.dev/) 進行端對端測試。

### 1. 測試環境準備
安裝依賴項目：
```bash
npm install
npx playwright install
### 2. 執行測試指令
* **背景執行所有測試**：
```bash
npx playwright test

開啟 UI 模式 (推薦，包含時光機重播功能)：
```bash
npx playwright test --ui

### 3. 測試涵蓋範疇
[x] 頁面加載：檢查標題與基礎 UI 是否正確顯示。

[x] 計算邏輯：驗證各公式的數值準確性。

[x] UI 交互：測試性別切換與側量點示意圖連動。

[x] 自動截圖：測試完成後自動保存結果快照。