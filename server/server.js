const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 2400;

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

io.on('connection', (socket) => {
  console.log('New user connected');

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

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Hello Mohit, welcome to the chat!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined the chat.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (createMsg) => {
    console.log('Create Message', createMsg);

    // io.emit('newMessage', {
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

  socket.on('disconnect',() => {
    console.log('User disconnected');
  });
});

app.use(express.static(publicPath));

httpServer.listen(port, () => {
  console.log(`The server is running on port ${port}`)
});
