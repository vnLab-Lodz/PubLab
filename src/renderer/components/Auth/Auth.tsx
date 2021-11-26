import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from '../LoginComponent/LoginComponent';
import {
  authorizeGitHubUserAsync,
  AUTH_STATES,
  fetchUserDataAsync,
  requestAccessTokenAsync,
  selectCurrentUser,
} from '../../../shared/redux/slices/currentUserSlice';
import AuthProgress from '../AuthProgress/AuthProgress';

const { AUTHED, AUTH_FAILED, CODE_REQUESTED, PRE_AUTHORIZE, TOKEN_REQUESTED } =
  AUTH_STATES;

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const { status, auth } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (status === AUTH_FAILED) return;

    switch (status) {
      case PRE_AUTHORIZE:
        dispatch(authorizeGitHubUserAsync(true));
        break;
      case CODE_REQUESTED:
        if (auth.code) dispatch(requestAccessTokenAsync(auth.code));
        break;
      case TOKEN_REQUESTED:
        if (auth.accessToken?.value)
          dispatch(fetchUserDataAsync(auth.accessToken?.value));
        break;
      default:
        break;
    }
  }, [status]);

  const Component = status === AUTHED ? () => <>{children}</> : LoginComponent;

  const shouldRender = status === AUTHED || status === AUTH_FAILED;

  return shouldRender ? <Component /> : <AuthProgress status={status} />;
};

export default Auth;
