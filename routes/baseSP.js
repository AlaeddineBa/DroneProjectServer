var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var baseSP = db.collection('baseSP');

var ObjectId = require('mongojs').ObjectId;

router.post('/', function(req, res, next) {
    baseSP.save(req.body, function (err, docs) {
        if(err)throw new Error(err);
        res.status(200)
            .send('OK');
    });
});

router.get('/', function(req, res, next) {
    baseSP.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = ObjectId(req.params.id);
    baseSP.remove({_id: id}, function (err, docs) {
        if(err)throw new Error(err);
        res.send("DELETED");
    });
});


module.exports = router;