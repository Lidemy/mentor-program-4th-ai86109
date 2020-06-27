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
    const num = Number(lines[0])
    let stars = ''
    for(let i=1; i<=num; i++){
        stars += '*'
        console.log(stars)
    }
}