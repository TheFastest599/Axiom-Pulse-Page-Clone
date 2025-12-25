import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Snapshot of trackable metrics for delta calculation
interface TokenSnapshot {
  buy: number; // Will derive from transactions/metrics
  sell: number; // Will derive from transactions/metrics
  tx: number; // transactions
  holders: number; // distribution.holders
  volume: number; // metrics.volume_24h
  lastTradeAt: string; // Last update timestamp
}

// Token with history for delta calculations
interface TokenHistory {
  current: TokenSnapshot;
  t1: TokenSnapshot | null; // Previous snapshot
  t2: TokenSnapshot | null; // Snapshot before t1
}

// Calculated deltas and score
export interface TokenScore {
  // Current deltas (current - t1)
  buyDelta: number;
  sellDelta: number;
  txDelta: number;
  holderDelta: number;
  volumeDelta: number;

  // Previous deltas (t1 - t2)
  buyDeltaPrev: number;
  sellDeltaPrev: number;
  txDeltaPrev: number;
  volumeDeltaPrev: number;

  // Flags
  isRecentlyActive: boolean; // lastTradeAt ≤ 10 seconds ago
  hasBuyPressure: boolean; // buyDelta > sellDelta
  hasSellPressure: boolean; // sellDelta >= buyDelta
  hasMomentumIncreasing: boolean; // buyDelta > buyDeltaPrev
  hasTransactionActivity: boolean; // txDelta > 0
  hasTxAcceleration: boolean; // txDelta > txDeltaPrev
  hasHolderGrowth: boolean; // holderDelta > 0
  hasVolumeExpansion: boolean; // volumeDelta > 0 AND volumeDelta > volumeDeltaPrev
  isYoung: boolean; // age < 3 minutes

  // Final score
  score: number;
  lastTradeAt: string;
}

interface TokenHistoryState {
  // Store history for each token by id
  history: {
    [tokenId: string]: TokenHistory;
  };
  // Calculated scores (recalculated on each update)
  scores: {
    [tokenId: string]: TokenScore;
  };
}

const initialState: TokenHistoryState = {
  history: {},
  scores: {},
};

// Create an empty snapshot
const createEmptySnapshot = (): TokenSnapshot => ({
  buy: 0,
  sell: 0,
  tx: 0,
  holders: 0,
  volume: 0,
  lastTradeAt: new Date().toISOString(),
});

// Calculate score from snapshot history
const calculateScore = (
  current: TokenSnapshot,
  t1: TokenSnapshot | null,
  t2: TokenSnapshot | null,
  createdAt: string
): TokenScore => {
  const now = new Date();
  const lastTradeTime = new Date(current.lastTradeAt);
  const tokenAge = now.getTime() - new Date(createdAt).getTime();
  const timeSinceLastTrade = now.getTime() - lastTradeTime.getTime();

  // Calculate current deltas (current - t1)
  const prev = t1 || createEmptySnapshot();
  const buyDelta = current.buy - prev.buy;
  const sellDelta = current.sell - prev.sell;
  const txDelta = current.tx - prev.tx;
  const holderDelta = current.holders - prev.holders;
  const volumeDelta = current.volume - prev.volume;

  // Calculate previous deltas (t1 - t2)
  const prevPrev = t2 || createEmptySnapshot();
  const buyDeltaPrev = prev.buy - prevPrev.buy;
  const sellDeltaPrev = prev.sell - prevPrev.sell;
  const txDeltaPrev = prev.tx - prevPrev.tx;
  const volumeDeltaPrev = prev.volume - prevPrev.volume;

  // Determine flags
  const isRecentlyActive = timeSinceLastTrade <= 10000; // 10 seconds
  const hasBuyPressure = buyDelta > sellDelta;
  const hasSellPressure = sellDelta >= buyDelta;
  const hasMomentumIncreasing = buyDelta > buyDeltaPrev;
  const hasTransactionActivity = txDelta > 0;
  const hasTxAcceleration = txDelta > txDeltaPrev;
  const hasHolderGrowth = holderDelta > 0;
  const hasVolumeExpansion = volumeDelta > 0 && volumeDelta > volumeDeltaPrev;
  const isYoung = tokenAge < 3 * 60 * 1000; // 3 minutes

  // Calculate score
  let score = 0;

  // Add to score
  if (hasBuyPressure) score += 2;
  if (hasMomentumIncreasing) score += 1;
  if (hasTransactionActivity) score += 1;
  if (hasTxAcceleration) score += 1;
  if (hasHolderGrowth) score += 1;
  if (isYoung) score += 1;

  // Subtract from score
  if (hasSellPressure) score -= 2;
  if (!isRecentlyActive) score -= 1;
  if (holderDelta <= 0) score -= 1;

  return {
    buyDelta,
    sellDelta,
    txDelta,
    holderDelta,
    volumeDelta,
    buyDeltaPrev,
    sellDeltaPrev,
    txDeltaPrev,
    volumeDeltaPrev,
    isRecentlyActive,
    hasBuyPressure,
    hasSellPressure,
    hasMomentumIncreasing,
    hasTransactionActivity,
    hasTxAcceleration,
    hasHolderGrowth,
    hasVolumeExpansion,
    isYoung,
    score,
    lastTradeAt: current.lastTradeAt,
  };
};

const tokenHistorySlice = createSlice({
  name: 'tokenHistory',
  initialState,
  reducers: {
    // Initialize history from initial snapshot
    initializeHistory: (
      state,
      action: PayloadAction<{
        tokenId: string;
        createdAt: string;
        metrics: {
          transactions: number;
          volume_24h: number;
        };
        distribution: {
          holders: number;
        };
      }>
    ) => {
      const { tokenId, createdAt, metrics, distribution } = action.payload;

      // Create initial snapshot
      // For buy/sell, we'll estimate from transactions (50/50 split initially)
      const snapshot: TokenSnapshot = {
        buy: Math.floor(metrics.transactions / 2),
        sell: Math.floor(metrics.transactions / 2),
        tx: metrics.transactions,
        holders: distribution.holders,
        volume: metrics.volume_24h,
        lastTradeAt: new Date().toISOString(),
      };

      state.history[tokenId] = {
        current: snapshot,
        t1: null,
        t2: null,
      };

      // Calculate initial score
      state.scores[tokenId] = calculateScore(snapshot, null, null, createdAt);
    },

    // Update token with new data and shift snapshots
    updateTokenHistory: (
      state,
      action: PayloadAction<{
        tokenId: string;
        createdAt: string;
        room?: string; // Track room for lifecycle resets
        metrics?: {
          transactions?: number;
          volume_24h?: number;
          bonding_progress?: number;
        };
        distribution?: {
          holders?: number;
        };
        // Optional buy/sell breakdown if backend provides it
        buy?: number;
        sell?: number;
      }>
    ) => {
      const { tokenId, createdAt, room, metrics, distribution, buy, sell } =
        action.payload;

      const history = state.history[tokenId];

      // Detect lifecycle reset: token cycled back to new_pairs with fresh data
      const shouldReset =
        history &&
        room === 'new_pairs' &&
        metrics?.bonding_progress !== undefined &&
        metrics.bonding_progress < 50 && // Low bonding progress indicates fresh start
        history.current.tx > (metrics?.transactions ?? 0) * 1.5; // Significant metric drop

      if (!history || shouldReset) {
        // Initialize if doesn't exist
        const snapshot: TokenSnapshot = {
          buy: buy ?? Math.floor((metrics?.transactions ?? 0) / 2),
          sell: sell ?? Math.floor((metrics?.transactions ?? 0) / 2),
          tx: metrics?.transactions ?? 0,
          holders: distribution?.holders ?? 0,
          volume: metrics?.volume_24h ?? 0,
          lastTradeAt: new Date().toISOString(),
        };

        state.history[tokenId] = {
          current: snapshot,
          t1: null,
          t2: null,
        };

        state.scores[tokenId] = calculateScore(snapshot, null, null, createdAt);
        return;
      }

      // Shift snapshots: t2 ← t1, t1 ← current
      const newT2 = history.t1;
      const newT1 = { ...history.current };

      // Create new current snapshot
      const current = history.current;
      const newCurrent: TokenSnapshot = {
        buy:
          buy ??
          current.buy +
            Math.floor((metrics?.transactions ?? current.tx) - current.tx) / 2,
        sell:
          sell ??
          current.sell +
            Math.ceil((metrics?.transactions ?? current.tx) - current.tx) / 2,
        tx: metrics?.transactions ?? current.tx,
        holders: distribution?.holders ?? current.holders,
        volume: metrics?.volume_24h ?? current.volume,
        lastTradeAt: new Date().toISOString(),
      };

      // Update history
      state.history[tokenId] = {
        current: newCurrent,
        t1: newT1,
        t2: newT2,
      };

      // Recalculate score
      state.scores[tokenId] = calculateScore(
        newCurrent,
        newT1,
        newT2,
        createdAt
      );
    },

    // Bulk initialize from snapshot
    initializeAllHistory: (
      state,
      action: PayloadAction<{
        tokens: Array<{
          id: string;
          created_at: string;
          metrics: {
            transactions: number;
            volume_24h: number;
          };
          distribution: {
            holders: number;
          };
        }>;
      }>
    ) => {
      const { tokens } = action.payload;

      tokens.forEach(token => {
        const snapshot: TokenSnapshot = {
          buy: Math.floor(token.metrics.transactions / 2),
          sell: Math.floor(token.metrics.transactions / 2),
          tx: token.metrics.transactions,
          holders: token.distribution.holders,
          volume: token.metrics.volume_24h,
          lastTradeAt: new Date().toISOString(),
        };

        state.history[token.id] = {
          current: snapshot,
          t1: null,
          t2: null,
        };

        state.scores[token.id] = calculateScore(
          snapshot,
          null,
          null,
          token.created_at
        );
      });
    },

    // Clear all history
    clearHistory: state => {
      state.history = {};
      state.scores = {};
    },
  },
});

export const {
  initializeHistory,
  updateTokenHistory,
  initializeAllHistory,
  clearHistory,
} = tokenHistorySlice.actions;

export default tokenHistorySlice.reducer;
