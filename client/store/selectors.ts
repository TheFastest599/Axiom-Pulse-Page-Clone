import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

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

// Filtered tokens (memoized)
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
