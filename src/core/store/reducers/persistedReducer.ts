import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'antpro',
  keyPrefix: '',
  storage: storage,
  whitelist: ['auth'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
