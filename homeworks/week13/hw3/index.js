/* eslint-disable no-use-before-define, quote-props, arrow-body-style */
const clientId = 'fftq7egbenuhg2t3lru0bgrqz9gmjm';
let apiUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';

function getTopGames(json) {
  const data = json.top;
  for (let i = 0; i < data.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('nav__gamelist-item');
    div.setAttribute('data-gamename', data[i].game.name);
    div.innerText = data[i].game.name;
    document.querySelector('.nav__gamelist').appendChild(div);
  }
  apiUrl = `https://api.twitch.tv/kraken/streams/?limit=20&game=${data[0].game.name}`;
  getData();
}

function getLiveStream(json) {
  document.querySelector('.stream__group').innerHTML = '';
  const data = json.streams;
  for (let i = 0; i < data.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('stream__block');
    div.innerHTML = `
    <div class="stream__rank">${i + 1}</div>
    <div class="stream__preview">
    <a href="${data[i].channel.url}">
        <img src="${data[i].preview.medium}" />
    </a>
    </div>
    <div class="stream__content">
    <div class="stream__logo">
        <img src="${data[i].channel.logo}" />
    </div>
    <div class="stream__text">
        <div class="stream__livename">${data[i].channel.status}</div>
        <div class="stream__host">${data[i].channel.display_name}</div>
    </div>
    </div>
    <div class="stream__viewers">${data[i].viewers}</div>
    `;
    document.querySelector('.stream__group').appendChild(div);
  }
}

function getData() {
  fetch(apiUrl, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId,
    }),
  }).then((response) => {
    return response.json();
  }).then((json) => {
    if (json.top) {
      getTopGames(json);
    } else if (json.streams) {
      getLiveStream(json);
    } else {
      console.log('err');
    }
  }).catch((err) => {
    console.log(err);
  });
}

document.querySelector('.nav__gamelist').addEventListener('click', (e) => {
  document.querySelector('.stream__game').innerText = e.target.getAttribute('data-gamename');
  const game = encodeURIComponent(e.target.getAttribute('data-gamename'));
  apiUrl = `https://api.twitch.tv/kraken/streams/?limit=20&game=${game}`;
  getData();
});

getData();
