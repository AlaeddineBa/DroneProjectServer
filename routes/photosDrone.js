var express = require('express');
var router = express.Router();
var db = require('./../mongo/connectMongo');
var photosdrone = db.collection('photosdrone');
var socketPhoto = require('socket.io-client')('http://localhost:8080');
socketPhoto.on('photoUpdate',function (data) {
    console.log('nouvelle position',data);
});

router.post('/', function(req, res, next) {

    photosdrone.save(req.body, function (err,updatedPhoto) {
        if(err)throw new Error(err);
        res.status(200)
            .send(updatedPhoto);
        socketPhoto.emit("photoUpdate",updatedPhoto)
    });
});

router.get('/:id/intervention', function(req, res, next) {
    var idIntervention = req.params.id;
    photosdrone.find({idIntervention: idIntervention},function (err, docs) {
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

router.get('/:id/photo', function(req, res, next) {
    var idPhoto = req.params.id;
    photosdrone.findById( idPhoto,function (err, photo) {
        if(err)throw new Error(err);
        if(!docs) {
            res.status(404)        // HTTP status 404: NotFound
                .send('Not found');
        }else {
            res.status(200)
                .send(photo);
        }
    });
});


router.get('/:la/:lo/:id/photos', function(req, res, next) {
    var la = req.params.la;
    var lo = req.params.lo;
    var idIntervention = req.params.id;
    console.log(req.params);
    photosdrone.find({idIntervention: idIntervention, positionPTS: { "$in" : [parseFloat(la), parseFloat(lo)]}},function (err, docs) {
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