import { configureStore } from '@reduxjs/toolkit';
import { triggerAlias } from 'electron-redux';
import thunk from 'redux-thunk';
import rootReducer from '../shared/redux/rootReducer';

// ! export different store for test environment (subject to later change)
export const store =
  process.env.NODE_ENV !== 'test'
    ? require('./index').mainStore
    : configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => [
          ...getDefaultMiddleware(),
          triggerAlias,
          thunk,
        ],
      });
