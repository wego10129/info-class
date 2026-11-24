# 打地鼠難度：資料整理（2026-11-24）

> 老師 11/24 要求先記下來，等有空再調整機制。開工時要提醒老師，並打開這份紀錄。
> 標「推論」的是 Claude 依資料推出來的，不是來源直接寫的。

## 一、其他遊戲怎麼設定難度

| 做法 | 誰在用 | 跟我們的關係 |
|---|---|---|
| **看「過關率」調難度**：每 100 次挑戰有幾次成功，加上真人試玩和上線後的數據一起看；上線後「測試、調整的循環會一直持續」 | Candy Crush（King）[1][2] | 一直要調整是正常的；差別在大公司是看數字調，我們目前是看感覺調 |
| **門檻是試玩算出來的**：星星門檻取自設計師多次試玩、用某種打法拿到的平均分數；花在調星星分數的時間比做關卡還多 | Angry Birds [3] | 我們的門檻是用流星雨的成績推算的，沒有實際測量過 |
| **分成好幾個等級，老師可以調**：每課 1～5 顆星，預設 1 顆星就能進下一課，老師可以改最低要幾顆星；Typing.com 預設正確率 95% 給 3 顆星、90% 給 2 顆星，老師可以改 | TypingClub [4]、Typing.com [5] | 「過關」和「打得很好」分開算；門檻交給老師依班級調整 |
| **依年級訂目標**：常見的算法是每分鐘字數（WPM）＝ 5 × 年級（三年級 15、四年級 20、五年級 25、六年級 30） | 美國威斯康辛州教育廳 [6]、各學區 [7] | 三年級和六年級的目標差 2 倍，我們卻用同一個門檻 |
| **落後的人拿到比較強的道具**：道具好壞依照和第一名的距離決定，領先的人只拿到比較弱的道具 | Mario Kart [8][9] | 我們的道具人人都一樣，結果最會玩的學生最會用大槌子 |
| **難度和能力要配合**：太難會焦慮、太簡單會無聊；每個人能力差很多，所以業界很依賴試玩 | 心流理論與遊戲設計文章 [10] | 一個班級的程度差距很大，只用一個門檻很難讓每個人都剛好 |
| **答對約 85% 時學得最快**；作者提醒這是在「答案只有對和錯」的簡單作業上得到的結果，不能直接拿來訂分數標準 | Wilson 等人 2019 [11] | 只能當參考方向，不能直接拿來訂門檻 |

另外：遊戲有大改動時，以前收集的數據可能就不能用了 [12]。

## 二、為什麼我們的門檻一直要調整

1. **門檻從一開始就是推算的**（事實）：程式註解寫的是用流星雨大師的成績推算「每個字母約 2 秒」，再取三分之二，得到 12／15／15，「試玩後再調」。到現在一直沒有拿到學生實際敲到幾隻的分布。
2. **規則改了很多次**（事實）：decisions.md 裡跟打地鼠有關的決定，11/10 有 4 項、11/12 有 1 項、11/17 有 5 項、11/18 有 3 項、11/24 有 2 項。道具來源改了 3 次（從洞裡冒出來 → 先存起來 → 換小關時選），每一次都會改變學生能敲到的隻數。
3. **11/24 兩個修改同一天一起上線**（事實）：「放大丸隔一次才能選」（PR #58）和「高手、大師門檻 20 隻」（PR #59）一起上線。下次試玩如果覺得太難，分不出是哪一個造成的。
4. **門檻剛好落在「分數掉最快」的地方**（實測）：用機器人實際玩 60 秒，模擬「每敲一隻要花幾秒」：

   | 每敲一隻花 | 高手（不用道具） | 大師（不用道具） | 大師（用大槌子 2 次） |
   |---|---|---|---|
   | 1 秒 | 30 | 30 | — |
   | 1.5 秒 | 25 | 35 | — |
   | 2 秒 | 26 | 23 | 27 |
   | 2.5 秒 | 18 | 14 | 18 |
   | 3 秒 | 13 | 9 | 13 |

   - 從每隻 2 秒到 3 秒，敲到的隻數從二十幾隻掉到 9～13 隻。20 隻的門檻剛好在這段中間，學生只要快一點或慢一點，就會從「很簡單」變成「過不了」。
   - 在慢的學生那一段（每隻 2.5～3 秒），用 2 次大槌子大約多 3～4 隻。以前一局能用 4 次，多出來的應該更多（推論）。
   - 快的學生（每隻 1～1.5 秒），高手和大師的成績差不多，大師不一定比較難。這是因為大師同時冒出來的地鼠比較多。
   - **限制**：每種情況只跑了 1 次，地鼠出現的位置是隨機的，所以數字會跳動（例如大師 1.5 秒反而比 1 秒多）；機器人沒有「找字母」的時間，和真實學生不一樣。只能看出大方向，不能直接拿來訂門檻。
5. **同一個門檻要給三到六年級用**（推論）：各年級的打字目標差 2 倍 [6][7]，同一個門檻不可能讓每個年級都剛好。

## 三、建議做法（供老師決定）

1. **先收集一次真實分數**：下次上課，請學生打開「📈 我的紀錄」，老師在紙上記下每人在高手、大師最好敲到幾隻。不用寫名字，所以不會有學生資料上網。只要有 20～30 個數字，就能看出分布。
2. **先決定「希望全班幾成的人能過關」，再從分布算出門檻**（King 用過關率的做法）。要訂幾成是教學上的決定，目前【資料不足，無法確認】。
3. **一次只改一件事**：改完之後先收集一堂課的分數，再決定下一步。
4. **可以考慮把「過關」和「高手」分開**：門檻訂低一點讓大部分學生能過關，另外用 ★★★ 獎勵敲得多的學生（參考 Angry Birds、TypingClub）。這會改變畫面和規則，要老師同意才做。如果要讓老師在設定頁自己調門檻，會動到網址參數，依規定一定要先問老師。
5. **可以考慮讓道具多幫助落後的學生**（參考 Mario Kart）：例如只有進度比較慢的時候才能選放大丸。這只是一個想法，要不要做由老師決定。

## 來源
1. [How AI helps push Candy Crush players through its most difficult puzzles（NBC 轉載）](https://www.nbcnewyork.com/news/national-international/candy-crush-ai-puzzles/6259551/)
2. [How King defines a 'good' Candy Crush Saga level](https://mobilegamer.biz/how-king-defines-a-good-candy-crush-saga-level-and-why-it-constantly-prunes-the-bad-ones/)、[Crafting Candy Crush's difficulty](https://www.pocketgamer.biz/crafting-candy-crushs-difficulty-blockers-level-design-ai-and-the-complexity-staircase)
3. [Exclusive: The making of an Angry Birds level（Pocket Gamer）](https://www.pocketgamer.com/angry-birds/exclusive-the-making-of-an-angry-birds-level/)
4. [TypingClub：Minimum star requirement](https://login.typingclub.com/docs/student-management/track-progress/minimum-star-requirement.html)
5. [Typing.com：What Are the Stars at the End of Each Screen?](https://support.typing.com/en/articles/9049793)、[Can I Set/Change Typing Benchmarks?](https://typingcom.helpscoutdocs.com/article/230-can-i-set-change-typing-benchmarks)
6. [Wisconsin DPI：Elementary Keyboarding](https://dpi.wi.gov/bit/standards/elementary-keyboarding)
7. [Typing.com：WPM / Averages Grade Level](https://support.typing.com/en/articles/9045953)、[Jeffco Keyboarding Expectations](https://sites.google.com/jeffcoschools.us/powderhorntech/keyboard-expectations)、[Wauwatosa Grades 3-5](https://sites.google.com/wauwatosa.k12.wi.us/elementarylibraries/keyboarding/3rd-5th-grade)
8. [Mario Kart 8 item probability distributions（Mario Wiki）](https://www.mariowiki.com/Mario_Kart_8_item_probability_distributions)
9. [Mario Kart Tour's Rubber-Banding（Game Design Post）](https://medium.com/game-design-post/mario-kart-tours-rubber-banding-is-at-odds-with-its-monetisation-1f5b43909348)
10. [Cognitive Flow: The Psychology of Great Game Design（Game Developer）](https://www.gamedeveloper.com/design/cognitive-flow-the-psychology-of-great-game-design)、[Chen, Flow in Games](https://khoury.northeastern.edu/~lieber/courses/csu670/f08/materials/p31-chen-flow-in-games.pdf)
11. [Wilson et al. (2019) The Eighty Five Percent Rule for optimal learning](https://pmc.ncbi.nlm.nih.gov/articles/PMC6831579)
12. [How do we know if a game is balanced?（DEV Community）](https://dev.to/sam_novak_574b07811e18495/how-do-we-know-if-a-game-is-balanced-2i3l)
