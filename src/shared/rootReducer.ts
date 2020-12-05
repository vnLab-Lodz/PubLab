import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appConfigReducer from './slices/configurationSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import publicationsReducer from './slices/publicationsSlice';
import currentViewReducer from './slices/currentViewSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appConfig: appConfigReducer,
  gatsbyInstall: gatsbyInstallReducer,
<<<<<<< HEAD
  publications: publicationsReducer,
  currentView: currentViewReducer
=======
  currentView: currentViewReducer,
>>>>>>> 8031841f07a5e3e9cade504558e45655b3c73078
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

