/*global $, io, _*/

var socket = io();

socket.on('roomList', function(roomList) {

    var list = _.uniq(roomList.roomList);
    console.log(list);

    list.forEach(function(room) {

        // $('#select')
        //     .append(`<option value="${active}">${active}</option>`);

    });

});

$('#select')
    .on('change', function() {

        var room = $(this)
            .find(':selected')
            .val();
        $('#room')
            .val(room);
    });