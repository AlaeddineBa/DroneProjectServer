var express = require('express');
var router = express.Router();

var PositionDrone = require('../model/positiondrone');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var position = new PositionDrone({
        position: [
            5,
            10
        ],
        dated: new Date()});
    position.save(function(err) {
        if (err) throw err;

        console.log('Position saved successfully!');
    });
    res.send('respond with a resource');
});

module.exports = router;
