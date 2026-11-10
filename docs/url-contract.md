# 網址規格（URL contract）

舊網址與網址參數不可失效。這份文件記錄每個頁面目前接受哪些參數、教師設定頁怎麼產生連結、用了哪些瀏覽器儲存鍵名。
搬遷或改版時，以這份為準逐項檢查；有改動要先更新這份文件。

整理日期：2026-11-08（依 main 分支 commit 10abc9b 的程式碼逐頁讀出）

## 通則

- **參數都放在 `#` 後面，不是 `?` 後面。** 例：`typing-ninja.html#keys=asdf&end=11:50`。
  程式用 `new URLSearchParams(location.hash…)` 讀；放在 `?` 後面的參數不會被讀到。
- 參數值依 URL 編碼。中文、全形標點、按鍵符號在網址裡會變成 `%E4%B8%AD…` 這種樣子，這是正常的。
- 老師發給學生的連結有三種形式，都要能繼續用：
  1. 直接貼連結
  2. 「下載捷徑檔」：設定頁下載一個小 `.html` 檔，檔案裡寫死完整網址，打開後自動跳轉。**學生桌面上的捷徑檔改不了，所以舊網址一定要保留。**
  3. 「老師示範」按鈕：同一個連結再加上 `demo=1`
- 班級座號碼（學生簽到用）：5 位數字＝年級 1 碼＋班級 2 碼＋座號 2 碼。`classes`、`seats` 參數決定班級、座號可以填的上限。
- 儲存：
  - **localStorage**＝學生的練習紀錄，關掉瀏覽器還在。**鍵名不能改**，改了學生的紀錄就會消失。
  - **sessionStorage**＝教師設定頁暫存的表單，關掉分頁就清掉。改名不會讓學生的紀錄消失，但老師在「關卡安排」和設定頁之間來回時，剛填的表單可能會不見。

---

## 一、入口頁

### index.html
- `<title>`：資訊課練習遊戲
- 網址參數：沒有
- 儲存：沒有
- 說明：網站首頁，連到 keyboard.html、typing.html。頁面上有一行說明：「老師示範：在遊戲網址後面加上 #demo」。

### typing.html
- `<title>`：中英文打字修練
- 網址參數：沒有
- 儲存：沒有
- 說明：分類頁，連到 typing-setup.html、typing-ninja.html、punct-setup.html、punctuation.html、words-setup.html。

---

## 二、學生遊戲頁：打字忍者共用玩法（3 頁）

`typing-ninja.html`、`punctuation.html`、`keyboard-hero.html` 三個檔案的內容**只差兩行**：`<html data-kind="…">` 和 `<title>`。程式依照 `data-kind` 決定主題，網址參數的讀法完全一樣，所以寫在一起。

| 檔案 | `<title>` | data-kind | 教師設定頁 | localStorage 前綴 |
|---|---|---|---|---|
| typing-ninja.html | 英文打字練習 | `en` | typing-setup.html | `ninjatype1_` |
| punctuation.html | 標點符號大挑戰 | `punc` | punct-setup.html | `punctype1_` |
| keyboard-hero.html | 重要按鍵練習 | `key` | keyboard.html | `kbkey1_` |

### 網址參數

| 參數 | 值 | 意思 | 沒給時 |
|---|---|---|---|
| `keys` | 字母／符號串 | 要練習的字母、標點或按鍵。英文會先轉成小寫；不在這個主題裡的字元會丟掉；重複的只留一個。**去掉之後至少要剩 2 個才算數。** 算數的話，就變成「單頁練習」：只有這一組練習，不顯示回上頁、回目錄、換練習範圍。 | 學生自己從預設的幾組裡選（見下面「預設組別」），畫面上有回上頁、回目錄 |
| `lv` | 例 `l1,m.brave` | 只開放哪些關卡，用逗號（或空白）分開。寫 `關卡代號.起始級` 的話，一進去就能玩到那一級，比它低的級數也打開，比它高的照常過關才開。關卡代號和級數見下表；看不懂的代號直接略過。 | 全部關卡依序解鎖。英文例外：「字母打地鼠 `w`」「打字忍者 `n`」預設不開 |
| `l3` | `ninja` | **舊連結用**（只對英文有效）：沒有 `lv` 時，用打字忍者取代字母流星雨。設定頁現在不會產生這個參數。 | 英文預設開流星雨、不開忍者 |
| `goal` | 文字（最多 20 字） | 老師填的「本次練習的目標」，同時當作網頁標題和這一組練習的名稱 | 名稱顯示「老師指定」 |
| `name` | 文字 | **舊連結用**，和 `goal` 一樣。同時有兩個的話，用 `goal`。 | — |
| `end` | `HH:MM`（例 `11:50`） | 領取獎狀的時間。到了這個時間，關卡選單出現「領取獎狀」按鈕。格式不對就當作沒給。 | 全部通關才能領（2026-11-09 起；以前是 `11:50`），見本節後面 |
| `classes` | 數字 | 班級可以填到幾班，最大 30 | 20 |
| `seats` | 數字 | 座號可以填到幾號，最大 60 | 40 |
| `nm` | `1` | 簽到時可以輸入名字，獎狀印「三年一班 王小明」 | 不能輸入名字，獎狀印「三年一班 1 號」 |
| `demo` | 任何值（設定頁給 `1`），或只寫 `#demo` | 老師示範模式：全部關卡打開，紀錄不保存 | 一般學生模式 |

**關卡代號（`lv`），同 levels-data.js：**

| 主題 | 關卡代號 | 有起始級的關卡 |
|---|---|---|
| 英文 `en` | `l1` 單一字母、`l2` 字母組合、`w` 字母打地鼠（2026-11-10 新增）、`m` 字母流星雨、`n` 打字忍者、`race` 影子賽車 | `w`、`m`、`n`、`race` |
| 標點 `punc` | `l1` 單一符號、`l2` 譜面分歧、`n` 標點忍者、`boss` 魔王戰 | `n` |
| 按鍵 `key` | `l1` 單一按鍵、`l2` 鍵盤偵探、`n` 病毒來襲 | `n` |

級數代號：`novice`、`brave`、`master`（畫面上叫新手／勇者／大師，各主題名稱不同；字母打地鼠 2026-11-10 起叫打擊新手／打擊高手／打擊大師，代號不變）。從 `novice` 開始的話，設定頁產生的網址不寫級數。

**預設組別（沒有 `keys` 時學生自己選）：**
- 英文：`mid` 中排 asdfghjkl、`top` 上排 qwertyuiop、`bot` 下排 zxcvbnm
- 標點：`basic` 基本 ，。？！、`adv` 進階 、；：、`all` 全部 ，。、；：？！
- 按鍵：`left` 左側鍵 ⎋⇥⇪⇧␣、`right` 右側鍵 ⌫⌦⏎↑↓←→、`all` 全部

**按鍵符號（keyboard-hero.html 的 `keys`）：**
⎋＝Esc、⇥＝Tab、⇪＝Caps Lock、⇧＝Shift、␣＝空白鍵、⌫＝Backspace、⌦＝Delete、⏎＝Enter、↑↓←→＝方向鍵

### 哪個設定頁產生、範例網址

設定頁一定會給 `keys`。`end` 平常會給，老師勾「全部關卡都過關才能領獎狀」時不給。`lv`、`goal`、`classes`（不是 20 才給）、`seats`（不是 40 才給）、`nm`、`demo` 有需要才給。
`lv` 的值是在 levels.html 選好的，暫存在 sessionStorage，回到設定頁時加進網址。

- typing-setup.html → typing-ninja.html
  - `https://wego10129.github.io/info-class/typing-ninja.html#keys=asdfghjkl&end=11%3A50`
  - 有關卡安排、目標、名字：`https://wego10129.github.io/info-class/typing-ninja.html#keys=asdfghjkl&lv=l1%2Cm.brave&goal=%E4%B8%AD%E6%8E%92%E7%B7%B4%E7%BF%92&end=11%3A50&nm=1`
- punct-setup.html → punctuation.html
  - `https://wego10129.github.io/info-class/punctuation.html#keys=%EF%BC%8C%E3%80%82%EF%BC%9F%EF%BC%81&end=11%3A50`（keys＝，。？！）
- keyboard.html → keyboard-hero.html
  - `https://wego10129.github.io/info-class/keyboard-hero.html#keys=%E2%8E%8B%E2%87%A5%E2%87%AA%E2%87%A7%E2%90%A3&end=11%3A50&classes=12`（keys＝⎋⇥⇪⇧␣，12 班）

### localStorage 鍵名（`前綴` 依上面的表：`ninjatype1_`／`punctype1_`／`kbkey1_`）

| 鍵名 | 內容 |
|---|---|
| `前綴` + 組別代號（例 `ninjatype1_mid`、`punctype1_basic`、`kbkey1_left`） | 學生自己選組別時，這一組的練習紀錄 |
| `前綴` + `cus_` + keys（例 `ninjatype1_cus_asdfghjkl`） | 網址有 `keys` 時，這組字母的紀錄。**keys 依網址裡的順序**（只去掉重複）。設定頁永遠依固定順序排：英文依鍵盤 qwerty→asdf→zxcv，標點依 ，。、；：？！，按鍵依 ⎋⇥⇪⇧␣⌫⌦⏎↑↓←→。同樣的字母換了順序，就會被當成另一組紀錄。 |
| `前綴` + `sess` | 簽到資料（班級座號碼、名字、輸入法檢測過了沒、正在練哪一組），關掉再打開時接著練 |

- 示範模式不讀也不寫這些鍵。
- 老師面板的「清除這台電腦的紀錄」：刪掉所有用這個主題前綴開頭的鍵。

### 已確認（老師 2026-11-08）
- **名字可以存在學生電腦的 localStorage**（`前綴sess`），這樣學生不小心關掉網頁，紀錄也不會全部消失。名字**不可以**存到 GitHub 或任何公開網頁。
  - 已改正：`nm=1` 那一行的程式註解（2026-11-08）。

### `end` 沒給的時候（2026-11-09 起）
- 每個有開的關卡都過關，關卡選單才出現「領取獎狀」按鈕，也會自動跳出獎狀。「過關」的算法見 docs/decisions.md。
- 改以前：沒給 `end` 時，11:50 起就能領。
- 老師在設定頁勾「全部關卡都過關才能領獎狀」時，產生的連結就不帶 `end`。

---

## 三、學生遊戲頁：鍵盤小勇士（舊版，3 頁）

`keyboard-w1.html`、`keyboard-w2.html`、`keyboard-w3.html` 三個檔案只差 `<title>` 和程式裡的 `VERSION` 那一行。

| 檔案 | `<title>` | VERSION.id |
|---|---|---|
| keyboard-w1.html | 鍵盤小勇士（第 1 週・左側鍵） | `w1` |
| keyboard-w2.html | 鍵盤小勇士（第 2 週・右側鍵） | `w2` |
| keyboard-w3.html | 鍵盤小勇士（第 3 週・混合練習） | `w3` |

### 網址參數（這三頁不是用 key=value，而是**整個 hash 剛好等於**某個字）

| 寫法 | 意思 | 沒給時 |
|---|---|---|
| `#demo` | 老師示範模式：全部打開，紀錄不保存 | 一般模式 |
| `#student` | 發給學生的單頁練習：隱藏「回上頁／回目錄」 | 有回上頁、回目錄 |
| （不是參數）**檔名含「示範」** | 也會進入示範模式，而且一直保持示範模式 | — |

### 哪個設定頁產生、範例網址
- 沒有設定頁會產生這三頁的參數。keyboard.html 的「舊版：第 1～3 週網頁」區塊只放了不帶參數的一般連結：
  - `https://wego10129.github.io/info-class/keyboard-w1.html`
- 頁面說明寫「已經發給學生的舊連結還可以用」，所以這三個網址要保留。

### localStorage 鍵名
| 鍵名 | 內容 |
|---|---|
| `kbhero6_w1`、`kbhero6_w2`、`kbhero6_w3` | 各週的練習進度 |

- 老師的「清除這台電腦的紀錄」：把這一週的鍵重設成空白紀錄。程式註解寫明，示範模式中按也會清掉。

### 已確認（老師 2026-11-08）
- **`#student`、`#demo` 都要繼續支援。**
- **紀錄存在 localStorage，關掉瀏覽器還在**，這樣學生不小心關掉也不會不見。只有電腦還原（或老師按清除）時才會刪掉。
  - 已改正：「進度（只存這個分頁；關掉分頁就清空）」這段程式註解（2026-11-08）。
- 待辦（新功能，不在第 0 階段做）：這三頁也要比照其他遊戲，**先在教師設定頁設定**（例如班級座號範圍），再產生學生連結或下載捷徑檔來派發。
  - 現在的 keyboard.html 沒有產生 `#student` 的地方。程式註解提到的「給學生的連結」在現在的程式裡找不到。

---

## 四、學生遊戲頁：重要語詞訓練

### words.html
- `<title>`：重要語詞訓練（有 `goal` 時改成「目標・重要語詞訓練」）

### 網址參數

| 參數 | 值 | 意思 | 沒給時 |
|---|---|---|---|
| `sets` | 逗號分開，例 `num,city` | 題庫：`num` 國字數字（小寫）、`big` 國字數字（大寫）、`city` 台灣縣市、`addr` 學校地址。看不懂的代號，或沒有題目的題庫，會略過；順序固定為 num→big→city→addr。**有給 `sets`＝從設定頁打開**，會隱藏麵包屑和「回上頁」。 | `num,city`，有回上頁 |
| `addr` | 用 `\|` 分開，例 `臺北市\|大安區` | 學校地址的題目。每題最多 30 字，最多 12 題。 | 沒有地址題（`sets` 有寫 `addr` 也會被略過） |
| `tw` | （舊連結用） | 已不再有作用（2026-11-08）：不論有沒有 `tw`，一律要打「臺」。改以前：`tw=0`＝一定要打「臺」，沒給＝都算對 | 一律要打「臺」 |
| `goal` | 文字（最多 20 字） | 練習目標，當作網頁標題 | 標題「重要語詞訓練」 |
| `end` | `HH:MM` | 領取獎狀的時間 | 每個題庫的第二關都拿到 1 顆星以上才能領（2026-11-09 起；以前是隨時可以領） |
| `classes` | 數字 1～30 | 班級可以填到幾班 | 20 |
| `seats` | 數字 1～60 | 座號可以填到幾號 | 40 |
| `nm` | `1` | 簽到時可以輸入名字 | 不能輸入名字 |
| `demo` | 任何值 | 老師示範模式，紀錄不保存 | 一般模式 |

### 哪個設定頁產生、範例網址
- words-setup.html → words.html。設定頁一定會給 `sets`；`end` 平常會給，老師勾「全部題庫都過關才能領獎狀」時不給；`addr`（有選地址才給）、`tw=0`（取消「台、臺都算對」才給）、`goal`、`classes`、`seats`、`nm`、`demo` 有需要才給。
  - `https://wego10129.github.io/info-class/words.html#sets=num%2Ccity&end=11%3A50`
  - 有地址、台臺分開算（地址只是示意）：`https://wego10129.github.io/info-class/words.html#sets=num%2Caddr&addr=%E8%87%BA%E5%8C%97%E5%B8%82%7C%E5%A4%A7%E5%AE%89%E5%8D%80&tw=0&end=11%3A50`

### localStorage 鍵名（前綴 `words1_`）
| 鍵名 | 內容 |
|---|---|
| `words1_num`、`words1_big`、`words1_city` | 各題庫的練習紀錄 |
| `words1_addr_` + 地址題目用 `\|` 接起來的前 60 個字 | 地址題的紀錄（不同學校的地址分開記） |
| `words1_sess` | 簽到的班級座號碼和名字（2026-11-09 起也存名字；以前只存號碼） |

- 示範模式不寫入紀錄。

### 已完成（2026-11-08）
- **`tw`（台／臺）：一律要打正式寫法「臺」**，「台」不算對。設定頁拿掉「台、臺都算對」的勾選。
  - 改以前：沒給 `tw`，或 `tw` 不是 `0`＝「台」「臺」都算對；`tw=0`＝一定要打「臺」。設定頁的勾選預設是勾的。
  - 改了以後：不論網址有沒有 `tw`，都一定要打「臺」。舊連結裡的 `tw=0` 照樣可以開，結果相同；沒有 `tw` 的舊連結會從「都算對」變成「一定要打臺」，這是老師決定的改動。
  - words.html 開頭的註解、words-data.js 的註解已一起改正。設定頁不再產生 `tw`。

---

## 五、教師設定頁

教師設定頁本身**不讀網址參數**（levels.html 除外）。它們的工作是產生學生網址（見上面各節），並用 sessionStorage 暫存表單。

| 檔案 | `<title>` | 產生哪一頁的網址 | sessionStorage 鍵名 |
|---|---|---|---|
| typing-setup.html | 英文打字・教師設定 | typing-ninja.html | `setup_en`（表單）、`lvsel_en`（讀 levels.html 選好的關卡） |
| punct-setup.html | 標點符號・教師設定 | punctuation.html | `setup_punc`、`lvsel_punc` |
| keyboard.html | 重要按鍵練習・教師設定 | keyboard-hero.html | `setup_key`、`lvsel_key` |
| words-setup.html | 重要語詞訓練・教師設定 | words.html | `setup_words` |

localStorage：這四頁都沒有用。

### levels.html
- `<title>`：關卡安排・教師設定（打開後由程式改成「關卡安排・英文打字」這類名稱）
- 網址參數：

| 參數 | 值 | 意思 | 沒給時 |
|---|---|---|---|
| `kind`（放在 `#` 後面） | `en`／`punc`／`key` | 要安排哪一個主題的關卡 | `en` |

- 由哪裡連過來：typing-setup.html → `levels.html#kind=en`；punct-setup.html → `levels.html#kind=punc`；keyboard.html → `levels.html#kind=key`
- sessionStorage：`lvsel_` + kind（例 `lvsel_en`）。按「完成」時寫入選好的 `lv` 文字（和預設一樣就寫空字串），然後回到該主題的設定頁。
- localStorage：沒有

---

## 六、資料檔

不是頁面，但頁面靠它們解讀網址參數，改的時候要注意：
- **levels-data.js**（window.LEVELS）：`lv` 參數的關卡代號、級數代號。改代號會讓舊的 `lv=` 連結失效。
- **words-data.js**（window.WBANK、WORDER）：`sets` 參數的題庫代號。改代號會讓舊的 `sets=` 連結失效，也會讓 `words1_` 開頭的紀錄對不上。
