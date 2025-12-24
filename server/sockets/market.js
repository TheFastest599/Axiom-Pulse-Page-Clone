/**
 * Market WebSocket Handler
 * Handles WebSocket connections for market data
 */

let marketUpdateManager;
let marketData;

/**
 * Initialize socket handler with dependencies
 */
function initializeHandler(marketDataRef) {
  marketData = marketDataRef;
  return function (updateManager) {
    marketUpdateManager = updateManager;
    return handleConnection;
  };
}

/**
 * Handle market WebSocket connections
 */
function handleConnection(ws) {
  console.log('🔌 New client connected to market data');

  // Add to market room
  marketUpdateManager.addClient(ws);

  // Send initial market data
  ws.send(
    JSON.stringify({
      type: 'market_snapshot',
      timestamp: new Date().toISOString(),
      data: marketData,
    })
  );

  // Handle client disconnect
  ws.on('close', () => {
    marketUpdateManager.removeClient(ws);
    console.log('🔌 Client disconnected from market data');
  });

  ws.on('error', error => {
    console.error('❌ WebSocket error (market):', error);
    marketUpdateManager.removeClient(ws);
  });
}

module.exports = { initializeHandler };
