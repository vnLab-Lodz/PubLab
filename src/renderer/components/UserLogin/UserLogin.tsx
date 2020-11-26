import React from 'react';
import './UserLogin.scss';
import LoginComponent from '../LoginComponent/LoginComponent';

const UserLogin = ({children} : any) => {

  const isUserLoggedIn = () => {
    //TODO: check if user is logged in
    return true;
  }

  const getRenderedComponent = () => {
      return isUserLoggedIn() ? <>{children}</> : <LoginComponent/>;
  }
  return (
      getRenderedComponent()
  );
};

export default UserLogin;