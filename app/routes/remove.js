var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

let remove = function(res, id){
    db.players.remove({_id: mongojs.ObjectId(id)}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/api/v1/players/");
        }
    })
}

router.get('/api/v1/players/remove/:id', (req, res) => {
    remove(res, req.params.id)
})

module.exports = router;