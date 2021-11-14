import React from 'react';
import { Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import './LoginComponent.scss';
import logo from '../../assets/publab.png';

const LoginComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className='background'>
      <div className='language-box'>
        <Button variant='text' className='language'>
          {' '}
          <p>English</p>{' '}
        </Button>
        <Button variant='text' className='language'>
          {' '}
          <p>Polski</p>{' '}
        </Button>
      </div>
      <div className='container'>
        <img src={logo} alt="Logo"/>
        <Typography variant='h4' className='text'>
          <p>To begin, please log in using your GitHub account </p>
        </Typography>
        <div className='button'>
          <Button
            variant='text'
            className='button'
            onClick={() => {
              dispatch(authorizeGitHubUserAsync(false));
            }}
          >
            <FaGithub className='icon' /> <p>Log in with GitHub </p>
          </Button>
        </div>
      </div>
      <div className='footer'>
        <Typography variant='h4'>
          <p>
            {' '}
            Created by: Marlon Brando, Al Pacino, James Caan, Richard
            Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard
            Conte, and Diane Keaton
          </p>
        </Typography>
      </div>
    </div>
  );
};

export default LoginComponent;
