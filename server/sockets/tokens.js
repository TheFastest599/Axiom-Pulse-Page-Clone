/**
 * Token WebSocket Handler
 * Handles WebSocket connections for token updates
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
 * Handle token WebSocket connections
 */
function handleConnection(ws) {
  console.log('🔌 New client connected to token updates');

  // Add to tokens room
  tokenUpdateManager.addClient(ws);

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'Connected to token updates channel',
      timestamp: new Date().toISOString(),
    })
  );

  // Handle client disconnect
  ws.on('close', () => {
    tokenUpdateManager.removeClient(ws);
    console.log('🔌 Client disconnected from token updates');
  });

  ws.on('error', error => {
    console.error('❌ WebSocket error (tokens):', error);
    tokenUpdateManager.removeClient(ws);
  });
}

module.exports = { initializeHandler };
