# 交接（2026-11-09 更新）

## 目標
- 把 info-class 從「每頁各自一份程式」改成「引擎＋設定」架構：不用 ES modules，產出教師下載版與學生網址版。
- 舊網址、網址參數、學生紀錄（localStorage 鍵名）都不能失效。

## 已完成
- 第 0 階段「打地基」：CLAUDE.md、docs/url-contract.md、docs/decisions.md（PR #1，已合併到 main）。
- 待實作 (a)(b)（PR：fix/words-tw-comments → main）：
  - (a) 改正 3 處和實際行為不一致的程式註解
  - (b) 重要語詞一律要打「臺」，設定頁拿掉勾選
- 用 Chromium 測過：
  - words-setup.html 產生的網址沒有 `tw`，預覽顯示「一定要打『臺』」
  - words.html 不論有沒有 `tw=0`，「台北市」都不算對
  - 動過的 9 個檔案打開都沒有錯誤

- 待實作 (c)（PR：fix/award-without-end → main）：沒有 `end` 時全部通關才能領獎狀；四個教師設定頁加「全部通關才能領」勾選。用 Chromium 測過三種網址（沒有 end、end=23:59、end=00:00）、三種主題、words.html、四個設定頁。

## 下一步
1. 確認 fix/award-without-end 的 PR（待實作 (c)：沒有 `end` 時全部通關才能領獎狀）已合併。
2. 再做待實作 (d)：鍵盤小勇士（keyboard-w1～w3）的教師設定頁，產生 `#student` 連結或捷徑檔。屬於新功能，要先給老師看設計。

## 動過的檔案（2026-11-08）
- CLAUDE.md：新增，專案規則、目前結構、目標結構
- docs/url-contract.md：新增，每頁的網址參數、預設行為、範例網址、儲存鍵名
- docs/decisions.md：新增，5 筆決策
- docs/handoff.md：新增，這份交接
- words-setup.html：拿掉「台、臺都算對」勾選，改成一行說明；不再產生 `tw`
- words.html：比對時不再把「台」當成「臺」；改正開頭註解
- words-data.js：改正台／臺的註解
- typing-ninja.html、punctuation.html、keyboard-hero.html：改正姓名儲存的註解（三個檔案仍然只差兩行）
- keyboard-w1.html、keyboard-w2.html、keyboard-w3.html：改正紀錄儲存的註解

## 已做的決策
- 細節都寫在 docs/decisions.md，這裡只列重點：
  - 名字可以存在學生電腦的 localStorage，不可以上傳或公開
  - 鍵盤小勇士的紀錄保留到電腦還原
  - 沒有 `end` 時，全部通關才能領獎狀
  - 一律要打「臺」
- 分支：程式修改不直接推到 main；一個分支只做一件事。

## 試過但行不通
- 沒有。
- 已知的坑：參數放在 `#` 後面，不是 `?` 後面。
- 已知的坑：老師指定字母的紀錄鍵名包含字母順序（`前綴cus_字母`），排序方式不能改。
