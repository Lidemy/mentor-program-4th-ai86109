## 十六到二十週心得

## 學習心得

這幾週的東西讓我打了好多篇心得，畢竟我真的滿金魚腦的，不趁當下記錄下來真的會忘得滿快的，而且記錄下來除了以後找筆記快很多外，錯的時候也會有人告訴你，真的是好處多多。

十六週了解了很多 JavaScript 的核心運作，算是 input 很多，output 也很多的一週，體感時間大概是兩週。

十七、十八週則主要分為兩個面向，第一個是學習 Express 這個 Node.js 的後端框架，雖然剛開始改寫需要一些時間適應，ORM 剛開始寫的時候也因為之前寫習慣 SQL，反而覺得很煩，但適應之後就會覺得用這些寫真的又快又有條理，很讚。

第二個面向則是部署，我是先用 Heroku 部署十七週的作業，有感受到他的方便和強大，所以準備要交十八週作業的時候，原本一個懶癌發作就想直接用 Heroku 最快了，但因為自己已經在進度報告上說了要用自己的主機部署，所以最後心一橫還是硬著頭皮來做了。但很快就開始卡關，而且卡在很奇怪（簡單）的地方，丟上去問的時候原本已經有被恥笑的打算了，還好大家都滿友善的XD。過了這個奇怪的坎之後，雖然也不是一路順利，但至少都可以冷靜下來慢慢找到問題解決。

這兩週的東西我覺得很重要也很受用，不過是未來要做 side project，或是工作碰到部署的問題，都可以靠自己完成，或是至少有個基礎的概念或方向。

十九週講了產品開發的流程，或者可以說是未來的工作樣貌？雖然因為我還沒想好 final project，所以先跳過了作業，但我真的滿喜歡這週課程的，也希望未來工作上可以有這樣的制度，畢竟我對於有脈絡的東西接受度才會提高，也才能說服自己做下去。

最後就是本週的網頁優化小測驗拉，原本只想看一下前人的 issue 就過去了，想說之後有空再回來做，但以我對自己的了解這應該不太可能，所以最後還是 fork 下去。花了一些時間在看 Website Performance Optimization 的課程，覺得還好有看欸，看完之後才發現我之前對這塊真的是想得太簡單或想錯了，寫課程筆記的時候覺得有種回到 16 週的感覺，關於網頁優化的紀錄如下。

---

## 網頁優化

看完 [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884) 的課程，更了解瀏覽器接收到 HTML 檔案之後會做的事，透過這些行為也就對於優化會有個大致的想法。

利用 WebPageTest 來分析網頁
![](https://i.imgur.com/N7jl4QI.png)
這是尚未優化前的[網頁報吿](https://www.webpagetest.org/result/201023_Di60_031aa94d448e3ec6468d44b6c889796e/)
>可以看到 Core Web Vitals 中的 LCP 高達 14 秒，load 整個網站要花接近 56 秒。

---
## 開始優化
[網站位置](https://ai86109.github.io/lazy-hackathon/)

### 將檔案中的註解刪除
* HTML
index.html 中的註解刪除之後，大小從 25kb -> 18kb
* JS
index.js 中的註解刪除之後，大小從 15kb -> 11kb

### 將 CSS, JS 檔案縮小
* CSS
BootStrap.css 換成 minify 後的版本，192kb -> 160kb
* JS
BootStrap.js 換成 minify 後的版本，132kb -> 63kb
jQuery.js 換成 minify 後的版本，280kb -> 89kb
slick.js 換成引入本地端的 minify 的版本
typed.js 換成引入本地端的 minify 的版本，33kb -> 12kb

### 刪除不會用到的檔案
節省 141kb

## 壓縮圖片
利用 tinyPNG 壓縮圖片，33MB -> 8.6MB

## 將不引入而不會用到的檔案去除
如：Vue.js, Angular.js 等等，做完這一步後 index.html 大小又少了 1kb左右。
.
.
.
做完以上動作後，再來跑一次測試
![](https://i.imgur.com/bAcoc8s.png)
[網頁報吿在此](https://www.webpagetest.org/result/201024_Di8R_ad1f7f58ea6039ec0d2240ff46f369ba/)
>可以看到 LCP 降到 4.4 秒，載入整個網站也降到 16 秒。

---
## 讓 JS 等網頁載入完再執行

因為碰到 JS 會影響 DOM 的建立，所以這邊利用 `async`，將 JS 寫成等網頁載入完再執行。

如：`<script src="./js/index.js" async></script>`
.
.
.
然後再跑一次測試
![](https://i.imgur.com/16qtdAm.png)
[網頁報吿在此](https://www.webpagetest.org/result/201024_DiGM_43f8e9d4d528a9231268cc2be6f6ab63/)
>LCP 降到 4 秒以內了，但載入整個網站的時間沒有變。

---
## 讓圖片延後載入

看了 devtool 發現圖片載入的時間影響滿大的，所以想將圖片延後載入，這邊用的是 [lozad](https://github.com/ApoorvSaxena/lozad.js)。
.
.
.
引入後再跑一次測試
![](https://i.imgur.com/LHoIpKr.png)
[網頁報吿在此](https://www.webpagetest.org/result/201024_DiRK_afa1b19e5cd660b56f4ac0a1f5da3301/)
>LCP 只剩 2.8 秒了！但載入整個網站的時間依然沒有變。

---
這邊其實還有很多可以優化的空間，像是因為有大量的圖片，所以可以用 CSS Sprite 來減少發 request 的次數等，應該會滿有感的，這邊時間不太夠就先 pass 了。

我後來用 minify 壓縮了 HTML, CSS，但反而 LCP 上升到 3 點多，不知為何；另外，我這邊引入 lozad 時沒有用 async，因為如果非同步那網頁已經 render 完，但這支 js 還沒跑完就不會讓圖片延後載入，不知道我這樣思考是不是對的。

跪著看了之前學長姐的 issue，真的覺得獲益良多呀。