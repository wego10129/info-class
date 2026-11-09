# info-class 專案規則

## 這是什麼
國小資訊課練習遊戲網站（GitHub Pages）。使用者：三～六年級學生、資訊老師。
網址：https://wego10129.github.io/info-class/

## 絕對規則
- 不用框架：純 HTML/CSS/JS，共用程式用一般 <script src>，不用 ES modules 和 fetch()（教師下載版要能從檔案直接開）。
- 最低支援 Safari 16（iPad 第 5 代）與 Win11 Chrome。
- download/ 由 GitHub Actions 自動產生，不要手動修改。
- 不放任何學生資料（名單、帳號密碼）。
- 舊網址與網址參數不可失效，規格見 docs/url-contract.md。
- 圖片、音效放 assets/，不要用 base64 嵌進 HTML。
- 畫面文字一律繁體中文，用詞要讓三年級學生看得懂。

## 資料夾

### 目前結構
所有檔案都放在根目錄，沒有子資料夾。

- 入口頁
  - index.html：網站首頁，連到「重要按鍵練習」和「中英文打字修練」
  - typing.html：中英文打字修練的分類頁，連到英文打字、標點符號、重要語詞
- 教師設定頁（老師勾選內容，產生給學生的網址）
  - keyboard.html：重要按鍵練習 → 學生頁 keyboard-w1/w2/w3.html、keyboard-hero.html
  - typing-setup.html：英文打字 → 學生頁 typing-ninja.html
  - punct-setup.html：標點符號 → 學生頁 punctuation.html
  - words-setup.html：重要語詞訓練 → 學生頁 words.html
  - levels.html：關卡安排（英文、標點、按鍵三種共用），設定學生網址的 lv 參數
- 學生遊戲頁
  - keyboard-w1.html、keyboard-w2.html、keyboard-w3.html：鍵盤小勇士第 1～3 週
  - keyboard-hero.html：重要按鍵練習
  - typing-ninja.html：英文打字練習
  - punctuation.html：標點符號大挑戰
  - words.html：重要語詞訓練
- 資料檔與共用樣式
  - levels-data.js：關卡清單（window.LEVELS），教師設定頁與 levels.html 共用
  - words-data.js：重要語詞題庫（window.WBANK），words-setup.html 與 words.html 共用
  - site.css：共用樣式，入口頁、教師設定頁和 words.html 有用；其他學生遊戲頁的樣式寫在各自的 HTML 裡

### 目標結構（搬遷中）
依 docs/decisions.md 分階段搬遷，尚未建立的資料夾不要自行建立。

- games/<名稱>/：學生頁，只放設定；獨特功能放同資料夾的 game.js
- engines/<玩法>/：共用玩法（arcade、weekly-keys）
- shared/：全站工具（params、storage、ui）
- data/：題庫與關卡清單
- teacher/：教師設定頁
- docs/：規格與紀錄

## 做法
- 改 engines/ 或 shared/ 之前，先列出會受影響的所有遊戲，改完逐一測試。
- 本機測試：直接用 Chrome 開 html 檔，不啟動任何伺服器。
- commit 訊息用繁體中文，寫「做了什麼＋為什麼」。
- 一次只做一件事；沒有先問過，不要順便重構其他檔案。
