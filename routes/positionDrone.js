var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var positiondrone = db.collection('positiondrone');
var positionDroneValue;
var socketPosition = require('socket.io-client')('http://localhost:8080');
socketPosition.on('connect', function(){});
socketPosition.on('event', function(data){});
socketPosition.on('disconnect', function(){});
socketPosition.on('position',function (data) {
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


module.exports = router;
