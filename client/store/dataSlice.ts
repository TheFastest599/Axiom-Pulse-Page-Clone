import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Token interface matching the backend schema
interface Token {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
  created_at: string;
  protocol: {
    id: string;
    label: string;
  };
  influence: {
    kols_count: number;
    kol_allocation_pct: number;
    social_links: {
      website: string | null;
      twitter: string | null;
      telegram: string | null;
    };
  };
  metrics: {
    market_cap: number;
    volume_24h: number;
    price_sol: number;
    transactions: number;
    global_fees_paid: number;
    bonding_progress: number;
    price_change_dir: string;
  };
  distribution: {
    holders: number;
    pro_traders: number;
    dev_status: {
      is_migrated: boolean;
      dev_created_count: number;
      dev_hold_percent: number;
    };
    bundle_holding: number;
    snipers_holding: number;
    insiders_holding: number;
  };
  security: {
    lp_burned: number;
    is_honeypot: boolean;
    top_10_holders_pct: number;
  };
}

interface Tokens {
  new_pairs: {
    [id: string]: Token;
  };
  final_stretch: {
    [id: string]: Token;
  };
  migrated: {
    [id: string]: Token;
  };
}

interface MarketData {
  btc: {
    price: number;
    change_24h: number;
    volume_24h: number;
  };
  eth: {
    price: number;
    change_24h: number;
    volume_24h: number;
  };
  sol: {
    price: number;
    change_24h: number;
    volume_24h: number;
  };
}

interface DataState {
  tokens: Tokens;
  market: MarketData;
  isLoading: boolean;
  error: string | null;
  lastUpdate: string | null;
}

const initialState: DataState = {
  tokens: {
    new_pairs: {},
    final_stretch: {},
    migrated: {},
  },
  market: {
    btc: { price: 0, change_24h: 0, volume_24h: 0 },
    eth: { price: 0, change_24h: 0, volume_24h: 0 },
    sol: { price: 0, change_24h: 0, volume_24h: 0 },
  },
  isLoading: false,
  error: null,
  lastUpdate: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Set initial token snapshot from REST API
    setTokenSnapshot: (
      state,
      action: PayloadAction<{
        rooms: {
          new_pairs: { tokens: { [id: string]: Token } };
          final_stretch: { tokens: { [id: string]: Token } };
          migrated: { tokens: { [id: string]: Token } };
        };
      }>
    ) => {
      state.tokens.new_pairs = action.payload.rooms.new_pairs.tokens;
      state.tokens.final_stretch = action.payload.rooms.final_stretch.tokens;
      state.tokens.migrated = action.payload.rooms.migrated.tokens;
      state.lastUpdate = new Date().toISOString();
    },

    // Update a single token (from WebSocket delta update)
    // Only metrics, distribution, and security fields are dynamic
    // Also handles room transitions
    updateToken: (
      state,
      action: PayloadAction<{
        room: 'new_pairs' | 'final_stretch' | 'migrated';
        content: {
          id: string;
          delta: {
            room?: 'new_pairs' | 'final_stretch' | 'migrated';
            roomEnteredAt?: string;
            metrics?: Partial<Token['metrics']>;
            distribution?: Partial<Token['distribution']>;
            security?: Partial<Token['security']>;
          };
        };
      }>
    ) => {
      const { room, content } = action.payload;
      const { id, delta } = content;

      // Check if token is transitioning to a new room
      const newRoom = delta.room;
      const currentRoom = room;

      if (newRoom && newRoom !== currentRoom) {
        // Room transition detected - move token to new room
        const token = state.tokens[currentRoom][id];

        if (token) {
          // Create updated token with new data
          const updatedToken = { ...token };

          // Apply delta updates
          if (delta.metrics) {
            updatedToken.metrics = {
              ...token.metrics,
              ...delta.metrics,
            };
          }
          if (delta.distribution) {
            updatedToken.distribution = {
              ...token.distribution,
              ...delta.distribution,
            };
          }
          if (delta.security) {
            updatedToken.security = {
              ...token.security,
              ...delta.security,
            };
          }

          // Move token to new room
          state.tokens[newRoom][id] = updatedToken;

          // Remove from old room
          delete state.tokens[currentRoom][id];

          console.log(`🔄 Token ${id} moved: ${currentRoom} → ${newRoom}`);
        }
      } else {
        // Normal update - no room change
        const token = state.tokens[room][id];

        if (token) {
          // Merge only the dynamic fields
          if (delta.metrics) {
            state.tokens[room][id].metrics = {
              ...token.metrics,
              ...delta.metrics,
            };
          }
          if (delta.distribution) {
            state.tokens[room][id].distribution = {
              ...token.distribution,
              ...delta.distribution,
            };
          }
          if (delta.security) {
            state.tokens[room][id].security = {
              ...token.security,
              ...delta.security,
            };
          }
        }
      }

      state.lastUpdate = new Date().toISOString();
    },

    // Set market data snapshot
    setMarketData: (state, action: PayloadAction<MarketData>) => {
      state.market = action.payload;
      state.lastUpdate = new Date().toISOString();
    },

    // Update market data (from WebSocket)
    updateMarketData: (state, action: PayloadAction<{ data: MarketData }>) => {
      state.market = action.payload.data;
      state.lastUpdate = new Date().toISOString();
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all data
    clearData: state => {
      state.tokens = {
        new_pairs: {},
        final_stretch: {},
        migrated: {},
      };
      state.market = {
        btc: { price: 0, change_24h: 0, volume_24h: 0 },
        eth: { price: 0, change_24h: 0, volume_24h: 0 },
        sol: { price: 0, change_24h: 0, volume_24h: 0 },
      };
      state.error = null;
      state.lastUpdate = null;
    },
  },
});

export const {
  setTokenSnapshot,
  updateToken,
  setMarketData,
  updateMarketData,
  setLoading,
  setError,
  clearData,
} = dataSlice.actions;

export default dataSlice.reducer;
