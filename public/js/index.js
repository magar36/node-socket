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

  var timeMoment = moment(newMsg.createdAt).format('h:mm A');
  var template = jQuery('#msg-template').html();
  var html = Mustache.render(template, {
    text: newMsg.text,
    from: newMsg.from,
    createdAt: timeMoment
  });
  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // li.text(`${newMsg.from}: ${timeMoment} ${newMsg.text}`);
  // jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(locationMsg) {

  var timeMoment = moment(locationMsg.createdAt).format('h:mm A');
  var locationTemplate = jQuery('#location-template').html();
  var htmlLocationMsg = Mustache.render(locationTemplate, {
    from: locationMsg.from,
    url: locationMsg.url,
    createdAt: timeMoment
  });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${locationMsg.from}: ${timeMoment} `);
  // a.attr('href', locationMsg.url);
  // li.append(a);
  jQuery('#messages').append(htmlLocationMsg);

});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var formText = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: formText.val()
  }, function() {
    formText.val('');
  });
});

var locationButton = jQuery('#location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return
    alert('Geolocation not supported on the browser');
  };

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {

    locationButton.removeAttr('disabled').text('Send location');;
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function() {
    locationButton.removeAttr('disabled').text('Send location');;
    alert('Unable to fetch location');
  });

});


// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
