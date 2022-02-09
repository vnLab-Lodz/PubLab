import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import logo from '../../assets/publab.png';
import { terminateSessionAsync } from '../../../shared/redux/slices/currentUserSlice';
import { altTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import Button from '../../components/Button/Button';

const LogOut = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent contentBoxProps={{ sx: { paddingBottom: '2rem' } }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt='PubLab Logo' />
          <Typography variant='h4' my={3}>
            {t('log-out-view.message')}
          </Typography>
          <Button
            variant='contained'
            textCase='sentence-case'
            sx={{ width: '18em' }}
            onClick={() => dispatch(terminateSessionAsync())}
          >
            {t('log-out-view.button')}
          </Button>
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};
export default LogOut;
