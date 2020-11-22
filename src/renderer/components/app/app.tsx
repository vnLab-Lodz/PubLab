import React from 'react';
import './app.scss';
import './router_components/description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import UserLogin from './user_login/user_login';

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

const App = () => {
  return (
    <Provider store={store}>
      <UserLogin/>
    </Provider>
  );
};

export default App;
