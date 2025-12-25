import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { TokenScore } from './tokenHistorySlice';

// Data selectors
export const selectTokens = (state: RootState) => state.data.tokens;
export const selectNewPairsTokens = (state: RootState) =>
  state.data.tokens.new_pairs;
export const selectFinalStretchTokens = (state: RootState) =>
  state.data.tokens.final_stretch;
export const selectMigratedTokens = (state: RootState) =>
  state.data.tokens.migrated;
export const selectMarketData = (state: RootState) => state.data.market;
export const selectDataLoading = (state: RootState) => state.data.isLoading;
export const selectDataError = (state: RootState) => state.data.error;
export const selectLastUpdate = (state: RootState) => state.data.lastUpdate;

// Token history selectors
export const selectTokenScores = (state: RootState) =>
  state.tokenHistory.scores;
export const selectTokenScore = (state: RootState, tokenId: string) =>
  state.tokenHistory.scores[tokenId] || null;

// Get token by ID from any room
export const selectTokenById = (state: RootState, tokenId: string) => {
  const { new_pairs, final_stretch, migrated } = state.data.tokens;
  return (
    new_pairs[tokenId] || final_stretch[tokenId] || migrated[tokenId] || null
  );
};

// Get all tokens from active room (memoized)
export const selectActiveRoomTokens = createSelector(
  [selectTokens, (state: RootState) => state.ui.activeRoom],
  (tokens, activeRoom) => {
    if (activeRoom === 'all') {
      return {
        ...tokens.new_pairs,
        ...tokens.final_stretch,
        ...tokens.migrated,
      };
    }
    return tokens[activeRoom];
  }
);

// Get token count per room (memoized)
export const selectTokenCounts = createSelector(
  [selectNewPairsTokens, selectFinalStretchTokens, selectMigratedTokens],
  (newPairs, finalStretch, migrated) => ({
    new_pairs: Object.keys(newPairs).length,
    final_stretch: Object.keys(finalStretch).length,
    migrated: Object.keys(migrated).length,
    total:
      Object.keys(newPairs).length +
      Object.keys(finalStretch).length +
      Object.keys(migrated).length,
  })
);

// UI selectors
export const selectWsConnected = (state: RootState) => state.ui.wsConnected;
export const selectActiveRoom = (state: RootState) => state.ui.activeRoom;
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectSelectedTokenId = (state: RootState) =>
  state.ui.selectedTokenId;

// Token with score for display
export interface TokenWithScore {
  token: ReturnType<typeof selectTokenById>;
  score: TokenScore | null;
  rank: number;
  isTopPriority: boolean; // Top 3-5 rows
  isDeprioritized: boolean; // score <= 2 or repeated inactivity
}

// Sorted and scored tokens (memoized)
export const selectSortedTokensWithScores = createSelector(
  [selectActiveRoomTokens, selectTokenScores, selectSearchQuery],
  (tokens, scores, searchQuery) => {
    const query = searchQuery.toLowerCase();
    let tokenArray = Object.values(tokens);

    // Filter by search query
    if (query) {
      tokenArray = tokenArray.filter(
        token =>
          token.name.toLowerCase().includes(query) ||
          token.ticker.toLowerCase().includes(query) ||
          token.id.toLowerCase().includes(query)
      );
    }

    // Map tokens with their scores
    const tokensWithScores = tokenArray.map(token => {
      const score = scores[token.id] || null;
      return { token, score };
    });

    // Sort by score (descending), then by lastTradeAt (most recent first)
    tokensWithScores.sort((a, b) => {
      const scoreA = a.score?.score ?? 0;
      const scoreB = b.score?.score ?? 0;

      if (scoreB !== scoreA) {
        return scoreB - scoreA; // Higher score first
      }

      // If scores are equal, sort by lastTradeAt
      const timeA = a.score?.lastTradeAt
        ? new Date(a.score.lastTradeAt).getTime()
        : 0;
      const timeB = b.score?.lastTradeAt
        ? new Date(b.score.lastTradeAt).getTime()
        : 0;
      return timeB - timeA; // More recent first
    });

    // Add rank and priority flags
    return tokensWithScores.map(
      (item, index): TokenWithScore => ({
        token: item.token,
        score: item.score,
        rank: index + 1,
        isTopPriority: index < 5, // Top 5 rows
        isDeprioritized:
          (item.score?.score ?? 0) <= 2 || !item.score?.isRecentlyActive,
      })
    );
  }
);

// Filtered tokens (memoized) - kept for backward compatibility
export const selectFilteredTokens = createSelector(
  [selectActiveRoomTokens, selectSearchQuery],
  (tokens, searchQuery) => {
    const query = searchQuery.toLowerCase();
    let tokenArray = Object.values(tokens);

    if (query) {
      tokenArray = tokenArray.filter(
        token =>
          token.name.toLowerCase().includes(query) ||
          token.ticker.toLowerCase().includes(query) ||
          token.id.toLowerCase().includes(query)
      );
    }

    return tokenArray;
  }
);
