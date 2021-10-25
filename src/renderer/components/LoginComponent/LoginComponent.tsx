import React from 'react';
import { useDispatch } from 'react-redux';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import { FaGithub } from 'react-icons/fa';
import './LoginComponent.scss';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

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
          color = 'success'
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
