/* eslint-disable consistent-return, quote-props, consistent-return, prefer-template, no-underscore-dangle, max-len */
const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/streams/?limit=100&game=' + process.argv[2],
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
  for (let i = 0; i < json.streams.length; i += 1) {
    const liveStream = json.streams[i].channel.display_name;
    const id = json.streams[i].channel._id;
    console.log(liveStream, id);
  }
});
