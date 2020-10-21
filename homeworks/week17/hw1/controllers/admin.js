/* eslint consistent-return:0, indent:0 */
const db = require('../models');

const { Article } = db;

const adminController = {
  admin: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/index');
    }
    Article.findAll({
      where: {
        is_deleted: null,
      },
      order: [['createdAt', 'DESC']],
    }).then((articles) => {
        res.render('admin', {
          articles,
          username,
          errorMessage: req.flash('errorMessage'),
        });
      });
  },

  addArticle: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/index');
    }
    res.render('add_article', {
      username,
      errorMessage: req.flash('errorMessage'),
    });
  },

  handleAddArticle: (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      req.flash('errorMessage', '標題或內容不得為空！');
      return next();
    }

    Article.create({
      title,
      content,
    }).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      res.redirect('/admin');
    });
  },

  editArticle: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/index');
    }
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      res.render('edit_article', {
        article,
        username,
        errorMessage: req.flash('errorMessage'),
      });
    }).catch(() => {
      res.redirect('/admin');
    });
  },

  handleEditArticle: (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      req.flash('errorMessage', '標題或內容不得為空！');
      return next();
    }
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      article.update({
        title: req.body.title,
        content: req.body.content,
      });
    }).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
    });
  },

  deleteArticle: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.next();
    }
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      article.update({
        is_deleted: 1,
      });
    }).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
    });
  },
};

module.exports = adminController;
