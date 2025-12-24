/**
 * Market Socket Handler
 * Handles Socket.IO connections for market data
 */

let marketData;

/**
 * Initialize socket handler with dependencies
 */
function initializeHandler(marketDataRef) {
  marketData = marketDataRef;
  return handleConnection;
}

/**
 * Handle market socket connections
 */
function handleConnection(socket) {
  console.log('🔌 New client connected to market data');

  // Join the market room
  socket.join('market');

  // Send initial market data
  socket.emit('market_snapshot', {
    timestamp: new Date().toISOString(),
    data: marketData,
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected from market data');
  });

  socket.on('error', error => {
    console.error('❌ Socket.IO error (market):', error);
  });
}

module.exports = { initializeHandler };
