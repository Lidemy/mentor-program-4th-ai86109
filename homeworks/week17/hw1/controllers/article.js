/* eslint consistent-return:0, indent:0 */
const db = require('../models');

const { Article } = db;

const articleController = {
  index: (req, res) => {
    const page = req.params.page || 1;
    const limitPerPage = 5;
    const offset = limitPerPage * (page - 1);
    Article.findAndCountAll({
      where: {
        is_deleted: null,
      },
      limit: limitPerPage,
      offset,
      order: [['createdAt', 'DESC']],
    }).then((result) => {
        res.render('index', {
          articles: result.rows,
          username: req.session.username,
          page,
          total_page: Math.ceil(result.count / limitPerPage),
        });
      });
  },

  about: (req, res) => {
    res.render('about', {
      username: req.session.username,
    });
  },

  list: (req, res) => {
    Article.findAll({
      where: {
        is_deleted: null,
      },
      order: [['createdAt', 'DESC']],
    }).then((articles) => {
        res.render('list', {
          articles,
          username: req.session.username,
        });
      });
  },

  article: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    }).then((article) => {
      res.render('article', {
        article,
        username: req.session.username,
      });
    });
  },
};

module.exports = articleController;
