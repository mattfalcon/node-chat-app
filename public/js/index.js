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
    //moment variable
    var formattedTime = moment(message.createdAt).format('h:mm a');
    //Jquery to create an element
    var li = jQuery('<li></li>');
    //set text property by creating an element
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    //rendering to DOM as last child (append)
    jQuery('#messages').append(li);
});


//event listener for location
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

//acknowledgement
// socket.emit('createMessage', {
//     from: 'Frank', 
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it', data);
// });


//jquery e event argument to override default behavior of page refresh
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

//variable for selector
var messageTextbox = jQuery('[name=message]')


//make something happen emit create message and provide data
    socket.emit('createMessage', {
        from: 'User',
        //jquery with name message
        text: messageTextbox.val()
    //callback function to clear value
    }, function () {
    messageTextbox.val('')
    })
})

//store jquery selector button
var locationButton = jQuery('#send-location');
//location listener for click button and runs function
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    //disable button to avoid multiple submissions within rendering
    locationButton.attr('disabled', 'disabled').text('Sending location....');
    //get current position actively gets coordinates based off browser
    navigator.geolocation.getCurrentPosition(function (position) {   
        //remove disabled attribute above re-enabling button
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        //disable re-enabled to send location 
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});