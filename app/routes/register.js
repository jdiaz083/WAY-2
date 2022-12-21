var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['users'])

router.get('/api/v1/register', (req, res) => {
    res.render('register')
})

router.post('/api/v1/register', (req, res) => {
    req.body.type = "user"
    db.users.insertOne(req.body, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/api/v1/login')
        }
    })
})

module.exports = router;