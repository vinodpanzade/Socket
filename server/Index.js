// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Allow requests from this origin
      methods: ['GET', 'POST'],
    },
  });
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Socket.IO server is running.');
});

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Listen for 'message' event from the client
  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Send a response back to all connected clients
    io.emit('message', `Server received: ${data}`);
  });

  // Handle client disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
