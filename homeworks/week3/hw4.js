/* eslint-disable import/newline-after-import, no-unused-expressions */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const str = input[0];
  let reverseStr = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    reverseStr += str[i];
  }
  str === reverseStr ? console.log('True') : console.log('False');
}

rl.on('close', () => {
  solve(lines);
});
