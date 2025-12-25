/**
 * Mock Data Generator for Token Trading Table
 */

const TokenSchema = require('./tokenSchema');

// Sample token names and tickers
const tokenNames = [
  { name: 'SolFray', ticker: 'FRAY' },
  { name: 'MoonPump', ticker: 'MOON' },
  { name: 'DiamondHands', ticker: 'DHAND' },
  { name: 'RocketFuel', ticker: 'RFUEL' },
  { name: 'GigaChad', ticker: 'GIGA' },
  { name: 'ShibaKing', ticker: 'SKING' },
  { name: 'PepeMax', ticker: 'PEMAX' },
  { name: 'DogeElite', ticker: 'DELITE' },
  { name: 'ApeStrong', ticker: 'APES' },
  { name: 'WhaleTank', ticker: 'WHALE' },
  { name: 'BullRun', ticker: 'BULL' },
  { name: 'LaserEyes', ticker: 'LASER' },
  { name: 'SatoshiLegacy', ticker: 'SATO' },
  { name: 'VitalikVibes', ticker: 'VITAL' },
  { name: 'StackSats', ticker: 'STACK' },
];

const protocols = [
  { id: 'pump', label: 'Pump' },
  { id: 'mayhem', label: 'Mayhem' },
  { id: 'bonk', label: 'Bonk' },
  { id: 'bags', label: 'Bags' },
  { id: 'moonshot', label: 'Moonshot' },
  { id: 'heaven', label: 'Heaven' },
  { id: 'daos_fun', label: 'Daos.fun' },
  { id: 'candle', label: 'Candle' },
  { id: 'sugar', label: 'Sugar' },
  { id: 'believe', label: 'Believe' },
  { id: 'jupiter_studio', label: 'Jupiter Studio' },
  { id: 'moonit', label: 'Moonit' },
  { id: 'boop', label: 'Boop' },
  { id: 'launchlab', label: 'LaunchLab' },
  { id: 'dynamic_bc', label: 'Dynamic BC' },
];

/**
 * Generate a random token with static and dynamic fields
 */
function generateToken(index, room = null) {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const now = new Date();
  const createdAt = new Date(
    now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ); // Random time in last 7 days

  // Determine room name from room config
  const roomName = room?.name || 'new_pairs';

  const staticData = {
    id: `${generateRandomId()}pump`,
    name: `${tokenInfo.name}${
      index > tokenNames.length - 1
        ? ` #${Math.floor(index / tokenNames.length) + 1}`
        : ''
    }`,
    ticker: tokenInfo.ticker,
    image_url: `https://api.dicebear.com/7.x/identicon/svg?seed=${tokenInfo.ticker}${index}`,
    created_at: createdAt.toISOString(),
    protocol: protocol,
    room: roomName, // Store the fixed room assignment
    influence: {
      kols_count: Math.floor(Math.random() * 10),
      kol_allocation_pct: Math.floor(Math.random() * 20),
      social_links: {
        website:
          Math.random() > 0.5
            ? `https://${tokenInfo.ticker.toLowerCase()}.com`
            : null,
        twitter:
          Math.random() > 0.3
            ? `https://twitter.com/${tokenInfo.ticker.toLowerCase()}`
            : null,
        telegram:
          Math.random() > 0.4
            ? `https://t.me/${tokenInfo.ticker.toLowerCase()}`
            : null,
      },
    },
  };

  const dynamicData = generateDynamicData(room);

  return new TokenSchema({ ...staticData, ...dynamicData });
}

/**
 * Generate random dynamic data for a token
 */
function generateDynamicData(room = null) {
  const marketCap = Math.floor(Math.random() * 1000000) + 5000;

  let bondingProgress;
  let isMigrated = false;

  if (room) {
    if (room.isMigrated) {
      // For migrated tokens
      bondingProgress = 100; // Always 100 for migrated
      isMigrated = true;
    } else if (room.bondingRange) {
      // For specific bonding ranges
      const [min, max] = room.bondingRange;
      bondingProgress = Math.random() * (max - min) + min;
    }
  } else {
    // Fallback for old behavior
    bondingProgress = Math.random() * 100;
    isMigrated = bondingProgress >= 100;
  }

  return {
    metrics: {
      market_cap: marketCap,
      volume_24h: Math.floor(Math.random() * marketCap * 0.5),
      price_sol: parseFloat((Math.random() * 0.5).toFixed(6)),
      transactions: Math.floor(Math.random() * 5000) + 100,
      global_fees_paid: Math.floor(Math.random() * 1000),
      bonding_progress: parseFloat(bondingProgress.toFixed(2)),
      price_change_dir: Math.random() > 0.5 ? 'up' : 'down',
    },
    distribution: {
      holders: Math.floor(Math.random() * 3000) + 50,
      pro_traders: Math.floor(Math.random() * 100),
      dev_status: {
        is_migrated: isMigrated,
        dev_created_count: Math.floor(Math.random() * 50),
        dev_hold_percent: parseFloat((Math.random() * 10).toFixed(2)),
      },
      bundle_holding: parseFloat((Math.random() * 20).toFixed(2)),
      snipers_holding: parseFloat((Math.random() * 25).toFixed(2)),
      insiders_holding: parseFloat((Math.random() * 15).toFixed(2)),
    },
    security: {
      lp_burned: Math.floor(Math.random() * 101),
      is_honeypot: Math.random() > 0.9,
      top_10_holders_pct: parseFloat((Math.random() * 30 + 10).toFixed(2)),
    },
  };
}

/**
 * Generate a delta update for a token (only dynamic fields change)
 */
function generateDeltaUpdate(token) {
  const delta = {};

  // Randomly update metrics
  if (Math.random() > 0.3) {
    const priceChange = (Math.random() - 0.5) * 0.1; // ±10% change
    const volumeChange = (Math.random() - 0.4) * 0.2; // -40% to +60% change

    delta.metrics = {
      market_cap: Math.max(
        1000,
        Math.floor(token.metrics.market_cap * (1 + priceChange))
      ),
      volume_24h: Math.max(
        100,
        Math.floor(token.metrics.volume_24h * (1 + volumeChange))
      ),
      price_sol: parseFloat(
        Math.max(0.000001, token.metrics.price_sol * (1 + priceChange)).toFixed(
          6
        )
      ),
      transactions: token.metrics.transactions + Math.floor(Math.random() * 10),
      global_fees_paid:
        token.metrics.global_fees_paid + Math.floor(Math.random() * 5),
      bonding_progress: Math.min(
        100,
        token.metrics.bonding_progress + Math.random() * 2
      ),
      price_change_dir: priceChange > 0 ? 'up' : 'down',
    };
  }

  // Occasionally update distribution
  if (Math.random() > 0.7) {
    delta.distribution = {
      holders: token.distribution.holders + Math.floor(Math.random() * 5),
      pro_traders:
        token.distribution.pro_traders + (Math.random() > 0.8 ? 1 : 0),
    };
  }

  // Rarely update security
  if (Math.random() > 0.9) {
    delta.security = {
      top_10_holders_pct: parseFloat(
        (token.security.top_10_holders_pct + (Math.random() - 0.5) * 2).toFixed(
          2
        )
      ),
    };
  }

  return Object.keys(delta).length > 0 ? delta : null;
}

/**
 * Generate random ID
 */
function generateRandomId() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate initial set of tokens
 */
function generateInitialTokens() {
  const tokens = [];

  // Generate 30 tokens for each room
  const rooms = [
    { name: 'new_pairs', count: 30, bondingRange: [0, 89] },
    { name: 'final_stretch', count: 30, bondingRange: [90, 99] },
    { name: 'migrated', count: 30, isMigrated: true },
  ];

  let tokenIndex = 0;

  rooms.forEach(room => {
    for (let i = 0; i < room.count; i++) {
      const token = generateToken(tokenIndex, room);
      tokens.push(token);
      tokenIndex++;
    }
  });

  return tokens;
}

module.exports = {
  generateInitialTokens,
  generateDeltaUpdate,
  generateDynamicData,
};
