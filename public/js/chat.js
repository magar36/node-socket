var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMsg = messages.children('li:last-child');

  var scrollTop = messages.prop('scrollTop');
  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var newMsgHeight = newMsg.innerHeight();
  var lastMsgHeight = newMsg.prev().innerHeight();

  if(scrollTop + clientHeight + newMsgHeight + lastMsgHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

};

socket.on('connect', function() {
  // console.log('Connected to server');
  var searchParams = jQuery.deparam(window.location.search);
    socket.emit('join', searchParams, function(err) {
      if(err)
      {
        alert(err);
        window.location.href = '/';
      }
    });
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

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(userName) {
    ol.append(jQuery('<li></li>').text(userName));
  });

  jQuery('#users').html(ol);

});

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
  scrollToBottom();

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
  scrollToBottom();
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
