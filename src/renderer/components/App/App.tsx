import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import Auth from '../Auth/Auth';
import CustomRouter from '../CustomRouter/CustomRouter';
import NavigationBar from '../NavigationBar/NavigationBar';

const store = configStore('renderer');

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <div className='wrapper'>
          <NavigationBar />
          <div className='content'>
            <CustomRouter />
          </div>
        </div>
      </Auth>
    </Provider>
  );
};

export default App;
