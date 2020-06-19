function join(arr, concatStr) {
    var joinStr = ''
    joinStr += arr[0]
    for(let i=1; i<arr.length; i++){
        joinStr += concatStr + arr[i]
    }
    return joinStr
}

function repeat(str, times) {
    var repeatStr = ''
    for(let i=0; i<times; i++){
        repeatStr += str
    }
    return repeatStr
}

console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(repeat('yoyo', 2));
