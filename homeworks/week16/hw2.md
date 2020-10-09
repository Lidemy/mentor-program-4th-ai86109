## 題目：
```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. 進入 for 迴圈，初始化，建構 globalEC
```
globalEC: {  
  VO: {
    i: undefined
  },
  scopeChain: [globalEC.VO]
}
```

2. 進入 for 迴圈，執行第一行，設定變數 i 為 0，檢查 i 是否小於 5，是，繼續執行，開始進入第一圈迴圈
```
globalEC: {  
  VO: {
    i: 0
  },
  scopeChain: [globalEC.VO]
}
```

3. 執行第二行 `console.log('i: ' + i)`，將`console.log('i: ' + i)`放到 call stack
執行，印出 **i: 0**，`console.log('i: ' + i)`從 call stack 退出

4. 執行第三行`setTimeout(() => {console.log(i)}, i * 1000)`，將`setTimeout(() => {console.log(i)}, i * 1000)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(i)}, i * 1000)`從 call stack 退出
`setTimeout(() => {console.log(i)}, i * 1000)`等待 0*1000 ms後，進到 task queue 等待

5. 第一圈迴圈結束，執行第一行，i++，i 為 1，檢查 i 是否小於 5，是，繼續執行，開始進入第二圈迴圈
```
globalEC: {  
  VO: {
    i: 1
  },
  scopeChain: [globalEC.VO]
}
```

6. 執行第二行 `console.log('i: ' + i)`，將`console.log('i: ' + i)`放到 call stack
執行，印出 **i: 1**，`console.log('i: ' + i)`從 call stack 退出

7. 執行第三行`setTimeout(() => {console.log(i)}, i * 1000)`，將`setTimeout(() => {console.log(i)}, i * 1000)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(i)}, i * 1000)`從 call stack 退出
`setTimeout(() => {console.log(i)}, i * 1000)`等待 1*1000 ms後，進到 task queue 等待

8. 第二圈迴圈結束，執行第一行，i++，i 為 2，檢查 i 是否小於 5，是，繼續執行，開始進入第三圈迴圈
```
globalEC: {  
  VO: {
    i: 2
  },
  scopeChain: [globalEC.VO]
}
```

9. 執行第二行 `console.log('i: ' + i)`，將`console.log('i: ' + i)`放到 call stack
執行，印出 **i: 2**，`console.log('i: ' + i)`從 call stack 退出

10. 執行第三行`setTimeout(() => {console.log(i)}, i * 1000)`，將`setTimeout(() => {console.log(i)}, i * 1000)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(i)}, i * 1000)`從 call stack 退出
`setTimeout(() => {console.log(i)}, i * 1000)`等待 2*1000 ms後，進到 task queue 等待

11. 第三圈迴圈結束，執行第一行，i++，i 為 3，檢查 i 是否小於 5，是，繼續執行，開始進入第四圈迴圈
```
globalEC: {  
  VO: {
    i: 3
  },
  scopeChain: [globalEC.VO]
}
```

12. 執行第二行 `console.log('i: ' + i)`，將`console.log('i: ' + i)`放到 call stack
執行，印出 **i: 3**，`console.log('i: ' + i)`從 call stack 退出

13. 執行第三行`setTimeout(() => {console.log(i)}, i * 1000)`，將`setTimeout(() => {console.log(i)}, i * 1000)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(i)}, i * 1000)`從 call stack 退出
`setTimeout(() => {console.log(i)}, i * 1000)`等待 3*1000 ms後，進到 task queue 等待

14. 第四圈迴圈結束，執行第一行，i++，i 為 4，檢查 i 是否小於 5，是，繼續執行，開始進入第五圈迴圈
```
globalEC: {  
  VO: {
    i: 4
  },
  scopeChain: [globalEC.VO]
}
```

15. 執行第二行 `console.log('i: ' + i)`，將`console.log('i: ' + i)`放到 call stack
執行，印出 **i: 4**，`console.log('i: ' + i)`從 call stack 退出

16. 執行第三行`setTimeout(() => {console.log(i)}, i * 1000)`，將`setTimeout(() => {console.log(i)}, i * 1000)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(i)}, i * 1000)`從 call stack 退出
`setTimeout(() => {console.log(i)}, i * 1000)`等待 4*1000 ms後，進到 task queue 等待

17. 第五圈迴圈結束，執行第一行，i++，i 為 5，檢查 i 是否小於 5，否，退出 for 迴圈
```
globalEC: {  
  VO: {
    i: 5
  },
  scopeChain: [globalEC.VO]
}
```

18. Event loop 發現 call stack 為空
將 task queue 中的第一個 `() => {console.log(i)}`丟到 call stack 中並執行
執行`console.log(i)`，將`console.log(i)`放到 call stack
**印出 5**，`console.log(i)` 從 call stack 退出
`() => {console.log(i)}` 從 call stack 退出

19. Event loop 發現 call stack 為空
將 task queue 中的第二個 `() => {console.log(i)}`丟到 call stack 中並執行
執行`console.log(i)`，將`console.log(i)`放到 call stack
**印出 5**，`console.log(i)` 從 call stack 退出
`() => {console.log(i)}` 從 call stack 退出

20. Event loop 發現 call stack 為空
將 task queue 中的第二個 `() => {console.log(i)}`丟到 call stack 中並執行
執行`console.log(i)`，將`console.log(i)`放到 call stack
**印出 5**，`console.log(i)` 從 call stack 退出
`() => {console.log(i)}` 從 call stack 退出

21. Event loop 發現 call stack 為空
將 task queue 中的第二個 `() => {console.log(i)}`丟到 call stack 中並執行
執行`console.log(i)`，將`console.log(i)`放到 call stack
**印出 5**，`console.log(i)` 從 call stack 退出
`() => {console.log(i)}` 從 call stack 退出

22. Event loop 發現 call stack 為空
將 task queue 中的第二個 `() => {console.log(i)}`丟到 call stack 中並執行
執行`console.log(i)`，將`console.log(i)`放到 call stack
**印出 5**，`console.log(i)` 從 call stack 退出
`() => {console.log(i)}` 從 call stack 退出

23. task queue & call stack 皆清空，程式結束

## console 輸出
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```