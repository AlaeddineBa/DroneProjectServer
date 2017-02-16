// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var positionDroneSchema = new Schema({

    position: [Number, Number],
    dated: Date
});

// the schema is useless so far
// we need to create a model using it
var PositionDrone = mongoose.model('positiondrone', positionDroneSchema, 'positiondrone');

// make this available to our users in our Node applications
module.exports = PositionDrone;