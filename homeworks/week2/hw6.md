``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 11 行，呼叫函式 isValid，並帶入參數 [3, 5, 8, 13, 22, 35]
2. 執行第 1 行，設定參數 arr 的值為 [3, 5, 8, 13, 22, 35]
3. 執行第 2 行，設定變數 i 為 0，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第一圈迴圈
4. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
5. 第一圈迴圈結束，跑回第 2 行，i++，i 為 1，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第二圈迴圈
6. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
7. 第二圈迴圈結束，跑回第 2 行，i++，i 為 2，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第三圈迴圈
8. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
9. 第三圈迴圈結束，跑回第 2 行，i++，i 為 3，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第四圈迴圈
10. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
11. 第四圈迴圈結束，跑回第 2 行，i++，i 為 4，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第五圈迴圈
12. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
13. 第五圈迴圈結束，跑回第 2 行，i++，i 為 5，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第六圈迴圈
14. 執行第 3 行，判斷是否 arr[i] 小於等於 0，否
15. 第六圈迴圈結束，跑回第 2 行，i++，i 為 6，檢查 i 是否小於 arr.length，否
16. 執行第 5 行，設定變數 i 為 2，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第一圈迴圈
17. 執行第 6 行，判斷 arr[i] 是否不等於 arr[i-1] + arr[i-2]，否
18. 第一圈迴圈結束，跑回第 5 行，i++，i 為 3，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第二圈迴圈
19. 執行第 6 行，判斷 arr[i] 是否不等於 arr[i-1] + arr[i-2]，否
20. 第二圈迴圈結束，跑回第 5 行，i++，i 為 4，檢查 i 是否小於 arr.length，是，繼續執行，開始進入第三圈迴圈
21. 執行第 6 行，判斷 arr[i] 是否不等於 arr[i-1] + arr[i-2]，是，回傳 invalid
22. 執行完畢

這個 function 在判斷傳入的陣列是否為費氏數列。