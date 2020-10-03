## 題目：
```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

1. 執行第一行 `console.log(1)`，將`console.log(1)`放到 call stack
執行，**印出 1**，`console.log(1)`從 call stack 退出

2. 執行第二行`setTimeout(() => {console.log(2)}, 0)`，將`setTimeout(() => {console.log(2)}, 0)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(2)}, 0)`從 call stack 退出
`setTimeout(() => {console.log(2)}, 0)` 經過 0ms後，進到 task queue 等待

3. 執行第五行 `console.log(3)`，將`console.log(3)`放到 call stack
執行，**印出 3**，`console.log(3)`從 call stack 退出

4. 執行第六行`setTimeout(() => {console.log(4)}, 0)`，將`setTimeout(() => {console.log(4)}, 0)`放到 call stack
因 setTimeout 屬於 Web API，便會告知瀏覽器開 thread 計時
結束執行`setTimeout(() => {console.log(4)}, 0)`從 call stack 退出
`setTimeout(() => {console.log(4)}, 0)` 經過 0ms後，進到 task queue 等待

5. 執行第九行 `console.log(5)`，將`console.log(5)`放到 call stack
執行，**印出 5**，`console.log(5)`從 call stack 退出

6. Event loop 發現 call stack 為空
將 task queue 中的 `() => {console.log(2)}`丟到 call stack 中
執行`console.log(2)`，將`console.log(2)`放到 call stack
執行，**印出 2**，`console.log(2)` 從 call stack 退出
`() => {console.log(2)}` 從 call stack 退出

7. Event loop 發現 call stack 為空
將 task queue 中的 `() => {console.log(4)}`丟到 call stack 中
執行`console.log(4)`，將`console.log(4)`放到 call stack
執行，**印出 4**，`console.log(4)` 從 call stack 退出
`() => {console.log(4)}` 從 call stack 退出

8. task queue & call stack 皆清空，程式結束

## console 輸出
```
1
3
5
2
4
```
