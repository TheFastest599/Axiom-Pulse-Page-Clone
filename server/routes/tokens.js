/**
 * Token Routes
 * Handles all token-related REST API endpoints
 */

const express = require('express');
const router = express.Router();
const TokenUpdateManager = require('../tokenUpdates');

// Import tokens from main server (will be passed when mounting)
let tokens;
let tokenUpdateManager;

/**
 * Initialize routes with dependencies
 */
function initializeRoutes(tokensArray, updateManager) {
  tokens = tokensArray;
  tokenUpdateManager = updateManager;
  return router;
}

/**
 * GET /api/tokens/snapshot
 * Returns initial snapshot of all tokens grouped by room
 */
router.get('/snapshot', (req, res) => {
  console.log('📸 Snapshot request received');

  // Group tokens by room
  const groupedTokens = {
    new_pairs: { count: 0, tokens: [] },
    final_stretch: { count: 0, tokens: [] },
    migrated: { count: 0, tokens: [] },
  };

  tokens.forEach(token => {
    const room = tokenUpdateManager.getTokenRoom(token);
    groupedTokens[room].tokens.push(token.toJSON());
    groupedTokens[room].count++;
  });

  // Randomize the order of tokens within each room
  Object.keys(groupedTokens).forEach(room => {
    groupedTokens[room].tokens.sort(() => Math.random() - 0.5);
  });

  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    totalCount: tokens.length,
    rooms: groupedTokens,
  });
});

/**
 * GET /api/tokens/:id
 * Get specific token by ID
 */
router.get('/:id', (req, res) => {
  const token = tokens.find(t => t.id === req.params.id);
  if (!token) {
    return res.status(404).json({ success: false, error: 'Token not found' });
  }
  res.json({
    success: true,
    token: token.toJSON(),
  });
});

module.exports = { initializeRoutes };
