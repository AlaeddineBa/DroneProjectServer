/**
 * Created by steve on 24/03/17.
 */

var server = require('./../bin/www');


var io = require('socket.io').listen(server);
var test;
// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('CONNECTED');

    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
        socket.emit('interventions', message);
    });


});
