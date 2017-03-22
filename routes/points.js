var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var points = db.collection('points');

router.post('/', function(req, res, next) {
    points.save(req.body, function (err, docs) {
        if(err)throw new Error(err);
        res.status(200)
            .send('OK');
    });
});

router.get('/', function(req, res, next) {
    points.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });
});


module.exports = router;