import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import { setPublicationsList } from 'src/shared/redux/slices/loadPublicationsSlice';
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
  const readPublications = async () => {
    const publications = await ipcRenderer.invoke(CHANNELS.PUBLICATIONS.FIND);
    store.dispatch(setPublicationsList(publications));
  };

  useEffect(() => {
    ipcRenderer.invoke(CHANNELS.SETTINGS.READ);
  }, []);

  useEffect(
    () =>
      observeStore(store, selectCurrentLocale, (langCode) =>
        i18next.changeLanguage(langCode)
      ),
    []
  );

  useEffect(
    () =>
      observeStore(store, selectDefaultDirPath, (dirPath) => {
        setLocalStorageItem('initialConfigFlag', !!dirPath);
        if (dirPath) readPublications();
      }),
    []
  );

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
