import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/redux/configureStore';
import Auth from '../Auth/Auth';
import CustomRouter from '../CustomRouter/CustomRouter';
import NavigationBar from '../NavigationBar/NavigationBar';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../theme';
import { CssBaseline } from '@mui/material';

const store = configStore('renderer');

const App = () => {
  return (
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
};

export default App;
