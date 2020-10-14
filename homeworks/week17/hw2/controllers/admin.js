/* eslint indent:0, consistent-return:0, object-curly-newline:0 */
const db = require('../models');

const { Lottery } = db;

const adminController = {
  admin: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Lottery.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
        res.render('admin', {
          prizes,
          username,
          errorMessage: req.flash('errorMessage'),
        });
      });
  },

  addLottery: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    res.render('add_lottery', {
      username,
      errorMessage: req.flash('errorMessage'),
    });
  },

  handleAddLottery: (req, res, next) => {
    const { prize, description, image, probability } = req.body;
    if (!prize || !description || !image || !probability) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }

    Lottery.create({
      prize,
      description,
      image,
      probability,
    }).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      res.redirect('/admin');
    });
  },

  updateLottery: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Lottery.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => {
      res.render('update_lottery', {
        prize,
        username,
        errorMessage: req.flash('errorMessage'),
      });
    }).catch(() => {
      res.redirect('/admin');
    });
  },

  handleUpdateLottery: (req, res, next) => {
    const { prize, description, image, probability } = req.body;
    if (!prize || !description || !image || !probability) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }
    Lottery.findOne({
      where: {
        id: req.params.id,
      },
    }).then((lottery) => {
      lottery.update({
        prize: req.body.prize,
        description: req.body.description,
        image: req.body.image,
        probability: req.body.probability,
      });
    }).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
    });
  },

  deleteLottery: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return next();
    }
    Lottery.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => {
      prize.destroy();
    }).then(() => {
      res.redirect('/admin');
    }).catch(() => {
      res.redirect('/admin');
    });
  },
};

module.exports = adminController;
