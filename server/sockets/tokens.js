/**
 * Token Socket Handler
 * Handles Socket.IO connections for token updates
 */

let tokenUpdateManager;

/**
 * Initialize socket handler with dependencies
 */
function initializeHandler(updateManager) {
  tokenUpdateManager = updateManager;
  return handleConnection;
}

/**
 * Handle token socket connections
 */
function handleConnection(socket) {
  console.log('🔌 New client connected to token updates');

  // Join the tokens room
  socket.join('tokens');

  // Send welcome message
  socket.emit('connected', {
    message: 'Connected to token updates channel',
    timestamp: new Date().toISOString(),
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected from token updates');
  });

  socket.on('error', error => {
    console.error('❌ Socket.IO error (tokens):', error);
  });
}

module.exports = { initializeHandler };
