import React from 'react';
import './user_login.scss';
import CustomRouter from '../custom_router/custom_router';
import LoginComponent from '../login_component/login_component';

const UserLogin = () => {

  const isUserLoggedIn = () => {
    //TODO: check if user is logged in
    return true;
  }

  const getRenderedComponent = () => {
      return isUserLoggedIn() ? <CustomRouter/> : <LoginComponent/>;
  }
  return (
      <>{getRenderedComponent()}</>
  );
};

export default UserLogin;