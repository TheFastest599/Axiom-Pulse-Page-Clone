/**
 * Axiom Pulse Clone - Express + WebSocket Backend Server
 *
 * Features:
 * 1. REST API for initial token snapshot
 * 2. WebSocket for real-time token delta updates
 * 3. WebSocket for market data (BTC/ETH prices)
 */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import core modules
const TokenSchema = require('./tokenSchema');
const TokenUpdateManager = require('./tokenUpdates');
const MarketUpdateManager = require('./marketUpdates');

// Import route handlers
const { initializeRoutes: initializeTokenRoutes } = require('./routes/tokens');
const { initializeRoutes: initializeMarketRoutes } = require('./routes/market');
const { initializeRoutes: initializeHealthRoutes } = require('./routes/health');

// Import socket handlers
const {
  initializeHandler: initializeTokenSocket,
} = require('./sockets/tokens');
const {
  initializeHandler: initializeMarketSocket,
} = require('./sockets/market');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Middleware
app.use(cors());
app.use(express.json());

// Load tokens from tokens.json (fixed IDs for consistent delta updates)
let tokens;
try {
  const tokensPath = path.join(__dirname, 'tokens.json');
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  tokens = tokensData.map(tokenData => new TokenSchema(tokenData));
  console.log(`📁 Loaded ${tokens.length} tokens from tokens.json`);
} catch (error) {
  console.error('❌ Failed to load tokens.json:', error.message);
  console.log('🔄 Falling back to generating new tokens...');
  const { generateInitialTokens } = require('./mockData');
  tokens = generateInitialTokens();
}

// Load market data from market.json
let marketData;
try {
  const marketPath = path.join(__dirname, 'market.json');
  marketData = JSON.parse(fs.readFileSync(marketPath, 'utf8'));
  console.log('📊 Loaded market data from market.json');
} catch (error) {
  console.error('❌ Failed to load market.json:', error.message);
  console.log('🔄 Falling back to default market data...');
  marketData = {
    btc: {
      price: 43250.5,
      change_24h: 2.5,
      volume_24h: 28500000000,
    },
    eth: {
      price: 2280.75,
      change_24h: -1.2,
      volume_24h: 12400000000,
    },
    sol: {
      price: 98.32,
      change_24h: 5.8,
      volume_24h: 1850000000,
    },
  };
}

// Initialize managers and handlers
const tokenUpdateManager = new TokenUpdateManager(tokens, wss);
const marketUpdateManager = new MarketUpdateManager(marketData, wss);

// Initialize routes with dependencies
app.use('/api/tokens', initializeTokenRoutes(tokens, tokenUpdateManager));
app.use('/api/market', initializeMarketRoutes(marketData));
app.use(
  '/api/health',
  initializeHealthRoutes(tokenUpdateManager, marketUpdateManager)
);

// ============================================
// WEBSOCKET UPGRADE HANDLING
// ============================================

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url;

  if (pathname === '/ws') {
    wss.handleUpgrade(request, socket, head, ws => {
      // Add to both token and market clients
      initializeTokenSocket(tokenUpdateManager)(ws);
      initializeMarketSocket(marketData)(marketUpdateManager)(ws);
    });
  } else {
    socket.destroy();
  }
});

// ============================================
// START PERIODIC UPDATES
// ============================================

// Start token updates (1 token every 100 milliseconds)
tokenUpdateManager.start(process.env.TOKEN_UPDATE_INTERVAL || 100);

// Start market updates (every 1 second)
marketUpdateManager.start(process.env.MARKET_UPDATE_INTERVAL || 1000);

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   🚀 Axiom Pulse Server Running             ║
╠══════════════════════════════════════════════╣
║   HTTP Server:    http://localhost:${PORT}     ║
║   WebSocket:      ws://localhost:${PORT}      ║
╠══════════════════════════════════════════════╣
║   REST Endpoints:                           ║
║   GET  /api/tokens/snapshot                  ║
║   GET  /api/tokens/:id                       ║
║   GET  /api/market                           ║
║   GET  /api/health                           ║
╠══════════════════════════════════════════════╣
║   WebSocket Endpoint:                       ║
║   ws://localhost:${PORT}/ws  → All updates     ║
╚══════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, closing server...');
  tokenUpdateManager.stop();
  marketUpdateManager.stop();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
