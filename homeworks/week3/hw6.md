## hw1：好多星星
需要每一圈多輸出一顆星星，所以就用迴圈每圈多加一顆星星到 stars 即可，沒什麼難度。

## hw2：水仙花數
這邊要將每一圈的數字轉成字串，接下來就可以利用這個字串算出位數，並且將每一個數取出運算。
這題要注意轉成字串之後，後面還要轉回數字。

## hw3：判斷質數
覺得這題要注意的就是 1 不是質數，還有在 for 迴圈裡，如果判斷式成立時要記得跳出迴圈，不然會有錯誤。

## hw4：判斷迴文
這題用 for 迴圈輸出反轉字串再比較，也是相對簡單的一題。

## hw5：聯誼順序比大小
這題寫完也用範例輸出都沒問題，但最後放到 LidemyOJ 卻沒 AC，最後發現是 A 或 B 數字太大的關係，所以使用了 BigInt。
使用後也試過範例輸出也都沒問題，但仍然出現 Runtime Error，最後將 `Number()` 拿掉才 AC，如以下：
```
let A = Number(arr[0])
let B = Number(arr[1])
let K = Number(arr[2])
```
改成
```
let A = arr[0]
let B = arr[1]
let K = arr[2]
```

但在[範例的第三行](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)似乎也有在 `BigInt()` 直接帶入數字，所以這裡無法這樣做是讓我比較困惑的點。