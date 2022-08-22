import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appSettingsReducer from './slices/settingsSlice';
import loadPublicationsReducer from './slices/loadPublicationsSlice';
import currentViewReducer from './slices/currentViewSlice';
import publicationGenerationReducer from './slices/publicationGenerationSlice';
import addPublicationWizardReducer from './slices/addPublicationWizardSlice';
import notificationsReducer from './slices/notificationsSlice';
import loadersReducer from './slices/loadersSlice';
import repoStatusReducer from './slices/repoStatusSlice';
import assetsReducer from './slices/assetsSlice';

const rootReducer = combineReducers({
  currentView: currentViewReducer,
  appSettings: appSettingsReducer,
  currentUser: currentUserReducer,
  addPublicationWizard: addPublicationWizardReducer,
  publicationGeneration: publicationGenerationReducer,
  loadedPublications: loadPublicationsReducer,
  repoStatus: repoStatusReducer,
  notifications: notificationsReducer,
  loaders: loadersReducer,
  assets: assetsReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
