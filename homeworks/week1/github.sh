#!/bin/bash

# 使用 curl 將資料帶入變數 data，因為是 HTTP GET 所以不用加 option
# 這邊使用 silent 模式，使之不輸出任務內容
data=$(curl --silent https://api.github.com/users/$1)

# for var in con1 con2 con3 所以在跑迴圈時，第一圈會帶 con1，以此類推
# 如果寫成'name'，會找到所有有 name 的，像是 twitter_username 也會被找到
for i in '"name"' '"bio"' '"location"' '"blog"'
do
    if [ "$i" == '"blog"' ]
        then
            echo "${data}" | grep $i | cut -d':' -f 2-3 | cut -d'"' -f 2
        else
            echo "${data}" | grep $i | cut -d':' -f 2 | cut -d'"' -f 2
    fi
done