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
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.username = req.session.username;
  next();
});

function redirectBack(req, res) {
  res.redirect('back');
}

const userController = require('./controllers/user');
const restaurantController = require('./controllers/restaurant');
const adminController = require('./controllers/admin');
const lotteryController = require('./controllers/lottery');

app.get('/', restaurantController.index);
app.get('/lottery', restaurantController.lottery);
app.get('/faq', restaurantController.faq);
app.get('/menu', restaurantController.menu);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/admin', adminController.admin);
app.get('/admin_lottery', adminController.adminLottery);
app.get('/add_lottery', adminController.addLottery);
app.post('/add_lottery', adminController.handleAddLottery, redirectBack);
app.get('/update_lottery/:id', adminController.updateLottery);
app.post('/update_lottery/:id', adminController.handleUpdateLottery, redirectBack);
app.get('/delete_lottery/:id', adminController.deleteLottery, redirectBack);
app.get('/admin_menu', adminController.adminMenu);
app.get('/add_menu', adminController.addMenu);
app.post('/add_menu', adminController.handleAddMenu, redirectBack);
app.get('/update_menu/:id', adminController.updateMenu);
app.post('/update_menu/:id', adminController.handleUpdateMenu, redirectBack);
app.get('/delete_menu/:id', adminController.deleteMenu, redirectBack);
app.get('/admin_faq', adminController.adminFaq);
app.get('/add_faq', adminController.addFaq);
app.post('/add_faq', adminController.handleAddFaq, redirectBack);
app.get('/update_faq/:id', adminController.updateFaq);
app.post('/update_faq/:id', adminController.handleUpdateFaq, redirectBack);
app.get('/delete_faq/:id', adminController.deleteFaq, redirectBack);
app.get('/lotteryApi', lotteryController.getPrize);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
