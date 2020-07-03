/* eslint-disable consistent-return, quote-props, consistent-return */
const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'fftq7egbenuhg2t3lru0bgrqz9gmjm',
  },
};

request.get(options, (error, response, body) => {
  if (error) {
    return console.log(error);
  }
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    console.log(e);
    return;
  }
  for (let i = 0; i < json.top.length; i += 1) {
    const view = json.top[i].viewers;
    const game = json.top[i].game.name;
    console.log(view, game);
  }
});
