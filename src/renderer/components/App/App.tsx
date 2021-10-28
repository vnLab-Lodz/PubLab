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

const store = configStore('renderer');

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
