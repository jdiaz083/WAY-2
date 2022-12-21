var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

router.get('/api/v1/players/edit/:id', (req, res) => {
    db.players.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            console.log(doc)
            res.render('edit', { element: doc })
        }
    })
})

router.post('/api/v1/players/edit/:id',
    body("id").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("id").isInt().withMessage("Must be an integer"),

    body("name").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("name").isAlpha().withMessage("Must be a string"),

    body("birthdate").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("birthdate").isISO8601().withMessage("Must be a date"),

    body("nationality").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("nationality").isAlpha().withMessage("Must be a string"),

    body("teamId").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("teamId").isInt().withMessage("Must be an integer"),

    body("position").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("position").isIn(['GK', 'DF', 'MF', 'FW']).withMessage("Must be a valid position"),

    body("number").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("number").isInt().withMessage("Must be an integer"),

    body("leagueId").isLength({ min: 1 }).withMessage("Must be at least 1 characters long"),
    body("leagueId").isInt().withMessage("Must be an integer"),

    (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
        } else {
            db.inventory.findAndModify({
                query: { _id: mongojs.ObjectId(req.params.id) },
                update: { $set: req.body }
            },
                (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    res.redirect('/api/v1/players');
                })
        }
    })

module.exports = router;
