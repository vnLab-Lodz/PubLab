import React from 'react';
import './user_login.scss';
import LoginComponent from '../login_component/login_component';

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