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
  socket.on('disconnect',() => {
    console.log('User disconnected');
  });
});

app.use(express.static(publicPath));

httpServer.listen(port, () => {
  console.log(`The server is running on port ${port}`)
});
