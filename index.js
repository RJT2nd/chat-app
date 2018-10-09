var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var users = [];

io.on('connection', function(socket) {
    console.log('a user connected.');
    io.emit('A user has joined.');
    
    socket.on('selectName', function(name) {
        if(users.indexOf(name) === -1){
            users.append(name);
        }
        else {
            socket.emit('selectName', "Name already taken");
        }
    });
    
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', function() {
        console.log('a user disconnected.');
        io.emit('A user has left.');
    });
});

http.listen(3000, function() {
    console.log('Listening on port 3000');
});