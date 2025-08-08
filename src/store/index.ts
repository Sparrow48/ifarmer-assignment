import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Persist config for only player reducer
const playerPersistConfig = {
  key: 'player',
  storage,
};

const persistedPlayerReducer = persistReducer(
  playerPersistConfig,
  playerReducer
);

export const store = configureStore({
  reducer: {
    player: persistedPlayerReducer, // persisted
    // otherReducer: otherReducer, // normal, not persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
