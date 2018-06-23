var socket = io();

socket.on('actvRoomList', function(rooms) {
  rooms.forEach(function(room) {
    jQuery('#active-rooms').append(`<option value ="${room}">${room}</option>`);
  });
});
