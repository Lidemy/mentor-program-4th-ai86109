/* eslint import/no-unresolved:0, indent:0, consistent-return:0 */
const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;
const { Lottery } = db;

const userController = {
  index: (req, res) => {
    Lottery.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
        res.render('index', {
          prizes,
          username: req.session.username,
          errorMessage: req.flash('errorMessage'),
        });
      });
  },

  login: (req, res) => {
    res.render('login', {
      username: req.session.username,
      errorMessage: req.flash('errorMessage'),
    });
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請完成輸入！');
      return next();
    }
    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '請輸入正確的帳號或密碼');
        return next();
      }
      bcrypt.compare(password, user.password, (error, isSuccess) => {
        if (error || !isSuccess) {
          req.flash('errorMessage', '請輸入正確的帳號或密碼');
          return next();
        }
        req.session.username = username;
        res.redirect('/');
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
};

module.exports = userController;
