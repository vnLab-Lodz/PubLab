import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import currentViewReducer from './slices/currentViewSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  gatsbyInstall: gatsbyInstallReducer,
  currentView: currentViewReducer
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
