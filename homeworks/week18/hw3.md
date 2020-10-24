## 什麼是反向代理（Reverse proxy）？

在講到反向代理前，要先說什麼是代理伺服器（proxy server）。

平常我們在說發送 request，都是 client 直接發送給 server，而代理伺服器就是出現在 client 和 server 之間的角色，client 會先將 request 送給 proxy server，再由 proxy server 將這個 request 傳給 server端，根據代理伺服器幫助的對象不同又可分為正向代理或是反向代理。

假設我想去一個日本的網站，但這個網站有鎖 IP，只允許日本的 IP 進入，在台灣的我要進去就得透過日本的 proxy server，先發 request 給這個 proxy server，再請他送給這個網站。這種客戶端透過代理伺服器，像遠端網站發 request 的行為就稱為正向代理（Forward Proxy）。

所以反過來說，client 發送 request 之後會先到 server 端設置的 proxy server，再由 proxy server 發給其他的 server，就稱為反向代理。

## 什麼是 ORM？

ORM 是 Object Relational Mapping 的簡稱，這個機制可以將資料庫的資料轉成物件，讓我們對於大部分資料庫的操作可以透過操縱物件去達成（如：建立、新增、更新等）。

優點：
1. 安全性：因為使用 ORM 就不用寫 SQL，而是使用操作物件的方式，可以很容易地解決 SQL injection。
2. 簡化性：基本上比寫 SQL 容易，而且可讀性也增加。
3. 通用性：在不同資料庫之間，SQL 的寫法會略有不同，但若是使用 ORM 就比較能避免這個狀況，大幅提升了重用性。

缺點：
1. 效能：因為還要 ORM 的語句轉成 SQL，所以效能會比較差這可以理解。
2. 對於複雜的查詢較弱：在跨表格的資料計算、查詢上，有時候還是需要使用到 SQL 語句。

參考資料：
https://medium.com/@vicxu/%E8%B3%87%E6%96%99%E5%BA%AB%E8%88%87object-relational-mapping-316cc5aaae7d
https://ithelp.ithome.com.tw/articles/10207752

## 什麼是 N+1 problem？

N+1 problem 是 ORM 中一個常見的問題，之前我們有寫過留言板，可以知道一個 user 可以對應多篇的 post，假設我有一個頁面想要知道 user1 發了幾篇 post 並且列出來，便會去發一個 SQL 去找，假設找到 10 筆返回一個陣列 `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`，因為要列出來所以接下來會執行 10 個 SQL 來查詢。因此如果我第一次查詢到 N 筆資料，最後總共就會執行 N+1 個 SQL，當 N 很大的時候就會拖慢效，這就是 N+1 problem。

參考資料：
https://ithelp.ithome.com.tw/articles/10223194
https://www.the5fire.com/what-is-orm-n+1.html
https://medium.com/@hung_x0x0/orm-n-1-problem-c98e39b9c96
https://yuanchieh.page/posts/2018-07-16_nodejs-event-loop-to-fix-graphql-n-1/
https://ithelp.ithome.com.tw/articles/10207606