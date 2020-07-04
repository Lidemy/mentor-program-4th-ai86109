/* eslint-disable consistent-return, quote-props, consistent-return, space-before-function-paren, prefer-template, no-unused-vars, max-len */
const request = require('request');

function getList () {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
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
}

function getBook () {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],
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
      console.log(json.name);
    },
  );
}

function delBook () {
  request.delete(
    'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log('刪除成功');
      }
    },
  );
}

function addBook () {
  request.post(
    'https://lidemy-book-store.herokuapp.com/books',
    {
      form: {
        name: process.argv[3],
      },
    },
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log('新增成功');
      }
    },
  );
}

function updateList () {
  request.patch(
    {
      uri: 'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],
      form: {
        name: process.argv[4],
      },
    },
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log('更改成功');
      }
    },
  );
}

if (process.argv[2] === 'list') {
  getList();
} else if (process.argv[2] === 'read') {
  getBook();
} else if (process.argv[2] === 'delete') {
  delBook();
} else if (process.argv[2] === 'create') {
  addBook();
} else if (process.argv[2] === 'update') {
  updateList();
}
