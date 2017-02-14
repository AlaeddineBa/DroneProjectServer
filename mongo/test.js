// Connect to the db
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://148.60.11.238:27018/db", function(err, db) {
    if(!err) {
        var collection = db.collection('test');
        var doc1 = {'hello':'doc1'};

        //Test pour inserer la variable doc1
        collection.insert(doc1);

        console.log("We are connected");
    }
    else
        console.log(err);
});
