import React from 'react';
import { Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import './LoginComponent.scss';

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className='container'>
      <Typography fontWeight='normal' fontStyle='italic'>
        Welcome to VNlab
      </Typography>
      <div>
        <button
          type='button'
          className='button'
          onClick={() => {
            dispatch(authorizeGitHubUserAsync(false));
          }}
        >
          Log in with GitHub <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
