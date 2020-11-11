import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';

const initialState = {};

export default function configureStore(scope = 'main') {
  let middleware: any[] = [];

  if (scope === 'renderer') {
    middleware = [
      forwardToMain
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      forwardToRenderer
    ];
  }

  const enhanced = [
    applyMiddleware(...middleware),
  ];

  const enhancer: any = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}