## 題目：
```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

1. 初始化，建構 globalEC，因為不是 function 所以建立 VO
因為有宣告 a，所以去 VO 裡面新增一個屬性叫做 a 並初始化成 undefined
發現有 function fn，所以也去 VO 裡面新增一個屬性 fn，值為指向 function 的指標
因為 global 有 function，所以會建立一個隱藏的屬性 `[[Scope]]`
```
globalEC: {  
  VO: {
    a: undefined,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

2. globalEC 初始化結束後，逐行執行
執行第一行，a 賦值為 1
```
globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

3. 執行第十六行 `fn()`，執行 function fn
進入 function fn，開始初始化，建構 fnEC 並建立 AO
檢查是否傳入參數，否
在 AO 裡新增屬性 a 並初始化成 undefined；因為 AO 裡已有 a，對於再次宣告忽略
在 AO 裡新增屬性 fn2，值為指向 function 的指標
因為 fn 內有 function，所以會建立一個隱藏的屬性 `[[Scope]]`
```
fnEC: {  
  AO: {
    a: undefined,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

4. fnEC 初始化結束後，逐行執行
執行第三行 `console.log(a)`，根據 scopeChain 先在 fnEC.AO 中尋找，找到 a，值為 undefined
**印出 undefined**
```
fnEC: {  
  AO: {
    a: undefined,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

5. 執行第四行，a 賦值為 5
執行第五行 `console.log(a)`，根據 scopeChain 先在 fnEC.AO 中尋找，找到 a，值為 5
**印出 5**
```
fnEC: {  
  AO: {
    a: 5,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

6. 執行第六行 `a++`，a 值為 6
```
fnEC: {  
  AO: {
    a: 6,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

7. 執行第八行 `fn2()`，執行 function fn2
進入 function fn2，開始初始化，建構 fn2EC 並建立 AO
檢查是否傳入參數，否
在 AO 裡沒有 function & 宣告，不做事
```
fn2EC: {  
  AO: {
    
  },
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {  
  AO: {
    a: 6,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

8. fn2EC 初始化結束後，逐行執行
執行第十一行 `console.log(a)`，根據 scopeChain 先在 fn2EC.AO 中尋找，沒找到
往上找 fnEC.AO，找到 a，值為 6
**印出 6**

9. 執行第十二行 `a = 20`，根據 scopeChain 先在 fn2EC.AO 中尋找，沒找到
往上找 fnEC.AO，找到 a，值改為 20
執行第十二行 `b = 100`，根據 scopeChain 先在 fn2EC.AO 中尋找，沒找到；往上找 fnEC.AO，沒找到；往上找 globalEC.VO，也沒找到
如果在嚴格模式下，會返回 ReferenceError: b is not defined 錯誤
這邊假定非嚴格模式，那 global scope 就會把 b 加上去並且設定為 100
```
fn2EC: {  
  AO: {
    
  },
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {  
  AO: {
    a: 20,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

10. Function fn2 執行完畢，退出
執行第九行 `console.log(a)`，根據 scopeChain 在 fnEC.AO 中尋找，找到 a，值為 20
**印出 20**
```
fnEC: {  
  AO: {
    a: 20,
    fn2: func
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain

globalEC: {  
  VO: {
    a: 1,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

11. Function fn 執行完畢，退出
執行第十七行 `console.log(a)`，根據 scopeChain 在 globalEC.VO 中尋找，找到 a，值為 1
**印出 1**
```
globalEC: {  
  VO: {
    a: 1,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

12. 執行第十八行 `a = 10`，a 的值改為 10
執行第十九行 `console.log(a)`，根據 scopeChain 在 globalEC.VO 中尋找，找到 a，值為 10
**印出 10**
```
globalEC: {  
  VO: {
    a: 10,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

13. 執行第二十行 `console.log(b)`，根據 scopeChain 在 globalEC.VO 中尋找，找到 b，值為 100
**印出 100**
```
globalEC: {  
  VO: {
    a: 10,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]
}

fn.[[Scope]] = globalEC.scopeChain
```

14. task queue & call stack 皆清空，程式結束

## console 輸出
```
undefined
5
6
20
1
10
100
```