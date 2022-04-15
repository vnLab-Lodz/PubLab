import React from 'react';
import { useSelector } from 'react-redux';
import NavigationBar from '../NavigationBar/NavigationBar';
import CustomRouter from '../CustomRouter/CustomRouter';
import * as Styled from './style';
import { selectCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { FULL_SCREEN_VIEWS } from '../../constants/RouterComponents';
import NotificationsOutlet from '../NotificationsOutlet';

const Outlet = () => {
  const { view } = useSelector(selectCurrentView);
  const fullView = FULL_SCREEN_VIEWS.includes(view);

  return (
    <Styled.Wrapper singular={fullView}>
      {!fullView && <NavigationBar />}
      <CustomRouter />
      <NotificationsOutlet />
    </Styled.Wrapper>
  );
};

export default Outlet;
