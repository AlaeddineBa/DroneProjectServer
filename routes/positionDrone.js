var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var positiondrone = db.collection('positiondrone');

//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {

});

router.get('/', function(req, res, next) {
    positiondrone.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });


});


module.exports = router;
