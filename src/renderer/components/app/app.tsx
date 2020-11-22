import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import UserLogin from './user_login/user_login';

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

const App = () => {
  return (
    <Provider store={store}>
      <h1 className='hello'>Hello World!</h1>
      <Description />
      <UserLogin/>
    </Provider>
  );
};

export default App;
