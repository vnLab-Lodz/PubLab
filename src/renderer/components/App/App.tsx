import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { configStore } from '../../../shared/redux/configureStore';
import Auth from '../Auth/Auth';
import CustomRouter from '../CustomRouter/CustomRouter';
import NavigationBar from '../NavigationBar/NavigationBar';
import { theme } from '../../theme';
import observeStore from '../../../shared/redux/helpers/observeStore';
import { selectCurrentLocale } from '../../../shared/redux/slices/settingsSlice';
import i18next from '../../internationalisation/i18next';

const store = configStore('renderer');

observeStore(store, selectCurrentLocale, (langCode) =>
  i18next.changeLanguage(langCode)
);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth>
        <div className='wrapper'>
          <NavigationBar />
          <CustomRouter />
        </div>
      </Auth>
    </ThemeProvider>
  </Provider>
);

export default App;
