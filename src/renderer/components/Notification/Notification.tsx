import { Close } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Styled from './style';

export enum NOTIFICATION_TYPES {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
}

interface Props {
  type: NOTIFICATION_TYPES;
}

const Notification: React.FC<Props> = ({ children, type }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    console.log('close');
  };

  return (
    <Styled.NotificationContainer
      sx={{
        background: (theme) => theme.palette[type].main,
      }}
    >
      <Styled.NotificationHeader>
        <Typography variant='body2' mt='0.3rem'>
          {t('common.notification').toUpperCase()}
        </Typography>
        <IconButton
          size='small'
          sx={{ borderRadius: 0, padding: 0 }}
          onClick={handleClose}
        >
          <Close sx={{ height: '1.2em', width: '1.2em' }} />
        </IconButton>
      </Styled.NotificationHeader>
      {children}
    </Styled.NotificationContainer>
  );
};

export const NotificationTitle: React.FC = ({ children }) => (
  <Typography variant='h1' mb={(theme) => theme.spacing(3)}>
    {children}
  </Typography>
);

export const NotificationText: React.FC = ({ children }) => (
  <Typography variant='body1'>{children}</Typography>
);

export default Notification;
