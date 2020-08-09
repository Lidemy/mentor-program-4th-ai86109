## 什麼是 Ajax？

Ajax 的全名是 Asynchronous JavaScript and XML，泛指所有非同步和 server 做資料交換的 JavaScript。

這邊的非同步代表執行到這段程式碼時，不會等到接收到 server 回傳的 response，才繼續執行接下來的程式碼，而是可以邊執行邊等。

至於 XML 是因為早期都是利用 XML 這個資料格式去做資料交換，但現在其實常用的是 JSON 格式，但這種資料交換的方式仍然叫做 AJAX。

## 用 Ajax 與我們用表單送出資料的差別在哪？

我們在使用表單送出時，表示我們透過瀏覽器傳送資料，利用你指定的 method 傳到指定的網址去，當 server 將 response 回傳給瀏覽器時，瀏覽器會直接 render 這個 response，比較像是帶著你送出的資料，去到某個頁面的感覺，所以這個做法是會換頁面的。

而 Ajax 則是透過瀏覽器去向 server 發 request，server 回傳 response 給瀏覽器，瀏覽器不做任何事，直接將這個 response 回傳給 JavaScript 做使用。

## JSONP 是什麼？

全名是 JSON with Padding。

利用瀏覽器去呼叫其他網站的 API 時，會受到同源政策的規範，若要跨網域存取資料就要透過 CORS，但其實有些東西是不受同源政策所限制的，像是 <script> 這個標籤。

Server 端可以先寫好一個執行 function，並帶入一個物件參數
```
setData([ { id: 1, name: 'Derek' },{ id: 2, name: 'Peter' } ])
```

在 client 端，再把它引入進來
```
<script src=“https://test.com/usescriptapi.js”></script>
```
這樣剛剛那個執行 function 和物件參數都會被引入進來

再寫一個 function 接收
```
function setData(userapi){ console.log(users) }
```
就可以不受 same origin policy 的影響引入資料了，這種方法就是 JSONP。


## 要如何存取跨網域的 API？

這邊就要利用另一個規範，CORS（Cross-Origin Resource Sharing）。

這個規範說如果要跨網域存取的話，server 必須在 response header 中加上 Access-Control-Allow-Origin，當瀏覽器接收到 response 時，會先檢查  Access-Control-Allow-Origin 的內容有沒有包含這個發這個 request 的 origin，如果有才會讓你拿到這個 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為瀏覽器的同源政策（Same Origin Policy）。

如果你目前的位置和你要呼叫 API 的網站不同源時，瀏覽器一樣會幫你發 request，但會把回傳的 response 擋下，使你無法拿到且獲得錯誤訊息。

之所以在第四週時沒碰到跨網域問題，是因為 runtime 不同的緣故。當時是使用 Node.js，這邊則是使用瀏覽器。