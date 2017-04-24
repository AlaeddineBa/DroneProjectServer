var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var drones = db.collection('drones');

var ObjectId = require('mongojs').ObjectId;
var ObjectIdG = require('mongodb').ObjectID;

router.post('/', function(req, res, next) {

    drones.save(req.body, function (err) {
        if(err)throw new Error(err);
        res.status(200)
            .send('SAVE DRONE ');
    });

});

router.get('/:id/intervention', function(req, res, next) {
    console.log("Drone ID ");
    var idIntervention = req.params.id;
    console.log(id);

    drones.findOne({idIntervention: ObjectId(idIntervention)},function (err, docs) {
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