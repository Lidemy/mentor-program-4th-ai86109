## 題目：
```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

1. 執行 `obj.inner.hello()`，會呼叫 inner 內的 hello function，執行 `console.log(this.value)`
這裡的 this 是 obj.inner，所以 this.value 就是 obj.inner.value，值就是 2
**印出 2**

2. 執行 `obj2.hello()`，因為 obj2 = obj.inner，所以會呼叫 inner 內的 hello function，執行 `console.log(this.value)`
這裡的 this 是 obj2，所以 this.value 就是 obj.inner.value，值就是 2
**印出 2**

3. 執行 `hello()`，因為 hello = obj.inner.hello，所以會呼叫 inner 內的 hello function，執行 `console.log(this.value)`
這裡的 this 在非嚴格模式且 runtime 為瀏覽器時是 window，在 runtime 為 Node.js 時為 global，所以不論 this 是 window or global，this.value 都是 undefined
**印出 undefined**


## console 輸出
```
2
2
undefined
```