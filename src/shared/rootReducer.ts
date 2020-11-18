import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appConfigReducer from './slices/configurationSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appConfig: appConfigReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
