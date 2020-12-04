## 為什麼我們需要 Redux？

主要是為了解決狀態管理的問題。

當一個狀態可能會被多個元件共用時，就會必須利用 props 將值傳遞下去，但如果這個 component 與父元件中間夾了很多層 component 的話，就會造成 props drilling 的問題。

另外，當將這些 state 以及改變 state 的方法都寫在 component 的時候，很容易讓 component 變得很肥大且不易管理。

Redux 將狀態（state）、app 裡的事件（action），以及 action 的處理器（reducer）拆出來定義和管理，除了程式碼更簡潔外，也解決的了 props drilling 的問題，只需在你需要用到 state & action 的 component 引入即可，不用再一層一層將 props 傳下去。Redux 也提供了他的 devtool 供使用，可以很清楚的看到各個階段的狀態。

---

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一個 JavaScript App 的狀態容器，主要是為了解決狀態管理的問題。

### Redux 的各個元件

**Actions**

Action 表示一個發生在 app 裡的一個事件，這個事件可能會造成 state 的改變。

他是一個 JavaScript 的物件，裡面包括描述這個事件的 type，以及給予這個事件資訊的 payload。
```
const addTodo = {
  type: 'add_todo',
  payload: content,
}

```
但通常會寫成 action creators 的形式，action creators 是一個 function 會回傳 action 物件，這樣我們就不用每次都再寫一次 action 了。
```
const addTodo = (content) => {
  return {
    type: 'add_todo',
    payload: content,
  }
}

```

**Reducers**

Reducer 是 action 的處理器，他是一個可以接收 state 和 action 的 function，決定如何更新 state，並返回新的 state。
```
const initialState = {
  todos: []
}

function todosReducer(state = initialState, action) {
  switch(action.type) {
    case 'add_todo': {
      return {
        ...state,
        todos: [...state.todos, {
          id: todoId++,
          content: action.payload.content,
          completed: false,
        }]
      }
    }
  }
  return state
}

```
Reducer 常使用 if/else, switch/case, loops 等等去判斷邏輯。

**Store**

存放所有 Redux 狀態的地方。

- getState 會回傳現在 state value
`store.getState()`

- dispatch 是唯一可以更新 state 的方法，我們可以傳 action object，或是 call action creators
`store.dispatch(addTodo(content))`

- selectors 可以用來取得部分 state value，可以避免寫重複的邏輯來取值
```
const selectTodoValue = state => state.todos

const currentTodo = selectTodoValue(store.getState())
console.log(currentTodo)

```

### Redux 資料流

分為兩個階段：

**initial step**
- 使用 root reducer 將 store 建立起來，並儲存返回的值為初始的 state。
- 當 UI 第一次被 render 時，會使用這些初始的 state 決定 render 出什麼。

**update step**
- 當某些事件發生（如：按下按鈕），便會依照 code 去 dispatch 一些 action
- Action 會傳送給 store，store 內的 reducer 會接收這個 action 以及當前的 state，並產生新的 state
- Store 會告知 UI，store 已經更新了，這些 UI component 會確認是否會因為這個新的 state 改變
- 若有，則會根據新的state 去 re-render 畫面

![](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

---

## 該怎麼把 React 跟 Redux 串起來？

可以透過 react-redux 這個 library，並利用裡面提供的一些方法來連結 redux 和 react。

**Provider**
通常我們為了要將 store 的資料，讓每一個 component 都可以使用，會選擇將 \<Provider> 包在 root component外面，並且將 store 引入。
```
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

**connect**
前面我們利用 provider 將 store 的資料引入進來之後，就可以在你想要使用 action 或 state 的 component 操作了，而 connect 的功用就是連結 react component 和 redux store。

Connect 有 4個參數可以使用，都是可選的
`function connect(mapStateToProps, mapDispatchToProps, mergeProps, options)`

第一個參數 mapStateToProps 負責提供 state 的值，可以接受兩個參數。
第一個是 store 的 state，第二個則可以傳入 component 的 props。
```
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
})

```

第二個參數 mapDispatchToProps 則負責提供 dispatch，可以接受兩個參數
第一個是 store 的 dispatch，第二個則可以傳入 component 的 props。
```
const mapDispatchToProps = (dispatch, ownProps) => {
  toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
}

```

第三個參數 mergeProps 則可以接收 mapStateToProps 和 mapDispatchToProps 返回的資訊，可以將邏輯寫在這裡讓 component 更乾淨，他可以接受三個參數。
```
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  posts: stateProps.posts,
  removePosts: dispatchProps.removePosts(stateProps.selectedPosts)
});
```

第四個參數是 options，是專門調整效能用的。


可以使用以下這種寫法將你處理好的 state & dispatch 等資訊交給 component 使用。
```
function AddTodo({todos, addTodo}) {
  return (
   //…
  )
}

const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos
  }
}

const mapDispatchToProps =  {
  addTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
```

**hooks**
除了 connect 之外，也可以使用 hooks 的寫法來連結 react component 和 redux store。

- useSelector
可以使用這個 hook 取得 store 的 state
`const todoList = useSelector(state => state.todoList)`

- useDispatch
這個 hook 則是可以 dispatch action 給 reducer
```
const dispatch = useDispatch()

dispatch({
  type: 'ADD_TODOLIST',
  payload: { listName, },
})
```

- useStore
這個 hook 則會回傳像我們剛剛傳入 provider 一樣的 store，可以調用 store 的方法
```
const store = useStore()

store.getState()
```