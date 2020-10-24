/* eslint-disable */
const db = require('../models');
const bcrypt = require('bcryptjs');

const { User } = db;

const userController = {
  login: (req, res) => {
    res.render('login');
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
