import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

import productsReducer from './slices/productSlices';
import favoritesReducer from './slices/favoritesSlice';

// 🔹 Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  favorites: favoritesReducer,
});

// 🔹 Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'], // 👈 ONLY favorites will persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
