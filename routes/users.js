var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var users = db.collection('users');

router.post('/', function(req, res, next) {

    users.findOne({login: req.body.login, password: req.body.password},function (err, docs) {
        if(err)throw new Error(err);
        console.log(docs);
        if(!docs) {
            res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        }else {
            res.status(200)
                .send('Authentification succeded');
        }
    });
});

module.exports = router;
