## 請列出 React 內建的所有 hook，並大概講解功能是什麼

**useState**
他是一個用來儲存 React 裡資料狀態的 hook。

`const [state, setState] = useState(initialState);`
第一次載入時，會將 state 的初始值設為 initialState，之後若要改變 state 的值，則使用 setState 去操作（setState 是非同步的）。
另外，雖然 initialState 除了第一次 render，之後就不會用到了，但每次 re-render 都還是會跑一次，若要避免可以用 Lazy initial state。
```
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

最後，如果 update 的 state 如果和原本的 state 相同，就不會 re-render。

**useEffect**
簡單來說，useEffect 是執行 render 完，畫面也畫完後的動作。
```
useEffect(() => { 
  WebSocket.CONNECTING(userId).subscribe(() => {
	//….. 
  }) 
  return ( 
	WebSocket.disconnect(userId) 
  ) 
}, [userId])
```

以上面這個為例，當畫面畫完時，會執行這個
```
WebSocket.CONNECTING(userId).subscribe(() => {
    //….. 
})
```

但其實 useEffect 還有第二個參數，像這邊的第二個參數是 \[userId]，當 \[userId] 的值改變時會 call 這個 useEffect 再執行一次，建立一個新的 useEffect。

因為要建立一個新的 useEffect，所以會把原本的 useEffect 清掉，在 clean up 原本的 useEffect 到建立之間，我們還可以做事，也就是這邊 return 後面的，會先執行 `WebSocket.disconnect(userId)` ，再建立新的 useEffect。

**useContext**
在子 component 中如果需要用到父 component 的東西，就必須用 props 傳下去，但若 component 有非常多層，就要一層一層向下傳，即使該曾不需要用到此 props，這就是 props drilling。

useContext 便可以解決這個問題，設定好後便可以在想要取值的那層 component 直接拿，不用再使用 props 傳遞。

**useReducer**
是 useState 的替代方案，當需要複雜的 state 邏輯時，useReducer 就很適合。
`const [state, dispatch] = useReducer(reducer, initialState)`

initialState 一樣是 state 的初始值，reducer 是一個 function，用來處理較複雜的邏輯，使用時 call dispatch 並帶入 reducer 可以辨認的 action，便可成功更新 state。

**useCallback**
useCallback 可以回傳一個記憶住的 callback function。

用法和 useEffect 幾乎一樣，同樣可以帶入兩個參數，第一個參數是一個函式，在這個函式中就去執行你真正要呼叫的函式，第二個參數一樣是 dependencies。不同的地方是 useCallback 會回傳一個函式，只有當 dependencies 有改變時，這個回傳的函式才會改變。
```
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

useCallback 可以保存一個 function，避免每次 re-render 時，就又獲得一個新的相同的 function。

**useMemo**
useMemo 和 useCallback 十分相似，他會在 dependencies 沒有改變的情況下，把某個運算的結果保存下來
`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

**useRef**
useRef 可以放一個值，但相較於 state，這個值是可變的，也會一直存在。也因為這個特性，當這個值變動時並不會使畫面 re-render，所以 useRef 很適合去監聽或是存放 uncontrolled components 的值。

**useImperativeHandle**
我們可以透過 useRef 和 ref 去 focus 在某個 component 上，但倘若我們想要focus 在這個 component 的子component 的話，便能使用 useImperativeHandle 和 forwardRef，他可以將 ref 屬性轉交給另一個 component。


**useLayoutEffect**
和 useEffect 的功能很像，差別在於useEffect 是執行 render 完，畫面也畫完後的動作；useLayoutEffect 則是執行 render 完，畫畫面之前的動作。

**useDebugValue**
用於 custom hook 裡，類似 console.log，會在 React devtool 裡顯示你 custom hook 的名稱＆debug 的值。
```
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

---

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

Class component 中 component 的生命週期可以分為三個時期，分別為 `mounting`, `updating`, `unmounting`。

**Mounting**

- **constructor**
component 初始化時被呼叫，如果是 component 的subclass 建立 constructor 的話，應該在任何宣告前 call super(props)

- **getDerivedStateFromProps**
會在component被render前呼叫

- **render**
檢視 props, state 的變化，準備開始繪製 DOM

- **componentDidMount**
在 component 被 mount（加入 DOM tree）之後呼叫

**Updating**

- **getDerivedStateFromProps**
會在component被render前呼叫

- **shouldComponentUpdate**
會在新的 props, state 被接收後，component 被 render 前呼叫

- **render**
檢視 props, state 的變化，準備開始繪製 DOM

- **getSnapshotBeforeUpdate**
會在 render 的 output 被提交給 DOM 時被呼叫

- **componentDidUpdate**
會在 re-render 後馬上被呼叫，此 method 不會在第一次 render 時被呼叫

**Unmounting**

- **componentWillUnmount**
會在ㄧ個 component 被 unmount 和 destroy 後馬上被呼叫


## 請問 class component 與 function component 的差別是什麼？

**State**
在 functional component 中，使用 useState 這個 hook 來更新 state；在 class component 則是在初始化時，使用 this.state 設置 state，並用 this.setState 來更新 state 的值。

**程式碼的可讀性**
functional component 相較於 class component 寫起來更簡潔，也會更易去理解和開發。

**Life cycle**
functional component 使用 hook，class component 則有像是 componentDidMount 的 method 可以使用。

**this 的影響**
functional component 因為 closure 的關係，拿到 state 的值會是動作當下的值；而 class component 的 this.state 則會依據最新的資料去取值。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

uncontrolled 和 controlled component 差別在於『是否資料受到 react 所控制』。Controlled component 就是表單資料由 react 控制；相反的，如果不把表單資料交給 React，而是像過去一樣，選取到該表單元素後，才從該表單元素取出值的這種做法，就稱作 Uncontrolled Components。

在 controlled component 中，顯示的 value 永遠是 state，當要對這個 state 操作時，可以在這個 element 上使用 setState 的方法來更新 state，進而改變 value 的值。

而 uncontrolled component 則通常使用 useRef，並在此 element 上以 ref 來取得 DOM 表單的資料，當表單資料改變時，ref 便可以取得這個值，但不會去使畫面 re-render。