import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

import rootReducer from './rootReducer';
import {axiosMiddleware} from '@api';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(axiosMiddleware),
});

const persistore = persistStore(store);

export {store, persistore};
