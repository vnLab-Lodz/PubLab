import React from 'react';
import { useDispatch } from 'react-redux';
import { authorizeGitHubUserAsync } from '../../../shared/slices/currentUserSlice';
import './LoginComponent.scss';

const LoginComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>LoginComponent</div>
      <button
        onClick={() => {
          dispatch(authorizeGitHubUserAsync(process.env.GITHUB_CLIENT_ID));
        }}
      >
        LOG IN
      </button>
    </>
  );
};

export default LoginComponent;
