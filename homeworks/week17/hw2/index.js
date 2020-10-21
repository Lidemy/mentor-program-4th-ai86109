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
}));
app.use(flash());
app.use('/public', express.static(__dirname + '/public'));

function redirectBack(req, res) {
  res.redirect('back');
}

const userController = require('./controllers/user');
const adminController = require('./controllers/admin');
const lotteryController = require('./controllers/lottery');

app.get('/', userController.index);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/admin', adminController.admin);
app.get('/add_lottery', adminController.addLottery);
app.post('/add_lottery', adminController.handleAddLottery, redirectBack);
app.get('/update_lottery/:id', adminController.updateLottery);
app.post('/update_lottery/:id', adminController.handleUpdateLottery, redirectBack);
app.get('/delete_lottery/:id', adminController.deleteLottery, redirectBack);
app.get('/lottery', lotteryController.getPrize);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
