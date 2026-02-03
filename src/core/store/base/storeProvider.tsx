'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, rootStore } from './rootStore';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
