/* eslint-disable consistent-return, quote-props, consistent-return, prefer-template, prefer-arrow-callback, max-len */
const request = require('request');

request.get(
  'https://restcountries.eu/rest/v2/name/' + process.argv[2],
  function (error, response, body) {
    if (response.statusCode >= 400) {
      console.log('找不到國家資訊');
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (e) {
      console.log(e);
      return;
    }
    for (let i = 0; i < json.length; i += 1) {
      if (json[i].name) {
        console.log(`============
國家：${json[i].name}
首都：${json[i].capital}
貨幣：${json[i].currencies[0].code}
國碼：${json[i].callingCodes}`);
      }
    }
  },
);
