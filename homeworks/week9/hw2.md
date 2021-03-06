## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR 和 TEXT 的差別就在於能否自行設置長度，另外在查詢速度上，VARCHAR 比 TEXT 快。

VARCHAR 可以設置長度，最大長度為 65535 Bytes，而能儲存多少字是根據字元集（Character Set）來決定。
VARCHAR 會需要 1~2 個 Bytes 儲存值的長度，在欄位允許為 null 的情況下，又會需要 1 Byte 來確認是否為空值。
所以實際上最多能使用的就是 65535 - 2 - 1 = 65532 Bytes。
*65,535 = 2^16 − 1

接者要來考慮字元集，latin1 一個字會使用 1 Byte，所以最多可以輸入 65532 個字；而我們在 phpMyAdmin 裡用的 utf8mb4，一個字則需要 4 Bytes 的空間，所以最多就會是 65532 / 4 = 16383 個字。
*這邊 65535 Bytes 是整個資料表所共用，所以在計算最多可以有多少字時，儲存值的空間、字元集等等都要考慮進去。

TEXT 不能設置長度，最大長度一樣是 65535 Bytes，字元集使用 latin1，最多可以輸入 65535 個字，字元集使用 utf8mb4，最多就是 16383 個字。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 就是存在瀏覽器裡的一些資訊，可以用它來建立 session。

Server 可以傳一個 response header 叫 Set-Cookie 並且帶上 server 指定的值，瀏覽器接受到之後就會自動把這值設定好。之後當我們再訪問同樣網站時，瀏覽器會自動幫我們把符合條件的 cookie 帶上來（如：相同 domain、沒過期），放到傳給 server 的 request 之中。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 留言可以直接被 PHP echo 出來，所以可以直接在這邊寫 HTML 改變網頁結構，或是寫 JS 執行動作。
2. 密碼直接存在資料庫中，所以如果資料庫被入侵，密碼就會外洩，因此應該要對密碼做處理，讓他無法直接被辨識，以增加安全性。
