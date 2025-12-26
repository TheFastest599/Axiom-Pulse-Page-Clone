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

  // Preset selection
  selectedPreset: number;

  // Display mode
  displayMode: 'list' | 'grid' | 'compact';

  // Active navigation tab
  activeNavTab: string;
}

const initialState: UIState = {
  wsConnected: false,
  activeRoom: 'new_pairs',
  searchQuery: '',
  selectedTokenId: null,
  selectedPreset: 1,
  displayMode: 'list',
  activeNavTab: 'pulse',
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

    // Preset selection
    setSelectedPreset: (state, action: PayloadAction<number>) => {
      state.selectedPreset = action.payload;
    },

    // Display mode
    setDisplayMode: (
      state,
      action: PayloadAction<'list' | 'grid' | 'compact'>
    ) => {
      state.displayMode = action.payload;
    },

    // Navigation tab
    setActiveNavTab: (state, action: PayloadAction<string>) => {
      state.activeNavTab = action.payload;
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
  setSelectedPreset,
  setDisplayMode,
  setActiveNavTab,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
