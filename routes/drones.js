var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var drones = db.collection('drones');

var ObjectId = require('mongojs').ObjectId;
var ObjectIdG = require('mongodb').ObjectID;
var socketdrone = require('socket.io-client')('http://localhost:8080');
socketdrone.on('droneUpdate',function (data) {
    console.log('new  position',data);
});

router.post('/', function(req, res, next) {
    drones.remove({idIntervention: req.body.idIntervention},function (err) {
        if(err)return Error(err);
    });
    drones.save(req.body, function (err, drone) {
        if (err)throw new Error(err);
        res.status(200)
            .send(drone.idIntervention);
        socketdrone.emit('drone',drone);
    });

});

router.get('/:id/intervention', function(req, res, next) {
    console.log("Drone ID ");
    var idIntervention = req.params.id;
    console.log(req.params.id);

    drones.findOne({idIntervention: idIntervention},function (err, docs) {
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