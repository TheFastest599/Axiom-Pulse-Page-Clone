const WebSocket = require('ws');

// Connect to tokens WebSocket
const tokenWs = new WebSocket('ws://localhost:3001/tokens');

tokenWs.on('open', () => {
  console.log('Connected to tokens WebSocket');
});

tokenWs.on('message', data => {
  const message = JSON.parse(data);
  console.log('Token update:', message);
});

tokenWs.on('close', () => console.log('Disconnected from tokens'));
tokenWs.on('error', error => console.error('Tokens WS error:', error));

// Connect to market WebSocket
const marketWs = new WebSocket('ws://localhost:3001/market');

marketWs.on('open', () => {
  console.log('Connected to market WebSocket');
});

marketWs.on('message', data => {
  const message = JSON.parse(data);
  console.log('Market update:', message);
});

marketWs.on('close', () => console.log('Disconnected from market'));
marketWs.on('error', error => console.error('Market WS error:', error));
