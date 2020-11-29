import React from 'react';
import './app.scss';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import UserLogin from '../UserLogin/UserLogin';
import CustomRouter from '../CustomRouter/CustomRouter';
import NavigationBar from '../NavigationBar/NavigationBar';

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

const App = () => {
  return (
    <Provider store={store}>
      <UserLogin>
        <div className="wrapper">
          <NavigationBar />
          <div className="content">
            <CustomRouter/>
          </div>
        </div>
      </UserLogin>
    </Provider>
  );
};

export default App;
