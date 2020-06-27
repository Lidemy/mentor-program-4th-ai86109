/* eslint-disable import/newline-after-import, no-undef, no-unused-expressions */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const M = Number(input[0]);
  for (let i = 1; i <= M; i += 1) {
    const arr = input[i].split(' ');
    const A = arr[0];
    const B = arr[1];
    const K = arr[2];
    if (BigInt(A) === BigInt(B)) {
      console.log('DRAW');
    } else if (K > 0) {
      BigInt(A) > BigInt(B) ? console.log('A') : console.log('B');
    } else {
      BigInt(A) < BigInt(B) ? console.log('A') : console.log('B');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
