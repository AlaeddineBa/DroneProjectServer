var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var interventions = db.collection('interventions');

var ObjectId = require('mongojs').ObjectId;
var ObjectIdG = require('mongodb').ObjectID;

var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});


router.post('/', function(req, res, next) {
    if(!req.body._id){
        var objectId;
        req.body.vehicules.forEach(function (vehicule) {
            objectId = new ObjectIdG();
            vehicule._id = objectId;
        });
        console.log("TEST1");
        interventions.save(req.body, function (err, intervention) {
            if(err)throw new Error(err);
            socket.emit('message', intervention._id);
            res.status(200)
                .send(intervention._id);
        });
    }else{
        console.log(req.body);
        var id = req.body._id;
        req.body._id = ObjectId(id);
        interventions.update({_id: req.body._id},req.body, function (err, intervention) {
            if(err)throw new Error(err);
            socket.emit('message', id);
            res.status(200)
                .send(intervention._id);
        });
    }

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

router.post('/:id/cloturer', function(req, res, next) {
    console.log("CLOTURER");
    var id = req.params.id;
    console.log(id);
    interventions.update({_id: ObjectId(id)},{$set: {cloturer:true}}, function (err, intervention) {
        if(err)throw new Error(err);
        res.status(200)
            .send('UPDATE');
    });
});


module.exports = router;
