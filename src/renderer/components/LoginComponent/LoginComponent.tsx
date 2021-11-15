import React from 'react';
import { Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import './LoginComponent.scss';

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className='container'>
      <Typography fontWeight='normal' fontStyle='italic' color='text.secondary'>
        Welcome to VNlab
      </Typography>
      <div>
        <Button
          variant='contained'
          className='button'
          color='green'
          onClick={() => {
            dispatch(authorizeGitHubUserAsync(false));
          }}
        >
          Log in with GitHub <FaGithub />
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
