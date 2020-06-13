## 交作業流程

**寫作業前**
在寫作業之前，需要先開一個當週的 branch，所有修改都在此 branch 進行，以 week1 為例：
新增一個分支：`git branch week1`
切換到分支：`git checkout week1`
就可以開始寫作業了！

**寫作業**
將所有作業都完成，且自我檢討完畢後，將 local 端 commit 至最新版本。
確認現在是在分支上，若不是請切換至分支：`git checkout week1`
若有新增的檔案，請加入版本控制：`git add .`
確認是否已經commit，若還沒請commit：`git commit -am "wk1 finished"`

**交作業**
接著就可以把檔案推送到遠端了。
先設定好遠端推送的位置：`git remote add origin https://github.com/Lidemy/mentor-program-4th-ai86109.git`
Local 端的檔案推送至遠端：`git push -u origin master`
發 PR（將分支 merge 到 master）：
1. 到 GitHub
2. Pull request 分頁
3. Compare & pull request
4. Create pull request

以上完成後，到 Lidemy 的作業列表，按新增作業。
選擇繳交的週次，並將剛剛 PR 的連結複製貼上。
下面兩個選項都打勾確認後送出，即完成交作業動作。

**批改完成後**
等待助教批改完成& merge 完成後，便可將遠端的變更同步到 local 端。
確認是在 master 而非分支上：`git checkout master`
將遠端變更拉下來：`git pull origin master`
最後就可以分支刪掉：`git branch -d week1`
整個寫作業＆交作業流程就完成了！