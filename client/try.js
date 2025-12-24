const io = require('socket.io-client');

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');

  // Join rooms
  socket.emit('join_tokens');
  socket.emit('join_market');
});

socket.on('token_update', data => console.log('Token update:', data));
socket.on('market_update', data => console.log('Market update:', data));

socket.on('disconnect', () => console.log('Disconnected'));
