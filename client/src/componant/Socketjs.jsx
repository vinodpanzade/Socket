// WebSocketcom.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './socketdesign.css'; // Custom CSS file

const Socketjs = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // Initialize the Socket.IO connection
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on('message', (data) => {
      setReceivedMessage(data);
    });

    // Cleanup the connection on component unmount
    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message); // Send message to the server
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="socket-container">
      <h2 className="socket-header">Socket.IO Chat</h2>
      <div className="socket-content">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="socket-input"
        />
        <button className="socket-button" onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className="socket-message">
        <h4>Received Message:</h4>
        <p>{receivedMessage || 'No message received yet.'}</p>
      </div>
    </div>
  );
};

export default Socketjs;
