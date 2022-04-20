import { Box, CircularProgress, styled } from '@mui/material';

export const NotificationContainer = styled(Box)(({ theme }) => ({
  minWidth: '30rem',
  maxWidth: '30rem',
  maxHeight: '100vh',
  zIndex: '1000',
  padding: `calc(2 * ${theme.spacing(1)})`,
  height: 'fit-content',
  borderTop: `1px solid ${theme.palette.primary.main}`,

  '&:first-of-type': {
    borderTop: 'none',
  },
}));

export const NotificationHeader = styled(Box, {
  name: 'NotificationsContainer',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'withMargin',
})<{ withMargin?: boolean }>(({ theme, withMargin }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  transition: 'margin-bottom 0.2s ease-in-out',
  marginBottom: withMargin ? `calc(2 * ${theme.spacing(1)})` : 0,
}));

export const DelayProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1),
  circle: { transition: 'none' },
  verticalAlign: 'middle',
  transition: 'none',
  opacity: 0.8,
}));
