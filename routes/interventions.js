var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var interventions = db.collection('interventions');

//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {
    interventions.save(req.body, function (err, docs) {
        if(err)throw new Error(err);
        res.status(200)
            .send('OK');
    });
});

router.get('/', function(req, res, next) {
    interventions.find(function (err, docs) {
        if(err)throw new Error(err);
        res.send(docs);
    });
});


module.exports = router;
