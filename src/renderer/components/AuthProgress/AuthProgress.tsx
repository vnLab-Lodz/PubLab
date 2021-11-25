import React from 'react';
import { Typography } from '@mui/material';
import { AUTH_STATES } from '../../../shared/redux/slices/currentUserSlice';
import * as Styled from './style';
import Logo from '../../assets/publab.png';

const AuthProgress: React.FC<{ status: AUTH_STATES }> = ({ status }) => {
  const getMessage = () => {
    switch (status) {
      case AUTH_STATES.PRE_AUTHORIZE:
        return 'Attempting log in...';
      case AUTH_STATES.CODE_REQUESTED:
        return 'Requesting access token...';
      case AUTH_STATES.TOKEN_REQUESTED:
        return 'Fetching user data...';
      case AUTH_STATES.AUTH_FAILED:
        return 'Failed to log in. Please try again.';
      default:
        return 'Logged in.';
    }
  };

  return (
    <Styled.Container>
      <Styled.LogoImg src={Logo} alt='PubLab' />
      <Typography variant='h5'>
        Authentication in progress: {getMessage()}
      </Typography>
    </Styled.Container>
  );
};

export default AuthProgress;
