import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AUTH_STATES } from '../../../shared/redux/slices/currentUserSlice';
import * as Styled from './style';
import Logo from '../../assets/publab.png';
import { altTheme } from '../../theme';

const AuthProgress: React.FC<{ status: AUTH_STATES }> = ({ status }) => {
  const { t } = useTranslation();
  const key = status.toLowerCase() as Lowercase<AUTH_STATES>;

  return (
    <ThemeProvider theme={altTheme}>
      <Styled.Container>
        <Styled.LogoImg src={Logo} alt='PubLab' />
        <Typography variant='h5'>
          {t('auth.in_progress')} {t(`auth.states.${key}` as const)}
        </Typography>
      </Styled.Container>
    </ThemeProvider>
  );
};

export default AuthProgress;
