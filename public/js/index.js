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

socket.on('newMessage', (newMsg) => {
  console.log('Got new message', newMsg);
});

// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
