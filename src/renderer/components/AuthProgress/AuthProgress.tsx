import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AUTH_STATES } from '../../../shared/redux/slices/currentUserSlice';
import * as Styled from './style';
import Logo from '../../assets/publab.png';

const AuthProgress: React.FC<{ status: AUTH_STATES }> = ({ status }) => {
  const { t } = useTranslation();
  const key = status.toLowerCase() as Lowercase<AUTH_STATES>;

  return (
    <Styled.Container>
      <Styled.LogoImg src={Logo} alt='PubLab' />
      <Typography variant='h5'>
        {t('auth.in_progress')} {t(`auth.states.${key}`)}
      </Typography>
    </Styled.Container>
  );
};

export default AuthProgress;
