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

        console.log('Position saved successfully! ');
    });

    res.send('Position saved successfully ');
});

router.get('/', function(req, res, next) {


    PositionDrone.find({  },[],{

        sort:{
            dated: -1 //Sort by Date Added DESC
        },
        limit:1
    }, function(err, position) {
        if (err) throw err;

        // object of the user
        console.log(position[0]);
        res.send(position[0]);
    });


});


module.exports = router;
