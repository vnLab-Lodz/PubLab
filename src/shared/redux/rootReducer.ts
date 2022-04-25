import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appSettingsReducer from './slices/settingsSlice';
import loadPublicationsReducer from './slices/loadPublicationsSlice';
import currentViewReducer from './slices/currentViewSlice';
import publicationGenerationReducer from './slices/publicationGenerationSlice';
import addPublicationWizardReducer from './slices/addPublicationWizardSlice';
import notificationsReducer from './slices/notificationsSlice';
import loadersReducer from './slices/loadersSlice';

const rootReducer = combineReducers({
  currentView: currentViewReducer,
  appSettings: appSettingsReducer,
  currentUser: currentUserReducer,
  addPublicationWizard: addPublicationWizardReducer,
  publicationGeneration: publicationGenerationReducer,
  loadedPublications: loadPublicationsReducer,
  notifications: notificationsReducer,
  loaders: loadersReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
