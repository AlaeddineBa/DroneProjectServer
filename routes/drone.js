var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var drones = db.collection('drones');

router.post('/', function(req, res, next) {

    drones.save(req.body, function (err) {
        if(err)throw new Error(err);
        res.status(200)
            .send('SAVE DRONE ');
    });

});