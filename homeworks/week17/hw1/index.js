/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  }),
);
app.use(flash());
app.use('/public', express.static(__dirname + '/public'));

function redirectBack(req, res) {
  res.redirect('back');
}

const articleController = require('./controllers/article');
const userController = require('./controllers/user');
const adminController = require('./controllers/admin');

app.get('/index', articleController.index);
app.get('/index/:page', articleController.index);
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/about', articleController.about);
app.get('/list', articleController.list);
app.get('/admin', adminController.admin);
app.get('/add_article', adminController.addArticle);
app.post('/add_article', adminController.handleAddArticle, redirectBack);
app.get('/edit_article/:id', adminController.editArticle);
app.post('/edit_article/:id', adminController.handleEditArticle, redirectBack);
app.get('/delete_article/:id', adminController.deleteArticle, redirectBack);
app.get('/article/:id', articleController.article);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
