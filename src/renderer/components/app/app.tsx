import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';
import { Provider } from 'react-redux';
import { configStore } from '../../../shared/configureStore';

const store = configStore('renderer');
store.subscribe(() => console.log('action received in renderer'));

const App = () => {
  return (
    <Provider store={store}>
      <h1 className='hello'>Hello World!</h1>
      <Description />
    </Provider>
  );
};

export default App;
