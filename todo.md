# 體脂分析儀 · 開發進度清單

> `body_fat.html` × `body_fat.spec.js`  
> 建立日期：2026-02-25

---

## 🧱 一、網頁功能開發

### 基本架構
- [x] 頁面標題設定（`<title>體脂計算器</title>`）
- [x] H1 標題顯示「體脂 分析儀」
- [x] 響應式版型（RWD，支援手機與桌機）
- [x] Morandi 色系設計風格
- [x] Google Fonts 字體引入（Noto Serif TC、DM Serif Display、Noto Sans TC）

### 性別切換
- [x] 男性 / 女性切換按鈕（`#btn-male` / `#btn-female`）
- [x] 預設選取男性（`.active` 狀態）
- [x] 切換後動態更新對應輸入欄位

### 計算方法頁籤
- [x] BMI 估算法（Deurenberg 公式）
- [x] 海軍法（U.S. Navy Method）
- [x] 皮脂厚度法（Jackson & Pollock 三點法）
- [x] HERITAGE 家族研究法
- [x] 頁籤切換時正確顯示 / 隱藏對應區塊

### 人體示意圖
- [x] SVG 人體輪廓繪製
- [x] 測量點標示（頸、腰、臀、胸、大腿）
- [x] 切換計算方法時高亮對應測量點

### 輸入欄位
- [x] 年齡（`#age`）
- [x] 體重（`#weight`，單位 kg）
- [x] 身高（`#height`，單位 cm）
- [x] 海軍法 — 男：頸圍（`#neck`）、腹圍（`#abdomen`）
- [x] 海軍法 — 女：頸圍（`#neck`）、腰圍（`#waist`）、臀圍（`#hip`）
- [x] 皮脂法 — 男：胸部（`#sf1`）、腹部（`#sf2`）、大腿（`#sf3`）
- [x] 皮脂法 — 女：三頭肌（`#sf1`）、髂骨（`#sf2`）、大腿（`#sf3`）
- [x] HERITAGE 法：腰圍（`#heritage-waist`）、臀圍（`#heritage-hip`）

### 計算邏輯
- [x] BMI 計算（`weight / (height/100)²`）
- [x] 體脂率計算（依各方法公式）
- [x] 脂肪重量（`fatKg = weight × fatPct%`）
- [x] 去脂體重 LBM（`lbm = weight - fatKg`）
- [x] 基礎代謝率 BMR（Katch-McArdle 公式）
- [x] 每日總熱量消耗 TDEE（`BMR × 1.375`，輕度活動）
- [x] 理想體重範圍估算（目標體脂 ± 2%）
- [x] 輸入驗證與空白警告（`alert('請確認...')`）

### 結果顯示
- [x] 體脂率數值（`#fat-pct`）
- [x] 體脂分類標籤（`#fat-category`）
- [x] 體脂範圍色條 + 指針動畫（`#range-pointer`）
- [x] BMI 數值與分類（`#res-bmi` / `#res-bmi-cat`）
- [x] 脂肪重量（`#res-fat-kg`）
- [x] 去脂體重（`#res-lbm`）
- [x] 理想體重範圍（`#res-ideal`）
- [x] BMR 數值（`#res-bmr`）
- [x] TDEE 數值（`#res-tdee`）
- [x] 體脂率參考標準表（依性別動態渲染，標示使用者位置）

---

## 🧪 二、Playwright 測試

| # | 測試名稱 | 狀態 |
|---|----------|------|
| 1 | 頁面標題正確顯示 | ✅ 已撰寫 |
| 2 | 四個計算方法頁籤都存在 | ✅ 已撰寫 |
| 3 | 切換性別按鈕正常運作 | ✅ 已撰寫 |
| 4 | BMI 估算法：男性正常計算 | ✅ 已撰寫 |
| 5 | BMI 估算法：女性正常計算 | ✅ 已撰寫 |
| 6 | 未填資料點擊計算會出現警告 | ✅ 已撰寫 |
| 7 | 切換海軍法後出現圍度測量欄位 | ✅ 已撰寫 |
| 8 | 海軍法：男性完整計算 | ✅ 已撰寫 |
| 9 | 皮脂厚度法：男性完整計算 | ✅ 已撰寫 |
| 10 | HERITAGE 法：完整計算 | ✅ 已撰寫 |
| 11 | 去脂體重計算邏輯正確 | ✅ 已撰寫 |
| 12 | 計算完成後截圖 | ✅ 已撰寫 |

---

## 🔮 三、未來可擴充項目（選做）

- [ ] 加入活動量選擇器（久坐 / 輕度 / 中度 / 高強度），動態調整 TDEE
- [ ] 女性海軍法切換性別後示意圖臀部點自動高亮（目前需手動切換）
- [ ] 新增歷史紀錄功能（localStorage 儲存多次測量結果）
- [ ] 結果頁加入「下載 PNG / PDF 報告」按鈕
- [ ] 新增 BMI 估算法的女性體脂對照圖表
- [ ] 撰寫海軍法 — 女性的 Playwright 測試案例
- [ ] 撰寫皮脂厚度法 — 女性的 Playwright 測試案例
- [ ] HERITAGE 法女性結果驗證測試
- [ ] 加入無障礙（a11y）屬性（`aria-label` 等）
- [ ] CI/CD 整合（GitHub Actions 自動執行 Playwright）

---

## 📁 專案檔案結構

```
my-helmet/
├── body_fat.html          ✅ 主網頁
└── body_fat.spec.js       ✅ Playwright 測試腳本
```

---

_最後更新：2026-02-25_
