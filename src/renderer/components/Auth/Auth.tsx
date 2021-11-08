import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorizeGitHubUserAsync,
  AUTH_STATES,
  fetchUserDataAsync,
  requestAccessTokenAsync,
  selectCurrentUser,
} from '../../../shared/redux/slices/currentUserSlice';
import LoginComponent from '../LoginComponent/LoginComponent';

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { status } = currentUser;

  useEffect(() => {
    if (status === AUTH_STATES.AUTH_FAILED) return;

    switch (status) {
      case AUTH_STATES.PRE_AUTHORIZE:
        dispatch(authorizeGitHubUserAsync(true));
        break;
      case AUTH_STATES.CODE_REQUESTED:
        if (currentUser.auth.code)
          dispatch(requestAccessTokenAsync(currentUser.auth.code));
        break;
      case AUTH_STATES.TOKEN_REQUESTED:
        if (currentUser.auth.accessToken?.value)
          dispatch(fetchUserDataAsync(currentUser.auth.accessToken?.value));
        break;
      default:
        break;
    }
  }, [currentUser.status]);

  const component =
    status === AUTH_STATES.AUTHED ? <>{children}</> : <LoginComponent />;

  const shouldRender =
    status === AUTH_STATES.AUTHED || status === AUTH_STATES.AUTH_FAILED;

  return (
    <>
      {shouldRender ? (
        component
      ) : (
        <div>authentication in progress ({status.toLowerCase()})</div>
      )}
    </>
  );
};

export default Auth;
