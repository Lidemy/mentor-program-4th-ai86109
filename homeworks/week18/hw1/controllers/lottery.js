/* eslint-disable */
const db = require('../models');

const { Lottery } = db;

const lotteryController = {
  getPrize: (req, res) => {
    Lottery.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      const map = [];
      let probabilitySum = 0;
      let resultId = 0;
      for (const prize of prizes) {
        if (prize.probability > 0) {
          probabilitySum += prize.probability;
          map.push({ 'id': prize.id, 'probability': probabilitySum });
        }
      }
      if (probabilitySum > 0) {
        const randomNum = Math.floor(Math.random() * probabilitySum + 1);
        for (let i = 0; i < map.length; i += 1) {
          if (map[i].probability >= randomNum) {
            resultId = map[i].id;
            break;
          }
        }
      } else {
        const result = {
          prize: '未中獎',
          description: '下次再試試摟～',
          image: 'https://i.imgur.com/KHQORqW.jpg',
        };
        res.json(result);
      }

      Lottery.findOne({
        where: {
          id: resultId,
        },
      }).then((lottery) => {
        const result = {
          prize: lottery.prize,
          description: lottery.description,
          image: lottery.image,
        };
        res.json(result);
      });
    }).catch(err => console.log(err));
  },
};

module.exports = lotteryController;
