## 什麼是 DOM？

DOM 是 Document Object Model 的縮寫。

當我們想在瀏覽器這個執行環境下，利用 JavaScript 去操控 HTML時該怎麼做？

瀏覽器提供了 DOM 這個方法給我們，其中的 O 是 object，意味著它將 html 看成像是物件的階層關係，最上面是 document，往下還有 head 和 body，下面還有div, li 等等，看起來就像是 JavaScript 的物件了，所以既然有了階層關係，JavaScript 就可以利用這個特性去選取、操控 HTML 的標籤、屬性或是內容。

簡而言之，瀏覽器提供了 DOM 這個橋樑，讓我們可以用 JavaScript 去改變畫面上的東西。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞的順序是從根節點開始，往下傳到你所觸發的元素，再往上傳回根節點。

從根節點傳到你所觸發的元素，這個過程就稱為捕獲階段（capturing phase）；而到達目標元素後，往上傳回根節點的過程就稱為冒泡階段（bubbling phase）。


## 什麼是 event delegation，為什麼我們需要它？

Event delegation 就是事件代理，試想有一個電影院，裡面有 100 個位子，如果我想監聽每個位子的狀態，我就要寫 100 個 `eventListener`，雖然可以達成但效率太差了，而且如果這個電影院一直擴建變成 1000 位子呢？監聽就會變得很困難。

所以我們可以利用上一題提到的事件傳遞特性來幫忙，不論哪個位子被觸發，在冒泡階段都會通過電影院，所以我們只要監聽電影院，不管位子有多少，只要有位子被觸發就會被監聽到，這樣的做法就是 event delegation。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

**event.preventDefault()**

取消事件的預設行為。

例如在點下<a>連結後，會被導到指定的網頁，這個行為是預設的。但如果加上了 `event.preventDefault()`，點擊後便不會有作用。

**event.stopPropagation()**

阻止當前事件繼續傳遞（捕捉、冒泡）。

**兩者的差別**

因此可以知道這兩個東西是不一樣的，`preventDefault` 是取消事件的預設行為，`stopPropagation` 是取消事件繼續傳遞。

以一個簡單的結構做範例：

```
<ul>
    <li>
        <a href="http://google.com">我是連結</a>
    </li>
</ul>
```

```
document.querySelector(‘ul’).addEventListener(‘click’, function(e){
   e.preventDefault() 
}, true)
```

我們將事件監聽放在 ul 上，在這裡我們也加上了 `preventDefault`，當我們點擊 a 元素，會進入捕獲階段，當經過 ul 時會被監聽到，並且 call `preventDefault`，但因為我們知道 `preventDefault` 跟事件傳遞無關，所以這個事件會繼續傳遞下去，因此當傳到 `target` 時，我們可以發現這個連結一樣會受到 `preventDefault` 的影響，不會有任何反應。