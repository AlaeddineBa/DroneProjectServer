// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var positionObjectifSchema = new Schema({

    position: [Number, Number],
    etat: String,
    dated: Date
});

// the schema is useless so far
// we need to create a model using it
var PositionObjectif = mongoose.model('positionobjectif', positionObjectifSchema, 'positionobjectif');

// make this available to our users in our Node applications
module.exports = PositionObjectif;