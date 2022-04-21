import { Box, Collapse, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { dismissNotification } from 'src/shared/redux/slices/notificationsSlice';
import CloseButton from '../CloseButton/CloseButton';
import * as Styled from './style';

export enum NOTIFICATION_TYPES {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
}

interface Props {
  type: NOTIFICATION_TYPES;
  id: string;
  autoDismiss?: boolean;
  delay?: number;
  isExpanded: boolean;
  expand: () => void;
}

const Notification: React.FC<Props> = ({
  children,
  type,
  id,
  isExpanded,
  expand,
  autoDismiss,
  delay,
}) => {
  const [progress, setProgress] = useState(100);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(dismissNotification(id));
  };

  useEffect(() => {
    if (!autoDismiss) return;

    const interval = setInterval(
      () => setProgress((prev) => prev - 1),
      delay! / 100
    );

    const timeout = setTimeout(() => {
      dispatch(dismissNotification(id));
    }, delay);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Styled.NotificationContainer
      sx={{ background: (theme) => theme.palette[type].main }}
      onMouseEnter={expand}
    >
      <Styled.NotificationHeader withMargin={isExpanded}>
        <Typography variant='body2' mt='0.3rem'>
          {t(`Notification.${type}`).toUpperCase()}
        </Typography>
        <Box>
          {autoDismiss && (
            <Styled.DelayProgress
              variant='determinate'
              value={progress}
              size={16}
            />
          )}
          <CloseButton onClick={handleClose} />
        </Box>
      </Styled.NotificationHeader>
      <Collapse in={isExpanded}>{children}</Collapse>
    </Styled.NotificationContainer>
  );
};

Notification.defaultProps = {
  autoDismiss: false,
  delay: 4000,
};

export const NotificationTitle: React.FC = ({ children }) => (
  <Typography variant='h1' mb={(theme) => theme.spacing(2)}>
    {children}
  </Typography>
);

export const NotificationText: React.FC = ({ children }) => (
  <Typography variant='body1' sx={{ wordBreak: 'break-word' }}>
    {children}
  </Typography>
);

export default Notification;
