/* eslint-disable */
const db = require('../models');

const { Lottery, Menu, Faq } = db;

const adminController = {
  admin: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    res.render('admin');
  },

  adminLottery: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Lottery.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      res.render('admin_lottery', {
        prizes,
      });
    });
  },

  addLottery: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    res.render('add_lottery');
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
      res.redirect('/admin_lottery');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      res.redirect('/admin_lottery');
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
      });
    }).catch(() => {
      res.redirect('/admin_lottery');
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
      res.redirect('/admin_lottery');
    }).catch(() => {
      res.redirect('/admin_lottery');
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
      res.redirect('/admin_lottery');
    }).catch(() => {
      res.redirect('/admin_lottery');
    });
  },

  adminMenu: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Menu.findAll({
      order: [['createdAt', 'ASC']],
    }).then((menus) => {
      res.render('admin_menu', {
        menus,
      });
    });
  },

  addMenu: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    res.render('add_menu');
  },

  handleAddMenu: (req, res, next) => {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }

    Menu.create({
      name,
      price,
      image,
    }).then(() => {
      res.redirect('/admin_menu');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      res.redirect('/admin_menu');
    });
  },

  updateMenu: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Menu.findOne({
      where: {
        id: req.params.id,
      },
    }).then((menu) => {
      res.render('update_menu', {
        menu,
      });
    }).catch(() => {
      res.redirect('/admin_menu');
    });
  },

  handleUpdateMenu: (req, res, next) => {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }
    Menu.findOne({
      where: {
        id: req.params.id,
      },
    }).then((menu) => {
      menu.update({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
      });
    }).then(() => {
      res.redirect('/admin_menu');
    }).catch(() => {
      res.redirect('/admin_menu');
    });
  },

  deleteMenu: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return next();
    }
    Menu.findOne({
      where: {
        id: req.params.id,
      },
    }).then((menu) => {
      menu.destroy();
    }).then(() => {
      res.redirect('/admin_menu');
    }).catch(() => {
      res.redirect('/admin_menu');
    });
  },

  adminFaq: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Faq.findAll({
      order: [['order', 'ASC']],
    })
    .then((faqs) => {
      res.render('admin_faq', {
        faqs,
      });
    });
  },

  addFaq: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    res.render('add_faq');
  },

  handleAddFaq: (req, res, next) => {
    const { title, content, order } = req.body;
    if (!title || !content || !order) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }

    Faq.create({
      title,
      content,
      order,
    }).then(() => {
      res.redirect('/admin_faq');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      res.redirect('/admin_faq');
    });
  },

  updateFaq: (req, res) => {
    const { username } = req.session;
    if (!username) {
      res.redirect('/');
    }
    Faq.findOne({
      where: {
        id: req.params.id,
      },
    }).then((faq) => {
      res.render('update_faq', {
        faq,
      });
    }).catch(() => {
      res.redirect('/admin_faq');
    });
  },

  handleUpdateFaq: (req, res, next) => {
    const { title, content, order } = req.body;
    if (!title || !content || !order) {
      req.flash('errorMessage', '欄位不得為空！');
      return next();
    }
    Faq.findOne({
      where: {
        id: req.params.id,
      },
    }).then((faq) => {
      faq.update({
        title: req.body.title,
        content: req.body.content,
        order: req.body.order,
      });
    }).then(() => {
      res.redirect('/admin_faq');
    }).catch(() => {
      res.redirect('/admin_faq');
    });
  },

  deleteFaq: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return next();
    }
    Faq.findOne({
      where: {
        id: req.params.id,
      },
    }).then((faq) => {
      faq.destroy();
    }).then(() => {
      res.redirect('/admin_faq');
    }).catch(() => {
      res.redirect('/admin_faq');
    });
  },
};

module.exports = adminController;
