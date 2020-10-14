/* eslint consistent-return:0, import/no-unresolved:0 */
const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;
const saltRounds = 10;

const userController = {
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
        res.redirect('/index');
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/index');
  },

  register: (req, res) => {
    res.render('register', {
      username: req.session.username,
      errorMessage: req.flash('errorMessage'),
    });
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }

      User.create({
        username,
        password: hash,
      }).then(() => {
        req.session.username = username;
        res.redirect('/index');
      }).catch((error) => {
        req.flash('errorMessage', error.toString());
        return next();
      });
    });
  },
};

module.exports = userController;
