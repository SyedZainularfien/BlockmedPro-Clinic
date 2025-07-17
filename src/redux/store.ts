import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { storage } from 'src/utils/create-noop-storage';

import appReducer from './slices/app-slice';
import { authSlice } from './slices/auth-slice';
import currentConsultationsReducer from './slices/current-consultations';
import tempReducer from './slices/temp-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['temp'],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authSlice.reducer,
  currentConsultations: currentConsultationsReducer,
  temp: tempReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
