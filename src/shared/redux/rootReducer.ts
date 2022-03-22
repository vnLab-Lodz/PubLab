import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appSettingsReducer from './slices/settingsSlice';
import loadPublicationsReducer from './slices/loadPublicationsSlice';
import addPublicationReducer from './slices/addPublicationSlice';
import currentViewReducer from './slices/currentViewSlice';
import publicationGenerationReducer from './slices/publications/generate';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appSettings: appSettingsReducer,
  newPublication: addPublicationReducer,
  loadedPublications: loadPublicationsReducer,
  currentView: currentViewReducer,
  publicationGeneration: publicationGenerationReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
