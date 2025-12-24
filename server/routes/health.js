/**
 * Health Routes
 * Handles health check endpoints
 */

const express = require('express');
const router = express.Router();

// Dependencies (will be passed when mounting)
let tokenUpdateManager;
let marketUpdateManager;
let io;

/**
 * Initialize routes with dependencies
 */
function initializeRoutes(updateManager, marketManager, ioInstance) {
  tokenUpdateManager = updateManager;
  marketUpdateManager = marketManager;
  io = ioInstance;
  return router;
}

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (req, res) => {
  const tokenUpdateStatus = tokenUpdateManager.getStatus();
  const marketUpdateStatus = marketUpdateManager.getStatus();

  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    connections: {
      tokens: io.sockets.adapter.rooms.get('tokens')?.size || 0,
      market: io.sockets.adapter.rooms.get('market')?.size || 0,
    },
    tokenUpdates: {
      isRunning: tokenUpdateStatus.isRunning,
      totalTokens: tokenUpdateStatus.totalTokens,
    },
    marketUpdates: {
      isRunning: marketUpdateStatus.isRunning,
      marketCoins: marketUpdateStatus.marketCoins,
    },
  });
});

module.exports = { initializeRoutes };
