import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import currentPageReducer from './slices/currentPageSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  gatsbyInstall: gatsbyInstallReducer,
  currentPage: currentPageReducer
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
