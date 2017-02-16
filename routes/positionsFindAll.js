var express = require('express');
var router = express.Router();

var PositionDrone = require('../model/positiondrone');

router.get('/', function(req, res, next) {


    PositionDrone.find({  },[],{

        sort:{
            dated: -1 //Sort by Date Added DESC
        }
    }, function(err, position) {
        if (err) throw err;

        // object of the user
        console.log(position);
        res.send(position);
    });


});


module.exports = router;
