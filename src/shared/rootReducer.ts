import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  gatsbyInstall: gatsbyInstallReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
