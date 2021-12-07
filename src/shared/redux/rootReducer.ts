import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appSettingsReducer from './slices/settingsSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import nodeInstallReducer from './slices/nodeInstallSlice';
import loadPublicationsReducer from './slices/loadPublicationsSlice';
import addPublicationReducer from './slices/addPublicationSlice';
import currentViewReducer from './slices/currentViewSlice';
import gatsbyGenerateProjectReducer from './slices/gatsbyGenerateProjectSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appSettings: appSettingsReducer,
  nodeInstall: nodeInstallReducer,
  gatsbyInstall: gatsbyInstallReducer,
  newPublication: addPublicationReducer,
  loadedPublications: loadPublicationsReducer,
  currentView: currentViewReducer,
  gatsbyGenerateProject: gatsbyGenerateProjectReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
