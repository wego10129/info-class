# 交接（2026-11-08 收工）

## 目標
- 把 info-class 從「每頁各自一份程式」改成「引擎＋設定」架構：不用 ES modules，產出教師下載版與學生網址版。
- 舊網址、網址參數、學生紀錄（localStorage 鍵名）都不能失效。

## 已完成
- 第 0 階段「打地基」，在 `setup/docs` 分支：
  - 建立 CLAUDE.md
  - 建立 docs/url-contract.md（每頁的網址參數與儲存鍵名）
  - 建立 docs/decisions.md（決策紀錄）
- 待實作 (a)(b)，在 `fix/words-tw-comments` 分支。這個分支從 setup/docs 開出，包含 setup/docs 的所有內容：
  - (a) 改正 3 處和實際行為不一致的程式註解
  - (b) 重要語詞一律要打「臺」，設定頁拿掉勾選
- 用 Chromium 測過：
  - words-setup.html 產生的網址沒有 `tw`，預覽顯示「一定要打『臺』」
  - words.html 不論有沒有 `tw=0`，「台北市」都不算對
  - 動過的 9 個檔案打開都沒有錯誤
- 兩個分支都已推上 GitHub，**都還沒合併到 main**。

## 下一步
1. 老師決定要不要合併。建議只合併 `fix/words-tw-comments`，它已經包含 setup/docs 的內容。
2. 接著做待實作 (c)：網址沒有 `end` 時，全部通關才能領獎狀。
   先列出每個遊戲的「全部通關」怎麼算，給老師確認後才改程式：
   - typing-ninja.html、punctuation.html、keyboard-hero.html（同一份程式）
   - words.html
3. 再做待實作 (d)：鍵盤小勇士（keyboard-w1～w3）的教師設定頁，產生 `#student` 連結或捷徑檔。屬於新功能，要先給老師看設計。

## 動過的檔案（fix/words-tw-comments 分支，和 main 相比）
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
