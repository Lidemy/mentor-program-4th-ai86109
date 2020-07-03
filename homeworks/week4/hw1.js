/* eslint-disable consistent-return, quote-props, consistent-return */
const request = require('request');

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
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
    for (let i = 0; i < json.length; i += 1) {
      console.log(json[i].id, json[i].name);
    }
  },
);
