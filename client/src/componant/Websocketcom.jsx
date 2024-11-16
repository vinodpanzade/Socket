// WebSocketcom.js
import React, { useState, useEffect } from 'react';
import './Web2.css'; // Import custom CSS

const WebSocketcom = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // Create a WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    // Listen for messages from the server
    ws.onmessage = (event) => {
      setReceivedMessage(event.data);
    };

    // Cleanup on component unmount
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(message); // Send message to the server
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="websocket-container">
      <h2 className="websocket-header">WebSocket Chat</h2>
      <div className="websocket-content">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="websocket-input"
        />
        <button onClick={sendMessage} className="websocket-button">
          Send
        </button>
      </div>
      <div className="websocket-message">
        <h4>Received Message:</h4>
        <p>{receivedMessage || 'No messages received yet.'}</p>
      </div>
    </div>
  );
};

export default WebSocketcom;
