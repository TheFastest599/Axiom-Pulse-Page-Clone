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

// Get all tokens from active room
export const selectActiveRoomTokens = (state: RootState) => {
  const activeRoom = state.ui.activeRoom;
  if (activeRoom === 'all') {
    return {
      ...state.data.tokens.new_pairs,
      ...state.data.tokens.final_stretch,
      ...state.data.tokens.migrated,
    };
  }
  return state.data.tokens[activeRoom];
};

// Get token count per room
export const selectTokenCounts = (state: RootState) => ({
  new_pairs: Object.keys(state.data.tokens.new_pairs).length,
  final_stretch: Object.keys(state.data.tokens.final_stretch).length,
  migrated: Object.keys(state.data.tokens.migrated).length,
  total:
    Object.keys(state.data.tokens.new_pairs).length +
    Object.keys(state.data.tokens.final_stretch).length +
    Object.keys(state.data.tokens.migrated).length,
});

// UI selectors
export const selectWsConnected = (state: RootState) => state.ui.wsConnected;
export const selectActiveRoom = (state: RootState) => state.ui.activeRoom;
export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectSelectedTokenId = (state: RootState) =>
  state.ui.selectedTokenId;

// Filtered tokens
export const selectFilteredTokens = (state: RootState) => {
  const tokens = selectActiveRoomTokens(state);
  const searchQuery = state.ui.searchQuery.toLowerCase();

  // Convert to array for filtering
  let tokenArray = Object.values(tokens);

  // Filter by search query
  if (searchQuery) {
    tokenArray = tokenArray.filter(
      token =>
        token.name.toLowerCase().includes(searchQuery) ||
        token.ticker.toLowerCase().includes(searchQuery) ||
        token.id.toLowerCase().includes(searchQuery)
    );
  }

  return tokenArray;
};
