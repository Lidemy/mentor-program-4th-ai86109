## 跟你朋友介紹 Git

『菜哥啊』
「？」
『如果你答應我，之後不再講笑話給我聽我就教你。』
「...」
『那一言為定！』

雖然你已經知道  Git 了，也略懂版本控制，但我還是小小的前情提要一下。

因為你的笑話很多，也有越來越多版本，所以會需要做版本控制。
我們來檢視一下，版本控制可能會需要哪些功能？
1. 出現新版本的時候，開一個新資料夾把檔案最新版檔案放入
2. 不想加入版本控制的就不要放入資料夾
3. 團體協作時，為避免我的v3和你的v3是不同的，以不會重複的版本號命名
4. 因為不是流水號命名，所以有一個文件專門告訴你最新的版本名字
5. 一個列出過去歷史版本名字的文件

**而git只是幫你做以上這些事的程式而已**

## 事前準備
Mac 的使用者只要打開 terminal，輸入 `git --version`，如果版本是 10.9 以上就會自動跳出視窗指引你去安裝。

建立你的第一個版本控制
首先，我們先進到你要做版本控制的資料夾
輸入 `git init`
便會初始化在這個資料夾中創立一個隱藏資料夾 .git

`git status` 可以檢查此資料夾目前版本控制的狀況
如果此時資料夾內沒有檔案，會顯示 nothig to commit
如果內有檔案，這時候你應該會看到分為兩類：
untracked 還未加入版本控制
stage 已加入

好，那我現在要將 `test.js` 加入版本控制
`git add test.js`
加入資料夾test
`git add test/`
我檔案太多想全部加入
`git add .`

移出
`git rm --cached test.js`

經過以上這樣移進來移出去之後，我們也確定好要加入版本控制的檔案了，準備好就可以開始建立我們第一版的版本控制
`git commit -m “跟這個版本有關的敘述”`
這邊 -m 是 message 的意思
commit 完之後，`git status` 會看到狀態和剛剛不一樣，原本等待 committed 的檔案已經消失，表示這些檔案已經 commit 成功。

而出現第二版時，一樣要先將更改的檔案 `git add`，再 `git commit -m “第二版敘述”`，版本控制就是這麼的樸實無華且枯燥。

## 當個時空旅人
經過多次的操作之後，會有許多的版本
我們可以透過 `git log`，去查看歷史紀錄，包含各版本 commit 的編號＆commit message。
`git log --oneline` 則是可以看到簡短的版本

那如果要回到過去版本呢？剛剛在 log 裡面有個版本的編號，先複製下來
`git checkout 編號`，便可以回到那個版本
而要回到最新版本
`git checkout master`

## 加入黑名單
如果我有不想放入版本控制的的檔案，但每次都要手動排除，實在是很麻煩，有沒有辦法把他們都集中管理，有！你可以使用 .gitignore

`touch .gitignore` 建立一個叫 .gitignore 的純文字檔案
接著用 vim 進到裡面，`vim .gitignore`
將想要忽略的檔名寫入

## 修改檔案之後
另外前面說到，如果檔案有修改，這些檔案會回到 staging area （暫存區），此時如想要更新版本，會需要先 add 再 commit，但也可以使用以下合併的 code：
`git commit -am “第二版敘述”`
這個會將在 stage 區的檔案自動 commit，但不包括新的檔案（也就是在 untracked 區的），因此我們在新建一個要加入版本控制的檔案時，第一個動作就是將他 add 進來。
這邊的 a 是 all 的意思

`git diff` 可以看現在檔案和最後一次 commit 之間的差別，也就是哪些檔案是被修改過的。

以上就是在使用 git 時最基本的操作了，菜哥以你中一中的實力，應該易如反掌吧！這邊利用資料夾的概念，再將幾個重點說明一次，可能可以更好理解：
**＃加入版本控制（git add）**→ 把檔案放入 temp 資料夾
**＃新建版本（git commit）**→ 把 temp 資料夾改為版本名稱
**＃切換版本（git checkout）**→ 去到某個資料夾底下

『但為了避免你更新的笑話做到一半，就跑出來見人，朋友越來越少那就不好了』
「原來是朋友變少的部分啊（拍手」
『好...那我再教你幾個東西，聽好啊』

從前面基礎知識我們知道，git 可以透過建立新的版本，而有一系列的歷史紀錄可供隨時提取，但這些版本終究還是在同一條線上的，並不會有 branch（分支），但 git 其實是可以做到這件事的，這邊我們就是要來談這個。

## 為什麼我們需要 branch？
試想你現在手上有一個穩定版的專案，老闆要求你開發新功能，而你手腳很快不到一週的時間已經做了 30 % 的功能了，這時候突然出現很嚴重的 bug 需要馬上修正，所以你趕緊把手上專案的 bug 修正，然後發佈出去～蹦！新功能還沒做完卻曝光了。

這也是為什麼我們需要用到 branch 的原因，你的笑話也是。

使用 branch 的功能，穩定版可以持續的開發新功能，而在出現 bug 時只要回到穩定版的檔案開出 branch，便可以放心的 release 出修正版的檔案，待新功能開發完畢後，就可以將兩條線 merge 起來，也就不會被老闆罵了。

## 平行宇宙的誕生
在你第一次 `git commit` 時，這一條路徑就是 master，而當你想創造分支時
`git branch 分支名稱`

建立分支後，可以使用 `git branch -v` 確認目前有哪些 branch，並且查看目前是在哪一條分支下

刪除的話 `git branch -d 分支名稱`

我們現在有了新的分支了，那要怎麼切換過去呢，其實跟剛剛切換版本很像
`git checkout 分支名稱`

## 宇宙合併
當我們把新功能都做完了，想把剛剛的 branch 合併進來該怎麼做
先切換到想被併入的那條線 例如：`git checkout master`
然後 `git merge 分支名稱`
這條 branch 就會被併入 master 內
此時就可以把這條 branch 刪掉（如果想留著也 ok）
`git branch -d 分支名稱`

git 是很智慧的，如果他發現 branch 裡 A 檔案是最新的，而 master 內 B 檔案是最新的，他會在合併後取其最新的部分，但有些狀況他還是沒辦法處理的，例如說你改 A 檔案，他也改 A 檔案，甚至還改了同一行，這時候只能手動去解決這個衝突。

所以當你要合併時發生衝突，系統會告訴你有 conflict，此時你要手動去解決衝突的點，再手動 commit。
`git commit -am “合併的敘述”`

『菜 brother 啊，雖然你現在還沒有名，未來也可能沒有，但為了你可能爆紅我們還是得做點準備』
「什麼準備」
『以後你跟你的六萬人團隊，一百人特助，可能要在雲端上一起發想笑話』
「六萬人團隊...這句話是不是抄誰的啊...」
『我們事不宜遲』
「...」

我們先前提過 git 可以讓大家多人協作，共同開發專案，但要怎麼實現呢？其實多人協作就是大家共用一個 git 的專案，在 git 中被 git 控制的一個專案稱為 repository，所以只要把這個 repository 上傳到網路上，其他人再把他下載下來就可以完成多人協作的目標了。

所以其實可以把 GitHub 想成像是 Google Drive 或是 Dropbox，只是 GitHub 是拿來放 git repository 的地方，也可以說是個讓 git repository 具現化的網站。

那要怎麼放上來呢？

在 GitHub 頁面右上角有個加號 > New repository > 填完資料後 create
這樣你就會有一新的 repository 了
但目前這個 repository 還是空的，所以我可以按照網頁上的指示把檔案加上來

`git remote add origin https://github.com/ai86109/101.git`
`git push -u origin master`
這樣就可以把 local 端的 git repository 成功上傳到 GitHub 上了！

*＊-u可以省略*

## 上傳下載
其實我們剛剛已經講過上傳了，之後如果有任何更新，在 local 端 commit 完成後，就直接 `git push origin master` 即可。

但這樣說有點不精確，如果是 branch 的更新呢？
其實是一樣的，先在 local 端切換到 branch 的那條支線，把原本推上去的 master 改成那條 branch 的名稱就可以了，`git push origin 分支敘述`

可以推上去就可以拉下來

當你的協作夥伴更新github上的檔案後，為了將我們local端的資料更新到最新版，我們可以利用指令將他下載下來，git pull origin master ，如果碰到衝突的時候也是要手動解決後，才能繼續執行。

上傳下載就是這麼的容易

## 神的左手惡魔的右手
那如果我在 GitHub 看到其他人的 repository 覺得不錯，想要抓下來該怎麼做？

誠如標題的暗示，我們可以把它 clone 起來，有兩種方式：
到你想要 clone 的 repository，右邊會有一個 clone or download

(1)直接下載到本機
或是
(2)複製這串URL > `git clone 這串URL` > 就會複製一份到你電腦裡

使用直接下載的這種方式，在本機端可以做任何修改、commit，但無法 push 到你的 GitHub 上，因為你並沒有這個 repository 的權限。

如果真的想改又想放在自己的 GitHub
Github 右上角有 fork，會複製一份到自己的 repository，可以按照剛剛步驟複製到本機，修改過後也可以 push 回 GitHub。

但其實 fork 有一個常見的用法是，貢獻開放原始碼。
你發現有一個專案很有趣，但你覺得可以寫得更好，所以你把它 fork 過來，修改了一番之後 push 回你的 GitHub，然後點選 New pull request，也就是 create 一個 PR 給作者，作者就會在 PR 那邊看到你改的東西。

作者如果覺得這個修改很讚，可以點選 Merge pull request，再 confirm 這個 PR，就會將這個更動 merge 到原本的專案中，在開源界是很常見的貢獻程式碼的方法。


『差不多講完了，這樣你了解了吧』
「那個我」
『那我先走一步摟，電視笑話冠軍』