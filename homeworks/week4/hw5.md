## 請以自己的話解釋 API 是什麼
當我們在進行資料交換時，只要依據對方提供的格式，填入指定的資料，就可以得到相對應的資料，而讓你填入指定的地方就是 API。

例如你去銀行辦信用卡，承辦行員會要你在紙上把所有需要的資訊填上，行員透過紙上的內容幫你處理辦卡的細節，a few moments later 之後，信用卡就會出現在你手上了，而這張你填的紙就是 API，儘管你不知道（也不用知道）行員處理的過程，但你只要按照表格上的提示把資料填入，你就可以拿到你要的東西（信用卡）。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
* 304 Not Modified
當你第一次進入某個網站時，我們便會利用 Cache 把資料存起來，這樣下次造訪同個網站時，就可以直接使用 Cache 的檔案，而不用重新發送 request。
但如果你再次造訪網站時，發現 Cache 已經過期了，便會發 request 去問 server，這個檔案在過期後還有更新嗎。假設沒有更新，server 就會回 304，代表你可以繼續用這個 Cache。

* 401 Unauthorized
表示驗證（Authentication）未通過，可能是提供了無效的帳號密碼等等。

* 403 Forbidden
表示沒有權限（Authorization），你提供的資料通過了驗證，server 知道你是誰了，但你沒有權限進來。

* 418 I’m a teapot
因為看到這個覺得很有趣，所以決定寫第四個XD
418 是來自 1998 年愚人節的一份文件（RFC 2324），表示如果你發一個泡咖啡的 request 給茶壺時，他便會返回這個 418 狀態碼，告訴你不要用茶壺泡咖啡。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

**Base URL: https://iamfoodie.com**
| 說明 | Method | Path | Parameters | Example |
| ---- | ---- | ---- | ---- | ---- |
| 回傳所有餐廳資料 | GET | /restaurants | _limit:最大回傳資料數量，Default:20，Maximum:1000 | /restaurants?_limit=10 |
| 回傳單一餐廳資料 | GET | /restaurants/:id | 無 | /restaurants/66 |
| 新增餐廳 | POST | /restaurants | name: 店名 |	無 |
| 刪除餐廳 | DELETE | /restaurants/:id | 無 | 無 |
| 更改餐廳 | PATCH |	/restaurants/:id | name: 店名 | 無 |