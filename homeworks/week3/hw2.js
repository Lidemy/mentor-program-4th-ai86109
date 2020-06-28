/* eslint-disable import/newline-after-import, no-restricted-properties */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const arr = input[0].split(' ');
  const N = Number(arr[0]);
  const M = Number(arr[1]);
  for (let i = N; i <= M; i += 1) {
    const str = i.toString();
    const digits = str.length;
    let result = 0;
    for (let j = 0; j < digits; j += 1) {
      result += Math.pow(Number(str[j]), digits);
    }
    if (result === i) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
