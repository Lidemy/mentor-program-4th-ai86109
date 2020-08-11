/* eslint-disable no-use-before-define, no-param-reassign */
const request = new XMLHttpRequest();
const prizeApi = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
let prize = '';

document.querySelector('.lottery__btn button').addEventListener('click', () => {
  getData();
});

function getData() {
  request.open('GET', prizeApi, true);
  request.send();
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const json = JSON.parse(request.responseText);
      const data = json.prize;
      if (!data) alert('系統不穩定，請再試一次');
      getPrize(data);
    } else {
      alert('系統不穩定，請再試一次');
    }
  };
}

function getPrize(data) {
  let text = '';
  const firsttext = '恭喜你中頭獎了！日本東京來回雙人遊！';
  const secondtext = '二獎！90 吋電視一台！';
  const thirdtext = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
  const nonetext = '銘謝惠顧';
  document.querySelector('.lottery__bg').classList.add('prize');
  document.querySelector('.lottery__block').classList.add('prize');
  if (data === 'FIRST') {
    prize = 'firstprize';
    text = firsttext;
  } else if (data === 'SECOND') {
    prize = 'secondprize';
    text = secondtext;
  } else if (data === 'THIRD') {
    prize = 'thirdprize';
    text = thirdtext;
  } else if (data === 'NONE') {
    prize = 'noneprize';
    text = nonetext;
    document.querySelector('.prize__text').style.color = 'white';
  }
  document.querySelector('.lottery__bg').classList.add(prize);
  document.querySelector('.prize__text').innerText = text;
  document.querySelector('.prize__text').classList.add('prize');
  document.querySelector('.prize__btn').classList.add('prize');
}

document.querySelector('.prize__btn button').addEventListener('click', () => {
  document.querySelector('.prize__text').classList.remove('prize');
  document.querySelector('.prize__text').style.color = 'black';
  document.querySelector('.prize__btn').classList.remove('prize');
  document.querySelector('.lottery__bg').classList.remove(prize);
  document.querySelector('.lottery__bg').classList.remove('prize');
  document.querySelector('.lottery__block').classList.remove('prize');
});
