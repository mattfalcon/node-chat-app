// inititating request and storing in variable
    var socket = io();

//connect event
    socket.on('connect', function () {
        console.log('connected to server');
// // //emit new email client side script
// //     socket.emit('createMessage', {
// //         from: 'Andrew',
// //         text: 'Yup, that works for me.'
// //     });
     });   
    

// disconnect event (may have to use non es6)
    socket.on('disconnect', function () {
        console.log('disconnected from server')
    })

//calling on email 
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    //Jquery to create an element
    var li = jQuery('<li></li>');
    //set text property by creating an element
    li.text(`${message.from}: ${message.text}`)
    //rendering to DOM as last child (append)
    jQuery('#messages').append(li);
});

//acknowledgement
socket.emit('createMessage', {
    from: 'Frank', 
    text: 'Hi'
}, function (data) {
    console.log('Got it', data);
});


//jquery e event argument to override default behavior of page refresh
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

//make something happen emit create message and provide data
    socket.emit('createMessage', {
        from: 'User',
        //jquery with name message
        text: jQuery('[name=message]').val()
    //callback function
    }, function () {
    
    })
})