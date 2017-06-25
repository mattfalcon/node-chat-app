// inititating request and storing in variable
    var socket = io();

//--------------------SCROLLER-----------------------------
//new message to scroll user to bottom depending on position
    function scrollToBottom () {
        //determine if should be scrolled to bottom
        //selectors
        var newMessage = messages.children('li: last-child')
        var messages = jQuery('#messages');
        //heights //prop cross browser way to property
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = message.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        //second to last item
        var lastMessageHeight = newMessage.prev().innerHeight();
        //calculation
        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
            // console.log('Should Scroll');
            messages.scrollTop(scrollHeight);
        }
    };

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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    //markup inside template
    var template = jQuery('#message-template').html();
    //call method on mustache takes template to render
    var html = Mustache.render(template, {
        //rendering template in dynamic way
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    //render to DOM
    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('newMessage', message);
    // //moment variable
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // //Jquery to create an element
    // var li = jQuery('<li></li>');
    // //set text property by creating an element
    // li.text(`${message.from} ${formattedTime}: ${message.text}`)
    // //rendering to DOM as last child (append)
    // jQuery('#messages').append(li);
});


//event listener for location
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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