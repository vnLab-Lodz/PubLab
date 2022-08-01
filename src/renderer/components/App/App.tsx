import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import {
  setActivePublication,
  setPublicationsList,
} from 'src/shared/redux/slices/loadPublicationsSlice';
import { selectCurrentUserData } from 'src/shared/redux/slices/currentUserSlice';
import { Unsubscribe } from 'redux';
import { selectReadPublicationsOptions } from 'src/shared/redux/helpers/utilSelectors';
import { configStore } from '../../../shared/redux/configureStore';
import Auth from '../Auth/Auth';
import { mainTheme } from '../../theme';
import observeStore from '../../../shared/redux/helpers/observeStore';
import i18next from '../../internationalisation/i18next';
import { setLocalStorageItem } from '../../../shared/redux/helpers/localStorage';
import Outlet from '../Outlet/Outlet';
import {
  selectCurrentLocale,
  selectDefaultDirPath,
} from '../../../shared/redux/slices/settingsSlice';

const store = configStore('renderer');

const App = () => {
  const readPublications = async (options: {
    findLocal: boolean;
    findRemote: boolean;
  }) => {
    const local = options.findLocal
      ? await ipcRenderer.invoke(CHANNELS.PUBLICATIONS.FIND_LOCAL)
      : [];
    const remote = options.findRemote
      ? await ipcRenderer.invoke(CHANNELS.PUBLICATIONS.FIND_REMOTE)
      : [];
    const nextPublications = [...local, ...remote];

    store.dispatch(
      setPublicationsList(
        nextPublications.filter(
          (p, i, s) => s.findIndex((el) => el.id === p.id) === i
        )
      )
    );
  };

  useEffect(() => {
    const unsubscribes: Unsubscribe[] = [];

    ipcRenderer.invoke(CHANNELS.SETTINGS.READ);

    unsubscribes.push(
      // * Handle language change
      observeStore(store, selectCurrentLocale, (langCode) =>
        i18next.changeLanguage(langCode)
      ),

      // * Load user specific settings after log in
      observeStore(store, selectCurrentUserData, (data) => {
        if (data) ipcRenderer.invoke(CHANNELS.SETTINGS.READ_SYNC_LOCATIONS);
      }),

      // * Handle first app launch (set flag for first time view)
      observeStore(store, selectDefaultDirPath, (dirPath) => {
        setLocalStorageItem('initialConfigFlag', !!dirPath);
      }),

      // * Load publications
      observeStore(store, selectReadPublicationsOptions, (options) => {
        readPublications(options);
      }),

      // * Deactivate project when default dir path is changed
      observeStore(store, selectDefaultDirPath, () => {
        store.dispatch(setActivePublication(null));
      })
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Auth>
          <Outlet />
        </Auth>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
