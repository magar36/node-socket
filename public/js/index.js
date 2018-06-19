var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
  // socket.emit('createEmail', {
  //   to: 'mohit@gmail',
  //   text: 'This is an email'
  // });

//   socket.emit('createMessage', {
//     from: 'mohit@gmail',
//     text: 'This is a message'
//   });
//
// });

socket.on('newMessage', function(newMsg) {
  console.log('Got new message', newMsg);

  var li = jQuery('<li></li>');
  li.text(`${newMsg.from}: ${newMsg.text}`);
  jQuery('#messages').append(li);
  
  });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});


// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
