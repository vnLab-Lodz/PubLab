import React, { useState, useEffect } from 'react';
import './user_login.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomRouter from '../custom_router/custom_router';
import LoginComponent from '../login_component/login_component';

const UserLogin = () => {

  const isUserLoggedIn = () => {
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