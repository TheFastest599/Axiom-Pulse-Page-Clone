import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import uiReducer from './uiSlice';
import tokenHistoryReducer from './tokenHistorySlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
    tokenHistory: tokenHistoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: [
          'data/setTokenSnapshot',
          'data/updateToken',
          'tokenHistory/initializeAllHistory',
          'tokenHistory/updateTokenHistory',
        ],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
