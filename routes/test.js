var express = require('express');
var router = express.Router();


//Recevoir Latitude et Longitude dans le body de la requeque POST
router.post('/', function(req, res, next) {

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://148.60.11.238:27018/db';

    var insertDocument = function(db, callback) {
        db.collection('test').insertOne( req.body, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the test collection.");
            callback();
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });

    console.log(req.body);

    res.send('TEST');
});

module.exports = router;
