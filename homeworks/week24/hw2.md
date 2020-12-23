## Redux middleware 是什麼？

Middleware 就是中介軟體，主要功能是在執行一個動作的中間去做 middleware 所指派的其他動作，許多框架裡都可以看到他的應用。

在 Redux 資料流裡，當某些事件發生（如：按下按鈕），便會依照 code 去 dispatch 一些 action，action 會傳送給 store，store 內的 reducer 會接收這個 action 以及當前的 state，並產生新的 state。若 state 改變，則會根據新的 state 去 re-render 畫面。

而 redux middleware就是可以在 action 被指派後，讓這個 action 先進到 middleware 去做額外的處理（如：call API），拿到資料或做完轉換後，會產生給 reducer 的 action，進而產生新的 state。Redux thunk 就是一個有名的 redux middleware。

官網有精美的動畫：
![](https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

---

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR（Client Side Render）和 SSR（Server Side Render）的最大差別，顧名思義在於第一次 render 的結果是在哪邊產生的。

CSR 的網頁載入時畫面是空白的，等到 JavaScript 被載入後，才會由 React 去判斷要將什麼 mount 到 DOM 上，以及 call API 去獲取資料，進而 render 出畫面。SSR 則是會在 server 端就將所需要的資料都拿到了，當網頁載入時直接把完整的資料回給使用者即可。

也因為 CSR 是在 browser 才透過 JavaScript 動態產生資料的，因此檢視原始碼時會看不到資料，進而影響 SEO；SSR 則因為是在 server side 就拿到資料了，所以 SEO 佳。

SSR 因為不用等到 JavaScript 被載入後才開始 render，call API 等等動作也是在 server side 就完成了，因此使用者第一次進入網站看到畫面的時間會比 CSR 快，client 端負擔也會比較小。

列出 CSR 與 SSR 的差別後，我們可以知道為了要增進 SEO，降低使用者請求網頁到看到網頁之間的時間，以提升使用者體驗，會是需要 SSR 的主要原因。

---

## React 提供了哪些原生的方法讓你實作 SSR？

SSR 的原理是在 sever 端就先將 component 轉換成 html string，當使用者發出 request 的時候返回，因此 React 提供了一個叫 renderToString 的方法，可以將 React element render 成 html string。

使用了這個方法之後，成功 render 出網頁，在檢視原始碼時也可以看到相對應的內容，但有個問題是他不會動作。renderToString 並不會幫我們處理 event listener 的程式碼。因此還會需要用到 hydrate 這個方法，在已經有 server 端 render 的 node 上呼叫 hydrate，React 會保留這個 node 並且附上事件處理。

藉由這兩個 React 提供的方法，便可以實作 SSR。

---

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

- **prerender**
他會幫你起一個 server，開瀏覽器去訪問你的網站，訪問完拿到資料的結果儲存下來，當有搜尋引擎來的時候，把存好的結果丟給他。

- **Next.js**
是一個 React 的框架，這個框架提供了 isomorphic SSR 的 solution，只要將需要的頁面放在 pages 資料夾下，便可以完成路由。另外，在分頁裡寫的 function 會在 Next.js 在 server side 執行的時候便會幫你執行，因此可以在這裡先去 call API 取得資料。

- **Razzle**
他有自己的 CLI，就像是 CRA 一樣（create-react-app），非常輕易的就可以設置完成。稍微看了一下，似乎很簡單的就可以建立出 SSR 的網站，且可以在許多框架下例如：React, Vue, Angular 等等使用，但討論度好像不太高？

- **Gatsby**
Gatsby 是靜態網頁生成器（SSG, Static Site Generator），是一套把 React、React-Router、Webpack、Babel、GraphQL 都幫你包好的系統，他可以將我們的程式碼在建立的時候，生成一個一個的 html，是一個讓你能快速地打造網站又顧好 SEO 的 Solution。
