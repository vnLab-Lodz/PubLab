import { Box, styled } from '@mui/material';

export const NotificationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '0',
  right: '0',
  minWidth: '30rem',
  maxWidth: '30rem',
  maxHeight: '100vh',
  zIndex: '1000',
  padding: `calc(2 * ${theme.spacing(1)})`,
}));

export const NotificationHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: `calc(2 * ${theme.spacing(1)})`,
}));
