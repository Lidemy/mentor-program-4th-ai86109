## Webpack 是做什麼用的？可以不用它嗎？

當我們在開發時，時常會引入第三方模組來協助。在 Node.js 上因為支援 CommonJS，所以可以使用 require 和 module.exports 這兩個好用的語法，來引入不管是第三方或是自己寫的 module，但如果 runtime 換成了瀏覽器，便沒有這些語法可以使用，自然無法引入模組了。

而 webpack 就是來解決這件事的。經過他的打包、compile，將這些語法轉成瀏覽器可以使用的語法，便可以引入第三方的模組提供使用了。除此之外，webpack 可將 CSS, image 等都視為模組引入進來，並且做好 uglify 與 minify 之後輸出，這也是 webpack 強大的地方。

自從 ES6 出現後，雖然有了 import 和 export 這兩個可在瀏覽器上使用的引入、導出的語法，但仍有些瀏覽器（如：IE）是不支援此語法的；另外，如果我想要使用第三方模組時，就會遇到是否需要將 node_modules 裡用到的檔案上傳的問題，就算真的上傳了，import 寫路徑的時候，也會有難以後續維護的狀況發生。

所以評估完以上後，若不打算支援 IE，也不太使用第三方模組的情況下，是可以不用 webpack 的，端看需求而定。

## gulp 跟 webpack 有什麼不一樣？

Gulp 是 task manager，它的功能是將所有你想完成的任務（如：發送 API、幫你撈 ptt 廢文）串起來然後執行。

Webpack 則是 module bundler，他可以幫你把你所有的資源（如：第三方模組、CSS、圖片等），全部打包在一起。

所以這兩個工具在使用上有根本上的不同，只是一般前端開發，常常用 gulp 做跟 webpack 很像的是，才會容易搞混。

## CSS Selector 權重的計算方式為何？

!important > inline style > id > class(class, pseudo-class, attribute) > tag > *(universal selector)