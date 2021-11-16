import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appSettingsReducer from './slices/settingsSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import publicationsReducer from './slices/publicationsSlice';
import nodeInstallReducer from './slices/nodeInstallSlice';
import currentViewReducer from './slices/currentViewSlice';
import gatsbyGenerateProjectReducer from './slices/gatsbyGenerateProjectSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appSettings: appSettingsReducer,
  nodeInstall: nodeInstallReducer,
  gatsbyInstall: gatsbyInstallReducer,
  publications: publicationsReducer,
  currentView: currentViewReducer,
  gatsbyGenerateProject: gatsbyGenerateProjectReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
