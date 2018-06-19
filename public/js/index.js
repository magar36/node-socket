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

  socket.on('newLocationMessage', function(locationMsg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${locationMsg.from}:  `);
    a.attr('href', locationMsg.url);
    li.append(a);
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

var locationButton = jQuery('#location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return
      alert('Geolocation not supported on the browser');
  };

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    alert('Unable to fetch location');
  });

});


// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
