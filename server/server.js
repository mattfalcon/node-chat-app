//built in module
const path = require('path');
//built in node module
const http = require('http');
//load in express
const express = require('express');
//load library socketio
const socketIO = require('socket.io');

//
const {generateMessage,  generateLocationMessage} = require('./utils/message');

//import validation
const {isRealString} = require('./utils/validation');

//Users Array
const {Users} = require('./utils/users');

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

var users = new Users();

//calling app to configue express static middleware
app.use(express.static(publicPath));

//io.on lets you register an event listener
//connection is one event that lets you in on a connection and do something
//socket argument is for individual socket 
io.on('connection', (socket) => {
    console.log('New user connected')



    //------------JOIN--------------------------
    socket.on('join', (params, callback) => {
        //validate name and room
        if (!isRealString(params.name) || !isRealString(params.room)) {
           //using return to ensure none of code below fires if data is not valid
            return callback('Name and room name are requried.');
        }
    //join rooms or emit chat messages to other people just in room
       socket.join(params.room);
       users.removeUser(socket.id);
       users.addUser(socket.id, params.name, params.room);
       //socket.leave
       //io.emit -> io.to(params.room).emit.....
       //targer specific users socket.broadcast.emit --> socket.broadcast.to(params.room)
       //socket.emit 
    //socket.emit from admin text should say welcome to chat app
    //type of newMessage
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //socket.broadcast.emit from Admin text: new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

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
    callback();
});

socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
})


//------------USER LEAVES --------------------
//message to print everytime browser closes
    socket.on('disconnect', () => {
        //variable storing potentially removed users
         var user = users.removeUser(socket.id);
         //if user removed emit two events
         if (user) {
             //emit update user list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            //emit a message from admin to everyone
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
         }
    })
});


//start up server on port 3000 with callback function (console.log)
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

