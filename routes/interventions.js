var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var interventions = db.collection('interventions');

var ObjectId = require('mongojs').ObjectId;

var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});


router.post('/', function(req, res, next) {
    interventions.save(req.body, function (err, intervention) {
        if(err)throw new Error(err);
        socket.emit('message', intervention._id);
        res.status(200)
            .send('OK');
    });
});

router.get('/', function(req, res, next) {
    interventions.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });
});


router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    interventions.findOne({_id: ObjectId(id)},function (err, docs) {
        if(err)throw new Error(err);
        if(!docs) {
            res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        }else {
            res.status(200)
                .send(docs);
        }
    });
});


module.exports = router;
