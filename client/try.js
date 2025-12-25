const WebSocket = require('ws');

// Connect to the combined WebSocket
const ws = new WebSocket('ws://localhost:3001/ws');

ws.on('open', () => {
  console.log('Connected to WebSocket');
});

ws.on('message', data => {
  const message = JSON.parse(data);
  if (message.type === 'token_update') {
    console.log('Token update:', message);
  } else if (message.type === 'market_update') {
    console.log('Market update:', message);
  } else {
    console.log('Other message:', message);
  }
});

ws.on('close', () => console.log('Disconnected'));
ws.on('error', error => console.error('Error:', error));
