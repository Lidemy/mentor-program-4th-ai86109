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
  const num = Number(input[0]);
  let stars = '';
  for (let i = 1; i <= num; i += 1) {
    stars += '*';
    console.log(stars);
  }
}

rl.on('close', () => {
  solve(lines);
});
