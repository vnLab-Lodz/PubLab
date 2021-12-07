import React from 'react';
import { useSelector } from 'react-redux';
import { VIEWS } from '../../constants/Views';
import { selectCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import NavigationBar from './NavigationBar';
import InitialNavigationBar from './InitialNavigationBar';

const AppNavigationBar = () => {
  const { view } = useSelector(selectCurrentView);

  return (
    <>
      {view === VIEWS.FIRST_TIME ? <InitialNavigationBar /> : <NavigationBar />}
    </>
  );
};

export default AppNavigationBar;
