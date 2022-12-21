var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.get('/api/v1/login', (req, res) => {
    res.render('index')
})

router.post('/api/v1/login', (req, res) => {
    db.users.findOne({ name: req.body.name, password: req.body.password }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                if (!result) {
                    res.redirect('/api/v1/login')
                } else {
                    if (result.type === 'admin') {
                        res.redirect('/api/v1/players')
                    } else {
                        res.redirect('/static/milestone1_egina-Milestone5')
                    }
                }
            }
        })
})

module.exports = router;