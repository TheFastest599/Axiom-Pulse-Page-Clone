import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  // WebSocket connection status
  wsConnected: boolean;

  // Active room filter
  activeRoom: 'new_pairs' | 'final_stretch' | 'migrated' | 'all';

  // Search
  searchQuery: string;

  // Selected token
  selectedTokenId: string | null;
}

const initialState: UIState = {
  wsConnected: false,
  activeRoom: 'all',
  searchQuery: '',
  selectedTokenId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // WebSocket status
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },

    // Room filter
    setActiveRoom: (
      state,
      action: PayloadAction<'new_pairs' | 'final_stretch' | 'migrated' | 'all'>
    ) => {
      state.activeRoom = action.payload;
    },

    // Search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Token selection
    setSelectedTokenId: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },

    // Reset UI state
    resetUI: () => initialState,
  },
});

export const {
  setWsConnected,
  setActiveRoom,
  setSearchQuery,
  setSelectedTokenId,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
