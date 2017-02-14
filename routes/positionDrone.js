var express = require('express');
var router = express.Router();

var PositionDrone = require('../model/positiondrone');

//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {

    console.log(req.body);

    var positionLatitudeLongitude = req.body;

    var position = new PositionDrone({
        position: positionLatitudeLongitude,
        dated: new Date()});
    position.save(function(err) {
        if (err) throw err;

        console.log('Position saved successfully!');
    });
    res.send('Position saved successfully');
});

module.exports = router;
