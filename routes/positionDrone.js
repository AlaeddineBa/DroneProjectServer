var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var positiondrone = db.collection('positiondrone');
var positionDroneValue;
var socketPosition = require('socket.io-client')('http://localhost:8080');
socketPosition.on('connect', function(){});
socketPosition.on('event', function(data){});
socketPosition.on('disconnect', function(){});
socketPosition.on('positionUpdate',function (data) {
    console.log('nouvelle position',data);
});

//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {
    positiondrone.save(req.body,function (err,updatedPosition) {
        if(err)throw new Error(err);
        res.status(200)
            .send(updatedPosition);
        socketPosition.emit('position',updatedPosition);
    });
});
router.get('/', function(req, res, next) {
    positiondrone.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });
});


router.get('/:id/intervention', function(req, res, next) {
    console.log("Drone IDINTERVENTION ");
    var idIntervention = req.params.id;
    positiondrone.find({idIntervention: idIntervention}, [],{

        sort:{
            dated: -1
        },
        limit:1
    },function (err, docs) {
        if(err)throw new Error(err);
        if(!docs) {
            res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        }else {
            res.status(200)
                .send(docs[0]);
        }
    });
});



module.exports = router;
