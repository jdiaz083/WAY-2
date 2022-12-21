var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.get('/api/v1/players', (req, res) => {
  db.players.find((err, docs) => {
      if (err) {
          res.send(err);
      } else {
          res.render('players', {elements: docs})
      }
  })
})

module.exports = router;
