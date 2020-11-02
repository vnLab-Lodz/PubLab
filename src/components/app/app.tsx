import React from 'react';
import './app.scss';
import '../description/description';
import Description from '../description/description';

const App = () => {
  return (
    <>
      <h1 className='hello'>Hello World!</h1>
      <Description />
    </>
  );
};

export default App;
