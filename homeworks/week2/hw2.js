function capitalize(str) {
    var strCharCode = str.charCodeAt(0)
    if(strCharCode >= 97 && strCharCode <= 122){
        var ans = ''
        ans += str[0].toUpperCase()
        for(let i=1; i<str.length; i++){
            ans += str[i]
        }
        return ans
    } else {
        return str
    }
}

console.log(capitalize('hello'));
