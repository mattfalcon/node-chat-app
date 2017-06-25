//built in module
const path = require('path');
//built in node module
const http = require('http');
//load in express
const express = require('express');
//load library socketio
const socketIO = require('socket.io');

//
const {generateMessage} = require('./utils/message');

//avoids going into and out of server
const publicPath = path.join(__dirname, '../public');

//
const port = process.env.PORT || 3000;

//configure express by calling methods on app
var app = express();

//create server using http library (app.listen does the same call behind the scenes)
//takes function app  
var server = http.createServer(app);

//configure server to also use socket io call to socket IO and pass in server 
//(websocket server to communicate with client and server)
var io = socketIO(server);

//calling app to configue express static middleware
app.use(express.static(publicPath));

//io.on lets you register an event listener
//connection is one event that lets you in on a connection and do something
//socket argument is for individual socket 
io.on('connection', (socket) => {
    console.log('New user connected')

        //socket.emit from admin text should say welcome to chat app
    //type of newMessage
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));


    //socket.broadcast.emit from Admin text: new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

// //creating the event, function, specify data
//     socket.emit('newMessage', {
//         from: 'John', 
//         text: 'See you then',
//         createdAt: 123123
//     });

//acknowledgement-----------------------------------

//custom event create message get message data and print to screen
socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    //socket.emit sends to a specific user, io sends to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    //broadcast using socket individual, will broadcast to everyone but myself
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
    callback('This is from the server.');
});

//message to print everytime browser closes
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

//start up server on port 3000 with callback function (console.log)
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

