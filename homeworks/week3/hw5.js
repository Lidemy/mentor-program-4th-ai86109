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
    let M = Number(lines[0])
    for(let i=1; i<=M; i++){
        let arr = lines[i].split(' ')
        let A = arr[0]
        let B = arr[1]
        let K = arr[2]
        if(BigInt(A) === BigInt(B)){
            console.log('DRAW')
        }else if(K > 0){
            BigInt(A) > BigInt(B) ? console.log('A') : console.log('B')
        }else{
            BigInt(A) < BigInt(B) ? console.log('A') : console.log('B')
        }
    }
}