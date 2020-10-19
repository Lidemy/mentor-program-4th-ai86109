const db = require('../models');

const { Lottery, Menu, Faq } = db;

const restaurantController = {
  index: (req, res) => {
    res.render('index');
  },

  lottery: (req, res) => {
    Lottery.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      res.render('lottery', {
        prizes,
      });
    });
  },

  menu: (req, res) => {
    Menu.findAll({
      order: [['createdAt', 'ASC']],
    }).then((menus) => {
      res.render('menu', {
        menus,
      });
    });
  },

  faq: (req, res) => {
    Faq.findAll({
      order: [['order', 'ASC']],
    }).then((faqs) => {
      res.render('faq', {
        faqs,
      });
    });
  },
};

module.exports = restaurantController;
