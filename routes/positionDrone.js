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


router.get('/:id/intervention', function(req, res, next) {
    console.log("Drone IDINTERVENTION ");
    var idIntervention = req.params.id;
    console.log(req.params.id);

    positiondrone.findOne({idIntervention: idIntervention},function (err, docs) {
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
