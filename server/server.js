const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');



// const socket = new WebSocket('ws://localhost:8080');

// const http = require('http');
// const WebSocket = require('ws');

// const server = http.createServer((req, res) => {
//   // Serve your client-side code here
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>WebSocket Server</h1>');
//   res.end();
// });

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   ws.on('message', (message) => {
//     console.log(`Received: ${message}`);
//     ws.send(`Server received: ${message}`);
   
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(8080, () => {
//   console.log('WebSocket server is running on http://localhost:8080');
// });