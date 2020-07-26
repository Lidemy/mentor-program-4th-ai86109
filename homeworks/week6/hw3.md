## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

**<strong>**
效果其實很簡單，就是將字體加粗。

其實還有一個標籤，使用後也會將字體變為粗體，就是 <b>。雖然呈現的效果一樣，但差別在於 <b> 是沒有強調意味的粗體，可以想成他只是為了加粗而加粗；而 <strong> 除了視覺上的加粗外，也帶有強調的意思。在視障人士使用螢幕閱讀器時，遇到 <b> 會像遇到其他一般字持續閱讀，而遇到 <strong> 時則是會加重和停頓。

**<hr>**
<hr> 其實就是 horizontal rule 的意思，也就是水平線。

雖然目前他仍然會在視窗上顯示出一條水平線，但這個 tag 現在已經被定義為一個 semantic terms，所以如果想要畫出一條水平線，還是建議使用 CSS 去達成。

**<time>**
用來表示時間，依據一定格式可以轉為機器可讀的格式，提供更佳的搜尋結果給使用者。

Valid datetime values 可以參考[這裡](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)

## 請問什麼是盒模型（box model）

在 CSS 中所有元素都被盒子所圍繞，透過這些盒子我們可以完成對於各元素之間的排列，這就稱為盒模型。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？

**是否換行**

inline：不會換行。
block：一個元素就會佔據一整行，是會換行的。
inline-block：不會換行，可以把它看成不換行的 block。

**width＆height 屬性**

inline：width＆height 屬性無效，只會依據內容顯示。
block：width＆height 屬性有效。
inline-block：因為剛說他只是不換行的 block，所以 width＆height 屬性有效。

**padding＆margin＆border**

inline：會影響水平方向的元素，但垂直方向不影響。
block：都會將其他元素從當前盒子推開。
inline-block：和 block 一樣都有效。

**使用時機點**
inline：當排版上想要把元素放在同一行，又不用去處理寬高時。
block：因為會換行，所以每一個元素都會佔據一整行，適合一行就是一個元素的排版。
inline-block：當想要調整其寬高，但又想將元素排在同一行時可以使用。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合

**static**
預設就是 static，會按照順序排下去。

使用場合：當排版上不用特別調整位置，順著排版留排列時。

**relative**
透過一些屬性的設定，可以使元素從原本應該出現的位置『相對地』移動，但調整其位置時，並不會影響其他元素的位置。

使用場合：遵循排版流，但想將某元素稍微偏移，又不想影響其他元素時。

**absolute**
針對某個參考點進行定位。
以什麼做為參考點？就是往上層找，第一個不是 static 的點。

使用場合：跳脫排版流，通常會用於要將元素定位在某上層元素（往上找到第一個 position 不是 static 的元素）的某個位置。例如 youtube 的訂閱按鈕。

**fixed**
針對 viewport（瀏覽器你看得到的地方）來做定位。

使用場合：想將某元素固定放在瀏覽器畫面的某個位置，不會因為上下左右滑動而影響。像是臉書右邊的聯絡人就可以用這個達成。