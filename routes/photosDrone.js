var express = require('express');
var router = express.Router();

var db = require('./../mongo/connectMongo');
var photosdrone = db.collection('photosdrone');


router.get('/:id/intervention', function(req, res, next) {

    var idIntervention = req.params.id;
    photosdrone.findOne({idIntervention: idIntervention},function (err, docs) {
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