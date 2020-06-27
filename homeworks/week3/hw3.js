/* eslint-disable import/newline-after-import */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const N = Number(input[0]);
  for (let i = 1; i <= N; i += 1) {
    const num = Number(input[i]);
    if (num === 1) {
      console.log('Composite');
    }
    for (let j = 2; j <= num; j += 1) {
      if (num === j) {
        console.log('Prime');
        break;
      }
      if (num % j === 0) {
        console.log('Composite');
        break;
      }
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
