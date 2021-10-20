import React from 'react';
import { useDispatch } from 'react-redux';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import { FaGithub } from 'react-icons/fa';
import './LoginComponent.scss';
import { Typography } from '@mui/material';

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className='container'>
      <Typography fontWeight="800">
      Welcome to VNlab
      </Typography>
      <div>
        <button
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
