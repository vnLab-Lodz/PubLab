import React from 'react';
import './app.scss';
import './router_components/description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';
import UserLogin from './user_login/user_login';
import CustomRouter from './custom_router/custom_router';
import NavigationBar from './navigation_bar/navigation_bar';

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

const App = () => {
  return (
    <Provider store={store}>
      <UserLogin>
        <div className="wrapper">
          <div className="sideBar">
            <NavigationBar />
          </div>
          <div className="content">
            <CustomRouter/>
          </div>
        </div>
      </UserLogin>
    </Provider>
  );
};

export default App;
