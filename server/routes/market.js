/**
 * Market Routes
 * Handles market data REST API endpoints
 */

const express = require('express');
const router = express.Router();

// Market data storage (will be passed when mounting)
let marketData;

/**
 * Initialize routes with dependencies
 */
function initializeRoutes(marketDataRef) {
  marketData = marketDataRef;
  return router;
}

/**
 * GET /api/market
 * Get current market data (BTC, ETH, SOL prices)
 */
router.get('/', (req, res) => {
  console.log('📊 Market data request received');
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: marketData,
  });
});

module.exports = { initializeRoutes };
