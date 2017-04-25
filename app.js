var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

require('./sync/socket');
require('./mongo/connectMongo');

var positionDrone = require('./routes/positionDrone');
var users = require('./routes/users');
var test = require('./routes/test');
var photosDrone = require('./routes/photosDrone');
var drones = require('./routes/drones');
var interventions = require('./routes/interventions');
var points = require('./routes/points');
var baseSP = require('./routes/baseSP');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/positiondrone', positionDrone);
app.use('/users', users);
app.use('/test', test);
app.use('/photosdrone', photosDrone);
app.use('/drones', drones);
app.use('/interventions', interventions);
app.use('/points', points);
app.use('/basesp', baseSP);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

