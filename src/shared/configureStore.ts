import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import rootReducer from './rootReducer';

type Scope = 'main' | 'renderer';

export const configStore = (scope: Scope = 'main') => {
  let middleware: any[] = [];

  if (scope === 'renderer') {
    middleware = [forwardToMain];
  }

  if (scope === 'main') {
    middleware = [triggerAlias, forwardToRenderer];
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), ...middleware],
  });

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};
