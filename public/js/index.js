var socket = io();

socket.on('actvRoomList', function(rooms) {
  rooms.forEach(function(room) {
    jQuery('#active-rooms').append('<option value ="${room}">${room}</option>');
  });
});

// jQuery('#active-rooms').on('change', function() {
//          var room = jQuery(this).find(':selected').val();
//          jQuery('#room').val(room);
//     });
