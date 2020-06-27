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
    let N = Number(lines[0])
    for(let i=1; i<=N; i++){
        let num = Number(lines[i])
        if(num === 1){
            console.log('Composite')
        }
        for(let j=2; j<=num; j++){
            if(num === j){
                console.log('Prime')
                break
            }
            if(num % j === 0){
                console.log('Composite')
                break
            }
        }
    }
}