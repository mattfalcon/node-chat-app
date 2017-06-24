// inititating request and storing in variable
    var socket = io();

//connect event
//     socket.on('connect', () => {
//         console.log('connected to server');
// // //emit new email client side script
// //     socket.emit('createMessage', {
// //         from: 'Andrew',
// //         text: 'Yup, that works for me.'
// //     });
//      });   
    

// disconnect event (may have to use non es6)
    socket.on('disconnect', () => {
        console.log('disconnected from server')
    })

//calling on email 
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});