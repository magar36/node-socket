const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isValidString} = require('./utils/validation');
const {Users} = require('./utils/users');
const port = process.env.PORT || 2400;

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isValidString(params.name) || !isValidString(params.room)) {
      return callback('Please enter a valid name and room');
    };

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  // socket.emit('newEmail', {
  //   from: 'mohit@gmail.com',
  //   text: 'Hello!',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (crtEmail) => {
  //   console.log('Create Email', crtEmail);
  // });

  // socket.emit('newMessage', {
  //   from: 'mohit@gmail.com',
  //   text: 'Hello!',
  //   createdAt: 123
  // });

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  //
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', (createMsg, callback) => {
    if(isValidString(createMsg.text)){
      io.to(createMsg.room).emit('newMessage', generateMessage(createMsg.from, createMsg.text));
    };
    callback();
    //{
    //   from: createMsg.from,
    //   text: createMsg.text,
    //   createdAt: new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage', {
    //   from: createMsg.from,
    //   text: createMsg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    if(isValidString(createMsg.text)){
      io.to(coords.room).emit('newLocationMessage', generateLocationMessage(coords.name, coords.latitude, coords.longitude));
    };
});

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
    };
  });
});

app.use(express.static(publicPath));

httpServer.listen(port, () => {
  console.log(`The server is running on port ${port}`)
});
