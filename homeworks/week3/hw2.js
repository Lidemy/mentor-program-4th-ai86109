var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin
})

var lines = []

rl.on('line', function(line){
    lines.push(line)
})

rl.on('close', function(){
    solve(lines)
})

function solve(lines){
    let arr = lines[0].split(' ')
    const N = Number(arr[0])
    const M = Number(arr[1])
    for(let i=N; i<=M; i++){
        let str = i.toString()
        let digits = str.length
        let result = 0
        for(let j=0; j<digits; j++){
            result += Math.pow(Number(str[j]), digits)
        }
        if(result === i){
            console.log(i)
        }
    }
}