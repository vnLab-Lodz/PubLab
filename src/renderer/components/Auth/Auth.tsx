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

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const { status, auth } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (status === AUTH_STATES.AUTH_FAILED) return;

    switch (status) {
      case AUTH_STATES.PRE_AUTHORIZE:
        dispatch(authorizeGitHubUserAsync(true));
        break;
      case AUTH_STATES.CODE_REQUESTED:
        if (auth.code) dispatch(requestAccessTokenAsync(auth.code));
        break;
      case AUTH_STATES.TOKEN_REQUESTED:
        if (auth.accessToken?.value)
          dispatch(fetchUserDataAsync(auth.accessToken?.value));
        break;
      default:
        break;
    }
  }, [status]);

  const Component =
    status === AUTH_STATES.AUTHED ? () => <>{children}</> : LoginComponent;

  const shouldRender =
    status === AUTH_STATES.AUTHED || status === AUTH_STATES.AUTH_FAILED;

  return shouldRender ? <Component /> : <AuthProgress status={status} />;
};

export default Auth;
