/**
 * Created by steve on 24/03/17.
 */

var syncService = require('app');
var http = require('http').Server(syncService);
http.listen(3000, function(){
    console.log('Synchronization Service Listining on *:3000');
});

var io = require('socket.io')(http);

io.on('connection', function(socket){


});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});